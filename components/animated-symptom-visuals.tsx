"use client"

import type { PainLevel } from "@/lib/first-aid-types"

export function AnimatedPainIndicator({
  level,
  active = false,
}: {
  level: PainLevel
  active?: boolean
}) {
  const colors = {
    low: { ring: "#22c55e", core: "#86efac", bg: "#dcfce7" },
    medium: { ring: "#f59e0b", core: "#fbbf24", bg: "#fef3c7" },
    high: { ring: "#ef4444", core: "#f87171", bg: "#fef2f2" },
  }
  const c = colors[level]
  const speed = level === "high" ? "0.8s" : level === "medium" ? "1.5s" : "3s"

  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes pain-ring-${level} {
          0%, 100% { r: 14; opacity: 0.3; }
          50% { r: 18; opacity: 0.1; }
        }
        @keyframes pain-core-${level} {
          0%, 100% { r: 6; }
          50% { r: 8; }
        }
        .pain-ring-${level} { animation: pain-ring-${level} ${speed} ease-in-out infinite; }
        .pain-core-${level} { animation: pain-core-${level} ${speed} ease-in-out infinite; }
      `}</style>
      {active && <circle cx="24" cy="24" r="14" fill={c.bg} className={`pain-ring-${level}`} />}
      <circle cx="24" cy="24" r="10" fill={active ? c.bg : "#f1f5f9"} stroke={active ? c.ring : "#94a3b8"} strokeWidth="1.5" />
      <circle cx="24" cy="24" r="6" fill={active ? c.core : "#cbd5e1"} className={active ? `pain-core-${level}` : ""} />
      {/* Pain expression */}
      {level === "low" && (
        <path d="M20 26 Q24 28 28 26" fill="none" stroke={active ? "#166534" : "#64748b"} strokeWidth="1.2" strokeLinecap="round" />
      )}
      {level === "medium" && (
        <line x1="20" y1="26" x2="28" y2="26" stroke={active ? "#92400e" : "#64748b"} strokeWidth="1.2" strokeLinecap="round" />
      )}
      {level === "high" && (
        <path d="M20 28 Q24 24 28 28" fill="none" stroke={active ? "#991b1b" : "#64748b"} strokeWidth="1.2" strokeLinecap="round" />
      )}
      {/* Eyes */}
      <circle cx="21" cy="22" r="1.2" fill={active ? (level === "high" ? "#991b1b" : level === "medium" ? "#92400e" : "#166534") : "#64748b"} />
      <circle cx="27" cy="22" r="1.2" fill={active ? (level === "high" ? "#991b1b" : level === "medium" ? "#92400e" : "#166534") : "#64748b"} />
    </svg>
  )
}

export function AnimatedBleedingIndicator({ active = false }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes bleed-drop-a {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(16px); opacity: 0.7; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        @keyframes bleed-drop-b {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(14px); opacity: 0.6; }
          100% { transform: translateY(18px); opacity: 0; }
        }
        @keyframes bleed-pool {
          0%, 100% { rx: 8; }
          50% { rx: 10; }
        }
        .bd-a { animation: bleed-drop-a 1.6s ease-in infinite; }
        .bd-b { animation: bleed-drop-b 1.6s ease-in 0.5s infinite; }
        .bd-c { animation: bleed-drop-a 1.6s ease-in 1s infinite; }
        .bleed-pool { animation: bleed-pool 2s ease-in-out infinite; }
      `}</style>
      {active ? (
        <>
          {/* Drops */}
          <g className="bd-a"><path d="M22 10 Q22 16 20 18 Q18 20 22 20 Q26 20 24 18 Q22 16 22 10Z" fill="#ef4444" /></g>
          <g className="bd-b"><path d="M28 12 Q28 17 26 19 Q24 21 28 21 Q32 21 30 19 Q28 17 28 12Z" fill="#dc2626" /></g>
          <g className="bd-c"><path d="M18 14 Q18 18 16 20 Q14 22 18 22 Q22 22 20 20 Q18 18 18 14Z" fill="#ef4444" /></g>
          {/* Pool */}
          <ellipse cx="24" cy="40" rx="8" ry="3" fill="#fca5a5" className="bleed-pool" />
          <ellipse cx="24" cy="40" rx="5" ry="2" fill="#ef4444" />
        </>
      ) : (
        <>
          <path d="M24 10 Q24 20 20 24 Q16 28 24 28 Q32 28 28 24 Q24 20 24 10Z" fill="#cbd5e1" />
          <ellipse cx="24" cy="38" rx="6" ry="2" fill="#e2e8f0" />
        </>
      )}
    </svg>
  )
}

export function AnimatedSwellingIndicator({ active = false }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes swell-expand {
          0%, 100% { r: 10; }
          50% { r: 14; }
        }
        @keyframes swell-ring {
          0%, 100% { r: 16; opacity: 0.2; }
          50% { r: 20; opacity: 0.05; }
        }
        .swell-main { animation: swell-expand 2s ease-in-out infinite; }
        .swell-ring { animation: swell-ring 2s ease-in-out infinite; }
      `}</style>
      {active ? (
        <>
          <circle cx="24" cy="24" r="16" fill="#fef3c7" className="swell-ring" />
          <circle cx="24" cy="24" r="10" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" className="swell-main" />
          {/* Pressure arrows */}
          <path d="M10 24 L14 24" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M34 24 L38 24" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M24 10 L24 14" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M24 34 L24 38" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </>
      ) : (
        <>
          <circle cx="24" cy="24" r="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="4" fill="#cbd5e1" />
        </>
      )}
    </svg>
  )
}

export function AnimatedConsciousnessIndicator({ active = false }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
      <style>{`
        @keyframes brain-wave1 {
          0%, 100% { d: path("M10 28 L16 28 L19 22 L22 32 L25 24 L28 30 L31 20 L34 28 L38 28"); }
          50% { d: path("M10 28 L16 28 L18 24 L21 30 L24 26 L27 32 L30 22 L34 28 L38 28"); }
        }
        @keyframes brain-flat {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .brain-active { animation: brain-wave1 1.2s ease-in-out infinite; }
        .brain-flat { animation: brain-flat 2s ease-in-out infinite; }
      `}</style>
      {/* Brain outline */}
      <path d="M16 20 Q16 12 24 12 Q32 12 32 20 Q34 20 34 24 Q34 28 30 28 L18 28 Q14 28 14 24 Q14 20 16 20Z"
        fill={active ? "#dbeafe" : "#f1f5f9"}
        stroke={active ? "#3b82f6" : "#94a3b8"}
        strokeWidth="1.5"
      />
      {/* Brain wave / flat line */}
      {active ? (
        <path d="M10 36 L16 36 L19 30 L22 40 L25 32 L28 38 L31 28 L34 36 L38 36"
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="brain-active"
        />
      ) : (
        <line x1="10" y1="36" x2="38" y2="36"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="brain-flat"
        />
      )}
      {/* Status dot */}
      <circle cx="40" cy="12" r="4" fill={active ? "#22c55e" : "#ef4444"} />
      <circle cx="40" cy="12" r="2" fill={active ? "#86efac" : "#fca5a5"} />
    </svg>
  )
}
