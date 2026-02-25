'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2, Mic, Square } from 'lucide-react'

interface SpeechControlsProps {
  text: string
  language?: 'en' | 'hi'
}

export function SpeechControls({ text, language = 'en' }: SpeechControlsProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef<any>(null)

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-US'

        recognitionRef.current.onstart = () => setIsListening(true)
        recognitionRef.current.onend = () => setIsListening(false)
        recognitionRef.current.onresult = (event: any) => {
          let interim = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptPart = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              setTranscript(transcriptPart)
            } else {
              interim += transcriptPart
            }
          }
        }
      }
    }
  }, [language])

  const handleTextToSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    if (!text) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US'
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const handleSpeechToText = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      setTranscript('')
      recognitionRef.current.start()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Text to Speech */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handleTextToSpeech}
          variant={isSpeaking ? 'default' : 'outline'}
          size="sm"
          className="touch-lg flex-1 gap-2"
          aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
        >
          {isSpeaking ? (
            <>
              <Square className="h-4 w-4" />
              Stop
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4" />
              Read Aloud
            </>
          )}
        </Button>
      </div>

      {/* Speech to Text */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handleSpeechToText}
          variant={isListening ? 'destructive' : 'outline'}
          size="sm"
          className="touch-lg flex-1 gap-2"
          aria-label={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? (
            <>
              <Square className="h-4 w-4" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" />
              Ask Question
            </>
          )}
        </Button>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="rounded-lg bg-muted p-3 text-sm">
          <p className="font-medium text-foreground mb-1">You said:</p>
          <p className="text-muted-foreground italic">{transcript}</p>
        </div>
      )}

      {/* Info Text */}
      <p className="text-xs text-muted-foreground text-center">
        Tap Read Aloud to hear the guidance. Tap Ask Question to record your question.
      </p>
    </div>
  )
}
