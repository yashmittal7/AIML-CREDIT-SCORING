import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    CircleGauge,
    ShieldCheck,
  } from 'lucide-react'
  
  function Assessment() {
    const result = {
      creditScore: 742,
      maxScore: 900,
      riskCategory: 'Low Risk',
      defaultProbability: 8.4,
  
      positiveFactors: [
        'Stable household income',
        'Mostly consistent repayment behaviour',
        'Regular utility payment behaviour',
        'Existing debt is within manageable levels',
      ],
  
      riskFactors: [
        'Requested loan amount is relatively high compared with current income',
        'Income has some monthly variation',
      ],
    }
  
    const scorePercentage =
      (result.creditScore / result.maxScore) * 100
  
    return (
      <div>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Step 7 of 7
          </p>
  
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Credit Risk Assessment
          </h2>
  
          <p className="mt-2 max-w-2xl text-slate-600">
            The assessment combines financial capacity, repayment behaviour,
            livelihood information and alternative financial indicators.
          </p>
        </div>
  
        <div className="grid gap-6 lg:grid-cols-3">
  
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
  
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                <CircleGauge className="h-6 w-6 text-blue-600" />
              </div>
  
              <div>
                <p className="text-sm text-slate-500">
                  Credit Assessment Score
                </p>
  
                <h3 className="text-lg font-semibold text-slate-900">
                  Alternative Credit Score
                </h3>
              </div>
            </div>
  
            <div className="mt-8 flex flex-col items-center">
  
              <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-[16px] border-blue-100">
  
                <div className="text-center">
                  <p className="text-5xl font-bold text-slate-900">
                    {result.creditScore}
                  </p>
  
                  <p className="mt-1 text-sm text-slate-500">
                    out of {result.maxScore}
                  </p>
                </div>
  
              </div>
  
              <div className="mt-6 w-full max-w-md">
  
                <div className="mb-2 flex justify-between text-xs text-slate-500">
                  <span>Lower</span>
                  <span>Higher</span>
                </div>
  
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${scorePercentage}%`,
                    }}
                  />
                </div>
  
              </div>
            </div>
          </div>
  
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
  
            <div className="flex items-center gap-3">
  
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                <ShieldCheck className="h-6 w-6 text-emerald-600" />
              </div>
  
              <div>
                <p className="text-sm text-slate-500">
                  Risk Category
                </p>
  
                <h3 className="text-lg font-semibold text-slate-900">
                  Assessment
                </h3>
              </div>
  
            </div>
  
            <div className="mt-8 rounded-xl bg-emerald-50 p-5 text-center">
  
              <p className="text-2xl font-bold text-emerald-700">
                {result.riskCategory}
              </p>
  
              <p className="mt-2 text-sm text-emerald-700">
                Based on the current assessment profile
              </p>
  
            </div>
  
            <div className="mt-6 border-t border-slate-200 pt-6">
  
              <p className="text-sm text-slate-500">
                Estimated Default Probability
              </p>
  
              <div className="mt-2 flex items-end gap-2">
  
                <span className="text-3xl font-bold text-slate-900">
                  {result.defaultProbability}%
                </span>
  
                <span className="pb-1 text-sm text-slate-500">
                  model estimate
                </span>
  
              </div>
  
            </div>
          </div>
        </div>
  
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
  
          <div className="flex items-center gap-3">
  
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
  
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Positive Financial Factors
              </h3>
  
              <p className="text-sm text-slate-500">
                Factors contributing positively to the assessment
              </p>
            </div>
  
          </div>
  
          <div className="mt-6 grid gap-4 md:grid-cols-2">
  
            {result.positiveFactors.map((factor, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
  
                <p className="text-sm leading-6 text-emerald-900">
                  {factor}
                </p>
              </div>
            ))}
  
          </div>
        </div>
  
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
  
          <div className="flex items-center gap-3">
  
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
  
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Factors Requiring Attention
              </h3>
  
              <p className="text-sm text-slate-500">
                Factors that may affect the model's risk assessment
              </p>
            </div>
  
          </div>
  
          <div className="mt-6 grid gap-4 md:grid-cols-2">
  
            {result.riskFactors.map((factor, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl bg-amber-50 p-4"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
  
                <p className="text-sm leading-6 text-amber-900">
                  {factor}
                </p>
              </div>
            ))}
  
          </div>
        </div>
  
        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
  
          <div className="flex items-start gap-3">
  
            <Activity className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
  
            <div>
  
              <h3 className="font-semibold text-blue-900">
                About This Assessment
              </h3>
  
              <p className="mt-2 text-sm leading-6 text-blue-800">
                This is an ML-based risk assessment prototype. The displayed
                values are currently mock results and will later be replaced
                with predictions from the Python ML backend.
              </p>
  
            </div>
  
          </div>
  
        </div>
      </div>
    )
  }
  
  export default Assessment