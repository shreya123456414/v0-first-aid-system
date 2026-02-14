"use client"

import type { InjuryType } from "@/lib/first-aid-types"

function CutWoundIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes drip {
          0%, 100% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(8px); opacity: 0.3; }
          81% { transform: translateY(0); opacity: 0; }
          90% { opacity: 1; }
        }
        @keyframes pulse-wound {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .drop1 { animation: drip 2s ease-in-out infinite; }
        .drop2 { animation: drip 2s ease-in-out 0.6s infinite; }
        .drop3 { animation: drip 2s ease-in-out 1.2s infinite; }
        .wound-pulse { animation: pulse-wound 2s ease-in-out infinite; }
      `}</style>
      {/* Arm/skin */}
      <rect x="12" y="18" width="40" height="28" rx="8" fill={active ? "#e0f2f1" : "#f0f4f4"} stroke={active ? "#0d9488" : "#94a3b8"} strokeWidth="1.5" />
      {/* Wound line */}
      <g className={active ? "wound-pulse" : ""} style={{ transformOrigin: "32px 32px" }}>
        <path d="M22 32 Q27 26 32 32 Q37 38 42 32" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Blood drops */}
      <g className="drop1"><circle cx="28" cy="38" r="2" fill="#ef4444" /></g>
      <g className="drop2"><circle cx="32" cy="40" r="1.5" fill="#dc2626" /></g>
      <g className="drop3"><circle cx="36" cy="38" r="1.8" fill="#ef4444" /></g>
      {/* Bandage */}
      <rect x="24" y="20" width="16" height="5" rx="2" fill={active ? "#0d9488" : "#cbd5e1"} opacity="0.6" />
    </svg>
  )
}

function BurnIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes flicker1 {
          0%, 100% { transform: scaleY(1) translateY(0); opacity: 1; }
          25% { transform: scaleY(1.15) translateY(-2px); opacity: 0.9; }
          50% { transform: scaleY(0.9) translateY(1px); opacity: 1; }
          75% { transform: scaleY(1.1) translateY(-1px); opacity: 0.85; }
        }
        @keyframes flicker2 {
          0%, 100% { transform: scaleY(1) translateY(0); }
          30% { transform: scaleY(0.85) translateY(2px); }
          60% { transform: scaleY(1.1) translateY(-1px); }
        }
        @keyframes ember {
          0%, 100% { opacity: 0; transform: translateY(0); }
          30% { opacity: 1; }
          70% { opacity: 0.5; transform: translateY(-10px); }
        }
        .flame1 { animation: flicker1 1.2s ease-in-out infinite; transform-origin: 32px 50px; }
        .flame2 { animation: flicker2 1.5s ease-in-out infinite; transform-origin: 32px 50px; }
        .ember1 { animation: ember 2s ease-out infinite; }
        .ember2 { animation: ember 2s ease-out 0.7s infinite; }
        .ember3 { animation: ember 2s ease-out 1.4s infinite; }
      `}</style>
      {/* Base */}
      <ellipse cx="32" cy="52" rx="14" ry="3" fill={active ? "#fed7aa" : "#e2e8f0"} />
      {/* Outer flame */}
      <g className="flame1">
        <path d="M32 14 C22 28, 18 40, 32 50 C46 40, 42 28, 32 14Z" fill={active ? "#f97316" : "#94a3b8"} opacity="0.7" />
      </g>
      {/* Inner flame */}
      <g className="flame2">
        <path d="M32 24 C26 34, 24 42, 32 48 C40 42, 38 34, 32 24Z" fill={active ? "#fbbf24" : "#cbd5e1"} />
      </g>
      {/* Core */}
      <path d="M32 32 C28 38, 27 43, 32 46 C37 43, 36 38, 32 32Z" fill={active ? "#fef3c7" : "#e2e8f0"} />
      {/* Embers */}
      <g className="ember1"><circle cx="24" cy="22" r="1.5" fill={active ? "#f97316" : "#94a3b8"} /></g>
      <g className="ember2"><circle cx="40" cy="18" r="1" fill={active ? "#fbbf24" : "#cbd5e1"} /></g>
      <g className="ember3"><circle cx="28" cy="16" r="1.2" fill={active ? "#ef4444" : "#94a3b8"} /></g>
    </svg>
  )
}

function FractureIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes crack-glow {
          0%, 100% { stroke-opacity: 1; }
          50% { stroke-opacity: 0.4; }
        }
        @keyframes bone-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-1px); }
          40% { transform: translateX(1px); }
          60% { transform: translateX(-0.5px); }
          80% { transform: translateX(0.5px); }
        }
        .crack-line { animation: crack-glow 1.5s ease-in-out infinite; }
        .bone-upper { animation: bone-shake 3s ease-in-out infinite; }
        .pain-ring1 { animation: crack-glow 2s ease-in-out infinite; }
        .pain-ring2 { animation: crack-glow 2s ease-in-out 0.5s infinite; }
      `}</style>
      {/* Upper bone */}
      <g className={active ? "bone-upper" : ""}>
        <path d="M20 16 C18 18, 18 22, 22 22 L28 30" fill="none" stroke={active ? "#f5f5f4" : "#cbd5e1"} strokeWidth="6" strokeLinecap="round" />
        <circle cx="20" cy="16" r="4" fill={active ? "#f5f5f4" : "#e2e8f0"} stroke={active ? "#a8a29e" : "#94a3b8"} strokeWidth="1" />
      </g>
      {/* Lower bone */}
      <path d="M36 34 L42 42 C44 46, 46 46, 44 48" fill="none" stroke={active ? "#f5f5f4" : "#cbd5e1"} strokeWidth="6" strokeLinecap="round" />
      <circle cx="44" cy="48" r="4" fill={active ? "#f5f5f4" : "#e2e8f0"} stroke={active ? "#a8a29e" : "#94a3b8"} strokeWidth="1" />
      {/* Crack / break line */}
      <path d="M26 28 L30 32 L28 34 L34 36" fill="none" stroke={active ? "#ef4444" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" className={active ? "crack-line" : ""} />
      {/* Pain indicators */}
      <circle cx="32" cy="32" r="10" fill="none" stroke={active ? "#ef4444" : "#94a3b8"} strokeWidth="1" opacity="0.3" className={active ? "pain-ring1" : ""} />
      <circle cx="32" cy="32" r="16" fill="none" stroke={active ? "#ef4444" : "#94a3b8"} strokeWidth="0.5" opacity="0.2" className={active ? "pain-ring2" : ""} />
    </svg>
  )
}

function AnimalBiteIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes jaw-bite {
          0%, 70%, 100% { transform: translateY(0); }
          80% { transform: translateY(-3px); }
          90% { transform: translateY(1px); }
        }
        @keyframes alert-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .jaw-upper { animation: jaw-bite 3s ease-in-out infinite; transform-origin: 32px 32px; }
        .bite-alert { animation: alert-pulse 1.5s ease-in-out infinite; }
      `}</style>
      {/* Paw print */}
      <g className={active ? "jaw-upper" : ""}>
        {/* Main pad */}
        <ellipse cx="32" cy="38" rx="8" ry="6" fill={active ? "#a3a3a3" : "#cbd5e1"} />
        {/* Toe pads */}
        <ellipse cx="22" cy="28" rx="4" ry="3.5" fill={active ? "#a3a3a3" : "#cbd5e1"} />
        <ellipse cx="30" cy="24" rx="3.5" ry="3" fill={active ? "#a3a3a3" : "#cbd5e1"} />
        <ellipse cx="38" cy="24" rx="3.5" ry="3" fill={active ? "#a3a3a3" : "#cbd5e1"} />
        <ellipse cx="44" cy="28" rx="4" ry="3.5" fill={active ? "#a3a3a3" : "#cbd5e1"} />
      </g>
      {/* Bite marks */}
      {active && (
        <>
          <circle cx="26" cy="44" r="1.5" fill="#ef4444" />
          <circle cx="30" cy="46" r="1.2" fill="#ef4444" />
          <circle cx="34" cy="46" r="1.2" fill="#ef4444" />
          <circle cx="38" cy="44" r="1.5" fill="#ef4444" />
        </>
      )}
      {/* Alert indicator */}
      <g className={active ? "bite-alert" : ""}>
        <circle cx="50" cy="14" r="6" fill={active ? "#fef3c7" : "transparent"} stroke={active ? "#f59e0b" : "transparent"} strokeWidth="1.5" />
        <text x="50" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill={active ? "#d97706" : "transparent"}>!</text>
      </g>
    </svg>
  )
}

function FeverIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes mercury-rise {
          0%, 100% { height: 18; y: 24; }
          50% { height: 26; y: 16; }
        }
        @keyframes heat-wave1 {
          0%, 100% { opacity: 0; transform: translateY(0) translateX(0); }
          30% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-12px) translateX(3px); }
        }
        @keyframes heat-wave2 {
          0%, 100% { opacity: 0; transform: translateY(0) translateX(0); }
          30% { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-10px) translateX(-2px); }
        }
        .mercury { animation: mercury-rise 3s ease-in-out infinite; }
        .heat1 { animation: heat-wave1 2s ease-out infinite; }
        .heat2 { animation: heat-wave2 2s ease-out 0.7s infinite; }
        .heat3 { animation: heat-wave1 2s ease-out 1.4s infinite; }
      `}</style>
      {/* Thermometer body */}
      <rect x="28" y="10" width="8" height="36" rx="4" fill={active ? "#fef2f2" : "#f1f5f9"} stroke={active ? "#ef4444" : "#94a3b8"} strokeWidth="1.5" />
      {/* Thermometer bulb */}
      <circle cx="32" cy="48" r="7" fill={active ? "#ef4444" : "#94a3b8"} />
      {/* Mercury */}
      {active ? (
        <rect className="mercury" x="30" y="24" width="4" rx="2" fill="#ef4444" />
      ) : (
        <rect x="30" y="30" width="4" height="12" rx="2" fill="#94a3b8" />
      )}
      {/* Scale lines */}
      <line x1="37" y1="18" x2="40" y2="18" stroke={active ? "#fca5a5" : "#cbd5e1"} strokeWidth="1" />
      <line x1="37" y1="24" x2="40" y2="24" stroke={active ? "#fca5a5" : "#cbd5e1"} strokeWidth="1" />
      <line x1="37" y1="30" x2="40" y2="30" stroke={active ? "#fca5a5" : "#cbd5e1"} strokeWidth="1" />
      <line x1="37" y1="36" x2="40" y2="36" stroke={active ? "#fca5a5" : "#cbd5e1"} strokeWidth="1" />
      {/* Heat waves */}
      {active && (
        <>
          <g className="heat1"><path d="M44 30 Q46 26 44 22" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" /></g>
          <g className="heat2"><path d="M48 34 Q50 30 48 26" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" /></g>
          <g className="heat3"><path d="M18 28 Q16 24 18 20" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" /></g>
        </>
      )}
    </svg>
  )
}

function FoodPoisoningIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes stomach-churn {
          0%, 100% { d: path("M16 30 Q22 28 32 30 Q42 32 48 30 Q50 38 48 44 Q42 52 32 52 Q22 52 16 44 Q14 38 16 30Z"); }
          50% { d: path("M16 30 Q22 32 32 30 Q42 28 48 30 Q50 38 48 44 Q42 52 32 52 Q22 52 16 44 Q14 38 16 30Z"); }
        }
        @keyframes nausea-spiral {
          0% { transform: rotate(0deg); opacity: 0.7; }
          100% { transform: rotate(360deg); opacity: 0.2; }
        }
        @keyframes bubble1 {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes bubble2 {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 0.8; }
        }
        .stomach { animation: stomach-churn 2s ease-in-out infinite; }
        .nausea { animation: nausea-spiral 4s linear infinite; transform-origin: 32px 20px; }
        .bub1 { animation: bubble1 1.5s ease-in-out infinite; }
        .bub2 { animation: bubble2 1.5s ease-in-out 0.5s infinite; }
        .bub3 { animation: bubble1 1.5s ease-in-out 1s infinite; }
      `}</style>
      {/* Stomach shape */}
      <path d="M16 30 Q22 28 32 30 Q42 32 48 30 Q50 38 48 44 Q42 52 32 52 Q22 52 16 44 Q14 38 16 30Z"
        fill={active ? "#dcfce7" : "#f1f5f9"}
        stroke={active ? "#22c55e" : "#94a3b8"}
        strokeWidth="1.5"
        className={active ? "stomach" : ""}
      />
      {/* Internal bubbles / discomfort */}
      {active && (
        <>
          <g className="bub1"><circle cx="26" cy="38" r="2" fill="#86efac" /></g>
          <g className="bub2"><circle cx="34" cy="40" r="2.5" fill="#86efac" /></g>
          <g className="bub3"><circle cx="38" cy="36" r="1.5" fill="#86efac" /></g>
        </>
      )}
      {/* Nausea spiral above */}
      {active && (
        <g className="nausea">
          <path d="M28 20 Q32 14 36 20 Q32 16 28 20" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}
      {/* Cross/discomfort indicator */}
      <line x1="28" y1="42" x2="36" y2="42" stroke={active ? "#ef4444" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" opacity={active ? "0.5" : "0.3"} />
    </svg>
  )
}

function NoseBleedIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes nose-drop1 {
          0% { transform: translateY(0); opacity: 1; }
          70% { transform: translateY(14px); opacity: 0.8; }
          100% { transform: translateY(18px); opacity: 0; }
        }
        @keyframes nose-drop2 {
          0% { transform: translateY(0); opacity: 1; }
          70% { transform: translateY(12px); opacity: 0.7; }
          100% { transform: translateY(16px); opacity: 0; }
        }
        .ndrop1 { animation: nose-drop1 1.8s ease-in infinite; }
        .ndrop2 { animation: nose-drop2 1.8s ease-in 0.6s infinite; }
        .ndrop3 { animation: nose-drop1 1.8s ease-in 1.2s infinite; }
      `}</style>
      {/* Face outline */}
      <ellipse cx="32" cy="28" rx="16" ry="18" fill={active ? "#fef3c7" : "#f1f5f9"} stroke={active ? "#d97706" : "#94a3b8"} strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="25" cy="24" r="2" fill={active ? "#78716c" : "#94a3b8"} />
      <circle cx="39" cy="24" r="2" fill={active ? "#78716c" : "#94a3b8"} />
      {/* Nose */}
      <path d="M30 28 Q32 34 34 28" fill="none" stroke={active ? "#a3a3a3" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" />
      {/* Blood drops falling from nose */}
      {active && (
        <>
          <g className="ndrop1">
            <ellipse cx="31" cy="36" rx="1.5" ry="2" fill="#ef4444" />
          </g>
          <g className="ndrop2">
            <ellipse cx="33" cy="37" rx="1.2" ry="1.8" fill="#dc2626" />
          </g>
          <g className="ndrop3">
            <ellipse cx="32" cy="36" rx="1" ry="1.5" fill="#ef4444" />
          </g>
        </>
      )}
      {/* Mouth (worried) */}
      <path d="M28 40 Q32 38 36 40" fill="none" stroke={active ? "#a3a3a3" : "#94a3b8"} strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

const ANIMATED_ICONS: Record<InjuryType, React.FC<{ active?: boolean }>> = {
  cut_wound: CutWoundIcon,
  burn: BurnIcon,
  fracture_sprain: FractureIcon,
  animal_bite: AnimalBiteIcon,
  fever: FeverIcon,
  food_poisoning: FoodPoisoningIcon,
  nose_bleeding: NoseBleedIcon,
}

export function AnimatedInjuryIcon({
  type,
  active = false,
  className = "",
}: {
  type: InjuryType
  active?: boolean
  className?: string
}) {
  const Icon = ANIMATED_ICONS[type]
  return (
    <div className={className}>
      <Icon active={active} />
    </div>
  )
}
