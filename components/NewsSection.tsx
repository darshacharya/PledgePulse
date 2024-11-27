'use client'

import { Bell } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations, getNews } from '@/utils/translations'
import { useState, useEffect } from 'react'

interface NewsItem {
  id: number
  title: string
  description: string
  date: string
}

export default function NewsSection() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [news, setNews] = useState<NewsItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(2)

  console.log("Current language in NewsSection:", language)

  useEffect(() => {
    setMounted(true)
    const loadNews = async () => {
      const newsItems = await getNews(language)
      setNews(newsItems)
    }
    loadNews()
  }, [language])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % Math.ceil(news.length / itemsToShow);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [news.length, itemsToShow]);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth < 640 ? 2 : 2);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return <div className="animate-pulse">Loading...</div>
  }

  const startIndex = currentIndex * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const visibleNews = news.slice(startIndex, endIndex);

  return (
    <div className="bg-white p-2 rounded-lg shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all h-full flex flex-col">
      <div className="flex items-center gap-1 mb-2">
        <Bell className="w-4 h-4 text-blue-600" />
        <h2 className="subtitle-scale font-semibold text-blue-600 font-poppins border-b-2 border-blue-600 pb-1">
          {translations[language].titles.news}
        </h2>
      </div>

      <div className="mt-1 flex-grow flex flex-col overflow-hidden">
        <div className="border-l-4 border-blue-600 pl-2 py-1 text-left flex-grow scrollable-container" style={{ maxHeight: '300px' }}>
          <div className="space-y-2">
            {visibleNews.map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-2 last:border-0">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <h3 className="font-semibold text-gray-800 font-poppins text-lg flex-grow">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs whitespace-nowrap font-poppins">
                    {new Date(item.date).toLocaleDateString(language === 'en' ? 'en-US' : 'kn-IN')}
                  </p>
                </div>
                <p className="text-gray-600 text-lg font-poppins mt-0.5">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}