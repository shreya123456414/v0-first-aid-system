'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useLanguage } from '@/lib/language-context'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function AIChatAssistant() {
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: t('chat.assistantGreeting'),
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing with a rule-based system
    const lowerMessage = userMessage.toLowerCase()

    // First aid specific responses
    const responses: { keywords: string[]; answer: string }[] = [
      {
        keywords: ['cut', 'wound', 'bleeding', 'bleed'],
        answer:
          language === 'en'
            ? 'For cuts and wounds: 1) Apply pressure with clean cloth, 2) Rinse with clean water, 3) Apply antiseptic, 4) Cover with bandage. Seek medical help if bleeding continues after 10 minutes or if the cut is deep.'
            : 'कट और घावों के लिए: 1) साफ कपड़े से दबाव डालें, 2) साफ पानी से धोएं, 3) कीटाणुनाशक लगाएं, 4) पट्टी से ढकें। यदि 10 मिनट के बाद भी खून बह रहा है या कट गहरा है तो चिकित्सकीय सहायता लें।',
      },
      {
        keywords: ['burn', 'जल'],
        answer:
          language === 'en'
            ? 'For burns: 1) Cool the area with running water for 10-15 minutes, 2) Remove tight clothing, 3) Apply burn gel or antibiotic cream, 4) Cover loosely with clean cloth. Do not apply ice directly or pop blisters.'
            : 'जलने के लिए: 1) प्रभावित क्षेत्र को 10-15 मिनट तक चलते पानी से ठंडा करें, 2) तंग कपड़े हटाएं, 3) बर्न जेल या एंटीबायोटिक क्रीम लगाएं, 4) साफ कपड़े से ढीले से ढकें। सीधे बर्फ न लगाएं और छाले न फोड़ें।',
      },
      {
        keywords: ['fracture', 'sprain', 'टूटना', 'मोच'],
        answer:
          language === 'en'
            ? 'For fractures/sprains: 1) Stop all activity and rest, 2) Apply ice for 15-20 minutes, 3) Use compression with elastic bandage, 4) Elevate the injured limb, 5) Take pain relief as needed. Seek medical help for severe cases.'
            : 'फ्रैक्चर/मोच के लिए: 1) सभी गतिविधि बंद करें और आराम करें, 2) 15-20 मिनट के लिए बर्फ लगाएं, 3) लोचदार पट्टी से संपीड़न करें, 4) घायल अंग को ऊपर उठाएं, 5) आवश्यकतानुसार दर्द निवारक लें। गंभीर मामलों में चिकित्सा सहायता लें।',
      },
      {
        keywords: ['fever', 'बुखार'],
        answer:
          language === 'en'
            ? 'For fever: 1) Rest and stay hydrated with water, 2) Take paracetamol/acetaminophen as per instructions, 3) Apply cool compress to forehead, 4) Wear light clothing. Seek medical help if fever persists beyond 3 days or exceeds 103°F (39.4°C).'
            : 'बुखार के लिए: 1) आराम करें और पानी से हाइड्रेटेड रहें, 2) निर्देश के अनुसार पैरासिटामोल/एसिटामिनोफेन लें, 3) माथे पर ठंडी पट्टी लगाएं, 4) हल्के कपड़े पहनें। यदि बुखार 3 दिन से अधिक रहे या 103°F (39.4°C) से अधिक हो तो चिकित्सा सहायता लें।',
      },
      {
        keywords: ['poison', 'खाद्य विषाक्तता', 'nausea', 'vomit', 'दस्त'],
        answer:
          language === 'en'
            ? 'For food poisoning: 1) Stop eating solid food temporarily, 2) Drink small sips of water or ORS solution, 3) Avoid dairy and fatty foods, 4) Rest in a comfortable position. Seek medical help if symptoms persist beyond 24 hours or if there is severe dehydration.'
            : 'खाद्य विषाक्तता के लिए: 1) अस्थायी रूप से ठोस खाना बंद करें, 2) पानी या ORS घोल की छोटी-छोटी घूंटें लें, 3) डेयरी और वसायुक्त खाद्य पदार्थों से बचें, 4) आरामदायक स्थिति में आराम करें। यदि लक्षण 24 घंटे से अधिक समय तक रहें या गंभीर निर्जलीकरण हो तो चिकित्सा सहायता लें।',
      },
      {
        keywords: ['bite', 'काटा', 'animal'],
        answer:
          language === 'en'
            ? 'For animal bites: 1) Wash thoroughly with soap and water for 5 minutes, 2) Apply antiseptic cream, 3) Cover with clean bandage, 4) Monitor for signs of infection. Seek immediate medical help for deep bites or if the animal may have rabies.'
            : 'जानवर के काटने के लिए: 1) साबुन और पानी से 5 मिनट तक अच्छी तरह धोएं, 2) कीटाणुनाशक क्रीम लगाएं, 3) साफ पट्टी से ढकें, 4) संक्रमण के लक्षणों की निगरानी करें। गहरे काटने के लिए या यदि जानवर को रेबीज हो सकता है तो तुरंत चिकित्सा सहायता लें।',
      },
      {
        keywords: ['bleed', 'nose', 'nosebleed', 'नाक'],
        answer:
          language === 'en'
            ? 'For nosebleeds: 1) Sit upright and lean forward slightly, 2) Pinch the soft part of nose for 10 minutes, 3) Breathe through mouth, 4) Apply cold compress to neck/face. Seek medical help if bleeding continues after 20 minutes.'
            : 'नाक से खून बहने के लिए: 1) सीधे बैठें और थोड़ा आगे झुकें, 2) नाक के नरम हिस्से को 10 मिनट तक दबाएं, 3) मुंह से सांस लें, 4) गर्दन/चेहरे पर ठंडी पट्टी लगाएं। यदि 20 मिनट के बाद भी खून बह रहा है तो चिकित्सा सहायता लें।',
      },
      {
        keywords: ['conscious', 'unconscious', 'faint', 'चेतना'],
        answer:
          language === 'en'
            ? 'For unconscious person: 1) Call emergency services immediately, 2) Check if they are breathing, 3) Place in recovery position (on side) if breathing, 4) Do not give food or water. Perform CPR if trained and breathing has stopped.'
            : 'अचेतन व्यक्ति के लिए: 1) तुरंत आपातकालीन सेवाएं बुलाएं, 2) जांचें कि वे सांस ले रहे हैं, 3) यदि सांस ले रहे हैं तो रिकवरी स्थिति में रखें (एक तरफ), 4) खाना या पानी न दें। यदि प्रशिक्षित हैं और सांस बंद हो गई है तो CPR करें।',
      },
      {
        keywords: ['cpr', 'cardiopulmonary', 'resuscitation'],
        answer:
          language === 'en'
            ? 'CPR steps: 1) Check responsiveness and breathing, 2) Call emergency services, 3) Place person on firm surface, 4) Position hands on chest center, 5) Push hard and fast at 100-120 compressions per minute, 6) Give rescue breaths after every 30 compressions. Continue until help arrives.'
            : 'CPR के चरण: 1) जवाबदेही और सांस की जांच करें, 2) आपातकालीन सेवाएं बुलाएं, 3) व्यक्ति को दृढ़ सतह पर रखें, 4) छाती के केंद्र पर हाथ रखें, 5) 100-120 संपीड़न प्रति मिनट पर जोर से और तेजी से धकेलें, 6) हर 30 संपीड़न के बाद बचाव सांस दें। मदद आने तक जारी रखें।',
      },
      {
        keywords: ['emergency', 'help', 'call', 'आपातकाल'],
        answer:
          language === 'en'
            ? 'Emergency numbers in India: Ambulance: 108, Police: 100, Fire: 101. For any life-threatening situation, call these numbers immediately and provide clear information about the emergency and location.'
            : 'भारत में आपातकालीन नंबर: एम्बुलेंस: 108, पुलिस: 100, अग्निशमन: 101। किसी भी जीवन के लिए खतरनाक स्थिति के लिए, इन नंबरों पर तुरंत कॉल करें और आपातकाल और स्थान के बारे में स्पष्ट जानकारी प्रदान करें।',
      },
    ]

    // Find matching response
    for (const response of responses) {
      if (response.keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return response.answer
      }
    }

    // Default response
    return language === 'en'
      ? "I can help you with first aid information. Ask me about specific injuries, symptoms, emergency procedures, or medical conditions. How can I assist you?"
      : 'मैं आपको प्राथमिक चिकित्सा की जानकारी के साथ मदद कर सकता हूं। मुझसे विशिष्ट चोटों, लक्षणों, आपातकालीन प्रक्रियाओं या चिकित्सा स्थितियों के बारे में पूछें। मैं आपकी कैसे मदद कर सकता हूं?'
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const assistantResponse = await getAIResponse(inputValue)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: assistantResponse,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="flex h-full flex-col border-primary/20 bg-gradient-to-b from-card to-card/50">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border bg-gradient-to-r from-primary/5 to-transparent p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {t('chat.title')}
          </h3>
          <p className="text-xs text-muted-foreground">Always available</p>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <p className="text-sm text-muted-foreground">
                {t('chat.noMessages')}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-2',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-xs rounded-lg px-3 py-2 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  )}
                >
                  <p className="break-words">{message.content}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString(language === 'en' ? 'en-US' : 'hi-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              </div>
              <div className="rounded-lg bg-muted px-3 py-2">
                <p className="text-sm text-muted-foreground">
                  {t('chat.thinking')}
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-3">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chat.placeholder')}
            disabled={isLoading}
            className="border-border bg-background/50 text-foreground placeholder:text-muted-foreground"
            autoComplete="off"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            size="sm"
            className="shrink-0 gap-1"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">{t('common.next')}</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
