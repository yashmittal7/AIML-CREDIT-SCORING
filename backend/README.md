# CreditLens backend (prototype)

This folder contains a FastAPI endpoint that loads `creditlens_model.joblib` and exposes `/predict` for the React frontend.

## 1. Open a terminal in this `backend` folder

On Windows, run:

```powershell
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

If the command `python` is not recognised, try replacing it with `py`.

## 2. Check that it started

Open `http://127.0.0.1:8000/health` in the browser. You should see JSON containing `"status":"ok"`.

Open `http://127.0.0.1:8000/docs` to view the interactive API page. The prediction endpoint is `POST /predict`.

## Example request

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

## Important limitations

- The saved model's reported ROC-AUC (0.8376) comes from a held-out split of the public Kaggle consumer-loan dataset only. It has not been validated on NBCFDC beneficiaries.
- The dataset has five model inputs: monthly income, loan amount divided by annual income, livelihood/employment years, a broad loan-intent category, and a prior-default field. The form's `missedPayments` answer is only a rough proxy for the dataset's prior-default field.
- Risk bands and the 300–900 display index are prototype UI values, not official credit scores, calibrated probabilities, or lending rules.
- Keep this as an academic demonstration. Do not use it to approve or reject real applicants.
- `scikit-learn==1.6.1` is pinned because that is the version used to serialize the supplied model bundle.
