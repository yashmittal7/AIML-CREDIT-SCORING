"""CreditLens prototype API.

This serves predictions from the saved Kaggle-trained ensemble. It is a demo only,
not a validated lending or NBCFDC decision system.
"""
from pathlib import Path
from typing import Any

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "creditlens_model.joblib"

try:
    BUNDLE = joblib.load(MODEL_PATH)
    MODELS = BUNDLE["models"]
    WEIGHTS = BUNDLE["weights"]
    FEATURE_COLUMNS = list(BUNDLE["feature_columns"])
except Exception as exc:
    raise RuntimeError(
        "Could not load creditlens_model.joblib. Install the versions in "
        "backend/requirements.txt, especially scikit-learn==1.6.1, then restart."
    ) from exc

app = FastAPI(title="CreditLens ML API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def number(value: Any, default: float = 0.0) -> float:
    """Convert common form values such as '25000' or '25,000' to a number."""
    if value is None or value == "":
        return default
    try:
        cleaned = str(value).replace(",", "").replace("₹", "").strip()
        return float(cleaned)
    except (TypeError, ValueError):
        return default


def make_model_features(form: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any]]:
    """Map React form fields to the five fields used to train this prototype."""
    monthly_income = number(form.get("monthlyIncome"))
    # Fallback in case only the livelihood-income field is supplied.
    if monthly_income <= 0:
        monthly_income = number(form.get("businessIncome"))

    loan_amount = number(form.get("loanAmount"))
    years_experience = number(form.get("livelihoodExperience"))

    if monthly_income <= 0:
        raise HTTPException(
            status_code=422,
            detail="Enter a monthly income greater than zero before assessment.",
        )
    if loan_amount <= 0:
        raise HTTPException(
            status_code=422,
            detail="Enter a requested loan amount greater than zero before assessment.",
        )

    annual_income = monthly_income * 12.0
    loan_percent_income = loan_amount / annual_income

    # The training dataset uses broad consumer-loan intent categories.
    purpose = str(form.get("loanPurpose", "other")).strip().lower()
    if purpose == "education":
        loan_intent = "EDUCATION"
    elif purpose in {
        "business_expansion", "agriculture", "livestock", "equipment",
        "working_capital", "vehicle",
    }:
        loan_intent = "VENTURE"
    else:
        loan_intent = "PERSONAL"

    # This is only a rough mapping: a missed payment is not identical to the
    # training dataset's recorded prior-default field.
    missed = str(form.get("missedPayments", "")).strip().lower()
    has_previous_loan = str(form.get("hasPreviousLoan", "")).strip().lower()
    repayment = str(form.get("repaymentBehaviour", "")).strip().lower()
    if has_previous_loan == "no" or missed == "no_history" or repayment == "no_history":
        prior_default_file = "UNKNOWN"
    elif missed == "never":
        prior_default_file = "N"
    elif missed in {"once", "few_times", "many_times"}:
        prior_default_file = "Y"
    else:
        prior_default_file = "UNKNOWN"

    features = {
        "monthly_income": monthly_income,
        "loan_percent_income": loan_percent_income,
        "employment_years": years_experience,
        "loan_intent": loan_intent,
        "prior_default_file": prior_default_file,
    }
    context = {
        "monthly_income": monthly_income,
        "monthly_expenses": number(form.get("monthlyExpenses")),
        "loan_amount": loan_amount,
        "loan_percent_income": loan_percent_income,
        "years_experience": years_experience,
        "missed_payments": missed,
        "current_overdue": str(form.get("currentOverdue", "")).strip().lower(),
        "electricity_payment": str(form.get("electricityPayment", "")).strip().lower(),
        "water_payment": str(form.get("waterPayment", "")).strip().lower(),
        "repayment_behaviour": repayment,
        "has_previous_loan": has_previous_loan,
    }
    return features, context


def ensemble_probability(features: dict[str, Any]) -> float:
    row = pd.DataFrame(
        [{column: features.get(column) for column in FEATURE_COLUMNS}],
        columns=FEATURE_COLUMNS,
    )
    predictions: list[float] = []
    model_weights: list[float] = []

    for index, (name, model) in enumerate(MODELS.items()):
        probability = float(model.predict_proba(row)[0, 1])
        if isinstance(WEIGHTS, dict):
            weight = float(WEIGHTS.get(name, 0.0))
        else:
            weight = float(WEIGHTS[index]) if index < len(WEIGHTS) else 0.0
        predictions.append(probability)
        model_weights.append(weight)

    total_weight = sum(model_weights)
    if total_weight <= 0:
        result = float(np.mean(predictions))
    else:
        result = float(sum(p * w for p, w in zip(predictions, model_weights)) / total_weight)
    return min(max(result, 0.0), 1.0)


def profile_indicators(context: dict[str, Any]) -> tuple[list[str], list[str]]:
    """Create simple form-based indicators; these are not model explanations."""
    positive: list[str] = []
    risks: list[str] = []

    income = context["monthly_income"]
    expenses = context["monthly_expenses"]
    if expenses > 0 and expenses < income:
        positive.append("Reported monthly income is higher than reported monthly expenses")
    if context["years_experience"] >= 3:
        positive.append("At least 3 years of experience in the reported livelihood")
    if context["missed_payments"] == "never":
        positive.append("Applicant reports no missed loan payments")
    if context["electricity_payment"] in {"always_on_time", "mostly_on_time"}:
        positive.append("Applicant reports generally regular electricity-bill payments")
    if context["water_payment"] in {"always_on_time", "mostly_on_time"}:
        positive.append("Applicant reports generally regular water-bill payments")

    if context["current_overdue"] == "yes":
        risks.append("Applicant reports currently overdue loan payments")
    if context["missed_payments"] in {"once", "few_times", "many_times"}:
        risks.append("Applicant reports one or more missed loan payments")
    if context["loan_percent_income"] >= 0.35:
        risks.append("Requested loan amount is high relative to reported annual income")
    elif context["loan_percent_income"] >= 0.20:
        risks.append("Requested loan amount is moderately high relative to reported annual income")
    if context["has_previous_loan"] == "no" or context["missed_payments"] == "no_history":
        risks.append("Limited or no previous loan repayment history is reported")

    if not positive:
        positive.append("No positive indicator could be confirmed from the available self-reported fields")
    if not risks:
        risks.append("No major warning indicator was flagged by the simple form checks")
    return positive[:4], risks[:4]


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "CreditLens ML API is running", "docs": "/docs"}


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "status": "ok",
        "model_loaded": True,
        "model_version": BUNDLE.get("model_info", {}).get("version", "unknown"),
        "test_roc_auc": BUNDLE.get("metrics", {}).get("test_roc_auc"),
        "warning": "Kaggle test-set metric only; not validated for NBCFDC applicants.",
    }


@app.post("/predict")
def predict(payload: dict[str, Any]) -> dict[str, Any]:
    # Accept either a direct form object or {"formData": {...}}.
    form = payload.get("formData") or payload.get("form_data") or payload
    if not isinstance(form, dict):
        raise HTTPException(status_code=422, detail="Request body must contain applicant form fields.")

    features, context = make_model_features(form)
    probability = ensemble_probability(features)

    # These are prototype presentation bands, not approved lending thresholds.
    if probability < 0.15:
        category = "Low Risk"
    elif probability < 0.35:
        category = "Moderate Risk"
    else:
        category = "High Risk"

    # A display index on a 300–900 range, not an official credit-bureau score.
    score = int(round(900 - 600 * probability))
    positive_factors, risk_factors = profile_indicators(context)
    metrics = BUNDLE.get("metrics", {})

    return {
        "creditScore": score,
        "maxScore": 900,
        "riskCategory": category,
        "defaultProbability": round(probability * 100, 1),
        "positiveFactors": positive_factors,
        "riskFactors": risk_factors,
        "modelInfo": {
            "version": BUNDLE.get("model_info", {}).get("version", "unknown"),
            "testRocAuc": round(float(metrics.get("test_roc_auc", 0.0)), 4),
            "testRecords": int(metrics.get("test_records", 0)),
        },
        "disclaimer": (
            "Experimental demonstration only. The model was trained on a general "
            "Kaggle consumer-loan dataset, not NBCFDC beneficiary records. "
            "The indicators are based on self-reported form values and are not "
            "formal financial advice or a lending decision."
        ),
    }
