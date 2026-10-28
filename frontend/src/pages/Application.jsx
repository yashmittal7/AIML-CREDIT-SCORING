import { useState } from 'react'

import {
  ArrowLeft,
  ArrowRight,
  UserRound,
  Wallet,
  CreditCard,
  ReceiptText,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
  Check,
} from 'lucide-react'

import Review from './Review'
import Assessment from './Assessment'
import { getCreditAssessment } from '../services/api'



function Application() {
  const [step, setStep] = useState(1)
  const [assessmentResult, setAssessmentResult] = useState(null)
  const [assessmentError, setAssessmentError] = useState('')
  const [isAssessing, setIsAssessing] = useState(false)

  const [formData, setFormData] = useState({
    // STEP 1
    fullName: '',
    age: '',
    gender: '',
    state: '',
    district: '',
    occupation: '',
    dependents: '',

    // STEP 2
    monthlyIncome: '',
    incomeSource: '',
    incomeStability: '',
    monthlyExpenses: '',
    savings: '',
    bankAccount: '',

    // STEP 3
    hasPreviousLoan: '',
    numberOfLoans: '',
    loanProvider: '',
    repaymentBehaviour: '',
    missedPayments: '',
    currentOverdue: '',
    outstandingDebt: '',

    // STEP 4
    electricityPayment: '',
    waterPayment: '',
    mobilePayment: '',
    utilityPaymentMethod: '',
    billPaymentDifficulty: '',
    regularExpenses: '',

    // STEP 5
    livelihoodType: '',
    livelihoodExperience: '',
    businessIncome: '',
    loanPurpose: '',
    loanAmount: '',
    expectedIncomeIncrease: '',
    proposedActivity: '',
    repaymentSource: '',
  })

  const steps = [
    {
      number: 1,
      title: 'Personal',
      description: 'Basic profile',
      icon: UserRound,
    },
    {
      number: 2,
      title: 'Financial',
      description: 'Income & expenses',
      icon: Wallet,
    },
    {
      number: 3,
      title: 'Repayment',
      description: 'Loan behaviour',
      icon: CreditCard,
    },
    {
      number: 4,
      title: 'Payments',
      description: 'Alternative signals',
      icon: ReceiptText,
    },
    {
      number: 5,
      title: 'Livelihood',
      description: 'Loan purpose',
      icon: BriefcaseBusiness,
    },
    {
      number: 6,
      title: 'Review',
      description: 'Check details',
      icon: ShieldCheck,
    },
    {
      number: 7,
      title: 'Assessment',
      description: 'ML result',
      icon: Sparkles,
    },
  ]

  // -----------------------------------------
  // HANDLE INPUT
  // -----------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  // -----------------------------------------
  // NEXT
  // -----------------------------------------

  const handleNext = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault()
    }

    // The Review screen is step 6. Request the ML prediction before showing step 7.
    if (step === 6) {
      if (isAssessing) return

      setIsAssessing(true)
      setAssessmentError('')

      try {
        const result = await getCreditAssessment(formData)
        setAssessmentResult(result)
        setStep(7)
      } catch (error) {
        setAssessmentError(
          error?.message ||
            'Unable to generate the assessment. Check that the Python backend is running.'
        )
      } finally {
        setIsAssessing(false)
      }

      return
    }

    if (step < 6) {
      setStep((previousStep) => previousStep + 1)
    }
  }

  // -----------------------------------------
  // BACK
  // -----------------------------------------

  const handleBack = () => {
    if (step > 1) {
      setStep((previousStep) => previousStep - 1)
    }
  }

  const currentStep = steps[step - 1]

  const progressPercentage = ((step - 1) / 6) * 100

  return (
    <div className="min-h-screen bg-slate-950">

      {/* =========================================
          TOP HEADER
      ========================================= */}

      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-sm font-bold tracking-wide text-white">
                CreditLens
              </p>

              <p className="text-xs text-slate-500">
                NBCFDC Assessment Prototype
              </p>
            </div>

          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 sm:flex">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />

            <span className="text-xs text-slate-400">
              Secure assessment flow
            </span>
          </div>

        </div>
      </header>

      {/* =========================================
          MAIN BACKGROUND
      ========================================= */}

      <div className="relative overflow-hidden">

        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-[35%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <main className="relative mx-auto max-w-6xl px-6 py-10">

          {/* =====================================
              INTRO
          ===================================== */}

          <div className="mb-10">

            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Alternative-data credit assessment
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Beneficiary Financial Assessment
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  Build a broader financial profile using income, repayment
                  behaviour, livelihood information and alternative payment
                  signals.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Current stage
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="text-lg font-semibold text-white">
                    {currentStep.title}
                  </span>

                  <span className="text-sm text-slate-500">
                    / 7
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* =====================================
              STEP NAVIGATION
          ===================================== */}

          <div className="mb-10 overflow-x-auto pb-2">

            <div className="flex min-w-max items-center">

              {steps.map((item, index) => {

                const Icon = item.icon

                const isCompleted = step > item.number
                const isCurrent = step === item.number

                return (
                  <div
                    key={item.number}
                    className="flex items-center"
                  >

                    <button
                      type="button"
                      onClick={() => {
                        if (item.number <= step) {
                          setStep(item.number)
                        }
                      }}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                        isCurrent
                          ? 'bg-white/10'
                          : item.number <= step
                            ? 'hover:bg-white/5'
                            : 'cursor-default opacity-50'
                      }`}
                    >

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition ${
                          isCompleted
                            ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                            : isCurrent
                              ? 'border-blue-400/40 bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-600/10'
                              : 'border-white/10 bg-white/[0.04] text-slate-500'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>

                      <div className="hidden sm:block">
                        <p
                          className={`text-xs font-semibold ${
                            isCurrent
                              ? 'text-white'
                              : isCompleted
                                ? 'text-emerald-300'
                                : 'text-slate-500'
                          }`}
                        >
                          {item.title}
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-600">
                          {item.description}
                        </p>
                      </div>

                    </button>

                    {index < steps.length - 1 && (
                      <div
                        className={`mx-1 h-px w-5 sm:mx-2 sm:w-8 ${
                          step > item.number
                            ? 'bg-emerald-400/40'
                            : 'bg-white/10'
                        }`}
                      />
                    )}

                  </div>
                )
              })}

            </div>

          </div>

          {/* =====================================
              PROGRESS
          ===================================== */}

          {step < 7 && (
            <div className="mb-8">

              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Application progress
                </span>

                <span className="font-medium text-slate-300">
                  {step} / 6 sections
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-500"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />
              </div>

            </div>
          )}

          {/* =====================================
              FORM CONTAINER
          ===================================== */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-1 shadow-2xl shadow-black/20">

            <div className="rounded-[1.35rem] bg-slate-50 p-6 sm:p-8 lg:p-10">

              {/* =================================
                  STEP 1
              ================================= */}

              {step === 1 && (
                <StepWrapper
                  icon={<UserRound className="h-6 w-6 text-blue-600" />}
                  iconBackground="bg-blue-100"
                  title="Personal & Household Information"
                  description="Basic information helps create a broader applicant profile beyond conventional credit history."
                >

                  <form onSubmit={handleNext}>

                    <div className="grid gap-6 md:grid-cols-2">

                      <InputField
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        fullWidth
                      />

                      <InputField
                        label="Age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        min="18"
                        max="100"
                        required
                      />

                      <SelectField
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        options={[
                          ['male', 'Male'],
                          ['female', 'Female'],
                          ['other', 'Other'],
                          ['prefer_not_to_say', 'Prefer not to say'],
                        ]}
                      />

                      <InputField
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Example: West Bengal"
                        required
                      />

                      <InputField
                        label="District"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="Enter your district"
                        required
                      />

                      <SelectField
                        label="Primary Occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        required
                        options={[
                          ['farmer', 'Farmer'],
                          ['artisan', 'Artisan / Handicraft'],
                          ['small_business', 'Small Business'],
                          ['self_employed', 'Self Employed'],
                          ['daily_wage', 'Daily Wage Worker'],
                          ['salaried', 'Salaried'],
                          ['livestock', 'Livestock / Dairy'],
                          ['other', 'Other'],
                        ]}
                      />

                      <InputField
                        label="Number of Household Dependents"
                        name="dependents"
                        type="number"
                        value={formData.dependents}
                        onChange={handleChange}
                        placeholder="Example: 3"
                        min="0"
                        required
                      />

                    </div>

                    <FormButtons
                      showBack={false}
                    />

                  </form>

                </StepWrapper>
              )}

              {/* =================================
                  STEP 2
              ================================= */}

              {step === 2 && (
                <StepWrapper
                  icon={<Wallet className="h-6 w-6 text-emerald-600" />}
                  iconBackground="bg-emerald-100"
                  title="Income & Financial Profile"
                  description="Capture income capacity, financial stability and household spending patterns."
                >

                  <form onSubmit={handleNext}>

                    <div className="grid gap-6 md:grid-cols-2">

                      <InputField
                        label="Average Monthly Household Income"
                        name="monthlyIncome"
                        type="number"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        placeholder="Example: ₹25,000"
                        min="0"
                        required
                      />

                      <SelectField
                        label="Main Source of Income"
                        name="incomeSource"
                        value={formData.incomeSource}
                        onChange={handleChange}
                        required
                        options={[
                          ['agriculture', 'Agriculture'],
                          ['business', 'Small Business'],
                          ['daily_wage', 'Daily Wage'],
                          ['salary', 'Salary'],
                          ['self_employment', 'Self Employment'],
                          ['livestock', 'Livestock / Dairy'],
                          ['other', 'Other'],
                        ]}
                      />

                      <SelectField
                        label="How stable is your monthly income?"
                        name="incomeStability"
                        value={formData.incomeStability}
                        onChange={handleChange}
                        required
                        options={[
                          ['very_stable', 'Very Stable'],
                          ['stable', 'Mostly Stable'],
                          ['variable', 'Variable'],
                          ['highly_variable', 'Highly Variable'],
                        ]}
                      />

                      <InputField
                        label="Average Monthly Household Expenses"
                        name="monthlyExpenses"
                        type="number"
                        value={formData.monthlyExpenses}
                        onChange={handleChange}
                        placeholder="Example: ₹15,000"
                        min="0"
                        required
                      />

                      <SelectField
                        label="Do you regularly save part of your income?"
                        name="savings"
                        value={formData.savings}
                        onChange={handleChange}
                        required
                        options={[
                          ['regularly', 'Yes, regularly'],
                          ['sometimes', 'Sometimes'],
                          ['rarely', 'Rarely'],
                          ['never', 'No'],
                        ]}
                      />

                      <SelectField
                        label="Do you have an active bank account?"
                        name="bankAccount"
                        value={formData.bankAccount}
                        onChange={handleChange}
                        required
                        options={[
                          ['yes_active', 'Yes, actively used'],
                          ['yes_less_active', 'Yes, rarely used'],
                          ['no', 'No'],
                        ]}
                      />

                    </div>

                    <FormButtons
                      showBack
                      onBack={handleBack}
                    />

                  </form>

                </StepWrapper>
              )}

              {/* =================================
                  STEP 3
              ================================= */}

              {step === 3 && (
                <StepWrapper
                  icon={<CreditCard className="h-6 w-6 text-purple-600" />}
                  iconBackground="bg-purple-100"
                  title="Loans & Repayment Behaviour"
                  description="Repayment behaviour can provide meaningful financial signals even where formal credit history is limited."
                >

                  <form onSubmit={handleNext}>

                    <div className="grid gap-6 md:grid-cols-2">

                      <SelectField
                        label="Have you taken a loan before?"
                        name="hasPreviousLoan"
                        value={formData.hasPreviousLoan}
                        onChange={handleChange}
                        required
                        fullWidth
                        options={[
                          ['yes', 'Yes'],
                          ['no', 'No'],
                        ]}
                      />

                      <InputField
                        label="Number of Previous Loans"
                        name="numberOfLoans"
                        type="number"
                        value={formData.numberOfLoans}
                        onChange={handleChange}
                        placeholder="Example: 2"
                        min="0"
                        required
                      />

                      <SelectField
                        label="Previous Loan Provider"
                        name="loanProvider"
                        value={formData.loanProvider}
                        onChange={handleChange}
                        required
                        options={[
                          ['bank', 'Bank'],
                          ['mfi', 'Microfinance Institution'],
                          ['nbfc', 'NBFC'],
                          ['shg', 'Self Help Group'],
                          ['cooperative', 'Cooperative Society'],
                          ['informal', 'Informal Borrowing'],
                          ['none', 'No Previous Loan'],
                          ['other', 'Other'],
                        ]}
                      />

                      <SelectField
                        label="How would you describe your repayment behaviour?"
                        name="repaymentBehaviour"
                        value={formData.repaymentBehaviour}
                        onChange={handleChange}
                        required
                        options={[
                          ['always_on_time', 'Always paid on time'],
                          ['mostly_on_time', 'Mostly paid on time'],
                          ['occasional_delay', 'Occasional delays'],
                          ['frequent_delay', 'Frequent delays'],
                          ['no_history', 'No previous repayment history'],
                        ]}
                      />

                      <SelectField
                        label="Have you ever missed a loan payment?"
                        name="missedPayments"
                        value={formData.missedPayments}
                        onChange={handleChange}
                        required
                        options={[
                          ['never', 'Never'],
                          ['once', 'Once'],
                          ['few_times', 'A few times'],
                          ['many_times', 'Many times'],
                          ['no_history', 'No loan history'],
                        ]}
                      />

                      <SelectField
                        label="Do you currently have any overdue loan payments?"
                        name="currentOverdue"
                        value={formData.currentOverdue}
                        onChange={handleChange}
                        required
                        options={[
                          ['no', 'No'],
                          ['yes', 'Yes'],
                          ['no_active_loan', 'I have no active loan'],
                        ]}
                      />

                      <InputField
                        label="Approximate Outstanding Loan Amount"
                        name="outstandingDebt"
                        type="number"
                        value={formData.outstandingDebt}
                        onChange={handleChange}
                        placeholder="Example: ₹30,000"
                        min="0"
                        required
                      />

                    </div>

                    <div className="mt-7 rounded-2xl border border-purple-200 bg-purple-50 p-5">

                      <div className="flex gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />

                        <div>
                          <p className="text-sm font-semibold text-purple-900">
                            Why we ask this
                          </p>

                          <p className="mt-1 text-sm leading-6 text-purple-800">
                            Previous repayment behaviour can help provide a
                            financial signal for applicants with limited formal
                            borrowing records.
                          </p>
                        </div>
                      </div>

                    </div>

                    <FormButtons
                      showBack
                      onBack={handleBack}
                    />

                  </form>

                </StepWrapper>
              )}

              {/* =================================
                  STEP 4
              ================================= */}

              {step === 4 && (
                <StepWrapper
                  icon={<ReceiptText className="h-6 w-6 text-orange-600" />}
                  iconBackground="bg-orange-100"
                  title="Utility & Payment Behaviour"
                  description="Everyday payment patterns can provide additional financial signals where traditional credit information is limited."
                >

                  <form onSubmit={handleNext}>

                    <div className="grid gap-6 md:grid-cols-2">

                      <SelectField
                        label="How regularly do you pay electricity bills?"
                        name="electricityPayment"
                        value={formData.electricityPayment}
                        onChange={handleChange}
                        required
                        options={[
                          ['always_on_time', 'Always on time'],
                          ['mostly_on_time', 'Mostly on time'],
                          ['occasional_delay', 'Occasional delays'],
                          ['frequent_delay', 'Frequent delays'],
                          [
                            'not_available',
                            'Not applicable / No regular bill',
                          ],
                        ]}
                      />

                      <SelectField
                        label="How regularly do you pay water-related bills?"
                        name="waterPayment"
                        value={formData.waterPayment}
                        onChange={handleChange}
                        required
                        options={[
                          ['always_on_time', 'Always on time'],
                          ['mostly_on_time', 'Mostly on time'],
                          ['occasional_delay', 'Occasional delays'],
                          ['frequent_delay', 'Frequent delays'],
                          [
                            'not_available',
                            'Not applicable / No regular bill',
                          ],
                        ]}
                      />

                      <SelectField
                        label="How regularly do you recharge your mobile connection?"
                        name="mobilePayment"
                        value={formData.mobilePayment}
                        onChange={handleChange}
                        required
                        options={[
                          ['always_regular', 'Regularly'],
                          ['mostly_regular', 'Mostly regular'],
                          ['occasionally', 'Occasionally'],
                          ['not_applicable', 'Not applicable'],
                        ]}
                      />

                      <SelectField
                        label="How do you usually make your bill payments?"
                        name="utilityPaymentMethod"
                        value={formData.utilityPaymentMethod}
                        onChange={handleChange}
                        required
                        options={[
                          ['cash', 'Cash'],
                          ['bank', 'Bank / ATM'],
                          ['upi', 'UPI / Mobile Payment'],
                          [
                            'agent',
                            'Local Agent / Service Centre',
                          ],
                          ['mixed', 'Combination of methods'],
                        ]}
                      />

                      <SelectField
                        label="How often do you face difficulty making regular payments?"
                        name="billPaymentDifficulty"
                        value={formData.billPaymentDifficulty}
                        onChange={handleChange}
                        required
                        options={[
                          ['never', 'Never'],
                          ['rarely', 'Rarely'],
                          ['sometimes', 'Sometimes'],
                          ['often', 'Often'],
                          ['very_often', 'Very Often'],
                        ]}
                      />

                      <SelectField
                        label="Are your regular household expenses generally manageable?"
                        name="regularExpenses"
                        value={formData.regularExpenses}
                        onChange={handleChange}
                        required
                        options={[
                          [
                            'easily_manageable',
                            'Easily manageable',
                          ],
                          ['manageable', 'Mostly manageable'],
                          [
                            'sometimes_difficult',
                            'Sometimes difficult',
                          ],
                          [
                            'frequently_difficult',
                            'Frequently difficult',
                          ],
                        ]}
                      />

                    </div>

                    <div className="mt-7 rounded-2xl border border-orange-200 bg-orange-50 p-5">

                      <div className="flex gap-3">
                        <ReceiptText className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />

                        <div>
                          <p className="text-sm font-semibold text-orange-900">
                            Alternative financial signals
                          </p>

                          <p className="mt-1 text-sm leading-6 text-orange-800">
                            These responses are intended to complement—not
                            replace—formal credit information.
                          </p>
                        </div>
                      </div>

                    </div>

                    <FormButtons
                      showBack
                      onBack={handleBack}
                    />

                  </form>

                </StepWrapper>
              )}

              {/* =================================
                  STEP 5
              ================================= */}

              {step === 5 && (
                <StepWrapper
                  icon={
                    <BriefcaseBusiness className="h-6 w-6 text-cyan-600" />
                  }
                  iconBackground="bg-cyan-100"
                  title="Livelihood & Loan Purpose"
                  description="Understanding livelihood stability and intended use of the loan helps the assessment model understand repayment capacity."
                >

                  <form onSubmit={handleNext}>

                    <div className="grid gap-6 md:grid-cols-2">

                      <SelectField
                        label="Main Livelihood Type"
                        name="livelihoodType"
                        value={formData.livelihoodType}
                        onChange={handleChange}
                        required
                        options={[
                          ['agriculture', 'Agriculture'],
                          ['dairy', 'Dairy / Livestock'],
                          ['artisan', 'Artisan / Handicraft'],
                          ['small_business', 'Small Business'],
                          ['trading', 'Trading'],
                          ['transport', 'Transport'],
                          ['services', 'Services'],
                          ['daily_wage', 'Daily Wage Work'],
                          ['other', 'Other'],
                        ]}
                      />

                      <InputField
                        label="Years of Experience in This Livelihood"
                        name="livelihoodExperience"
                        type="number"
                        value={formData.livelihoodExperience}
                        onChange={handleChange}
                        placeholder="Example: 5"
                        min="0"
                        max="70"
                        required
                      />

                      <InputField
                        label="Average Monthly Income From Livelihood"
                        name="businessIncome"
                        type="number"
                        value={formData.businessIncome}
                        onChange={handleChange}
                        placeholder="Example: ₹20,000"
                        min="0"
                        required
                      />

                      <SelectField
                        label="Purpose of the Requested Loan"
                        name="loanPurpose"
                        value={formData.loanPurpose}
                        onChange={handleChange}
                        required
                        options={[
                          [
                            'business_expansion',
                            'Business Expansion',
                          ],
                          ['agriculture', 'Agricultural Activity'],
                          ['livestock', 'Livestock / Dairy'],
                          ['equipment', 'Equipment / Machinery'],
                          ['working_capital', 'Working Capital'],
                          ['vehicle', 'Vehicle / Transport'],
                          ['education', 'Education'],
                          ['other', 'Other'],
                        ]}
                      />

                      <InputField
                        label="Requested Loan Amount"
                        name="loanAmount"
                        type="number"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        placeholder="Example: ₹1,50,000"
                        min="0"
                        required
                      />

                      <InputField
                        label="Expected Monthly Income After Using the Loan"
                        name="expectedIncomeIncrease"
                        type="number"
                        value={formData.expectedIncomeIncrease}
                        onChange={handleChange}
                        placeholder="Example: ₹35,000"
                        min="0"
                        required
                      />

                      <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Briefly describe how you plan to use the loan
                        </label>

                        <textarea
                          name="proposedActivity"
                          value={formData.proposedActivity}
                          onChange={handleChange}
                          placeholder="Example: Purchase additional sewing machines to expand my tailoring work."
                          rows={5}
                          required
                          className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                        />

                      </div>

                      <div className="md:col-span-2">

                        <SelectField
                          label="Primary Expected Source for Repaying the Loan"
                          name="repaymentSource"
                          value={formData.repaymentSource}
                          onChange={handleChange}
                          required
                          options={[
                            [
                              'business_income',
                              'Business / Livelihood Income',
                            ],
                            [
                              'agriculture_income',
                              'Agricultural Income',
                            ],
                            ['salary', 'Salary'],
                            [
                              'household_income',
                              'Household Income',
                            ],
                            [
                              'mixed_income',
                              'Multiple Income Sources',
                            ],
                            ['other', 'Other'],
                          ]}
                        />

                      </div>

                    </div>

                    <div className="mt-7 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">

                      <div className="flex gap-3">
                        <BriefcaseBusiness className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />

                        <div>
                          <p className="text-sm font-semibold text-cyan-900">
                            Repayment capacity
                          </p>

                          <p className="mt-1 text-sm leading-6 text-cyan-800">
                            The relationship between livelihood income, loan
                            size and expected income generation can provide
                            useful features for the ML model.
                          </p>
                        </div>
                      </div>

                    </div>

                    <FormButtons
                      showBack
                      onBack={handleBack}
                    />

                  </form>

                </StepWrapper>
              )}

              {/* =================================
                  STEP 6
              ================================= */}

              {step === 6 && (
                <>
                  {isAssessing && (
                    <div
                      role="status"
                      className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800"
                    >
                      Generating your assessment. Please wait...
                    </div>
                  )}

                  {assessmentError && (
                    <div
                      role="alert"
                      className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                      {assessmentError}
                    </div>
                  )}

                  <Review
                    formData={formData}
                    onBack={handleBack}
                    onContinue={handleNext}
                  />
                </>
              )}

              {/* =================================
                  STEP 7
              ================================= */}

              {step === 7 && (
                <Assessment result={assessmentResult} />
              )}

            </div>

          </div>

          {/* =====================================
              FOOTER NOTE
          ===================================== */}

          <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-600">
            <ShieldCheck className="h-4 w-4" />

            <span>
              ML-based prototype • Information is intended for assessment
              purposes and is not an official lending decision.
            </span>
          </div>

        </main>
      </div>

    </div>
  )
}

/* =================================================
   STEP WRAPPER
================================================= */

function StepWrapper({
  icon,
  iconBackground,
  title,
  description,
  children,
}) {
  return (
    <div>

      <div className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-start">

        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${iconBackground}`}
        >
          {icon}
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {description}
          </p>
        </div>

      </div>

      {children}

    </div>
  )
}

/* =================================================
   INPUT FIELD
================================================= */

function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  min,
  max,
  required = false,
  fullWidth = false,
}) {
  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>

      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />

    </div>
  )
}

/* =================================================
   SELECT FIELD
================================================= */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  fullWidth = false,
}) {
  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>

      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      >
        <option value="">
          Select option
        </option>

        {options.map(([optionValue, optionLabel]) => (
          <option
            key={optionValue}
            value={optionValue}
          >
            {optionLabel}
          </option>
        ))}
      </select>

    </div>
  )
}

/* =================================================
   FORM BUTTONS
================================================= */

function FormButtons({
  showBack,
  onBack,
}) {
  return (
    <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">

      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          Back
        </button>
      ) : (
        <div />
      )}

      <button
        type="submit"
        className="group flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-blue-600"
      >
        Continue

        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </button>

    </div>
  )
}

export default Application