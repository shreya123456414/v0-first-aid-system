"use client"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { SymptomData, PainLevel } from "@/lib/first-aid-types"
import { Activity, Droplets, SwatchBook, Brain } from "lucide-react"

interface SymptomsInputStepProps {
  data: SymptomData
  onChange: (data: SymptomData) => void
}

const PAIN_LEVELS: { value: PainLevel; label: string; color: string; description: string }[] = [
  {
    value: "low",
    label: "Low",
    color: "border-severity-mild bg-severity-mild/10 text-severity-mild",
    description: "Mild discomfort, manageable",
  },
  {
    value: "medium",
    label: "Medium",
    color: "border-severity-serious bg-severity-serious/10 text-severity-serious",
    description: "Noticeable pain, limiting",
  },
  {
    value: "high",
    label: "High",
    color: "border-severity-emergency bg-severity-emergency/10 text-severity-emergency",
    description: "Severe pain, needs immediate care",
  },
]

export function SymptomsInputStep({ data, onChange }: SymptomsInputStepProps) {
  const update = (field: keyof SymptomData, value: boolean | PainLevel) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Describe Symptoms
          </h2>
          <p className="text-sm text-muted-foreground">
            Help us understand the severity of the situation
          </p>
        </div>
      </div>

      {/* Pain Level */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Pain Level</Label>
        <div className="grid grid-cols-3 gap-3">
          {PAIN_LEVELS.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => update("painLevel", level.value)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl border-2 p-4 text-center transition-all",
                data.painLevel === level.value
                  ? level.color
                  : "border-border bg-card text-foreground hover:border-primary/30"
              )}
            >
              <span className="text-lg font-bold">{level.label}</span>
              <span className="text-xs opacity-80">{level.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Symptoms */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold">Other Symptoms</Label>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <Droplets className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-foreground">Bleeding</p>
                <p className="text-xs text-muted-foreground">Active blood loss</p>
              </div>
            </div>
            <Switch
              checked={data.bleeding}
              onCheckedChange={(v) => update("bleeding", v)}
              aria-label="Toggle bleeding"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <SwatchBook className="h-5 w-5 text-severity-serious" />
              <div>
                <p className="text-sm font-medium text-foreground">Swelling</p>
                <p className="text-xs text-muted-foreground">Visible swelling</p>
              </div>
            </div>
            <Switch
              checked={data.swelling}
              onCheckedChange={(v) => update("swelling", v)}
              aria-label="Toggle swelling"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Conscious</p>
                <p className="text-xs text-muted-foreground">Alert and aware</p>
              </div>
            </div>
            <Switch
              checked={data.conscious}
              onCheckedChange={(v) => update("conscious", v)}
              aria-label="Toggle consciousness"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
