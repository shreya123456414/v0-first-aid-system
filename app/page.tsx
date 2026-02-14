"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StepIndicator } from "@/components/step-indicator"
import { PatientProfileStep } from "@/components/steps/patient-profile"
import { InjurySelectionStep } from "@/components/steps/injury-selection"
import { SymptomsInputStep } from "@/components/steps/symptoms-input"
import { LocationSelectStep } from "@/components/steps/location-select"
import { ResultsPage } from "@/components/results-page"
import { generateGuidance } from "@/lib/first-aid-engine"
import type {
  PatientProfile,
  InjuryData,
  SymptomData,
  LocationData,
  FirstAidGuidance,
} from "@/lib/first-aid-types"
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Heart,
  Cross,
} from "lucide-react"

const STEP_LABELS = ["Profile", "Injury", "Symptoms", "Location"]

const DEFAULT_PATIENT: PatientProfile = {
  name: "",
  age: "",
  ageGroup: "adult",
  bloodGroup: "",
  allergies: "",
  medicalConditions: "",
  emergencyContact: "",
}

const DEFAULT_INJURY: InjuryData = {
  injuryType: "cut_wound",
}

const DEFAULT_SYMPTOMS: SymptomData = {
  painLevel: "low",
  bleeding: false,
  swelling: false,
  conscious: true,
}

const DEFAULT_LOCATION: LocationData = {
  city: "",
}

export default function FirstAidApp() {
  const [step, setStep] = useState(0)
  const [patient, setPatient] = useState<PatientProfile>(DEFAULT_PATIENT)
  const [injury, setInjury] = useState<InjuryData>(DEFAULT_INJURY)
  const [symptoms, setSymptoms] = useState<SymptomData>(DEFAULT_SYMPTOMS)
  const [location, setLocation] = useState<LocationData>(DEFAULT_LOCATION)
  const [guidance, setGuidance] = useState<FirstAidGuidance | null>(null)

  const handleNext = useCallback(() => {
    if (step === 4) {
      const result = generateGuidance(patient, injury, symptoms)
      setGuidance(result)
      setStep(5)
    } else {
      setStep((s) => s + 1)
    }
  }, [step, patient, injury, symptoms])

  const handleBack = useCallback(() => {
    setStep((s) => Math.max(0, s - 1))
  }, [])

  const handleRestart = useCallback(() => {
    setStep(0)
    setPatient(DEFAULT_PATIENT)
    setInjury(DEFAULT_INJURY)
    setSymptoms(DEFAULT_SYMPTOMS)
    setLocation(DEFAULT_LOCATION)
    setGuidance(null)
  }, [])

  const canProceed = () => {
    switch (step) {
      case 1:
        return patient.name.trim().length > 0 && patient.age.trim().length > 0
      case 2:
        return !!injury.injuryType
      case 3:
        return true
      case 4:
        return true
      default:
        return true
    }
  }

  // Welcome screen
  if (step === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
            <Cross className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground text-balance">
            First Aid Guide
          </h1>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed text-pretty">
            Smart emergency assistance with step-by-step first aid guidance.
            Works offline for low-connectivity environments.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <ShieldCheck className="mx-auto h-7 w-7 text-primary" />
              <p className="mt-2 text-xs font-medium text-foreground">
                Safe Guidance
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Step-by-step instructions
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <Heart className="mx-auto h-7 w-7 text-severity-emergency" />
              <p className="mt-2 text-xs font-medium text-foreground">
                Personalized
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Based on your profile
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <Cross className="mx-auto h-7 w-7 text-severity-mild" />
              <p className="mt-2 text-xs font-medium text-foreground">
                Offline Ready
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                No internet needed
              </p>
            </div>
          </div>

          <Button
            onClick={() => setStep(1)}
            size="lg"
            className="mt-8 w-full gap-2 text-base"
          >
            Start Assessment
            <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="mt-6 text-xs text-muted-foreground">
            This app provides first aid guidance only and does not replace
            professional medical care.
          </p>
        </div>
      </main>
    )
  }

  // Results screen
  if (step === 5 && guidance) {
    return (
      <main className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Cross className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-base font-semibold text-foreground">
              First Aid Results
            </h1>
          </div>
        </header>
        <div className="mx-auto max-w-2xl px-4 py-6">
          <ResultsPage
            patient={patient}
            injury={injury}
            symptoms={symptoms}
            location={location}
            guidance={guidance}
            onRestart={handleRestart}
          />
        </div>
      </main>
    )
  }

  // Form wizard steps
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto max-w-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Cross className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-base font-semibold text-foreground">
              First Aid Guide
            </h1>
          </div>
          <div className="mt-3">
            <StepIndicator
              currentStep={step}
              totalSteps={4}
              labels={STEP_LABELS}
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <Card className="border-border shadow-sm">
          <CardContent className="p-5 md:p-6">
            {step === 1 && (
              <PatientProfileStep data={patient} onChange={setPatient} />
            )}
            {step === 2 && (
              <InjurySelectionStep data={injury} onChange={setInjury} />
            )}
            {step === 3 && (
              <SymptomsInputStep data={symptoms} onChange={setSymptoms} />
            )}
            {step === 4 && (
              <LocationSelectStep data={location} onChange={setLocation} />
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {step === 1 ? "Home" : "Back"}
          </Button>

          <span className="text-sm text-muted-foreground">
            Step {step} of 4
          </span>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
          >
            {step === 4 ? "Get Guidance" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}
