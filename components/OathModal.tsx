import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface OathModalProps {
  isOpen: boolean
  onClose: () => void
  onOathTaken: () => void
  oathCount: number | null
}

export default function OathModal({ isOpen, onClose }: OathModalProps) {
  const { language } = useLanguage()
  const audioRef = useRef<HTMLAudioElement>(null)

  const content = {
    en: {
      thankYou: "Thank you for pledging to save water!"
    },
    kn: {
      thankYou: "ನೀರು ಉಳಿಸಲು ಪ್ರತಿಜ್ಞೆ ಮಾಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು!"
    }
  }

  useEffect(() => {
    if (isOpen) {
      // Play audio immediately when the modal opens
      if (audioRef.current) {
        audioRef.current.play()
          .catch(e => console.log('Audio playback failed:', e))
      }

      // Close after 5 seconds
      const thankYouTimer = setTimeout(() => {
        onClose() // Close the modal after showing the thank you message
      }, 5000) // Show for 5 seconds

      return () => {
        clearTimeout(thankYouTimer)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const currentLanguage = (language === 'kn' ? 'kn' : 'en') as keyof typeof content

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-r from-sky-400 to-blue-800 rounded-lg p-6 max-w-md w-full animate-fade-in shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            {content[currentLanguage].thankYou}
          </h2>
          <div className="flex justify-center">
            <span className="text-4xl text-white">👏</span>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef}
        src="/assets/thankyou-female.mp3"
        preload="auto"
      />
    </>
  )
}