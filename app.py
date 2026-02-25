import streamlit as st
import json
import os
from datetime import datetime
from translations import get_text, TRANSLATIONS
from decision_engine import FirstAidDecisionEngine
import google.generativeai as genai

# Configure Streamlit
st.set_page_config(
    page_title="Smart First Aid System",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load environment variables
GEMINI_API_KEY = "AIzaSyA5Ur8THqc79mvl-zVNB5rw5fsf5Sfta7M"
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Initialize session state
if "language" not in st.session_state:
    st.session_state.language = "en"
if "user_profile" not in st.session_state:
    st.session_state.user_profile = {}
if "current_page" not in st.session_state:
    st.session_state.current_page = "home"
if "show_chat" not in st.session_state:
    st.session_state.show_chat = False
if "assessment_data" not in st.session_state:
    st.session_state.assessment_data = {}
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

# Helper function to get translated text
def t(key):
    return get_text(key, st.session_state.language)

# Load user profile from local storage
def load_profile():
    if os.path.exists("user_profile.json"):
        with open("user_profile.json", "r") as f:
            st.session_state.user_profile = json.load(f)

# Save user profile to local storage
def save_profile():
    with open("user_profile.json", "w") as f:
        json.dump(st.session_state.user_profile, f)

# Sidebar - Language and Navigation
with st.sidebar:
    st.markdown("### " + t("app_title"))
    
    # Language selector
    col1, col2 = st.columns(2)
    with col1:
        if st.button("EN", key="lang_en", use_container_width=True):
            st.session_state.language = "en"
            st.rerun()
    with col2:
        if st.button("हिंदी", key="lang_hi", use_container_width=True):
            st.session_state.language = "hi"
            st.rerun()
    
    st.divider()
    
    # Navigation
    st.markdown("#### " + t("home_title"))
    
    nav_options = {
        "home": t("home_title"),
        "profile": t("profile"),
        "assessment": t("start_first_aid"),
        "tips": t("first_aid_tips")
    }
    
    for page_key, page_name in nav_options.items():
        if st.button(page_name, use_container_width=True, key=f"nav_{page_key}"):
            st.session_state.current_page = page_key
            st.rerun()
    
    st.divider()
    
    # Emergency Quick Access
    st.markdown("#### " + t("emergency_mode"))
    if st.button("🚨 " + t("emergency_mode"), use_container_width=True, key="emergency"):
        st.session_state.current_page = "emergency_assessment"
        st.rerun()

# Main content area
if st.session_state.current_page == "home":
    st.markdown("# " + t("app_title"))
    st.markdown("*" + t("app_subtitle") + "*")
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        if st.button("🩹 " + t("start_first_aid"), use_container_width=True):
            st.session_state.current_page = "assessment"
            st.rerun()
    
    with col2:
        if st.button("👤 " + t("profile"), use_container_width=True):
            st.session_state.current_page = "profile"
            st.rerun()
    
    with col3:
        if st.button("📚 " + t("first_aid_tips"), use_container_width=True):
            st.session_state.current_page = "tips"
            st.rerun()
    
    with col4:
        if st.button("🏥 " + t("nearby_hospitals"), use_container_width=True):
            st.session_state.current_page = "hospitals"
            st.rerun()
    
    st.divider()
    
    # Display welcome message
    st.info("Welcome to Smart First Aid Recommendation System. Select an option above to get started.")

# Profile Management
elif st.session_state.current_page == "profile":
    st.markdown("# " + t("profile_title"))
    
    with st.form("profile_form"):
        col1, col2 = st.columns(2)
        
        with col1:
            st.session_state.user_profile["name"] = st.text_input(
                t("name"),
                value=st.session_state.user_profile.get("name", "")
            )
            st.session_state.user_profile["age"] = st.number_input(
                t("age"),
                min_value=1,
                max_value=120,
                value=st.session_state.user_profile.get("age", 30)
            )
            st.session_state.user_profile["blood_group"] = st.selectbox(
                t("blood_group"),
                ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
                index=0
            )
        
        with col2:
            allergies_input = st.text_area(
                t("allergies"),
                value=st.session_state.user_profile.get("allergies", ""),
                height=80
            )
            st.session_state.user_profile["allergies"] = allergies_input
            
            conditions_input = st.text_area(
                t("medical_conditions"),
                value=", ".join(st.session_state.user_profile.get("medical_conditions", [])),
                height=80
            )
            st.session_state.user_profile["medical_conditions"] = [c.strip() for c in conditions_input.split(",") if c.strip()]
        
        st.session_state.user_profile["emergency_contact"] = st.text_input(
            t("emergency_contact"),
            value=st.session_state.user_profile.get("emergency_contact", "")
        )
        
        if st.form_submit_button(t("save_profile"), use_container_width=True):
            save_profile()
            st.success("Profile saved successfully!")
            st.rerun()

# First Aid Assessment
elif st.session_state.current_page in ["assessment", "emergency_assessment"]:
    st.markdown("# " + t("start_first_aid"))
    
    # Step indicator
    st.markdown("---")
    
    # Get assessment step from session
    step = st.session_state.assessment_data.get("step", 1)
    
    # Step 1: Injury Selection
    if step == 1:
        st.markdown("## " + t("injury_title"))
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("### " + t("physical_injuries"))
            injuries_physical = ["cut_wound", "burn", "fracture", "animal_bite", "snake_bite", "nose_bleeding"]
            for injury in injuries_physical:
                if st.button(t(injury), use_container_width=True, key=f"injury_{injury}"):
                    st.session_state.assessment_data["injury_type"] = injury
                    st.session_state.assessment_data["step"] = 2
                    st.rerun()
        
        with col2:
            st.markdown("### " + t("emergency_conditions"))
            injuries_emergency = ["choking", "chest_pain", "fainting"]
            for injury in injuries_emergency:
                if st.button(t(injury), use_container_width=True, key=f"injury_{injury}"):
                    st.session_state.assessment_data["injury_type"] = injury
                    st.session_state.assessment_data["step"] = 2
                    st.rerun()
        
        st.markdown("### " + t("health_issues"))
        injuries_health = ["fever", "food_poisoning", "heat_stroke", "allergic_reaction"]
        cols = st.columns(2)
        for idx, injury in enumerate(injuries_health):
            with cols[idx % 2]:
                if st.button(t(injury), use_container_width=True, key=f"injury_{injury}"):
                    st.session_state.assessment_data["injury_type"] = injury
                    st.session_state.assessment_data["step"] = 2
                    st.rerun()
    
    # Step 2: Symptoms Input
    elif step == 2:
        st.markdown("## " + t("symptoms_title"))
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.session_state.assessment_data["pain_level"] = st.selectbox(
                t("pain_level"),
                ["low", "medium", "high"],
                format_func=lambda x: t(x)
            )
            st.session_state.assessment_data["bleeding"] = st.checkbox(t("bleeding"))
            st.session_state.assessment_data["swelling"] = st.checkbox(t("swelling"))
        
        with col2:
            st.session_state.assessment_data["conscious"] = st.checkbox(t("conscious"), value=True)
        
        col1, col2, col3 = st.columns(3)
        with col1:
            if st.button("← " + t("back"), use_container_width=True):
                st.session_state.assessment_data["step"] = 1
                st.rerun()
        with col2:
            if st.button(t("next") + " →", use_container_width=True):
                st.session_state.assessment_data["step"] = 3
                st.rerun()
        with col3:
            if st.button("🚨 Emergency", use_container_width=True):
                st.session_state.show_chat = True
    
    # Step 3: Location Selection
    elif step == 3:
        st.markdown("## " + t("location_title"))
        
        st.session_state.assessment_data["city"] = st.selectbox(
            t("select_city"),
            FirstAidDecisionEngine.CITIES
        )
        
        col1, col2, col3 = st.columns(3)
        with col1:
            if st.button("← " + t("back"), use_container_width=True):
                st.session_state.assessment_data["step"] = 2
                st.rerun()
        with col2:
            if st.button(t("next") + " →", use_container_width=True):
                st.session_state.assessment_data["step"] = 4
                st.rerun()

    # Step 4: Results/Guidance
    elif step == 4:
        # Initialize decision engine
        engine = FirstAidDecisionEngine(
            st.session_state.user_profile,
            st.session_state.assessment_data.get("injury_type", "cut_wound"),
            st.session_state.assessment_data
        )
        
        risk_score = engine.calculate_risk_score()
        severity = engine.determine_severity()
        guidance = engine.get_guidance()
        
        # Emergency Alert
        if guidance["is_emergency"]:
            st.markdown("""
            <div style="background-color: #ff4444; color: white; padding: 20px; border-radius: 10px; text-align: center;">
                <h1>🚨 EMERGENCY 🚨</h1>
                <h2>CALL 108 - Ambulance</h2>
                <h2>CALL 112 - Police/Emergency</h2>
            </div>
            """, unsafe_allow_html=True)
            
            st.divider()
        
        # Risk Score and Severity
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric(t("risk_score"), f"{risk_score}/10")
        with col2:
            severity_color = "🟢" if severity == "mild" else "🟡" if severity == "serious" else "🔴"
            st.metric(t("severity"), f"{severity_color} {t(severity)}")
        with col3:
            if st.session_state.user_profile.get("blood_group"):
                st.metric(t("blood_group"), st.session_state.user_profile["blood_group"])
        
        st.divider()
        
        # Patient and Injury Summary
        with st.expander(t("patient_summary"), expanded=True):
            col1, col2 = st.columns(2)
            with col1:
                st.write(f"**{t('name')}:** {st.session_state.user_profile.get('name', 'N/A')}")
                st.write(f"**{t('age')}:** {st.session_state.user_profile.get('age', 'N/A')}")
                st.write(f"**{t('blood_group')}:** {st.session_state.user_profile.get('blood_group', 'N/A')}")
            with col2:
                st.write(f"**{t('allergies')}:** {st.session_state.user_profile.get('allergies', 'None')}")
                st.write(f"**{t('medical_conditions')}:** {', '.join(st.session_state.user_profile.get('medical_conditions', ['None']))}")
                st.write(f"**{t('emergency_contact')}:** {st.session_state.user_profile.get('emergency_contact', 'N/A')}")
        
        with st.expander(t("injury_summary"), expanded=True):
            st.write(f"**{t('start_first_aid')}:** {guidance['injury_name']}")
            st.write(f"**{t('pain_level')}:** {t(st.session_state.assessment_data.get('pain_level', 'low'))}")
            st.write(f"**{t('bleeding')}:** {t('yes') if st.session_state.assessment_data.get('bleeding') else t('no')}")
            st.write(f"**{t('swelling')}:** {t('yes') if st.session_state.assessment_data.get('swelling') else t('no')}")
        
        st.divider()
        
        # Required Materials
        with st.expander(t("required_materials"), expanded=True):
            for material in guidance["materials"]:
                st.write(f"• {material}")
        
        # First Aid Instructions
        st.markdown("## " + t("immediate_actions"))
        st.info(guidance["immediate_actions"])
        
        st.markdown("### " + t("first_5_minutes"))
        st.warning(guidance["first_5_mins"])
        
        st.markdown("### " + t("after_30_minutes"))
        st.info(guidance["after_30_mins"])
        
        # Do's and Don'ts
        col1, col2 = st.columns(2)
        with col1:
            st.markdown("#### ✅ " + t("dos"))
            for do in guidance["dos"]:
                st.write(f"• {do}")
        
        with col2:
            st.markdown("#### ❌ " + t("donts"))
            for dont in guidance["donts"]:
                st.write(f"• {dont}")
        
        st.divider()
        
        # Recovery and when to see doctor
        col1, col2 = st.columns(2)
        with col1:
            st.markdown("#### ⏳ " + t("recovery_time"))
            st.write(guidance["recovery"])
        
        with col2:
            st.markdown("#### 👨‍⚕️ " + t("when_to_see_doctor"))
            st.write(guidance["when_to_see"])
        
        st.divider()
        
        # Nearby Hospitals
        if st.session_state.assessment_data.get("city"):
            st.markdown("#### 🏥 " + t("nearby_hospitals"))
            hospitals = engine.get_nearby_hospitals(st.session_state.assessment_data["city"])
            if hospitals:
                for hospital in hospitals:
                    st.write(f"**{hospital['name']}** - {hospital['phone']}")
            else:
                st.write("No hospitals in database for this city.")
        
        st.divider()
        
        # Navigation buttons
        col1, col2, col3 = st.columns(3)
        with col1:
            if st.button("← " + t("back"), use_container_width=True):
                st.session_state.assessment_data["step"] = 3
                st.rerun()
        with col2:
            if st.button("🏠 " + t("home_title"), use_container_width=True):
                st.session_state.current_page = "home"
                st.session_state.assessment_data = {}
                st.rerun()
        with col3:
            if st.button("💬 AI Assistant", use_container_width=True):
                st.session_state.show_chat = True
                st.rerun()

# First Aid Tips
elif st.session_state.current_page == "tips":
    st.markdown("# " + t("first_aid_tips"))
    
    tips = {
        "Travel First Aid": [
            "Always carry a basic first aid kit when traveling",
            "Know the emergency numbers of the destination area",
            "Keep medicines for chronic conditions handy",
            "Stay hydrated during travel"
        ],
        "Heat Safety": [
            "Drink plenty of water in hot weather",
            "Avoid direct sun exposure during peak hours (12-4 PM)",
            "Wear light-colored, loose clothing",
            "Rest in shade frequently"
        ],
        "Snake Bite Precautions": [
            "Wear shoes when walking in grass or bushes",
            "Shake out your clothes before wearing",
            "Keep away from tall grass and dark corners",
            "Do not attempt to catch or kill the snake"
        ]
    }
    
    for category, tip_list in tips.items():
        with st.expander(category):
            for tip in tip_list:
                st.write(f"• {tip}")

# Nearby Hospitals
elif st.session_state.current_page == "hospitals":
    st.markdown("# " + t("nearby_hospitals"))
    
    selected_city = st.selectbox(t("select_city"), FirstAidDecisionEngine.CITIES)
    
    if selected_city:
        hospitals = FirstAidDecisionEngine().get_nearby_hospitals(selected_city)
        if hospitals:
            for hospital in hospitals:
                with st.expander(hospital["name"]):
                    st.write(f"**Phone:** {hospital['phone']}")
        else:
            st.info("No hospitals in database for this city yet.")

# AI Chat Floating Button and Modal
col_left, col_right = st.columns([0.9, 0.1])

with col_right:
    if st.button("💬", key="chat_toggle", help="AI Assistant"):
        st.session_state.show_chat = not st.session_state.show_chat

# Chat Modal
if st.session_state.show_chat:
    st.markdown("---")
    st.markdown("## 💬 AI First Aid Assistant")
    
    # Display chat history
    for message in st.session_state.chat_history:
        if message["role"] == "user":
            st.write(f"**You:** {message['content']}")
        else:
            st.write(f"**Assistant:** {message['content']}")
    
    # Chat input
    user_input = st.text_input("Ask a question about first aid:", key="chat_input")
    
    if user_input:
        # Add user message
        st.session_state.chat_history.append({"role": "user", "content": user_input})
        
        # Get AI response
        try:
            model = genai.GenerativeModel('gemini-pro')
            context = f"You are a First Aid Assistant. Answer questions about first aid in {st.session_state.language}. Be concise and helpful."
            response = model.generate_content(f"{context}\n\nQuestion: {user_input}")
            ai_response = response.text
        except Exception as e:
            ai_response = f"Sorry, I couldn't generate a response. Error: {str(e)}"
        
        # Add AI response
        st.session_state.chat_history.append({"role": "assistant", "content": ai_response})
        st.rerun()

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: gray; font-size: 12px;">
    <p>⚠️ Disclaimer: This system provides first aid guidance only and does not replace professional medical care.</p>
    <p>For emergencies, always call 108 (Ambulance) or 112 (Police)</p>
</div>
""", unsafe_allow_html=True)
