import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/utils/translations';

const images = [
  '/images/sudarshan.jfif',
  '/images/channabasava_.jpg',
  '/images/water1.jpg',
  '/images/water2.jpg',
  '/images/water3.jpg',
  '/images/water4.jpg',
];

export default function SlideShow() {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const employeeInfo = {
    en: [
      { name: 'Sudarshan T S', dept: 'Engineering', designation: 'Senior Engineer', month: 'November', title: '"EMPLOYEE OF THE MONTH"' },
      { name: 'Channabasava Mule', dept: 'Marketing', designation: 'Marketing Manager', month: 'September', title: '"EMPLOYEE OF THE MONTH"' },
   
      { title: 'Coastal Karnataka Initiates Water Conservation Campaign', description: 'In coastal areas, water conservation initiatives have been launched to protect groundwater and prevent water depletion from lakes and ponds.' },
      { title: 'Jog Falls Conservation Plan Launched', description: 'A new conservation plan for Jog Falls has been launched, aimed at preserving the natural beauty and boosting eco-tourism in the area.' },
      { title: 'Coastal Karnataka Revives Water Sources', description: 'Coastal Karnataka is implementing measures for sea-water desalination and water purification to improve the availability of clean water in the region.' },
      { title: 'Dams Undergo Renovation for Agriculture and Water Supply', description: 'Several dams are undergoing renovation to ensure better water supply for agriculture and meet the rising demands of communities.' },
    ],
    kn: [
      { name: 'ಸುದರ್ಶನ್ ಟಿ ಎಸ್', dept: 'ಎಂಜಿನಿಯರಿಂಗ್', designation: 'ಸೀನಿಯರ್ ಎಂಜಿನಿಯರ್', month: 'ನವೆಂಬರ್', title: 'ಮಾಸದ ಉದ್ಯೋಗಿ' },
      { name: 'ಚನ್ನಬಸವ ಮೂಳೆ', dept: 'ಮಾರ್ಕೆಟಿಂಗ್', designation: 'ಮಾರ್ಕೆಟಿಂಗ್ ಮ್ಯಾನೇಜರ್', month: 'ಸೆಪ್ಟೆಂಬರ್', title: 'ಮಾಸದ ಉದ್ಯೋಗಿ' },

      { title: 'ತೀರ ಪ್ರದೇಶಗಳಲ್ಲಿ ನೀರಿನ ಸಂರಕ್ಷಣೆ ಅಭಿಯಾನ', description: 'ತೀರ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸಮುದ್ರ ತಟವು ಮತ್ತು ಸರೋವರಗಳಲ್ಲಿ ನೀರಿನ ಕಳೆಯುವಿಕೆಯನ್ನು ತಡೆಯಲು ಕಾರ್ಯಾಚರಣೆಗಳು ಪ್ರಾರಂಭವಾಗಿವೆ.' },
      { title: 'ಜೋಗ ಜಲಪಾತದ ಸಮೃದ್ಧ ಸಂರಕ್ಷಣೆ ಯೋಜನೆ', description: 'ಜೋಗ ಜಲಪಾತವನ್ನು ಸಂರಕ್ಷಿಸಲು ಹೊಸ ಯೋಜನೆಗಳನ್ನು ಆರಂಭಿಸಲಾಗಿದೆ, ಇದರಿಂದ ಪ್ರವಾಸಿ ಪ್ರವೃತ್ತಿ ಮತ್ತು ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಕಾಪಾಡಲು ಪ್ರಯತ್ನಿಸಲಾಗಿದೆ.' },
      { title: 'ಕೋಸ್ಟಲ್ ಕರ್ನಾಟಕ: ನೀರಿನ ಮೂಲಗಳ ನವೀಕರಣ', description: 'ಕೋಸ್ಟಲ್ ಕರ್ನಾಟಕದ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸಮುದ್ರ ನೀರಿನ ಮಾರ್ಪಾಡು ಮತ್ತು ನೀರಿನ ಶುದ್ಧೀಕರಣ ಪಧ್ಧತಿಗಳನ್ನು ಅನುಷ್ಠಾನಗೊಳಿಸಲಾಗುತ್ತಿದೆ.' },
      { title: 'ಕೃಷಿ ಮತ್ತು ನೀರಿನ ಅಗತ್ಯಕ್ಕಾಗಿ ಜಲಾಶಯಗಳ ನವೀಕರಣ', description: 'ಕೃಷಿಯ ಬೆಳವಣಿಗೆಯ ದೃಷ್ಟಿಯಿಂದ ಹಲವಾರು ಜಲಾಶಯಗಳನ್ನು ನವೀಕರಿಸುವ ಯೋಜನೆಗಳನ್ನು ಹಮ್ಮಿಕೊಳ್ಳಲಾಗಿದೆ.' },
    ]
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full">
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 33vw"
              onError={(e) => { e.currentTarget.src = '/images/placeholder.jpg'; }}
            />
            {index === currentImageIndex && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 flex flex-col items-start">
                {index < 2 ? ( // Check if it's one of the first two entries
                  <>
                    <h3 className="subtitle-scale font-bold text-white">{employeeInfo[language][index]?.title}</h3>
                    <p className="subtitle-scale font-bold text-white">{employeeInfo[language][index]?.name}</p>
                    <p className="text-white small-scale font-semibold">
                      {translations[language].titles.month}: {employeeInfo[language][index]?.month}
                    </p>
                    <p className="text-white small-scale font-semibold">
                      {translations[language].titles.designation}: {employeeInfo[language][index]?.designation}
                    </p>
                    <p className="text-white small-scale font-semibold">
                      {translations[language].titles.department}: {employeeInfo[language][index]?.dept}
                    </p>
                  </>
                ) : (
                  <div>
                    <h3 className="subtitle-scale font-bold text-white">{employeeInfo[language][index]?.title}</h3>
                    <p className="small-scale text-white">{employeeInfo[language][index]?.description}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))} 
      </div>
    </div>
  );
}