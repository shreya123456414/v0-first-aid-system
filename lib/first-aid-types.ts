export type AgeGroup = "child" | "adult" | "elderly"

export type InjuryType =
  | "cut_wound"
  | "burn"
  | "fracture_sprain"
  | "animal_bite"
  | "fever"
  | "food_poisoning"
  | "nose_bleeding"

export type PainLevel = "low" | "medium" | "high"

export type SeverityLevel = "mild" | "serious" | "emergency"

export interface PatientProfile {
  name: string
  age: string
  ageGroup: AgeGroup
  bloodGroup: string
  allergies: string
  medicalConditions: string
  emergencyContact: string
}

export interface InjuryData {
  injuryType: InjuryType
}

export interface SymptomData {
  painLevel: PainLevel
  bleeding: boolean
  swelling: boolean
  conscious: boolean
}

export interface LocationData {
  city: string
}

export interface FirstAidGuidance {
  severity: SeverityLevel
  first5Minutes: string[]
  after30Minutes: string[]
  dos: string[]
  donts: string[]
  imageKey: string
  imageCaption: string
  personalWarnings: string[]
}

export interface Hospital {
  name: string
  address: string
  phone: string
}

export const INJURY_LABELS: Record<InjuryType, string> = {
  cut_wound: "Cut / Wound",
  burn: "Burn",
  fracture_sprain: "Fracture / Sprain",
  animal_bite: "Animal Bite",
  fever: "Fever",
  food_poisoning: "Food Poisoning",
  nose_bleeding: "Nose Bleeding",
}

export const INJURY_ICONS: Record<InjuryType, string> = {
  cut_wound: "Scissors",
  burn: "Flame",
  fracture_sprain: "Bone",
  animal_bite: "Bug",
  fever: "Thermometer",
  food_poisoning: "Apple",
  nose_bleeding: "Droplets",
}

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Unknown",
]
