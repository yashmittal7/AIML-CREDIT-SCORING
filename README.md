# CreditLens — ML-Based Credit Risk Assessment Prototype

CreditLens is an academic full-stack prototype that demonstrates how a web application can collect applicant information and send selected fields to a Python machine-learning API for an experimental credit-risk estimate.

> **Important:** This is a demonstration only. The model was trained on a general Kaggle consumer-credit dataset, not on NBCFDC beneficiary records. It has not been validated for real lending decisions and must not be used to approve or reject actual applicants.

## Features

- Seven-step React form for personal, financial, repayment, utility, livelihood, and loan-purpose details.
- FastAPI backend that loads a saved machine-learning model bundle and exposes a prediction endpoint.
- Displays an experimental default-probability estimate, a presentation score, a risk band, and simple indicators calculated from selected form responses.
- Health endpoint and interactive API documentation for local testing.

## Project structure

```text
AIML-CREDIT-SCORING/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Application.jsx
│   │   │   ├── Assessment.jsx
│   │   │   └── Review.jsx
│   │   └── services/
│   │       └── api.js
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── creditlens_model.joblib
│   └── README.md
├── .gitignore
└── README.md
```

## Technology stack

**Frontend:** React, Vite, JavaScript, Tailwind CSS, Lucide React  
**Backend:** Python, FastAPI, Uvicorn  
**ML / data:** scikit-learn, XGBoost, pandas, NumPy, joblib

## Run locally

You need Node.js/npm and Python installed. Start the backend and frontend in **two separate terminals**. Keep both terminals running while using the app.

### 1. Start the Python backend

From the repository root, run:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

If PowerShell does not recognise `python`, try `py` in its place. If PowerShell blocks virtual-environment activation, use a new terminal and run the commands after `python -m venv .venv` with the environment's Python directly, or follow your local Python environment policy.

Verify the backend at:

- Health check: <http://127.0.0.1:8000/health>
- Interactive API docs: <http://127.0.0.1:8000/docs>

The backend expects the saved model file at `backend/creditlens_model.joblib`. The requirements pin scikit-learn to the version used to serialize this bundle.

### 2. Start the React frontend

Open a **second terminal** at the repository root and run:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually <http://localhost:5173>.

The frontend API connector is in `frontend/src/services/api.js` and calls `http://127.0.0.1:8000`. For local development, leave the backend on port `8000` and the Vite frontend on its default port `5173`, unless you also update the API URL and backend CORS configuration.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Basic API status message |
| `GET` | `/health` | Reports whether the saved model loaded and returns stored Kaggle test-set metrics |
| `POST` | `/predict` | Converts selected form inputs to model features and returns an experimental prediction |

Example request body for `POST /predict`:

```json
{
  "formData": {
    "monthlyIncome": "25000",
    "monthlyExpenses": "15000",
    "hasPreviousLoan": "yes",
    "repaymentBehaviour": "mostly_on_time",
    "missedPayments": "never",
    "currentOverdue": "no",
    "electricityPayment": "always_on_time",
    "waterPayment": "mostly_on_time",
    "livelihoodExperience": "5",
    "loanPurpose": "business_expansion",
    "loanAmount": "100000"
  }
}
```

The API returns fields such as `creditScore`, `riskCategory`, `defaultProbability`, `positiveFactors`, `riskFactors`, and `modelInfo`.

## Model and dataset

The saved model bundle was generated in Google Colab using the public Kaggle dataset `laotse/credit-risk-dataset` (`credit_risk_dataset.csv`). The training run reported 32,581 records and evaluated the model on a held-out set of 6,517 records.

| Model / metric | Reported result |
|---|---:|
| Logistic Regression ROC-AUC | 0.7909 |
| Random Forest ROC-AUC | 0.8314 |
| XGBoost ROC-AUC | 0.8376 |
| Final weighted ensemble ROC-AUC | 0.8376 |

These figures describe performance on the held-out Kaggle test split only. They are **not** measures of accuracy on NBCFDC beneficiaries. The learned ensemble weights were approximately 0 for Logistic Regression, 0.0009 for Random Forest, and 0.9991 for XGBoost, so the final prediction is dominated by XGBoost.

The backend maps the frontend form to five model inputs:

- monthly income;
- requested loan amount divided by estimated annual income;
- years of livelihood/employment experience;
- a broad loan-intent category;
- a prior-default indicator approximated from the self-reported missed-payment answer.

The missed-payment response is only a rough proxy for the dataset's prior-default field; the two concepts are not equivalent. Many form fields are used only for the profile indicators and are not inputs to the ML probability calculation.

## How to interpret the output

- **Default probability:** the probability value returned by the saved model for the mapped inputs. It is experimental and is not calibrated or validated for this beneficiary population.
- **Presentation score:** calculated by the backend as `round(900 - 600 × probability)`, where probability is between 0 and 1. This is a prototype display index, not an official credit-bureau score.
- **Risk category:** assigned using demonstration thresholds: below 15% is Low Risk, below 35% is Moderate Risk, and 35% or above is High Risk. These thresholds are not approved lending rules.
- **Profile indicators:** positive and warning messages are generated with simple rules from self-reported form values. They are not formal model explanations or causal findings.

## Limitations and responsible use

- The dataset contains general consumer-loan records, not NBCFDC beneficiary records.
- The reported ROC-AUC is a Kaggle held-out test-set metric only; it does not establish performance on real applicants.
- Some frontend responses are simplified or mapped into broad training categories, which may not represent the original meaning of beneficiary information.
- The repository contains the serialized model bundle used for inference. The complete Colab training notebook/script is not currently included in this repository, so reproducing the training run requires the original training materials and environment.
- The current backend does not include authentication, production deployment hardening, or a database for application persistence.

Use CreditLens only as an academic demonstration. Do not use its score or risk category for real credit decisions or as financial advice.

## Future improvements

- Add the full, reproducible training pipeline and documented dataset setup.
- Evaluate with appropriately consented and representative beneficiary data before considering any real-world use.
- Add automated tests for API input validation, feature mapping, and frontend/backend integration.
- Add production-grade privacy, security, monitoring, and governance controls before any deployment beyond a local demo.
