import { InvitationData, RsvpEntry, ThemeConfig, GuestWish } from '../types/invitation';

export const THEMES: Record<string, ThemeConfig> = {
  blush_lace: {
    id: 'blush_lace',
    name: { 
      en: 'Blush Rose & Lace (From Video)', 
      hi: 'गुलाबी गुलाब एवं लेस (वीडियो से)' 
    },
    primary: '#8b5e52',
    accent: '#c49a88',
    doorBg: '#f2e8e1',
    doorBorder: '#dbcbc0',
    doorTexture: 'rgba(219, 203, 192, 0.4)',
    sealColor: '#ede4dc',
    sealAccent: '#a88679',
    cardBg: '#faf5f0',
    textColor: '#4a3b34',
    badgeBg: '#f0e6de',
    fontAccent: '#9c7365'
  },
  emerald_gold: {
    id: 'emerald_gold',
    name: { 
      en: 'Emerald Green & Gold Foil', 
      hi: 'शाही पन्ना एवं स्वर्ण वर्क' 
    },
    primary: '#1e3a2f',
    accent: '#c5a059',
    doorBg: '#1b3227',
    doorBorder: '#c5a059',
    doorTexture: 'rgba(197, 160, 89, 0.25)',
    sealColor: '#254436',
    sealAccent: '#d8b56f',
    cardBg: '#fcfbf7',
    textColor: '#1a2e24',
    badgeBg: '#f4ede0',
    fontAccent: '#a27f3d'
  },
  midnight_silver: {
    id: 'midnight_silver',
    name: { 
      en: 'Midnight Navy & Silver Pearls', 
      hi: 'मध्यरात्रि नीला एवं रजत मोती' 
    },
    primary: '#1c2438',
    accent: '#94a3b8',
    doorBg: '#1e283d',
    doorBorder: '#cbd5e1',
    doorTexture: 'rgba(203, 213, 225, 0.2)',
    sealColor: '#2b3650',
    sealAccent: '#e2e8f0',
    cardBg: '#f8fafc',
    textColor: '#1e293b',
    badgeBg: '#e2e8f0',
    fontAccent: '#475569'
  },
  champagne_pearl: {
    id: 'champagne_pearl',
    name: { 
      en: 'Champagne & Pearl White', 
      hi: 'शैंपेन एवं मोती श्वेत' 
    },
    primary: '#6b5849',
    accent: '#d4af37',
    doorBg: '#f7f4ed',
    doorBorder: '#dfd7c5',
    doorTexture: 'rgba(212, 175, 55, 0.25)',
    sealColor: '#f1ede1',
    sealAccent: '#bfa368',
    cardBg: '#fffdfa',
    textColor: '#423830',
    badgeBg: '#f5efe1',
    fontAccent: '#967d4e'
  }
};

export const DEFAULT_INVITATION: InvitationData = {
  brideName: 'Jyoti',
  groomName: 'Ankit',
  eventType: 'wedding',
  tagline: {
    en: '',
    hi: ''
  },
  invitationNote: {
    en: 'we would be honored to have you with us to witness this moment',
    hi: 'इस पावन परिणय सूत्र एवं मंगल बेला के साक्षी बनने हेतु आपका स्नेहिल आगमन सादर प्रार्थनीय है।'
  },
  brideFamily: {
    en: 'Yıldız FAMILY',
    hi: 'यिल्दिज़ परिवार (वधू पक्ष)'
  },
  groomFamily: {
    en: 'Demir FAMILY',
    hi: 'डेमिर परिवार (वर पक्ष)'
  },
  date: '2026-12-04',
  time: '19:00',
  dayOfWeek: {
    en: 'FRIDAY',
    hi: 'शुक्रवार'
  },
  monthName: {
    en: 'DECEMBER',
    hi: 'दिसंबर'
  },
  venueName: 'Shree Farms & Resort',
  venueAddress: 'Ram Jatan Colony, S.N. Singh Lane, near Sudha Milk Parlour',
  city: 'Patna, Bihar 800014',
  venueMapUrl: 'https://share.google/xkzQAxwm8RNDp9yi5',
  mapCoordinates: { lat: 25.5941, lng: 85.1376 },
  themeId: 'blush_lace',
  musicEnabled: true,
  timeline: [
    {
      id: '1',
      dateLabel: { en: '2 Dec 2026', hi: '2 दिसंबर 2026' },
      time: '16:00',
      title: { 
        en: 'Mehndi', 
        hi: 'मेहंदी' 
      },
      description: { 
        en: "A festive gathering where intricate henna designs are applied to the bride's hands and feet.", 
        hi: "एक उत्सवपूर्ण समारोह जहाँ वधू के हाथों और पैरों पर सुंदर मेहंदी लगाई जाती है।" 
      }
    },
    {
      id: '2',
      dateLabel: { en: '3 Dec 2026', hi: '3 दिसंबर 2026' },
      time: '10:30',
      title: { 
        en: 'Haldi', 
        hi: 'हल्दी' 
      },
      description: { 
        en: "A joyful morning ritual where a turmeric paste is applied to the bride and groom for a glowing blessing.", 
        hi: "एक आनंदमय सुबह की रस्म जहाँ वधू और वर को हल्दी का लेप लगाया जाता है।" 
      }
    },
    {
      id: '3',
      dateLabel: { en: '3 Dec 2026', hi: '3 दिसंबर 2026' },
      time: '18:30',
      title: { 
        en: 'Sangeet', 
        hi: 'संगीत' 
      },
      description: { 
        en: "A high-energy night of music, food, and choreographed family dance-offs.", 
        hi: "संगीत, भोजन और पारिवारिक नृत्य प्रदर्शन की एक ऊर्जावान रात।" 
      }
    },
    {
      id: '4',
      dateLabel: { en: '4 Dec 2026', hi: '4 दिसंबर 2026' },
      time: '19:00',
      title: { 
        en: 'Shaadi', 
        hi: 'शादी' 
      },
      description: { 
        en: "is the main wedding day ceremony where the couple is united in holy matrimony through sacred vows taken around a holy fire", 
        hi: "यह मुख्य विवाह समारोह है जहाँ पवित्र अग्नि के फेरे लेकर युगल परिणय सूत्र में बंधते हैं।" 
      }
    }
  ],
  menu: [
    {
      id: 'course-1',
      course: { en: 'STARTER', hi: 'क्षुधावर्धक (स्टार्टर)' },
      title: { 
        en: 'Welcome Reception Hors d\'oeuvres', 
        hi: 'शाही स्वागत क्षुधावर्धक' 
      },
      description: { 
        en: 'Artisan canapés, truffle crostini and botanical signature drinks', 
        hi: 'विशिष्ट स्वादिष्ट स्नैक्स, मिनी बाइट्स एवं रिफ्रेशिंग मॉकटेल' 
      }
    },
    {
      id: 'course-2',
      course: { en: 'MAIN COURSE', hi: 'मुख्य व्यंजन' },
      title: { 
        en: 'Chef\'s Signature Entrée', 
        hi: 'शेफ का खास मुख्य व्यंजन' 
      },
      description: { 
        en: 'Slow-roasted tenderloin with truffle potato purée and glazed baby root vegetables', 
        hi: 'शाही रिच ग्रेवी व्यंजन, सुगंधित बासमती पुलाव एवं तंदूरी नान' 
      }
    },
    {
      id: 'course-3',
      course: { en: 'DESSERT', hi: 'मिष्ठान्न (डेज़र्ट)' },
      title: { 
        en: 'Wedding Celebration Cake', 
        hi: 'उत्सव केक एवं मिष्ठान्न' 
      },
      description: { 
        en: 'Multi-tiered vanilla sponge with Madagascar vanilla cream & wild berry coulis', 
        hi: 'वेनिला एवं बेरी लेयर्ड केक तथा केसरिया मलाई कुल्फी' 
      }
    }
  ]
};

export const INITIAL_RSVP_LIST: RsvpEntry[] = [
  {
    id: 'rsvp-1',
    fullName: 'राहुल एवं प्रिया शर्मा',
    status: 'attending',
    guestCount: 2,
    dietaryNote: 'शुद्ध शाकाहारी',
    submittedAt: '2026-08-01 14:20',
    phone: '+91 98765 43210',
    blessingMessage: 'मेलिसा और केरेम को विवाह की हार्दिक शुभकामनाएं! हम दोनों जरूर उपस्थित रहेंगे।'
  },
  {
    id: 'rsvp-2',
    fullName: 'Dr. Arjun Verma',
    status: 'attending',
    guestCount: 1,
    dietaryNote: 'Gluten-free',
    submittedAt: '2026-08-02 10:15',
    phone: '+91 98111 22334',
    blessingMessage: 'Congratulations! This 3D digital invitation is truly magnificent.'
  },
  {
    id: 'rsvp-3',
    fullName: 'अमित एवं नीता कपूर',
    status: 'attending',
    guestCount: 2,
    submittedAt: '2026-08-02 18:45',
    phone: '+91 98222 33445',
    blessingMessage: 'आपके इस खास दिन पर हम आपके साथ जश्न मनाने के लिए अत्यंत उत्सुक हैं।'
  },
  {
    id: 'rsvp-4',
    fullName: 'Ananya Roy',
    status: 'declined',
    guestCount: 0,
    dietaryNote: 'Traveling abroad',
    submittedAt: '2026-08-03 09:30',
    phone: '+91 98333 44556',
    blessingMessage: 'Heartiest congratulations to the wonderful couple! Wishing you a lifetime of joy.'
  },
  {
    id: 'rsvp-5',
    fullName: 'रोहन सिंघानिया एवं सपरिवार',
    status: 'attending',
    guestCount: 3,
    submittedAt: '2026-08-03 16:10',
    phone: '+91 98444 55667',
    blessingMessage: 'सदा खुश रहें, आप दोनों की जोड़ी सलामत रहे।'
  }
];

export const INITIAL_GUEST_WISHES: GuestWish[] = [
  {
    id: 'wish-1',
    author: 'नेहा एवं कुणाल',
    message: 'आप दोनों का नया जीवन प्रेम, सुख और सौहार्द से परिपूर्ण हो। ढेर सारा प्यार और आशीष!',
    date: '2 दिन पहले',
    likes: 15
  },
  {
    id: 'wish-2',
    author: 'Uncle Rajesh & Family',
    message: 'May your bond grow stronger with each passing year. Heartfelt blessings to the lovely couple!',
    date: '3 days ago',
    likes: 22
  },
  {
    id: 'wish-3',
    author: 'पूजा और विकास',
    message: 'इतना सुंदर 3D आमंत्रण पत्र देखकर मन प्रसन्न हो गया! शादी में बहुत मज़ा आएगा।',
    date: 'कल',
    likes: 11
  }
];
