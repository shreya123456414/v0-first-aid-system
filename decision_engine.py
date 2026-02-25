# Rule-based First Aid Decision Engine with Risk Scoring

class FirstAidDecisionEngine:
    """Rule-based decision engine for first aid recommendations"""
    
    INJURY_DATA = {
        "cut_wound": {
            "name": "Cut/Wound",
            "category": "physical",
            "base_risk": 2,
            "materials": ["Clean cloth/Gauze", "Clean water", "Antiseptic", "Bandage", "Tape"],
            "immediate_actions": "Apply pressure with clean cloth to stop bleeding. Elevate if possible.",
            "first_5_mins": "Keep applying pressure. Do not remove initial cloth. Apply tourniquet if severe bleeding.",
            "after_30_mins": "Clean wound gently with clean water. Apply antiseptic. Cover with bandage.",
            "dos": ["Apply pressure immediately", "Elevate the wound", "Keep wound clean", "Change bandages regularly"],
            "donts": ["Do not remove cloth abruptly", "Do not contaminate wound", "Do not delay if bleeding won't stop"],
            "recovery": "3-7 days for minor wounds",
            "when_to_see": "Bleeding won't stop after 10 minutes, wound is deep, edges are jagged, dirt embedded"
        },
        "burn": {
            "name": "Burn",
            "category": "physical",
            "base_risk": 3,
            "materials": ["Cool water", "Clean cloth", "Aloe vera gel", "Loose bandage"],
            "immediate_actions": "Cool the burn with cool water for 10-20 minutes. Do not use ice directly.",
            "first_5_mins": "Continue cooling. Remove tight clothing if possible. Keep victim calm.",
            "after_30_mins": "Apply aloe vera or antibiotic ointment. Loosely cover with clean cloth.",
            "dos": ["Cool immediately with water", "Keep area clean", "Use loose bandages", "Drink water"],
            "donts": ["Do not apply ice directly", "Do not apply oil or cream immediately", "Do not burst blisters"],
            "recovery": "Minor burns: 1-2 weeks",
            "when_to_see": "Large area affected, deep burn, on face/hands, blistering"
        },
        "fracture": {
            "name": "Fracture/Sprain",
            "category": "physical",
            "base_risk": 3,
            "materials": ["Cloth strips", "Cardboard", "Pillows", "Ice pack"],
            "immediate_actions": "Immobilize the injured area. Apply ice pack if available wrapped in cloth.",
            "first_5_mins": "Keep limb still. Elevate if possible. Do not move injured joint.",
            "after_30_mins": "Wrap with cloth strips for support. Continue ice application.",
            "dos": ["Immobilize immediately", "Apply ice (wrapped in cloth)", "Elevate limb", "Rest completely"],
            "donts": ["Do not move the injured area", "Do not apply ice directly to skin", "Do not try to straighten"],
            "recovery": "Minor sprains: 2-3 weeks, Fractures: 4-8 weeks",
            "when_to_see": "Severe pain, visible deformity, unable to move, numbness/tingling"
        },
        "animal_bite": {
            "name": "Animal Bite",
            "category": "physical",
            "base_risk": 4,
            "materials": ["Clean water", "Soap", "Antiseptic", "Bandage"],
            "immediate_actions": "Wash wound immediately with soap and water for 5 minutes.",
            "first_5_mins": "Wash thoroughly. Apply antiseptic. Keep wound open to drain.",
            "after_30_mins": "Apply bandage loosely. Monitor for infection signs.",
            "dos": ["Wash with soap and water immediately", "Keep wound open initially", "Apply antiseptic", "Get tetanus shot"],
            "donts": ["Do not close wound immediately", "Do not ignore bite", "Do not apply tourniquet"],
            "recovery": "Depends on bite severity",
            "when_to_see": "Any animal bite, signs of rabies risk, swelling increasing"
        },
        "snake_bite": {
            "name": "Snake Bite/Insect Sting",
            "category": "physical",
            "base_risk": 5,
            "materials": ["Vinegar (for sting)", "Ice pack", "Clean water"],
            "immediate_actions": "For insect sting: Remove stinger. For snake bite: Keep limb immobile.",
            "first_5_mins": "Apply vinegar for sting. Apply ice for snake bite. Keep bitten limb still.",
            "after_30_mins": "For sting: Pain should reduce. For snake: Seek emergency help.",
            "dos": ["Remove stinger carefully", "Apply ice to sting", "Keep snake bite limb immobile", "Seek medical help for snake bite"],
            "donts": ["Do not squeeze stinger", "Do not apply tourniquet without medical advice", "Do not suck venom"],
            "recovery": "Sting: few hours, Snake bite: requires hospitalization",
            "when_to_see": "Any snake bite, allergic reaction, swelling spreading"
        },
        "nose_bleeding": {
            "name": "Nose Bleeding",
            "category": "physical",
            "base_risk": 1,
            "materials": ["Clean cloth", "Ice"],
            "immediate_actions": "Sit upright. Lean forward slightly. Pinch nostrils firmly for 10 minutes.",
            "first_5_mins": "Continue pinching. Breathe through mouth. Apply ice if available.",
            "after_30_mins": "Gently release pinch. If bleeding continues, pinch for another 10 minutes.",
            "dos": ["Sit upright", "Lean forward", "Pinch nostrils", "Apply ice to nose bridge"],
            "donts": ["Do not tilt head back", "Do not lie down", "Do not blow nose forcefully"],
            "recovery": "Usually stops within 20 minutes",
            "when_to_see": "Bleeding continues over 30 minutes, frequent episodes, after head injury"
        },
        "choking": {
            "name": "Choking",
            "category": "emergency",
            "base_risk": 9,
            "materials": ["None needed"],
            "immediate_actions": "Encourage coughing. If unable to cough, perform Heimlich maneuver.",
            "first_5_mins": "Position behind victim. Place fist above navel. Quick upward thrusts.",
            "after_30_mins": "If airway cleared, monitor breathing. Seek medical help if needed.",
            "dos": ["Encourage coughing if possible", "Perform Heimlich correctly", "Call 108 immediately", "Keep person calm"],
            "donts": ["Do not perform back blows unless trained", "Do not delay calling ambulance", "Do not leave alone"],
            "recovery": "Immediate if obstruction removed",
            "when_to_see": "IMMEDIATE - CALL 108"
        },
        "chest_pain": {
            "name": "Chest Pain",
            "category": "emergency",
            "base_risk": 8,
            "materials": ["Aspirin (if available)", "Nothing else"],
            "immediate_actions": "Have person sit/lie down. Loosen tight clothing. Stay calm.",
            "first_5_mins": "Call 108 immediately. If aspirin available, give if not allergic.",
            "after_30_mins": "Continue monitoring. Keep person calm. Do not leave alone.",
            "dos": ["Call 108 immediately", "Keep person calm", "Loosen clothing", "Monitor breathing"],
            "donts": ["Do not delay seeking help", "Do not give multiple medications", "Do not let person exert"],
            "recovery": "Requires medical evaluation",
            "when_to_see": "IMMEDIATE - CALL 108"
        },
        "fainting": {
            "name": "Fainting/Unconsciousness",
            "category": "emergency",
            "base_risk": 8,
            "materials": ["Nothing needed"],
            "immediate_actions": "Lay person on back. Elevate legs. Check breathing and pulse.",
            "first_5_mins": "Call 108. Keep person on side if vomiting risk. Monitor vitals.",
            "after_30_mins": "Ensure airway clear. Keep warm with blankets. Continue monitoring.",
            "dos": ["Call 108 immediately", "Lay person flat", "Elevate legs", "Monitor breathing"],
            "donts": ["Do not move unnecessarily", "Do not give food/water", "Do not leave alone"],
            "recovery": "Requires medical evaluation",
            "when_to_see": "IMMEDIATE - CALL 108"
        },
        "fever": {
            "name": "Fever",
            "category": "health",
            "base_risk": 2,
            "materials": ["Cool water", "Cloth", "Paracetamol (if available)"],
            "immediate_actions": "Rest in cool area. Drink plenty of water. Apply cool compress to forehead.",
            "first_5_mins": "Monitor temperature if thermometer available. Encourage fluid intake.",
            "after_30_mins": "Continue cooling measures. Change compress. Keep hydrated.",
            "dos": ["Rest in cool place", "Drink plenty of water", "Apply cool compress", "Monitor temperature"],
            "donts": ["Do not use ice directly", "Do not cover heavily", "Do not give aspirin to children"],
            "recovery": "3-5 days depending on cause",
            "when_to_see": "Temperature above 40°C, fever for more than 3 days, difficulty breathing"
        },
        "food_poisoning": {
            "name": "Food Poisoning",
            "category": "health",
            "base_risk": 3,
            "materials": ["Water", "ORS (if available)", "Ginger/Lemon"],
            "immediate_actions": "Rest in cool area. Sip water gradually. Do not eat solid food initially.",
            "first_5_mins": "Monitor symptoms. Keep hydrated with small sips. Avoid dairy.",
            "after_30_mins": "Continue fluid intake. Add light foods if nausea subsides. Monitor for blood in stool.",
            "dos": ["Drink water gradually", "Rest completely", "Use ORS if available", "Eat light foods later"],
            "donts": ["Do not eat immediately", "Do not consume dairy", "Do not ignore persistent symptoms"],
            "recovery": "24-48 hours typically",
            "when_to_see": "Severe vomiting/diarrhea for 24+ hours, blood in vomit/stool, extreme weakness"
        },
        "heat_stroke": {
            "name": "Heat Stroke/Dehydration",
            "category": "health",
            "base_risk": 5,
            "materials": ["Water", "Cool cloth", "Salt"],
            "immediate_actions": "Move to cool place immediately. Remove excess clothing. Drink water.",
            "first_5_mins": "Continue cooling. Drink water with salt/ORS. Apply cool cloth.",
            "after_30_mins": "Monitor vitals. Continue hydration. Rest in cool area.",
            "dos": ["Move to shade/cool area", "Drink water with salt", "Apply cool compress", "Rest completely"],
            "donts": ["Do not exercise in heat", "Do not ignore symptoms", "Do not leave in sun"],
            "recovery": "2-3 hours with proper cooling",
            "when_to_see": "Confusion, loss of consciousness, temperature above 40°C, seizures"
        },
        "allergic_reaction": {
            "name": "Allergic Reaction",
            "category": "health",
            "base_risk": 4,
            "materials": ["Antihistamine (if available)", "Water"],
            "immediate_actions": "Move away from allergen. Monitor breathing. Give antihistamine if available.",
            "first_5_mins": "Keep person calm. Monitor for breathing difficulty. Call 108 if severe.",
            "after_30_mins": "Continue monitoring. Do not expose to allergen again.",
            "dos": ["Remove from allergen", "Give antihistamine if available", "Monitor breathing", "Call 108 if severe"],
            "donts": ["Do not ignore symptoms", "Do not expose to allergen again", "Do not delay if breathing affected"],
            "recovery": "Minutes to hours depending on severity",
            "when_to_see": "Breathing difficulty, swelling in throat, difficulty swallowing"
        }
    }
    
    CITIES = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
              "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam"]
    
    HOSPITALS = {
        "Mumbai": [
            {"name": "Lilavati Hospital", "phone": "022-3177-7700"},
            {"name": "SevenHills Hospital", "phone": "022-6708-1111"},
            {"name": "Sir H. N. Reliance Foundation Hospital", "phone": "022-3303-3300"}
        ],
        "Delhi": [
            {"name": "Apollo Hospital Delhi", "phone": "011-4960-5000"},
            {"name": "AIIMS Delhi", "phone": "011-2658-8500"},
            {"name": "Fortis Hospital Delhi", "phone": "011-4157-4242"}
        ],
        "Bangalore": [
            {"name": "Apollo Hospital Bangalore", "phone": "080-4060-7999"},
            {"name": "St. Martha's Hospital", "phone": "080-2663-2000"},
            {"name": "Manipal Hospital Bangalore", "phone": "080-4165-6000"}
        ]
    }
    
    def __init__(self, patient_data, injury_type, symptoms):
        self.patient_data = patient_data
        self.injury_type = injury_type
        self.symptoms = symptoms
        self.risk_score = 0
        self.severity = "mild"
        self.guidance = None
    
    def calculate_risk_score(self):
        """Calculate risk score based on rules"""
        score = self.INJURY_DATA[self.injury_type]["base_risk"]
        
        # Pain level
        if self.symptoms.get("pain_level") == "high":
            score += 3
        elif self.symptoms.get("pain_level") == "medium":
            score += 1
        
        # Bleeding
        if self.symptoms.get("bleeding"):
            score += 3
        
        # Swelling
        if self.symptoms.get("swelling"):
            score += 2
        
        # Unconscious
        if not self.symptoms.get("conscious"):
            score += 5
        
        # Age factors
        age = self.patient_data.get("age", 30)
        if age < 12 or age > 65:
            score += 1
        
        # Medical conditions
        conditions = self.patient_data.get("medical_conditions", [])
        if conditions:
            score += len(conditions) * 2
        
        self.risk_score = min(score, 10)  # Cap at 10
        return self.risk_score
    
    def determine_severity(self):
        """Determine severity level based on risk score"""
        if self.risk_score <= 3:
            self.severity = "mild"
        elif self.risk_score <= 6:
            self.severity = "serious"
        else:
            self.severity = "emergency"
        return self.severity
    
    def get_guidance(self):
        """Get first aid guidance"""
        injury_data = self.INJURY_DATA[self.injury_type]
        
        guidance = {
            "injury_name": injury_data["name"],
            "risk_score": self.risk_score,
            "severity": self.severity,
            "materials": injury_data["materials"],
            "immediate_actions": injury_data["immediate_actions"],
            "first_5_mins": injury_data["first_5_mins"],
            "after_30_mins": injury_data["after_30_mins"],
            "dos": injury_data["dos"],
            "donts": injury_data["donts"],
            "recovery": injury_data["recovery"],
            "when_to_see": injury_data["when_to_see"],
            "is_emergency": self.severity == "emergency"
        }
        
        return guidance
    
    def get_nearby_hospitals(self, city):
        """Get nearby hospitals for the city"""
        return self.HOSPITALS.get(city, [])
