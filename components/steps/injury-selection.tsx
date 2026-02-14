"use client"

import { cn } from "@/lib/utils"
import type { InjuryType, InjuryData } from "@/lib/first-aid-types"
import { INJURY_LABELS } from "@/lib/first-aid-types"
import {
  Scissors,
  Flame,
  Bone,
  Bug,
  Thermometer,
  Apple,
  Droplets,
  Stethoscope,
} from "lucide-react"

const INJURY_ICON_MAP: Record<InjuryType, React.ReactNode> = {
  cut_wound: <Scissors className="h-6 w-6" />,
  burn: <Flame className="h-6 w-6" />,
  fracture_sprain: <Bone className="h-6 w-6" />,
  animal_bite: <Bug className="h-6 w-6" />,
  fever: <Thermometer className="h-6 w-6" />,
  food_poisoning: <Apple className="h-6 w-6" />,
  nose_bleeding: <Droplets className="h-6 w-6" />,
}

const INJURY_DESCRIPTIONS: Record<InjuryType, string> = {
  cut_wound: "Cuts, scrapes, lacerations, or open wounds",
  burn: "Heat burns, chemical burns, or sunburns",
  fracture_sprain: "Broken bones, sprains, or dislocations",
  animal_bite: "Dog bite, snake bite, or insect stings",
  fever: "High temperature, chills, or body ache",
  food_poisoning: "Vomiting, diarrhea, or stomach pain after eating",
  nose_bleeding: "Bleeding from one or both nostrils",
}

interface InjurySelectionStepProps {
  data: InjuryData
  onChange: (data: InjuryData) => void
}

export function InjurySelectionStep({
  data,
  onChange,
}: InjurySelectionStepProps) {
  const injuries = Object.keys(INJURY_LABELS) as InjuryType[]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Stethoscope className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Select Injury Type
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose the type of injury or health problem
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {injuries.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange({ injuryType: type })}
            className={cn(
              "flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all hover:shadow-md",
              data.injuryType === type
                ? "border-primary bg-accent shadow-md"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                data.injuryType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {INJURY_ICON_MAP[type]}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-foreground">
                {INJURY_LABELS[type]}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                {INJURY_DESCRIPTIONS[type]}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
