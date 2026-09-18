import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  CreditCard,
  ReceiptText,
  ShieldCheck,
  UserRound,
  Wallet,
} from 'lucide-react'

function Review({ formData, onBack, onContinue }) {
  const sections = [
    {
      title: 'Personal & Household',
      icon: <UserRound className="h-5 w-5 text-blue-600" />,
      iconBg: 'bg-blue-100',
      items: [
        ['Full Name', formData.fullName],
        ['Age', formData.age],
        ['Gender', formData.gender],
        ['State', formData.state],
        ['District', formData.district],
        ['Occupation', formData.occupation],
        ['Dependents', formData.dependents],
      ],
    },
    {
      title: 'Income & Financial Profile',
      icon: <Wallet className="h-5 w-5 text-emerald-600" />,
      iconBg: 'bg-emerald-100',
      items: [
        ['Monthly Household Income', formData.monthlyIncome, '₹'],
        ['Main Income Source', formData.incomeSource],
        ['Income Stability', formData.incomeStability],
        ['Monthly Expenses', formData.monthlyExpenses, '₹'],
        ['Savings Behaviour', formData.savings],
        ['Bank Account', formData.bankAccount],
      ],
    },
    {
      title: 'Loans & Repayment Behaviour',
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
      iconBg: 'bg-purple-100',
      items: [
        ['Previous Loan', formData.hasPreviousLoan],
        ['Previous Loans', formData.numberOfLoans],
        ['Loan Provider', formData.loanProvider],
        ['Repayment Behaviour', formData.repaymentBehaviour],
        ['Missed Payments', formData.missedPayments],
        ['Current Overdue', formData.currentOverdue],
        ['Outstanding Debt', formData.outstandingDebt, '₹'],
      ],
    },
    {
      title: 'Utility & Payment Behaviour',
      icon: <ReceiptText className="h-5 w-5 text-orange-600" />,
      iconBg: 'bg-orange-100',
      items: [
        ['Electricity Payments', formData.electricityPayment],
        ['Water Payments', formData.waterPayment],
        ['Mobile Recharge', formData.mobilePayment],
        ['Payment Method', formData.utilityPaymentMethod],
        ['Payment Difficulty', formData.billPaymentDifficulty],
        ['Expense Management', formData.regularExpenses],
      ],
    },
    {
      title: 'Livelihood & Loan Purpose',
      icon: (
        <BriefcaseBusiness className="h-5 w-5 text-cyan-600" />
      ),
      iconBg: 'bg-cyan-100',
      items: [
        ['Livelihood Type', formData.livelihoodType],
        [
          'Livelihood Experience',
          formData.livelihoodExperience
            ? `${formData.livelihoodExperience} years`
            : '',
        ],
        ['Livelihood Income', formData.businessIncome, '₹'],
        ['Loan Purpose', formData.loanPurpose],
        ['Requested Loan', formData.loanAmount, '₹'],
        [
          'Expected Monthly Income',
          formData.expectedIncomeIncrease,
          '₹',
        ],
        ['Repayment Source', formData.repaymentSource],
      ],
    },
  ]

  return (
    <div>

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="mb-8">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Final verification
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Review Your Application
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Verify your information before submitting it for the ML-based
              credit risk assessment.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-right shadow-sm">

            <p className="text-xs uppercase tracking-wider text-slate-400">
              Application status
            </p>

            <div className="mt-1 flex items-center justify-end gap-2">

              <CheckCircle2 className="h-4 w-4 text-emerald-500" />

              <span className="font-semibold text-slate-900">
                Ready for assessment
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          KEY METRICS
      ========================================= */}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <MetricCard
          title="Monthly Income"
          value={formatMoney(formData.monthlyIncome)}
          icon={<Wallet className="h-5 w-5" />}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />

        <MetricCard
          title="Monthly Expenses"
          value={formatMoney(formData.monthlyExpenses)}
          icon={<ReceiptText className="h-5 w-5" />}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />

        <MetricCard
          title="Requested Loan"
          value={formatMoney(formData.loanAmount)}
          icon={<CreditCard className="h-5 w-5" />}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />

        <MetricCard
          title="Livelihood Income"
          value={formatMoney(formData.businessIncome)}
          icon={<BriefcaseBusiness className="h-5 w-5" />}
          iconBg="bg-cyan-100"
          iconColor="text-cyan-600"
        />

      </div>

      {/* =========================================
          APPLICATION SECTIONS
      ========================================= */}

      {sections.map((section) => (
        <ReviewSection
          key={section.title}
          title={section.title}
          icon={section.icon}
          iconBg={section.iconBg}
          items={section.items}
        />
      ))}

      {/* =========================================
          LOAN PURPOSE
      ========================================= */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100">
            <BriefcaseBusiness className="h-5 w-5 text-cyan-600" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Planned Use of Loan
            </h3>

            <p className="text-xs text-slate-500">
              Beneficiary's intended activity
            </p>
          </div>

        </div>

        <div className="mt-5 rounded-xl bg-slate-50 p-4">

          <p className="text-sm leading-7 text-slate-700">
            {formData.proposedActivity || 'Not provided'}
          </p>

        </div>

      </div>

      {/* =========================================
          ML NOTICE
      ========================================= */}

      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-6">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
          </div>

          <div>

            <h3 className="font-semibold text-indigo-950">
              Ready for ML Assessment
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-indigo-900/80">
              Your application contains financial, repayment, utility,
              livelihood and loan information. After submission, these
              structured inputs will be passed to the ML backend for risk
              assessment.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              <Tag text="Financial profile" />
              <Tag text="Repayment behaviour" />
              <Tag text="Alternative signals" />
              <Tag text="Livelihood data" />

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          ACTIONS
      ========================================= */}

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

        <button
          type="button"
          onClick={onBack}
          className="group flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          Go Back & Edit
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="group flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-600"
        >
          Submit for ML Assessment
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>

      </div>

    </div>
  )
}

/* =========================================
   REVIEW SECTION
========================================= */

function ReviewSection({
  title,
  icon,
  iconBg,
  items,
}) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </div>

        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

      </div>

      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">

        {items.map(([label, value, prefix], index) => (
          <div key={`${label}-${index}`}>

            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {label}
            </p>

            <p className="mt-1.5 font-medium text-slate-900">
              {prefix || ''}
              {formatValue(value)}
            </p>

          </div>
        ))}

      </div>

    </div>
  )
}

/* =========================================
   METRIC CARD
========================================= */

function MetricCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-center justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  )
}

/* =========================================
   TAG
========================================= */

function Tag({ text }) {
  return (
    <span className="rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-xs font-medium text-indigo-700">
      {text}
    </span>
  )
}

/* =========================================
   FORMAT VALUE
========================================= */

function formatValue(value) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return 'Not provided'
  }

  return String(value)
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

/* =========================================
   FORMAT MONEY
========================================= */

function formatMoney(value) {
  if (!value) {
    return '—'
  }

  const number = Number(value)

  if (Number.isNaN(number)) {
    return `₹${value}`
  }

  return `₹${number.toLocaleString('en-IN')}`
}

export default Review