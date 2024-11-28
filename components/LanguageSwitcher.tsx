'use client'

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  // Function to toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'kn' : 'en');
  };

  useEffect(() => {
    // Set interval to switch language every 2 minutes (120000 milliseconds)
    const languageSwitchInterval = setInterval(toggleLanguage, 120000);

    // Cleanup interval on component unmount
    return () => clearInterval(languageSwitchInterval);
  }, [language]);

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors overflow-hidden flex"
    >
      <span className={`px-2 py-1 text-sm ${language === 'en' ? 'bg-blue-700' : ''}`}>
        ENG
      </span>
      <span className={`px-2 py-1 text-sm ${language === 'kn' ? 'bg-blue-700' : ''}`}>
        ಕನ್ನಡ
      </span>
    </button>
  );
}