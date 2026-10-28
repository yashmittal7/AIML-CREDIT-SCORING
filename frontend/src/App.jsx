import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Database,
  FileCheck2,
  Gauge,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  WalletCards,
} from 'lucide-react'

function App() {
  const navigate = useNavigate()

  const goToApplication = () => {
    navigate('/application')
  }

  const scrollToProcess = () => {
    document.getElementById('how-it-works')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">

      {/* =========================================
          ANIMATED BACKGROUND
      ========================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[5%] top-[8%] h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-[5%] top-[20%] h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-[5%] left-[35%] h-80 w-80 rounded-full bg-indigo-600/15 blur-3xl" />
      </div>

      {/* =========================================
          NAVBAR
      ========================================= */}

      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
              <BrainCircuit className="h-5 w-5" />
            </div>

            <div>
              <p className="text-base font-bold tracking-wide">
                CreditLens
              </p>

              <p className="text-xs text-slate-400">
                NBCFDC Assessment Prototype
              </p>
            </div>

          </div>

          <div className="hidden items-center gap-8 md:flex">

            <button
              onClick={scrollToProcess}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              How it works
            </button>

            <button
              onClick={goToApplication}
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Start Assessment
            </button>

          </div>

        </div>
      </header>

      {/* =========================================
          HERO
      ========================================= */}

      <main>

        <section className="relative">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28">

            {/* LEFT */}
            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-200">
                <Sparkles className="h-4 w-4" />
                Alternative-data credit intelligence
              </div>

              <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                Credit assessment
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                  beyond traditional scores.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
                A prototype ML-based assessment platform designed to consider
                financial behaviour, repayment patterns, livelihood stability
                and alternative financial signals alongside traditional data.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <button
                  onClick={goToApplication}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Start Assessment
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </button>

                <button
                  onClick={scrollToProcess}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  Explore the platform
                  <ChevronRight className="h-5 w-5" />
                </button>

              </div>

              {/* mini highlights */}
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">

                <MiniStat
                  icon={<BrainCircuit className="h-4 w-4" />}
                  title="ML"
                  text="Risk model"
                />

                <MiniStat
                  icon={<Database className="h-4 w-4" />}
                  title="Alternative Data"
                  text="Behaviour signals"
                />

                <MiniStat
                  icon={<ShieldCheck className="h-4 w-4" />}
                  title="Explainable"
                  text="Risk factors"
                />

              </div>

            </div>

            {/* RIGHT — ASSESSMENT PREVIEW */}
            <div className="relative">

              <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">

                {/* preview header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Assessment Preview
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Alternative credit profile
                    </p>
                  </div>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Prototype
                  </span>

                </div>

                {/* score */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-slate-400">
                        Alternative Credit Score
                      </p>

                      <div className="mt-2 flex items-end gap-2">
                        <span className="text-5xl font-bold">
                          742
                        </span>

                        <span className="pb-1 text-sm text-slate-500">
                          / 900
                        </span>
                      </div>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-emerald-400/30 bg-emerald-400/10">
                      <Gauge className="h-7 w-7 text-emerald-300" />
                    </div>

                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-xs text-slate-500">
                      <span>Risk profile</span>
                      <span>82%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-300" />
                    </div>
                  </div>

                </div>

                {/* signals */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2">

                  <PreviewCard
                    icon={<WalletCards className="h-4 w-4" />}
                    title="Income Stability"
                    value="Stable"
                  />

                  <PreviewCard
                    icon={<CreditCard className="h-4 w-4" />}
                    title="Repayment"
                    value="Consistent"
                  />

                  <PreviewCard
                    icon={<FileCheck2 className="h-4 w-4" />}
                    title="Utility Behaviour"
                    value="Regular"
                  />

                  <PreviewCard
                    icon={<TrendingUp className="h-4 w-4" />}
                    title="Livelihood"
                    value="Established"
                  />

                </div>

                {/* factors */}
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">

                  <p className="text-sm font-semibold text-white">
                    Assessment signals
                  </p>

                  <div className="mt-4 space-y-3">

                    <Factor text="Consistent repayment behaviour" />

                    <Factor text="Stable livelihood income" />

                    <Factor text="Regular household payment behaviour" />

                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =========================================
            TRUST / VALUE BAR
        ========================================= */}

        <section className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:grid-cols-3">

            <ValueBar
              icon={<BrainCircuit className="h-5 w-5" />}
              title="ML-driven"
              text="Designed around predictive risk assessment"
            />

            <ValueBar
              icon={<Database className="h-5 w-5" />}
              title="Alternative signals"
              text="Looks beyond conventional credit history"
            />

            <ValueBar
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Explainable"
              text="Surfaces factors behind an assessment"
            />

          </div>
        </section>

        {/* =========================================
            HOW IT WORKS
        ========================================= */}

        <section
          id="how-it-works"
          className="mx-auto max-w-7xl px-6 py-24"
        >

          <div className="max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From beneficiary information to ML assessment.
            </h2>

            <p className="mt-4 text-slate-400">
              The platform combines multiple aspects of a beneficiary's
              financial profile before producing the assessment.
            </p>

          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">

            <ProcessCard
              number="01"
              icon={<Users className="h-6 w-6" />}
              title="Build Profile"
              text="Capture household, income and livelihood information."
            />

            <ProcessCard
              number="02"
              icon={<WalletCards className="h-6 w-6" />}
              title="Capture Behaviour"
              text="Record repayment and alternative payment behaviour."
            />

            <ProcessCard
              number="03"
              icon={<BrainCircuit className="h-6 w-6" />}
              title="Run ML Model"
              text="Send structured features to the Python risk model."
            />

            <ProcessCard
              number="04"
              icon={<Gauge className="h-6 w-6" />}
              title="View Assessment"
              text="Present score, probability and influential factors."
            />

          </div>

        </section>

        {/* =========================================
            CTA
        ========================================= */}

        <section className="px-6 pb-24">

          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-cyan-500/10 p-8 text-center sm:p-12">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20">
              <Sparkles className="h-7 w-7 text-blue-300" />
            </div>

            <h2 className="mt-6 text-3xl font-bold">
              Start a beneficiary assessment
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              Complete the financial profile and explore how alternative
              financial indicators can complement traditional credit data.
            </p>

            <button
              onClick={goToApplication}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Begin Assessment
              <ArrowRight className="h-5 w-5" />
            </button>

          </div>

        </section>

      </main>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            CreditLens — NBCFDC Assessment Prototype
          </p>

          <p>
            ML-based prototype • Not an official lending decision
          </p>

        </div>
      </footer>

    </div>
  )
}

/* =========================================
   MINI STAT
========================================= */

function MiniStat({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="flex items-center gap-2 text-blue-300">
        {icon}
        <span className="text-sm font-semibold text-white">
          {title}
        </span>
      </div>

      <p className="mt-1 text-xs text-slate-500">
        {text}
      </p>
    </div>
  )
}

/* =========================================
   PREVIEW CARD
========================================= */

function PreviewCard({ icon, title, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">

      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs">
          {title}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-white">
        {value}
      </p>

    </div>
  )
}

/* =========================================
   FACTOR
========================================= */

function Factor({ text }) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />

      <p className="text-sm text-slate-300">
        {text}
      </p>

    </div>
  )
}

/* =========================================
   VALUE BAR
========================================= */

function ValueBar({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
        {icon}
      </div>

      <div>
        <p className="font-semibold text-white">
          {title}
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {text}
        </p>
      </div>

    </div>
  )
}

/* =========================================
   PROCESS CARD
========================================= */

function ProcessCard({ number, icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.05]">

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
          {icon}
        </div>

        <span className="text-sm font-semibold text-slate-600">
          {number}
        </span>

      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  )
}

export default App