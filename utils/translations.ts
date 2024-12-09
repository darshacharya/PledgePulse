export const translations = {
    en: {
      titles: {
        dashboard: 'Water Department Dashboard',
        news: 'Office News',
        quotes: 'Quotes',
        oathCount: 'Oath',
        peopleTakenOath: 'Number of people taken oath',
        oathDescription: '"I vow to protect and conserve water. I will avoid wasting, polluting, or using water needlessly. I will use water efficiently and contribute to the preservation of the environment. Every day, I commit to taking action to save water."',
        month: 'Month',
        designation: 'Designation',
        department: 'Department',
      },
      quotes: [
        {
          text: '"Water is the driving force of all nature."',
          author: "Leonardo da Vinci"
        },
        {
          text: '"Thousands have lived without love, not one without water."',
          author: "W. H. Auden"
        },
        {
          text: '"When the well is dry, we know the worth of water."',
          author: "Benjamin Franklin"
        }
      ],
      news: [
        {
          id: 1,
          title: "New Water Treatment Plant Inauguration",
          date: "2024-03-20",
          description: "State-of-the-art water treatment facility to be inaugurated next week, improving water quality for over 100,000 residents."
        },
        {
          id: 2,
          title: "Water Conservation Workshop",
          date: "2024-03-25",
          description: "Join us for a hands-on workshop on water conservation techniques and sustainable practices."
        },
        {
          id: 3,
          title: "Pipeline Maintenance Schedule",
          date: "2024-03-22",
          description: "Scheduled maintenance of main pipelines in downtown area. Please check the affected areas and timings."
        }
      ]
    },
    kn: {
      titles: {
        dashboard: 'ಜಲ ಇಲಾಖೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
        news: 'ಕಚೇರಿ ಸುದ್ದಿ',
        quotes: 'ಸುಭಾಷಿತಗಳು',
        oathCount: 'ಪ್ರಮಾಣ ವಚನ',
        peopleTakenOath: 'ಪ್ರಮಾಣ ವಚನ ಸ್ವೀಕರಿಸಿದವರ ಸಂಖ್ಯೆ',
        oathDescription: '"ನಾನು ನೀರನ್ನು ಸಂರಕ್ಷಿಸುವ ಪ್ರತಿಜ್ಞೆ ಮಾಡುತ್ತೇನೆ. ನಾನು ನೀರನ್ನು ಅನಗತ್ಯವಾಗಿ ವ್ಯರ್ಥ ಮಾಡುವುದಿಲ್ಲ, ಕಲುಷಿತಗೊಳಿಸುವುದಿಲ್ಲ ಅಥವಾ ಬಳಸುವುದಿಲ್ಲ. ನಾನು ನೀರನ್ನು ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಬಳಸುತ್ತೇನೆ ಮತ್ತು ಪರಿಸರವನ್ನು ಸಂರಕ್ಷಿಸುವ ನಿಟ್ಟಿನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತೇನೆ. ನೀರನ್ನು ಉಳಿಸಲು ಪ್ರತಿದಿನ ಪ್ರಯತ್ನ ಮಾಡಲು ನಾನು ಬದ್ಧನಾಗಿದ್ದೇನೆ."',
        month: 'ಮಾಸ',
        designation: 'ಪದವಿ',
        department: 'ವಿಭಾಗ',
      },
      quotes: [
        {
          text: '"ನೀರು ಜೀವನ, ನೀರೇ ಮೂಲ, ನೀರೇ ಸರ್ವಸ್ವ."',
          author: "ಕುವೆಂಪು"
        },
        {
          text: '"ನೀರಿನ ಹನಿಯಲ್ಲಿ ಜೀವನದ ಮೌಲ್ಯವಿದೆ."',
          author: "ದ.ರಾ. ಬೇಂದ್ರೆ"
        },
        {
          text: '"ನೀರು ಉಳಿಸಿದರೆ ನಾಳೆ ಬದುಕು ಉಳಿಯುತ್ತದೆ."',
          author: "ಶಿವರಾಮ ಕಾರಂತ"
        }
      ],
      news: [
        {
          id: 1,
          title: "ಹೊಸ ನೀರು ಶುದ್ಧೀಕರಣ ಘಟಕದ ಉದ್ಘಾಟನೆ",
          date: "2024-03-20",
          description: "ಮುಂದಿನ ವಾರ ಅತ್ಯಾಧುನಿಕ ನೀರು ಶುದ್ಧೀಕರಣ ಘಟಕದ ಉದ್ಘಾಟನೆ, 1,00,000 ನಿವಾಸಿಗಳಿಗೆ ಉತ್ತರವಾಗಿದೆ."
        }
        // Add more Kannada quotes
      ]
    }
  };

// Function to get news based on language
export const getNews = async (language: 'en' | 'kn') => {
  // Dummy news items
  const newsItems = [
    {
      id: 1,
      title: language === 'en' ? 'Bengaluru Launches New Water Recycling Initiative' : 'ಬೆಂಗಳೂರು: ಹೊಸ ನೀರಿನ ಪುನರ್ ಚಕ್ರಾವಣಾ ಯೋಜನೆ',
      description: language === 'en' ? 'Bengaluru has successfully launched a new water recycling initiative, expected to reduce water usage by 30%' : 'ಬೆಂಗಳೂರು ನಗರದಲ್ಲಿ ಹೊಸ ನೀರಿನ ಪುನರ್ ಚಕ್ರಾವಣಾ ಯೋಜನೆ ಯಶಸ್ವಿಯಾಗಿ ಆರಂಭವಾಗಿದೆ, ಇದು ನೀರಿನ ಬಳಕೆಯನ್ನು 30% ಕಡಿಮೆ ಮಾಡಲಿದೆ',
      date: '2023-10-01',
    },
    {
      id: 2,
      title: language === 'en' ? 'Mysuru Leads Community Water Conservation Campaign' : 'ಮೈಸೂರು: ಜಲ ಸಂರಕ್ಷಣೆಗೆ ಜನಪ್ರಿಯ ಅಭಿಯಾನ',
      description: language === 'en' ? 'Citizens of Mysuru are actively participating in a community-based water conservation campaign, promoting awareness and reducing water waste.' : 'ಮೈಸೂರು ನಗರದವರು ಜಲ ಸಂರಕ್ಷಣೆಗೆ ಹೆಚ್ಚು ಜಾಗೃತಿ ನೀಡಲು ವಿವಿಧ ಸಮುದಾಯ ಸಕ್ರಿಯವಾಗಿದ್ದು, ನೀರಿನ ಉಳಿತಾಯವನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತಿದ್ದಾರೆ.',
      date: '2023-10-02',
    },
    {
      id: 3,
      title: language === 'en' ? 'Hubballi Implements Safe Water Supply Plan' : 'ಹುಬ್ಬಳ್ಳಿ: ಸುರಕ್ಷಿತ ನೀರಿನ ಪೂರೈಕೆ ಯೋಜನೆ',
      description: language === 'en' ? 'Hubballi has set up numerous water purification units along local streams to ensure a safe and reliable water supply for its residents.' : 'ಹುಬ್ಬಳ್ಳಿ ನಗರದಲ್ಲಿ ಸುರಕ್ಷಿತ ನೀರಿನ ಪೂರೈಕೆಗಾಗಿ ಹತ್ತಾರು ಹೊಸ ಹೊಳೆಗಳಿಗೆ ಮೂಲತಃ ನೀರಿನ ಶುದ್ಧೀಕರಣ ಘಟಕಗಳನ್ನು ಸ್ಥಾಪಿಸಲಾಗಿದೆ.',
      date: '2023-10-03',
    },
    {
      id: 4,
      title: language === 'en' ? 'Karnataka Reduces Dependence on External Water Sources' : 'ಕನ್ನಡನಾಡಿನಲ್ಲಿ ದೇಶಾದ್ಯಾಂತ ಬಾಹ್ಯ ನೀರಿನ ಬಳಕೆ ಅವಲಂಬನೆ ಕಡಿಮೆ',
      description: language === 'en' ? 'Thanks to successful water conservation plans, Karnataka has significantly reduced its dependence on external water sources, ensuring better sustainability' : 'ಅಧಿಕ ನೀರಿನ ಸಂರಕ್ಷಣಾ ಯೋಜನೆಗಳ ಫಲವಾಗಿ ಕರ್ನಾಟಕದಲ್ಲಿ ಬಾಹ್ಯ ನೀರಿನ ಬಳಕೆಯ ಅವಲಂಬನೆ ಕಡಿಮೆ ಆಗಿದ್ದು, ಅದು ಹಕ್ಕಿ ಹಾರಿಸುವ ಮಹತ್ವವನ್ನು ಹೊತ್ತಿದೆ.',
      date: '2023-10-04',
    },
    {
      id: 5,
      title: language === 'en' ? 'Hampi Launches Clean Water Project for Tourists' : 'ಹಂಪಿ: ಪ್ರವಾಸಿಗರಿಗೆ ಸ್ವಚ್ಛ ನೀರಿನ ಕಲ್ಯಾಣ ಯೋಜನೆ',
      description: language === 'en' ? 'Hampi has introduced a new clean water supply initiative, focusing on both water conservation and ensuring safe drinking water for tourists.' : 'ಹಂಪಿ ಪಟ್ಟಣದಲ್ಲಿಯ ನೀರಿನ ಪ್ರವಾಹ ನಿಯಂತ್ರಣ ಮತ್ತು ಸ್ವಚ್ಛ ನೀರಿನ ಪೂರೈಕೆಗಾಗಿ ಹೊಸ ಯೋಜನೆಗಳನ್ನು ಅನುಷ್ಠಾನಗೆ ತರಲಾಗಿದೆ.',
      date: '2023-10-05',
    },
    // Add more dummy news items as needed
  ];

  return newsItems; // Return the dummy news items
};