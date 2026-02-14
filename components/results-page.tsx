"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type {
  PatientProfile,
  InjuryData,
  SymptomData,
  LocationData,
  FirstAidGuidance,
  SeverityLevel,
} from "@/lib/first-aid-types"
import { INJURY_LABELS } from "@/lib/first-aid-types"
import { HOSPITALS } from "@/lib/hospitals-data"
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Phone,
  Building2,
  RotateCcw,
  ShieldAlert,
  ThumbsUp,
  ThumbsDown,
  User,
  Stethoscope,
  Timer,
  Image as ImageIcon,
} from "lucide-react"
import Image from "next/image"
import { AnimatedInjuryIcon } from "@/components/animated-injury-icons"

interface ResultsPageProps {
  patient: PatientProfile
  injury: InjuryData
  symptoms: SymptomData
  location: LocationData
  guidance: FirstAidGuidance
  onRestart: () => void
}

const SEVERITY_CONFIG: Record<
  SeverityLevel,
  { label: string; color: string; bgColor: string; borderColor: string; icon: React.ReactNode; description: string }
> = {
  mild: {
    label: "Mild",
    color: "text-severity-mild",
    bgColor: "bg-severity-mild/10",
    borderColor: "border-severity-mild",
    icon: <CheckCircle2 className="h-6 w-6" />,
    description: "Home care is likely sufficient. Monitor the condition.",
  },
  serious: {
    label: "Serious",
    color: "text-severity-serious",
    bgColor: "bg-severity-serious/10",
    borderColor: "border-severity-serious",
    icon: <AlertTriangle className="h-6 w-6" />,
    description: "Doctor consultation is recommended. Seek medical advice soon.",
  },
  emergency: {
    label: "Emergency",
    color: "text-severity-emergency",
    bgColor: "bg-severity-emergency/10",
    borderColor: "border-severity-emergency",
    icon: <ShieldAlert className="h-6 w-6" />,
    description: "Immediate medical assistance is required. Call emergency services now.",
  },
}

export function ResultsPage({
  patient,
  injury,
  symptoms,
  location,
  guidance,
  onRestart,
}: ResultsPageProps) {
  const severityInfo = SEVERITY_CONFIG[guidance.severity]
  const hospitals = location.city ? HOSPITALS[location.city] || [] : []

  return (
    <div className="space-y-6">
      {/* Severity Banner */}
      <div
        className={cn(
          "rounded-2xl border-2 p-5",
          severityInfo.bgColor,
          severityInfo.borderColor
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn("shrink-0", severityInfo.color)}>
            {severityInfo.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                className={cn("text-xl font-bold", severityInfo.color)}
              >
                {severityInfo.label}
              </h2>
              <Badge
                className={cn(
                  "text-xs",
                  severityInfo.bgColor,
                  severityInfo.color,
                  severityInfo.borderColor,
                  "border"
                )}
              >
                Severity Level
              </Badge>
            </div>
            <p className={cn("mt-1 text-sm", severityInfo.color)}>
              {severityInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Numbers */}
      {guidance.severity === "emergency" && (
        <div className="rounded-2xl border-2 border-severity-emergency bg-severity-emergency/5 p-5">
          <h3 className="flex items-center gap-2 text-base font-bold text-severity-emergency">
            <Phone className="h-5 w-5" />
            Call Emergency Services NOW
          </h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <a
              href="tel:108"
              className="flex items-center gap-3 rounded-xl border border-severity-emergency/30 bg-card p-3 transition-colors hover:bg-severity-emergency/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-severity-emergency text-primary-foreground font-bold text-sm">
                108
              </div>
              <div>
                <p className="font-semibold text-foreground">108</p>
                <p className="text-xs text-muted-foreground">
                  Ambulance Services
                </p>
              </div>
            </a>
            <a
              href="tel:112"
              className="flex items-center gap-3 rounded-xl border border-severity-emergency/30 bg-card p-3 transition-colors hover:bg-severity-emergency/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-severity-emergency text-primary-foreground font-bold text-sm">
                112
              </div>
              <div>
                <p className="font-semibold text-foreground">112</p>
                <p className="text-xs text-muted-foreground">
                  National Emergency Number
                </p>
              </div>
            </a>
          </div>
          {patient.emergencyContact && (
            <div className="mt-3">
              <a
                href={`tel:${patient.emergencyContact}`}
                className="inline-flex items-center gap-2 rounded-lg bg-severity-emergency text-primary-foreground px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
              >
                <Phone className="h-4 w-4" />
                Call Emergency Contact: {patient.emergencyContact}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Patient & Injury Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <User className="h-4 w-4 text-primary" />
            Patient Summary
          </div>
          <div className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium text-foreground">
                {patient.name || "Not provided"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Age</span>
              <span className="font-medium text-foreground">
                {patient.age || "N/A"} ({patient.ageGroup})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Blood Group</span>
              <span className="font-medium text-foreground">
                {patient.bloodGroup || "Unknown"}
              </span>
            </div>
            {patient.allergies && patient.allergies.toLowerCase() !== "none" && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Allergies</span>
                <span className="font-medium text-severity-serious">
                  {patient.allergies}
                </span>
              </div>
            )}
            {patient.medicalConditions && patient.medicalConditions.toLowerCase() !== "none" && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conditions</span>
                <span className="font-medium text-foreground">
                  {patient.medicalConditions}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Stethoscope className="h-4 w-4 text-primary" />
            Injury Summary
          </div>
          <div className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium text-foreground">
                {INJURY_LABELS[injury.injuryType]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pain</span>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs capitalize",
                  symptoms.painLevel === "high"
                    ? "border-severity-emergency text-severity-emergency"
                    : symptoms.painLevel === "medium"
                    ? "border-severity-serious text-severity-serious"
                    : "border-severity-mild text-severity-mild"
                )}
              >
                {symptoms.painLevel}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bleeding</span>
              <span className="font-medium text-foreground">
                {symptoms.bleeding ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Swelling</span>
              <span className="font-medium text-foreground">
                {symptoms.swelling ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Conscious</span>
              <span
                className={cn(
                  "font-medium",
                  symptoms.conscious ? "text-severity-mild" : "text-severity-emergency"
                )}
              >
                {symptoms.conscious ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Warnings */}
      {guidance.personalWarnings.length > 0 && (
        <div className="rounded-xl border border-severity-serious/30 bg-severity-serious/5 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-severity-serious">
            <AlertTriangle className="h-4 w-4" />
            Important Patient-Specific Warnings
          </h3>
          <ul className="mt-2 space-y-1.5">
            {guidance.personalWarnings.map((warning, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-severity-serious" />
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* First Aid Image with Animated Icon */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0">
            <AnimatedInjuryIcon
              type={injury.injuryType}
              active
              className="h-12 w-12"
            />
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <ImageIcon className="h-4 w-4 text-primary" />
              Visual Guide - {INJURY_LABELS[injury.injuryType]}
            </h3>
            <p className="text-xs text-muted-foreground">
              Follow the illustrated steps below
            </p>
          </div>
        </div>
        <div className="mt-3 overflow-hidden rounded-lg border border-border">
          <Image
            src={`/images/first-aid-${guidance.imageKey}.jpg`}
            alt={guidance.imageCaption}
            width={600}
            height={300}
            className="w-full object-cover"
          />
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground italic">
          {guidance.imageCaption}
        </p>
      </div>

      {/* First 5 Minutes */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
          <Clock className="h-5 w-5 text-severity-emergency" />
          First 5 Minutes - Immediate Actions
        </h3>
        <ol className="mt-3 space-y-2">
          {guidance.first5Minutes.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-foreground leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* After 30 Minutes */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
          <Timer className="h-5 w-5 text-primary" />
          After 30 Minutes
        </h3>
        <ol className="mt-3 space-y-2">
          {guidance.after30Minutes.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-foreground leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <Separator />

      {/* Do's and Don'ts */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-severity-mild/30 bg-severity-mild/5 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-severity-mild">
            <ThumbsUp className="h-4 w-4" />
            {"Do's"}
          </h3>
          <ul className="mt-2 space-y-1.5">
            {guidance.dos.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-severity-mild" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-severity-emergency/30 bg-severity-emergency/5 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-severity-emergency">
            <ThumbsDown className="h-4 w-4" />
            {"Don'ts"}
          </h3>
          <ul className="mt-2 space-y-1.5">
            {guidance.donts.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-severity-emergency" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nearby Hospitals */}
      {hospitals.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
            <Building2 className="h-5 w-5 text-primary" />
            Nearby Hospitals - {location.city}
          </h3>
          <div className="mt-3 space-y-2">
            {hospitals.map((hospital, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border p-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {hospital.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {hospital.address}
                  </p>
                  <a
                    href={`tel:${hospital.phone}`}
                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    <Phone className="h-3 w-3" />
                    {hospital.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Help for serious/emergency */}
      {(guidance.severity === "serious" || guidance.severity === "emergency") && (
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Phone className="h-4 w-4 text-primary" />
            Emergency Contact Numbers (India)
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg bg-muted p-2.5 text-center">
              <p className="text-lg font-bold text-foreground">108</p>
              <p className="text-xs text-muted-foreground">Ambulance</p>
            </div>
            <div className="rounded-lg bg-muted p-2.5 text-center">
              <p className="text-lg font-bold text-foreground">112</p>
              <p className="text-xs text-muted-foreground">National Emergency</p>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="rounded-xl border border-border bg-muted/50 p-4">
        <p className="text-center text-xs text-muted-foreground leading-relaxed">
          <strong>Safety Disclaimer:</strong> This application provides first aid
          guidance only and does not replace professional medical care. Always consult
          a qualified healthcare professional for proper diagnosis and treatment.
        </p>
      </div>

      {/* Restart Button */}
      <div className="flex justify-center pb-4">
        <Button
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Start New Assessment
        </Button>
      </div>
    </div>
  )
}
