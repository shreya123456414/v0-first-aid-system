import type {
  PatientProfile,
  InjuryData,
  SymptomData,
  SeverityLevel,
  FirstAidGuidance,
} from "./first-aid-types"

function classifySeverity(
  injury: InjuryData,
  symptoms: SymptomData,
  patient: PatientProfile
): SeverityLevel {
  // Emergency conditions
  if (!symptoms.conscious) return "emergency"
  if (
    symptoms.painLevel === "high" &&
    symptoms.bleeding &&
    (injury.injuryType === "cut_wound" || injury.injuryType === "animal_bite")
  )
    return "emergency"
  if (injury.injuryType === "fracture_sprain" && symptoms.painLevel === "high" && symptoms.swelling)
    return "emergency"
  if (
    injury.injuryType === "burn" &&
    symptoms.painLevel === "high" &&
    symptoms.swelling
  )
    return "emergency"

  // Age-based escalation
  const age = parseInt(patient.age)
  if ((age < 5 || age > 70) && symptoms.painLevel === "medium") return "serious"
  if ((age < 5 || age > 70) && symptoms.painLevel === "high") return "emergency"

  // Serious conditions
  if (symptoms.painLevel === "high") return "serious"
  if (symptoms.bleeding && symptoms.swelling) return "serious"
  if (injury.injuryType === "animal_bite") return "serious"
  if (
    injury.injuryType === "food_poisoning" &&
    (symptoms.painLevel === "medium" || symptoms.painLevel === "high")
  )
    return "serious"
  if (
    injury.injuryType === "fever" &&
    symptoms.painLevel === "medium" &&
    patient.medicalConditions.toLowerCase().includes("diabetes")
  )
    return "serious"

  // Medium pain is borderline
  if (symptoms.painLevel === "medium") return "serious"

  return "mild"
}

function getPersonalWarnings(patient: PatientProfile): string[] {
  const warnings: string[] = []
  const conditions = patient.medicalConditions.toLowerCase()
  const allergies = patient.allergies.toLowerCase()

  if (conditions.includes("diabetes")) {
    warnings.push(
      "Patient has diabetes. Monitor blood sugar levels closely. Wound healing may be slower."
    )
  }
  if (conditions.includes("asthma")) {
    warnings.push(
      "Patient has asthma. Avoid exposure to dust, smoke, or strong odors. Keep inhaler nearby."
    )
  }
  if (conditions.includes("bp") || conditions.includes("blood pressure") || conditions.includes("hypertension")) {
    warnings.push(
      "Patient has blood pressure issues. Avoid sudden movements. Keep the patient calm and seated."
    )
  }
  if (conditions.includes("heart") || conditions.includes("cardiac")) {
    warnings.push(
      "Patient has heart condition. Avoid physical exertion. Monitor breathing and heart rate."
    )
  }
  if (allergies && allergies !== "none" && allergies !== "na" && allergies !== "n/a") {
    warnings.push(
      `Patient has known allergies: ${patient.allergies}. Avoid any contact with allergens during treatment.`
    )
  }
  if (patient.ageGroup === "child") {
    warnings.push(
      "Patient is a child. Use gentle care and reassuring words. Adjust dosage if any medication is needed."
    )
  }
  if (patient.ageGroup === "elderly") {
    warnings.push(
      "Patient is elderly. Skin may be fragile. Move carefully and check for underlying conditions."
    )
  }

  return warnings
}

const GUIDANCE_DATABASE: Record<
  string,
  Omit<FirstAidGuidance, "severity" | "personalWarnings">
> = {
  cut_wound: {
    first5Minutes: [
      "Apply firm pressure to the wound using a clean cloth or bandage.",
      "Elevate the injured area above the level of the heart if possible.",
      "Do not remove the cloth if blood soaks through; add another layer.",
      "Wash your hands before touching the wound area.",
      "If bleeding is severe, apply continuous pressure and call for help.",
    ],
    after30Minutes: [
      "Once bleeding stops, gently clean the wound with clean water.",
      "Apply an antiseptic solution around (not inside) the wound.",
      "Cover with a sterile bandage or clean cloth.",
      "Check for signs of infection: redness, warmth, or pus.",
      "Change the bandage every few hours or when it gets wet/dirty.",
    ],
    dos: [
      "Keep the wound clean and dry",
      "Change bandages regularly",
      "Watch for infection signs (redness, swelling, warmth)",
      "Keep the injured area elevated when resting",
      "Seek medical help if bleeding does not stop in 10 minutes",
    ],
    donts: [
      "Do not apply turmeric, mud, or other home remedies directly on the wound",
      "Do not remove a bandage that is stuck to the wound",
      "Do not touch the wound with dirty hands",
      "Do not ignore signs of infection",
      "Do not use very tight bandages that cut off circulation",
    ],
    imageKey: "cut_wound",
    imageCaption: "Apply firm pressure with a clean cloth to stop bleeding, then clean and bandage the wound.",
  },
  burn: {
    first5Minutes: [
      "Immediately hold the burned area under cool (not cold) running water for at least 10 minutes.",
      "Remove any jewelry, belts, or tight clothing near the burn before swelling starts.",
      "Do not apply ice, butter, toothpaste, or any cream on the burn.",
      "Cover the burn loosely with a clean, non-fluffy cloth or cling wrap.",
      "If the burn is larger than the palm, seek medical help immediately.",
    ],
    after30Minutes: [
      "Continue to keep the area cool with a damp, clean cloth.",
      "Do not break any blisters that may form.",
      "Take an over-the-counter pain reliever if needed.",
      "Keep the burned area elevated to reduce swelling.",
      "Apply aloe vera gel only after the burn has cooled down completely.",
    ],
    dos: [
      "Cool the burn with running water for 10-20 minutes",
      "Cover with a clean, loose bandage",
      "Drink plenty of water to stay hydrated",
      "Take a pain reliever if needed",
      "Seek medical help for large or deep burns",
    ],
    donts: [
      "Do not apply ice directly on the burn",
      "Do not use butter, toothpaste, or home remedies",
      "Do not break blisters",
      "Do not remove clothing stuck to the burn",
      "Do not wrap the burn too tightly",
    ],
    imageKey: "burn",
    imageCaption: "Cool the burn under running water for at least 10 minutes. Do not apply ice or creams.",
  },
  fracture_sprain: {
    first5Minutes: [
      "Do not move the injured limb. Keep it still and supported.",
      "Apply a cold pack or ice wrapped in a cloth to reduce swelling.",
      "If a bone is visibly out of place, do not try to push it back.",
      "Create a makeshift splint using a flat stick and cloth to immobilize the area.",
      "Keep the person calm and still. Do not let them walk on an injured leg.",
    ],
    after30Minutes: [
      "Continue applying ice for 15-20 minutes at a time.",
      "Elevate the injured area to reduce swelling.",
      "Check circulation below the injury (skin color, warmth, feeling).",
      "Keep the splint in place until medical help arrives.",
      "Give water to the patient but avoid food in case surgery is needed.",
    ],
    dos: [
      "Immobilize the injured area with a splint",
      "Apply ice wrapped in cloth to reduce swelling",
      "Elevate the injured limb",
      "Seek medical help as soon as possible",
      "Keep the patient comfortable and calm",
    ],
    donts: [
      "Do not try to straighten a broken bone",
      "Do not apply heat to the injury",
      "Do not let the person walk on an injured leg",
      "Do not massage the injured area",
      "Do not give aspirin to children",
    ],
    imageKey: "fracture_sprain",
    imageCaption: "Immobilize the injured area with a splint. Apply ice wrapped in cloth and elevate the limb.",
  },
  animal_bite: {
    first5Minutes: [
      "Wash the wound thoroughly with soap and running water for at least 5 minutes.",
      "Apply firm pressure with a clean cloth if there is bleeding.",
      "Do not suck the wound or apply mouth to it.",
      "Apply an antiseptic solution after washing.",
      "Note the type of animal, its behavior, and if it was a stray.",
    ],
    after30Minutes: [
      "Cover the wound with a clean bandage.",
      "Go to the nearest hospital for a rabies vaccination immediately.",
      "Watch for signs of infection: increased redness, swelling, or fever.",
      "Keep the wound elevated if possible.",
      "Report the animal bite to local authorities.",
    ],
    dos: [
      "Wash the wound thoroughly with soap and water",
      "Get a tetanus shot if not vaccinated in last 5 years",
      "Seek anti-rabies vaccination immediately",
      "Keep the wound clean and covered",
      "Note details about the animal for doctors",
    ],
    donts: [
      "Do not apply turmeric or other home remedies on the bite",
      "Do not delay seeking medical help",
      "Do not try to capture the animal",
      "Do not suck the wound",
      "Do not ignore even small bite wounds",
    ],
    imageKey: "animal_bite",
    imageCaption: "Wash the bite wound thoroughly with soap and water for 5 minutes, then seek medical help for rabies vaccination.",
  },
  fever: {
    first5Minutes: [
      "Have the person lie down in a comfortable, well-ventilated area.",
      "Place a cool, damp cloth on the forehead.",
      "Remove excess clothing to help the body cool down.",
      "Give small sips of water or oral rehydration solution (ORS).",
      "Check temperature with a thermometer if available.",
    ],
    after30Minutes: [
      "Give an age-appropriate dose of paracetamol if temperature is above 100.4F (38C).",
      "Continue giving fluids regularly.",
      "Sponge the body with lukewarm (not cold) water if fever is very high.",
      "Monitor temperature every 30 minutes.",
      "Watch for danger signs: seizures, difficulty breathing, or rash.",
    ],
    dos: [
      "Keep the person hydrated with water and ORS",
      "Rest in a cool, ventilated room",
      "Take paracetamol for high fever",
      "Monitor temperature regularly",
      "Seek medical help if fever lasts more than 3 days",
    ],
    donts: [
      "Do not use cold water bath or ice to reduce fever",
      "Do not give aspirin to children under 16",
      "Do not overdress the patient",
      "Do not ignore persistent high fever",
      "Do not self-medicate with antibiotics",
    ],
    imageKey: "fever",
    imageCaption: "Keep the patient hydrated, apply a cool cloth to the forehead, and monitor temperature regularly.",
  },
  food_poisoning: {
    first5Minutes: [
      "Have the person sit upright or lie on their side (not on their back).",
      "Give small sips of water or ORS to prevent dehydration.",
      "Do not try to stop vomiting; let the body expel the toxins.",
      "Note what the person ate and when symptoms started.",
      "If the person is unconscious, place them in the recovery position.",
    ],
    after30Minutes: [
      "Continue giving small, frequent sips of water or ORS.",
      "Avoid solid food until vomiting stops.",
      "Monitor for signs of severe dehydration: dry mouth, dizziness, no urination.",
      "Once vomiting stops, offer bland food like rice water or toast.",
      "Seek medical help if symptoms worsen or blood appears in vomit/stool.",
    ],
    dos: [
      "Stay hydrated with water and ORS",
      "Rest and avoid physical activity",
      "Eat bland foods once vomiting stops",
      "Wash hands frequently to prevent spread",
      "Save a sample of suspected food for testing",
    ],
    donts: [
      "Do not eat solid food while vomiting",
      "Do not take anti-diarrheal medication without doctor advice",
      "Do not consume dairy, spicy, or oily food",
      "Do not ignore blood in vomit or stool",
      "Do not take antibiotics without prescription",
    ],
    imageKey: "food_poisoning",
    imageCaption: "Keep the patient hydrated with small sips of ORS. Rest and avoid solid food until vomiting stops.",
  },
  nose_bleeding: {
    first5Minutes: [
      "Sit the person upright and lean them slightly forward.",
      "Pinch the soft part of the nose firmly for 10-15 minutes without releasing.",
      "Breathe through the mouth while the nose is pinched.",
      "Do not tilt the head backward as blood may flow into the throat.",
      "Apply a cold cloth or ice pack to the bridge of the nose.",
    ],
    after30Minutes: [
      "Release the pinch slowly and check if bleeding has stopped.",
      "If still bleeding, pinch again for another 10 minutes.",
      "Once stopped, avoid blowing the nose for several hours.",
      "Apply a thin layer of petroleum jelly inside the nostrils to keep them moist.",
      "Seek medical help if bleeding continues for more than 30 minutes.",
    ],
    dos: [
      "Sit upright and lean slightly forward",
      "Pinch the nose firmly for 10-15 minutes",
      "Breathe through the mouth",
      "Apply cold compress to the bridge of the nose",
      "Seek medical help for prolonged bleeding",
    ],
    donts: [
      "Do not tilt the head backward",
      "Do not stuff tissues or cotton deep into the nostril",
      "Do not blow the nose after bleeding stops",
      "Do not pick at the nose",
      "Do not lie down flat while nose is bleeding",
    ],
    imageKey: "nose_bleeding",
    imageCaption: "Sit upright, lean forward, and pinch the soft part of the nose firmly for 10-15 minutes.",
  },
}

export function generateGuidance(
  patient: PatientProfile,
  injury: InjuryData,
  symptoms: SymptomData
): FirstAidGuidance {
  const severity = classifySeverity(injury, symptoms, patient)
  const guidance = GUIDANCE_DATABASE[injury.injuryType]
  const personalWarnings = getPersonalWarnings(patient)

  return {
    severity,
    first5Minutes: guidance.first5Minutes,
    after30Minutes: guidance.after30Minutes,
    dos: guidance.dos,
    donts: guidance.donts,
    imageKey: guidance.imageKey,
    imageCaption: guidance.imageCaption,
    personalWarnings,
  }
}
