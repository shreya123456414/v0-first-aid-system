"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { PatientProfile as PatientProfileType } from "@/lib/first-aid-types"
import { BLOOD_GROUPS } from "@/lib/first-aid-types"
import { User, Phone, Heart } from "lucide-react"

interface PatientProfileStepProps {
  data: PatientProfileType
  onChange: (data: PatientProfileType) => void
}

export function PatientProfileStep({ data, onChange }: PatientProfileStepProps) {
  const update = (field: keyof PatientProfileType, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Patient Profile
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter the patient&apos;s basic information
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter patient name"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter age"
            min="0"
            max="120"
            value={data.age}
            onChange={(e) => update("age", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Age Group</Label>
          <RadioGroup
            value={data.ageGroup}
            onValueChange={(v) => update("ageGroup", v)}
            className="flex flex-wrap gap-4"
          >
            {[
              { value: "child", label: "Child (0-12)" },
              { value: "adult", label: "Adult (13-59)" },
              { value: "elderly", label: "Elderly (60+)" },
            ].map((opt) => (
              <label
                key={opt.value}
                htmlFor={`age-group-${opt.value}`}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-2.5 transition-colors hover:bg-accent has-[data-state=checked]:border-primary has-[data-state=checked]:bg-accent"
              >
                <RadioGroupItem value={opt.value} id={`age-group-${opt.value}`} />
                <span className="text-sm font-medium">{opt.label}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Blood Group</Label>
          <Select
            value={data.bloodGroup}
            onValueChange={(v) => update("bloodGroup", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {BLOOD_GROUPS.map((bg) => (
                <SelectItem key={bg} value={bg}>
                  {bg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergency-contact" className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            Emergency Contact
          </Label>
          <Input
            id="emergency-contact"
            type="tel"
            placeholder="Phone number"
            value={data.emergencyContact}
            onChange={(e) => update("emergencyContact", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="allergies" className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5" />
            Known Allergies
          </Label>
          <Input
            id="allergies"
            placeholder="e.g., Penicillin, Peanuts (or None)"
            value={data.allergies}
            onChange={(e) => update("allergies", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="conditions">Existing Medical Conditions</Label>
          <Textarea
            id="conditions"
            placeholder="e.g., Diabetes, Asthma, High BP (or None)"
            value={data.medicalConditions}
            onChange={(e) => update("medicalConditions", e.target.value)}
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
