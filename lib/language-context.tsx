'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { Language, Translations } from '@/lib/translations'
import { translations } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (path: string, defaultValue?: string) => string
  translations: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'en'
    }
    return 'en'
  })

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }, [])

  const t = useCallback(
    (path: string, defaultValue = '') => {
      const keys = path.split('.')
      let value: any = translations[language]

      for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key]
        } else {
          return defaultValue
        }
      }

      return typeof value === 'string' ? value : defaultValue
    },
    [language]
  )

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, translations: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
