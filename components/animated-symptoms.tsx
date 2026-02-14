'use client'

import React from 'react'

export function HeadacheAnimation({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>{`
          @keyframes pulse-head {
            0%, 100% { r: 20; opacity: 0.3; }
            50% { r: 25; opacity: 0; }
          }
          @keyframes throb {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          .head-pulse {
            animation: ${active ? 'pulse-head 1.5s infinite' : 'none'};
          }
          .head-shape {
            animation: ${active ? 'throb 1.2s infinite' : 'none'};
          }
        `}</style>
      </defs>
      {/* Head */}
      <circle cx="50" cy="45" r="25" fill="#fca5a5" className="head-shape" stroke="#991b1b" strokeWidth="1" />
      {/* Eyes */}
      <circle cx="42" cy="40" r="2" fill="#991b1b" />
      <circle cx="58" cy="40" r="2" fill="#991b1b" />
      {/* Mouth */}
      <path d="M 45 55 Q 50 52 55 55" stroke="#991b1b" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Pain pulses */}
      <circle cx="50" cy="45" r="25" fill="none" stroke="#dc2626" strokeWidth="1.5" className="head-pulse" />
    </svg>
  )
}

export function FeverAnimation({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>{`
          @keyframes thermometer-rise {
            0% { height: 20px; }
            50% { height: 35px; }
            100% { height: 20px; }
          }
          @keyframes thermometer-pulse {
            0%, 100% { fill: #ef4444; }
            50% { fill: #dc2626; }
          }
          .thermo-liquid {
            animation: ${active ? 'thermometer-rise 1.5s infinite' : 'none'};
          }
          .thermo-color {
            animation: ${active ? 'thermometer-pulse 1.5s infinite' : 'none'};
          }
        `}</style>
      </defs>
      {/* Thermometer bulb */}
      <circle cx="50" cy="75" r="12" fill="#fecaca" stroke="#991b1b" strokeWidth="1" className="thermo-color" />
      {/* Thermometer tube */}
      <rect x="46" y="30" width="8" height="45" fill="none" stroke="#991b1b" strokeWidth="2" rx="2" />
      {/* Rising liquid */}
      <rect x="47" y="45" width="6" height="20" fill="#ef4444" className="thermo-liquid" rx="1" />
      {/* Temperature marks */}
      <line x1="44" y1="45" x2="56" y2="45" stroke="#991b1b" strokeWidth="1" opacity="0.5" />
      <line x1="44" y1="55" x2="56" y2="55" stroke="#991b1b" strokeWidth="1" opacity="0.5" />
      <line x1="44" y1="65" x2="56" y2="65" stroke="#991b1b" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

export function NauseaAnimation({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>{`
          @keyframes rock {
            0%, 100% { transform: rotateZ(-2deg); }
            50% { transform: rotateZ(2deg); }
          }
          @keyframes wave {
            0%, 100% { d: path('M 30 55 Q 40 50 50 55 T 70 55'); }
            50% { d: path('M 30 55 Q 40 60 50 55 T 70 55'); }
          }
          .stomach {
            animation: ${active ? 'rock 1.2s infinite' : 'none'};
          }
          .wave-line {
            animation: ${active ? 'wave 1.2s infinite' : 'none'};
          }
        `}</style>
      </defs>
      {/* Body */}
      <ellipse cx="50" cy="50" rx="20" ry="25" fill="#fed7aa" stroke="#92400e" strokeWidth="1" className="stomach" />
      {/* Stomach distress waves */}
      <path d="M 30 55 Q 40 50 50 55 T 70 55" stroke="#dc2626" strokeWidth="2" fill="none" strokeLinecap="round" className="wave-line" />
      {/* Face distress */}
      <circle cx="50" cy="30" r="12" fill="#fecaca" stroke="#92400e" strokeWidth="1" />
      <circle cx="46" cy="28" r="1.5" fill="#92400e" />
      <circle cx="54" cy="28" r="1.5" fill="#92400e" />
      <path d="M 47 33 Q 50 31 53 33" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function DizzinessAnimation({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes wobble {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            75% { transform: translateX(3px); }
          }
          .swirl {
            animation: ${active ? 'spin 2s linear infinite' : 'none'};
            transform-origin: 50px 50px;
          }
          .head-wobble {
            animation: ${active ? 'wobble 1s infinite' : 'none'};
          }
        `}</style>
      </defs>
      {/* Swirling background */}
      <g className="swirl">
        <path d="M 50 20 Q 70 50 50 80 Q 30 50 50 20" fill="none" stroke="#fca5a5" strokeWidth="2" opacity="0.6" />
        <path d="M 50 25 Q 65 50 50 75 Q 35 50 50 25" fill="none" stroke="#fecaca" strokeWidth="2" opacity="0.8" />
      </g>
      {/* Head */}
      <circle cx="50" cy="50" r="18" fill="#fed7aa" stroke="#92400e" strokeWidth="1" className="head-wobble" />
      {/* Dizzy eyes (X) */}
      <line x1="44" y1="46" x2="48" y2="50" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="46" x2="44" y2="50" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
      <line x1="56" y1="46" x2="60" y2="50" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="46" x2="56" y2="50" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
      {/* Wavy mouth */}
      <path d="M 46 56 Q 50 58 54 56" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function WeaknessAnimation({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>{`
          @keyframes fade-strength {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes droop {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(4px); }
          }
          .strength-bar {
            animation: ${active ? 'fade-strength 1.5s infinite' : 'none'};
          }
          .arm-droop {
            animation: ${active ? 'droop 1.2s infinite' : 'none'};
          }
        `}</style>
      </defs>
      {/* Body */}
      <ellipse cx="50" cy="55" rx="18" ry="22" fill="#fecaca" stroke="#991b1b" strokeWidth="1" />
      {/* Head */}
      <circle cx="50" cy="30" r="14" fill="#fed7aa" stroke="#92400e" strokeWidth="1" />
      {/* Drooping arms */}
      <g className="arm-droop">
        <line x1="32" y1="55" x2="15" y2="65" stroke="#fed7aa" strokeWidth="3" strokeLinecap="round" />
        <line x1="68" y1="55" x2="85" y2="65" stroke="#fed7aa" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* Tired eyes */}
      <circle cx="45" cy="28" r="1.5" fill="#92400e" />
      <circle cx="55" cy="28" r="1.5" fill="#92400e" />
      {/* Sad mouth */}
      <path d="M 46 36 Q 50 34 54 36" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Strength indicator (fading bars) */}
      <rect x="42" y="70" width="4" height="10" fill="#dc2626" className="strength-bar" rx="1" />
      <rect x="48" y="70" width="4" height="8" fill="#dc2626" opacity="0.6" className="strength-bar" opacity="0.6" rx="1" />
      <rect x="54" y="70" width="4" height="6" fill="#dc2626" opacity="0.3" className="strength-bar" opacity="0.3" rx="1" />
    </svg>
  )
}

export function DifficultyBreathingAnimation({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>{`
          @keyframes expand-chest {
            0%, 100% { rx: 18; }
            50% { rx: 22; }
          }
          @keyframes breath-wave {
            0% { d: path('M 30 50 Q 40 45 50 50 Q 60 55 70 50'); }
            50% { d: path('M 30 50 Q 40 48 50 50 Q 60 52 70 50'); }
            100% { d: path('M 30 50 Q 40 45 50 50 Q 60 55 70 50'); }
          }
          .chest {
            animation: ${active ? 'expand-chest 1.2s infinite' : 'none'};
          }
          .breath-line {
            animation: ${active ? 'breath-wave 1.2s infinite' : 'none'};
          }
        `}</style>
      </defs>
      {/* Head */}
      <circle cx="50" cy="25" r="10" fill="#fed7aa" stroke="#92400e" strokeWidth="1" />
      {/* Chest/Lungs */}
      <ellipse cx="50" cy="55" rx="18" ry="20" fill="#fecaca" stroke="#991b1b" strokeWidth="2" className="chest" />
      {/* Breath waves */}
      <path d="M 30 50 Q 40 45 50 50 Q 60 55 70 50" stroke="#dc2626" strokeWidth="2" fill="none" strokeLinecap="round" className="breath-line" />
      <path d="M 28 60 Q 38 55 50 60 Q 62 65 72 60" stroke="#fca5a5" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Worried expression */}
      <circle cx="46" cy="23" r="1.5" fill="#92400e" />
      <circle cx="54" cy="23" r="1.5" fill="#92400e" />
      <path d="M 47 28 Q 50 30 53 28" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function ChestPainAnimation({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <style>{`
          @keyframes sharp-pain {
            0%, 100% { fill: #fecaca; }
            50% { fill: #dc2626; }
          }
          @keyframes pain-throb {
            0%, 100% { r: 12; }
            50% { r: 15; }
          }
          .chest-area {
            animation: ${active ? 'sharp-pain 1.2s ease-in-out infinite' : 'none'};
          }
          .pain-point {
            animation: ${active ? 'pain-throb 1.2s ease-in-out infinite' : 'none'};
          }
        `}</style>
      </defs>
      {/* Body */}
      <ellipse cx="50" cy="55" rx="20" ry="25" fill="#fecaca" stroke="#991b1b" strokeWidth="1" className="chest-area" />
      {/* Heart area pain point */}
      <circle cx="50" cy="50" r="12" fill="none" stroke="#dc2626" strokeWidth="2" className="pain-point" opacity="0.8" />
      {/* Heart symbol inside */}
      <path d="M 50 45 L 48 43 Q 46 41 44 43 Q 42 45 44 47 L 50 52 L 56 47 Q 58 45 56 43 Q 54 41 52 43 L 50 45" fill="#dc2626" />
      {/* Pain lines radiating */}
      <line x1="30" y1="50" x2="20" y2="50" stroke="#dc2626" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <line x1="70" y1="50" x2="80" y2="50" stroke="#dc2626" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      {/* Head with pained expression */}
      <circle cx="50" cy="25" r="10" fill="#fed7aa" stroke="#92400e" strokeWidth="1" />
      <circle cx="46" cy="23" r="1.5" fill="#92400e" />
      <circle cx="54" cy="23" r="1.5" fill="#92400e" />
      <path d="M 46 28 Q 50 26 54 28" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export const SYMPTOM_ANIMATIONS: Record<string, React.FC<{ active: boolean }>> = {
  headache: HeadacheAnimation,
  fever: FeverAnimation,
  nausea: NauseaAnimation,
  dizziness: DizzinessAnimation,
  weakness: WeaknessAnimation,
  difficulty_breathing: DifficultyBreathingAnimation,
  chest_pain: ChestPainAnimation,
}
