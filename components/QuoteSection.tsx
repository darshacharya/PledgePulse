'use client'

import { Quote } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/utils/translations'

export default function QuoteSection() {
  const { language } = useLanguage()
  const quotes = translations[language].quotes
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentQuote(quotes[0])
  }, [language, quotes])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentQuote(prevQuote => {
        const currentIndex = quotes.indexOf(prevQuote)
        const nextIndex = (currentIndex + 1) % quotes.length
        return quotes[nextIndex]
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [mounted, quotes])

  if (!mounted) {
    return <div className="animate-pulse">Loading...</div>
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg shadow-lg h-full border-2 border-white-200 hover:border-white-400 transition-all flex flex-col">
      <div className="flex items-center gap-1 mb-2">
        <Quote className="w-4 h-4 text-white" />
        <h2 className="subtitle-scale font-bold text-white font-poppins border-b-2 border-white pb-1">
          {translations[language].titles.quotes}
        </h2>
      </div>
      <div className="mt-1 flex-grow flex items-center overflow-hidden">
        <div className="border-l-4 border-white pl-2 py-1 text-left flex-grow">
          <p className="text-white italic small-scale font-poppins leading-relaxed font-bold text-xl break-words overflow-hidden">
            {currentQuote.text}
          </p>
          <p className="text-white text-sm mt-1 font-poppins font-bold small-scale">
            - {currentQuote.author}
          </p>
        </div>
      </div>
    </div>
  )
}