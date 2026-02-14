export type Language = "en" | "hi"

export interface Translations {
  // Common
  common: {
    language: string
    english: string
    hindi: string
    next: string
    back: string
    submit: string
    cancel: string
    close: string
    loading: string
    error: string
    of: string
  }

  // Main
  main: {
    title: string
    subtitle: string
    description: string
    startButton: string
  }

  // Steps
  steps: {
    patientProfile: string
    injurySelection: string
    symptomsInput: string
    locationSelect: string
  }

  // Patient Profile Step
  patientProfile: {
    title: string
    subtitle: string
    ageLabel: string
    agePlaceholder: string
    ageError: string
    conditionsLabel: string
    selectConditions: string
    diabetes: string
    asthma: string
    bloodPressure: string
    allergies: string
    allergiesPlaceholder: string
  }

  // Injury Selection Step
  injurySelection: {
    title: string
    subtitle: string
    selectInjury: string
    cutWound: string
    burn: string
    fracturSprain: string
    animalBite: string
    fever: string
    foodPoisoning: string
    nosebleeding: string
  }

  // Symptoms Input Step
  symptomsInput: {
    title: string
    subtitle: string
    painLevelLabel: string
    noPain: string
    mildPain: string
    moderatePain: string
    severePain: string
    extremePain: string
    noPainDesc: string
    mildPainDesc: string
    moderatePainDesc: string
    severePainDesc: string
    extremePainDesc: string
    bleeding: string
    activeBloodLoss: string
    swelling: string
    visibleSwelling: string
    conscious: string
    alertAware: string
  }

  // Location Select Step
  locationSelect: {
    title: string
    subtitle: string
    selectCity: string
    cityPlaceholder: string
    findNearby: string
  }

  // Results Page
  results: {
    title: string
    severity: string
    immediateAction: string
    inNext5Min: string
    after30Min: string
    dos: string
    donts: string
    nearbyHospitals: string
    emergencyNumbers: string
    distance: string
    phone: string
    address: string
    disclaimer: string
    newAssessment: string
    visualGuide: string
    followIllustrated: string
  }

  // Chat Assistant
  chat: {
    title: string
    placeholder: string
    send: string
    noMessages: string
    assistantGreeting: string
    errorMessage: string
    thinking: string
  }

  // Emergency Numbers
  emergency: {
    ambulance: string
    police: string
    fireService: string
  }

  // Severity Levels
  severity: {
    mild: string
    serious: string
    emergency: string
  }
}

const EN: Translations = {
  common: {
    language: "Language",
    english: "English",
    hindi: "हिंदी",
    next: "Next",
    back: "Back",
    submit: "Submit",
    cancel: "Cancel",
    close: "Close",
    loading: "Loading...",
    error: "Error",
    of: "of",
  },

  main: {
    title: "Smart First Aid Recommendation System",
    subtitle: "Smart Emergency Assistance",
    description: "Step-by-step guidance for medical emergencies",
    startButton: "Start Assessment",
  },

  steps: {
    patientProfile: "Patient Profile",
    injurySelection: "Injury Selection",
    symptomsInput: "Symptoms",
    locationSelect: "Location",
  },

  patientProfile: {
    title: "Patient Information",
    subtitle: "Help us provide accurate guidance",
    ageLabel: "Age",
    agePlaceholder: "Enter age in years",
    ageError: "Please enter a valid age",
    conditionsLabel: "Medical Conditions",
    selectConditions: "Select any that apply",
    diabetes: "Diabetes",
    asthma: "Asthma",
    bloodPressure: "High Blood Pressure",
    allergies: "Drug Allergies",
    allergiesPlaceholder: "List any allergies...",
  },

  injurySelection: {
    title: "What's the injury?",
    subtitle: "Select the type of injury or medical condition",
    selectInjury: "Select an injury",
    cutWound: "Cut/Wound",
    burn: "Burn",
    fracturSprain: "Fracture/Sprain",
    animalBite: "Animal Bite",
    fever: "Fever",
    foodPoisoning: "Food Poisoning",
    nosebleeding: "Nosebleeding",
  },

  symptomsInput: {
    title: "Current Symptoms",
    subtitle: "Describe what you're experiencing",
    painLevelLabel: "Pain Level",
    noPain: "None",
    mildPain: "Mild",
    moderatePain: "Moderate",
    severePain: "Severe",
    extremePain: "Extreme",
    noPainDesc: "No pain",
    mildPainDesc: "Slight discomfort",
    moderatePainDesc: "Noticeable pain",
    severePainDesc: "Intense pain",
    extremePainDesc: "Unbearable pain",
    bleeding: "Bleeding",
    activeBloodLoss: "Active blood loss",
    swelling: "Swelling",
    visibleSwelling: "Visible swelling",
    conscious: "Conscious",
    alertAware: "Alert and aware",
  },

  locationSelect: {
    title: "Your Location",
    subtitle: "Find nearby hospitals and emergency services",
    selectCity: "Select your city",
    cityPlaceholder: "Choose a city...",
    findNearby: "Find Nearby Hospitals",
  },

  results: {
    title: "First Aid Guidance",
    severity: "Severity Level",
    immediateAction: "Immediate Action",
    inNext5Min: "Within Next 5 Minutes",
    after30Min: "After 30 Minutes",
    dos: "Do's",
    donts: "Don'ts",
    nearbyHospitals: "Nearby Hospitals",
    emergencyNumbers: "Emergency Numbers",
    distance: "Distance",
    phone: "Phone",
    address: "Address",
    disclaimer:
      "This guidance is for educational purposes only. Always consult with medical professionals for serious injuries.",
    newAssessment: "New Assessment",
    visualGuide: "Visual Guide",
    followIllustrated: "Follow the illustrated steps below",
  },

  chat: {
    title: "First Aid Assistant",
    placeholder: "Ask me any questions about first aid...",
    send: "Send",
    noMessages: "No messages yet. Ask me anything!",
    assistantGreeting:
      "Hello! I'm your First Aid Assistant. I can help answer questions about emergency care, first aid techniques, and more. What would you like to know?",
    errorMessage: "Unable to get response. Please try again.",
    thinking: "Thinking...",
  },

  emergency: {
    ambulance: "Ambulance",
    police: "Police",
    fireService: "Fire Service",
  },

  severity: {
    mild: "Mild",
    serious: "Serious",
    emergency: "Emergency",
  },
}

const HI: Translations = {
  common: {
    language: "भाषा",
    english: "English",
    hindi: "हिंदी",
    next: "अगला",
    back: "पिछला",
    submit: "जमा करें",
    cancel: "रद्द करें",
    close: "बंद करें",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    of: "का",
  },

  main: {
    title: "स्मार्ट प्राथमिक चिकित्सा सिफारिश प्रणाली",
    subtitle: "स्मार्ट आपातकालीन सहायता",
    description: "चिकित्सा आपातकाल के लिए चरण-दर-चरण मार्गदर्शन",
    startButton: "मूल्यांकन शुरू करें",
  },

  steps: {
    patientProfile: "रोगी प्रोफाइल",
    injurySelection: "चोट का चयन",
    symptomsInput: "लक���षण",
    locationSelect: "स्थान",
  },

  patientProfile: {
    title: "रोगी की जानकारी",
    subtitle: "हमें सटीक मार्गदर्शन प्रदान करने में मदद करें",
    ageLabel: "आयु",
    agePlaceholder: "वर्षों में आयु दर्ज करें",
    ageError: "कृपया एक वैध आयु दर्ज करें",
    conditionsLabel: "चिकित्सा स्थितियां",
    selectConditions: "जो लागू हो उसे चुनें",
    diabetes: "मधुमेह",
    asthma: "अस्थमा",
    bloodPressure: "उच्च रक्तचाप",
    allergies: "दवा एलर्जी",
    allergiesPlaceholder: "कोई भी एलर्जी सूचीबद्ध करें...",
  },

  injurySelection: {
    title: "चोट क्या है?",
    subtitle: "चोट या चिकित्सा स्थिति का प्रकार चुनें",
    selectInjury: "चोट चुनें",
    cutWound: "कट/घाव",
    burn: "जलना",
    fracturSprain: "फ्रैक्चर/मोच",
    animalBite: "जानवर का काटा",
    fever: "बुखार",
    foodPoisoning: "खाद्य विषाक्तता",
    nosebleeding: "नाक से खून आना",
  },

  symptomsInput: {
    title: "वर्तमान लक्षण",
    subtitle: "वर्णन करें कि आप क्या अनुभव कर रहे हैं",
    painLevelLabel: "दर्द का स्तर",
    noPain: "कोई नहीं",
    mildPain: "हल्का",
    moderatePain: "मध्यम",
    severePain: "गंभीर",
    extremePain: "अत्यंत",
    noPainDesc: "कोई दर्द नहीं",
    mildPainDesc: "हल्की असुविधा",
    moderatePainDesc: "ध्यान देने योग्य दर्द",
    severePainDesc: "तीव्र दर्द",
    extremePainDesc: "असहनीय दर्द",
    bleeding: "खून बहना",
    activeBloodLoss: "सक्रिय रक्त हानि",
    swelling: "सूजन",
    visibleSwelling: "दृश्यमान सूजन",
    conscious: "होश में",
    alertAware: "सतर्क और जागरूक",
  },

  locationSelect: {
    title: "आपका स्थान",
    subtitle: "पास के अस्पतालों और आपातकालीन सेवाओं को खोजें",
    selectCity: "अपना शहर चुनें",
    cityPlaceholder: "एक शहर चुनें...",
    findNearby: "पास के अस्पताल खोजें",
  },

  results: {
    title: "प्राथमिक चिकित्सा मार्गदर्शन",
    severity: "गंभीरता का स्तर",
    immediateAction: "तत्काल कार्रवाई",
    inNext5Min: "अगले 5 मिनट में",
    after30Min: "30 मिनट के बाद",
    dos: "करें",
    donts: "न करें",
    nearbyHospitals: "पास के अस्पताल",
    emergencyNumbers: "आपातकालीन नंबर",
    distance: "दूरी",
    phone: "फोन",
    address: "पता",
    disclaimer:
      "यह मार्गदर्शन केवल शैक्षिक उद्देश्यों के लिए है। गंभीर चोटों के लिए हमेशा चिकित्सा पेशेवरों से परामर्श लें।",
    newAssessment: "नया मूल्यांकन",
    visualGuide: "दृश्य मार्गदर्शन",
    followIllustrated: "नीचे दिए गए चित्रित चरणों का पालन करें",
  },

  chat: {
    title: "प्राथमिक चिकित्सा सहायक",
    placeholder: "प्राथमिक चिकित्सा के बारे में मुझसे कोई भी सवाल पूछें...",
    send: "भेजें",
    noMessages: "अभी तक कोई संदेश नहीं। मुझसे कुछ पूछें!",
    assistantGreeting:
      "नमस्ते! मैं आपका प्राथमिक चिकित्सा सहायक हूं। मैं आपातकालीन देखभाल, प्राथमिक चिकित्सा तकनीकों और बहुत कुछ के बारे में प्रश्नों का उत्तर देने में मदद कर सकता हूं। आप क्या जानना चाहते हैं?",
    errorMessage: "प्रतिक्रिया प्राप्त करने में असमर्थ। कृपया फिर से प्रयास करें।",
    thinking: "सोच रहा है...",
  },

  emergency: {
    ambulance: "एम्बुलेंस",
    police: "पुलिस",
    fireService: "अग्निशमन सेवा",
  },

  severity: {
    mild: "हल्का",
    serious: "गंभीर",
    emergency: "आपातकाल",
  },
}

export const translations: Record<Language, Translations> = {
  en: EN,
  hi: HI,
}

export const getTranslation = (
  language: Language,
  path: string,
  defaultValue = ""
) => {
  const keys = path.split(".")
  let value: any = translations[language]

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key]
    } else {
      return defaultValue
    }
  }

  return typeof value === "string" ? value : defaultValue
}
