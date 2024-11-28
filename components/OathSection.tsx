'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/utils/translations'

interface OathSectionProps {
  oathCount: number | null; // Prop to receive the oath count
}

export default function OathSection({ oathCount }: OathSectionProps) {
  const { language } = useLanguage();

  const oathText = translations[language].titles.oathCount; // Get the oath title based on language
  const oathDescription = translations[language].titles.oathDescription; // Correctly access the oath description

  return (
    <div className="bg-vintage p-4 rounded-lg shadow-lg h-full border-4 border-vintage-border hover:border-vintage-border-hover transition-all flex flex-col justify-between">
      <div className="flex flex-col items-center gap-1 mb-2">
        <h2 className="subtitle-scale font-semibold text-white font-poppins border-b-2 border-white pb-1 text-center text-2xl">
          {oathText}
        </h2>
      </div>
      <p className="text-white oath-scale font-thinbold italic font-poppins mt-1 text-center">
        {oathDescription}
      </p>
      <hr />
      <div className="text-center mt-2 mb-4">
        <p className="text-xs count-scale font-bold text-white font-poppins">
          {translations[language].titles.peopleTakenOath}: {oathCount ?? 'Loading...'}
        </p>
      </div>
    </div>
  );
}


