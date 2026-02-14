"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { LocationData } from "@/lib/first-aid-types"
import { CITIES, HOSPITALS } from "@/lib/hospitals-data"
import { MapPin, Building2, Phone, WifiOff } from "lucide-react"

interface LocationSelectStepProps {
  data: LocationData
  onChange: (data: LocationData) => void
}

export function LocationSelectStep({
  data,
  onChange,
}: LocationSelectStepProps) {
  const hospitals = data.city ? HOSPITALS[data.city] || [] : []

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Your Location
          </h2>
          <p className="text-sm text-muted-foreground">
            Select your city to find nearby hospitals
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-accent/50 p-3 flex items-start gap-2">
        <WifiOff className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          This app works offline. Hospital data is pre-stored and does not require
          an internet connection or GPS tracking.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Select City or Area</Label>
        <Select
          value={data.city}
          onValueChange={(v) => onChange({ city: v })}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Choose your city..." />
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hospitals.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Nearby Hospitals</Label>
          <div className="space-y-3">
            {hospitals.map((hospital, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">
                      {hospital.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {hospital.address}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-primary">
                      <Phone className="h-3 w-3" />
                      <span className="font-medium">{hospital.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
