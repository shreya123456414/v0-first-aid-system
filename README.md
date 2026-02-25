# Smart First Aid Recommendation System

A Python-based offline-capable first aid decision support system designed for rural India with multi-language support (English/Hindi), AI-powered chat assistance, and rule-based risk scoring.

## Features

- **Offline-First Design**: Works completely offline with local data storage
- **Multi-Language Support**: English and Hindi interface
- **Rule-Based Decision Engine**: Risk scoring from 0-10 with severity classification
- **User Profiles**: Store patient information including age, blood group, allergies, and medical conditions
- **Emergency Mode**: Quick access for emergency situations
- **AI Chat Assistant**: Powered by Google Gemini API for first aid questions
- **Local Storage**: All user data stored locally in JSON format
- **Responsive UI**: Built with Streamlit for easy mobile access
- **Comprehensive Guidance**: Step-by-step first aid instructions with visual indicators
- **Offline Hospital Database**: Pre-loaded with hospitals across major Indian cities

## Installation

### Prerequisites
- Python 3.8+
- pip package manager

### Setup

1. **Clone or download the project**
```bash
cd smart-first-aid-system
```

2. **Create a virtual environment (optional but recommended)**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set environment variables** (optional for AI features)
```bash
export GEMINI_API_KEY="your-api-key-here"
```

5. **Run the application**
```bash
streamlit run app.py
```

The app will open in your browser at `http://localhost:8501`

## Usage

### Home Screen
- Select language (English/हिंदी)
- Navigate to different sections:
  - **Start First Aid**: Begin assessment for an injury
  - **Profile**: Manage user information
  - **First Aid Tips**: Access educational content
  - **Nearby Hospitals**: Find hospitals in your area

### Assessment Flow

1. **Injury Selection**: Choose from:
   - Physical Injuries: Cuts, burns, fractures, bites, nosebleeds
   - Emergency Conditions: Choking, chest pain, fainting
   - Health Issues: Fever, food poisoning, heat stroke, allergies

2. **Symptoms Input**: Report:
   - Pain level (Low/Medium/High)
   - Bleeding status
   - Swelling
   - Consciousness level

3. **Location Selection**: Choose your city for nearby hospital information

4. **Guidance Page**: Receive:
   - Risk score (0-10)
   - Severity classification (Mild/Serious/Emergency)
   - Required materials
   - Immediate actions
   - First 5 minutes instructions
   - After 30 minutes guidance
   - Do's and Don'ts
   - When to see a doctor
   - Nearby hospitals

### Emergency Mode
- Click "🚨 Emergency Mode" in sidebar
- Skip login and get immediate guidance
- Direct access to emergency numbers

### AI Assistant
- Click "💬" button to open AI chat
- Ask questions about first aid in your selected language
- Get personalized guidance from Gemini AI

## File Structure

```
smart-first-aid-system/
├── app.py                  # Main Streamlit application
├── translations.py         # Multi-language translation system
├── decision_engine.py      # Rule-based decision engine & risk scoring
├── requirements.txt        # Python dependencies
├── user_profile.json      # Local user data storage (auto-created)
└── README.md              # This file
```

## Technical Details

### Decision Engine
The risk scoring algorithm considers:
- Base risk of injury type (0-5)
- Pain level (+0, +1, or +3)
- Bleeding (+3)
- Swelling (+2)
- Unconsciousness (+5)
- Age factors (children/elderly +1)
- Medical conditions (+2 each)
- Emergency injury type (+4)

Severity Classification:
- 🟢 **Mild**: 0-3 points
- 🟡 **Serious**: 4-6 points
- 🔴 **Emergency**: 7-10 points

### Data Storage
All user data is stored locally in `user_profile.json`:
```json
{
  "name": "John Doe",
  "age": 30,
  "blood_group": "O+",
  "allergies": "Penicillin",
  "medical_conditions": ["Diabetes", "Asthma"],
  "emergency_contact": "9876543210"
}
```

### Supported Injuries

**Physical Injuries**
- Cut/Wound
- Burn
- Fracture/Sprain
- Animal Bite
- Snake Bite/Insect Sting
- Nose Bleeding

**Emergency Conditions**
- Choking
- Chest Pain
- Fainting/Unconsciousness

**Health Issues**
- Fever
- Food Poisoning
- Heat Stroke/Dehydration
- Allergic Reaction

## Emergency Numbers
- **Ambulance**: 108
- **Police/Emergency**: 112

## Important Disclaimers

⚠️ **This system is designed for guidance purposes only and does NOT replace professional medical care.**

- Always call 108 for serious injuries or life-threatening situations
- Seek immediate medical attention for emergency conditions
- This app cannot diagnose diseases or prescribe medicines
- Use this system as a supplement to medical knowledge, not a replacement

## Supported Languages
- 🇬🇧 English
- 🇮🇳 हिंदी (Hindi)

## Browser Compatibility
- Chrome/Chromium
- Firefox
- Safari
- Edge
- Mobile browsers

## Future Enhancements
- Integration with actual hospital APIs
- Real-time symptom tracking
- Offline image guidance with animations
- SMS emergency alerts
- Voice input support for accessibility
- Prescription assistance

## License
This project is open-source for educational and emergency use.

## Support
For issues or feature requests, please contact the development team.

---

**Stay Safe. Get Help. Save Lives.** 🏥❤️
