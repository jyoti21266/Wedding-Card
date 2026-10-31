import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  MapPin, 
  Heart, 
  Check, 
  ExternalLink,
  Send,
  Share2
} from 'lucide-react';
import { InvitationData, Language, RsvpEntry, GuestWish } from '../types/invitation';
import { THEMES } from '../data/defaultInvitation';

interface InvitationCardProps {
  invitation: InvitationData;
  language: Language;
  onRsvpSubmit: (entry: Omit<RsvpEntry, 'id' | 'submittedAt'>) => void;
  guestWishes: GuestWish[];
  onAddWish: (author: string, message: string) => void;
  onOpenShareModal: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  invitation,
  language,
  onRsvpSubmit,
  guestWishes,
  onAddWish,
  onOpenShareModal
}) => {
  const theme = THEMES[invitation.themeId] || THEMES.blush_lace;
  const [currentPage, setCurrentPage] = useState<number>(0);
  
  // RSVP Form state
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState<'attending' | 'declined'>('attending');
  const [guestCount, setGuestCount] = useState(1);
  const [dietaryNote, setDietaryNote] = useState('');
  const [phone, setPhone] = useState('');
  const [blessingMessage, setBlessingMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // New wish state
  const [wishAuthor, setWishAuthor] = useState('');
  const [wishText, setWishText] = useState('');
  const [wishSent, setWishSent] = useState(false);

  // Countdown timer calculation
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(`${invitation.date}T${invitation.time}:00`);
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [invitation.date, invitation.time]);

  const totalPages = 7; // Couple, Date, Timeline, Menu, RSVP, Venue, Wishes

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    onRsvpSubmit({
      fullName: fullName.trim(),
      status,
      guestCount: status === 'attending' ? guestCount : 0,
      dietaryNote: dietaryNote.trim() || undefined,
      phone: phone.trim() || undefined,
      blessingMessage: blessingMessage.trim() || undefined
    });

    if (status === 'attending') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: [theme.accent, '#f59e0b', '#ec4899', '#ffffff']
        });
      } catch {
        // Fallback if confetti fails
      }
    }

    setIsSubmitted(true);
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishAuthor.trim() || !wishText.trim()) return;
    onAddWish(wishAuthor.trim(), wishText.trim());
    setWishAuthor('');
    setWishText('');
    setWishSent(true);
    setTimeout(() => setWishSent(false), 3000);
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    const startIso = `${invitation.date.replace(/-/g, '')}T${invitation.time.replace(':', '')}00`;
    const title = encodeURIComponent(`${invitation.brideName} & ${invitation.groomName} Wedding`);
    const details = encodeURIComponent(`${invitation.venueName}\n${invitation.venueAddress}`);
    const location = encodeURIComponent(`${invitation.venueName}, ${invitation.city}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${startIso}&details=${details}&location=${location}`;
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between p-5 overflow-hidden text-center transition-colors duration-500"
      style={{ backgroundColor: theme.cardBg, color: theme.textColor }}
    >
      {/* Background Decorative Parchment Arch */}
      <div
        className="absolute inset-3 rounded-[32px] border pointer-events-none"
        style={{
          borderColor: theme.doorBorder,
          boxShadow: 'inset 0 0 16px rgba(180, 150, 130, 0.1)'
        }}
      />

      {/* Top Left Delicate Floral Lace Motif */}
      <div className="absolute top-4 left-4 w-28 h-28 pointer-events-none opacity-45">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current" style={{ color: theme.accent }}>
          <path d="M0,0 C30,0 50,20 60,40 C50,60 30,50 20,70 C10,90 0,100 0,100 Z" opacity="0.4" />
          <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="35" cy="15" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="15" cy="35" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M10,10 Q30,5 40,25 Q50,45 25,40 Z" opacity="0.6" />
        </svg>
      </div>

      {/* Bottom Right Floral Lace Motif */}
      <div className="absolute bottom-4 right-4 w-28 h-28 pointer-events-none opacity-45 transform rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current" style={{ color: theme.accent }}>
          <path d="M0,0 C30,0 50,20 60,40 C50,60 30,50 20,70 C10,90 0,100 0,100 Z" opacity="0.4" />
          <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="35" cy="15" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="15" cy="35" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Top Brand Watermark */}
      <div className="relative z-10 pt-2 flex items-center justify-between px-3">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`p-1.5 rounded-full transition-opacity ${
            currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-70 hover:opacity-100 hover:bg-stone-200/50'
          }`}
          aria-label="Previous Page"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <span className="font-serif italic text-xs tracking-widest uppercase opacity-60">
          Invitely
        </span>

        <button
          onClick={onOpenShareModal}
          className="p-1.5 rounded-full opacity-70 hover:opacity-100 hover:bg-stone-200/50"
          title={language === 'hi' ? 'निमंत्रण शेयर करें' : 'Share Invitation'}
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* SLIDING CONTENT PAGES */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-2 overflow-y-auto px-2">
        <AnimatePresence mode="wait">
          {/* PAGE 0: COUPLE COVER */}
          {currentPage === 0 && (
            <motion.div
              key="page-couple"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center space-y-5 my-auto"
            >
              {/* Couple Names */}
              <div className="space-y-1">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-normal font-normal text-stone-800">
                  {invitation.brideName}
                  <span className="block font-script text-2xl sm:text-3xl font-light text-rose-800/80 my-0.5">
                    {language === 'hi' ? 'संग' : '&'}
                  </span>
                  {invitation.groomName}
                </h1>
              </div>

              {/* Ornamental Divider */}
              <div className="flex items-center justify-center gap-2 opacity-50 w-32 mx-auto">
                <div className="h-[1px] flex-1 bg-current" />
                <span className="text-xs">✦</span>
                <div className="h-[1px] flex-1 bg-current" />
              </div>

              {/* Witness Note */}
              <p className="font-serif italic text-sm sm:text-base px-4 max-w-xs leading-relaxed opacity-85">
                {invitation.invitationNote[language]}
              </p>

            </motion.div>
          )}

          {/* PAGE 1: DATE & TIME CARTOUCHE */}
          {currentPage === 1 && (
            <motion.div
              key="page-date"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center space-y-4 my-auto"
            >
              <span className="text-xs uppercase font-sans tracking-[0.25em] opacity-70">
                {language === 'hi' ? 'शुभ तिथि एवं समय' : 'DATE & TIME'}
              </span>

              {/* Main Embossed Cameo Badge */}
              <div
                className="w-44 sm:w-48 py-5 px-4 rounded-[40px] flex flex-col items-center justify-center shadow-lg border relative transition-transform hover:scale-102"
                style={{
                  backgroundColor: theme.badgeBg,
                  borderColor: theme.doorBorder,
                  boxShadow: `
                    0 8px 24px -4px rgba(130, 100, 90, 0.15),
                    inset 0 1px 2px rgba(255, 255, 255, 0.9),
                    inset 0 -2px 4px rgba(0, 0, 0, 0.04)
                  `
                }}
              >
                {/* Cartouche Inner Filigree border */}
                <div
                  className="absolute inset-2 rounded-[34px] border pointer-events-none opacity-40"
                  style={{ borderColor: theme.fontAccent }}
                />

                <span className="font-serif text-5xl sm:text-6xl font-light text-stone-900 leading-none">
                  {invitation.date.split('-')[2] || '08'}
                </span>

                <span className="font-serif uppercase tracking-[0.2em] text-xs sm:text-sm font-medium mt-1">
                  {invitation.monthName[language]}
                </span>

                <span className="text-[10px] opacity-40 my-1">✦</span>

                <span className="font-serif tracking-widest text-xs opacity-75">
                  {invitation.date.split('-')[0] || '2026'}
                </span>
              </div>

              {/* Two pill badges below: Day of Week & Hour */}
              <div className="flex items-center justify-center gap-3 w-full max-w-xs">
                <div
                  className="flex-1 py-2 px-3 rounded-2xl border text-center text-xs font-serif uppercase tracking-wider font-medium shadow-sm"
                  style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
                >
                  {invitation.dayOfWeek[language]}
                </div>

                <div
                  className="flex-1 py-2 px-3 rounded-2xl border text-center text-xs font-serif uppercase tracking-wider font-medium shadow-sm"
                  style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
                >
                  {invitation.time}
                </div>
              </div>

              {/* Live Countdown Clock */}
              <div className="pt-2 w-full max-w-xs">
                <span className="text-[10px] uppercase font-sans tracking-widest opacity-60 block mb-1.5">
                  {language === 'hi' ? 'शुभ घड़ी की उल्टी गिनती' : 'COUNTDOWN'}
                </span>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  <div className="p-1.5 rounded-xl bg-white/70 border border-stone-200/80 shadow-xs">
                    <span className="block font-mono text-base font-semibold leading-tight">{countdown.days}</span>
                    <span className="text-[9px] uppercase opacity-60">{language === 'hi' ? 'दिन' : 'Days'}</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-white/70 border border-stone-200/80 shadow-xs">
                    <span className="block font-mono text-base font-semibold leading-tight">{countdown.hours}</span>
                    <span className="text-[9px] uppercase opacity-60">{language === 'hi' ? 'घंटे' : 'Hrs'}</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-white/70 border border-stone-200/80 shadow-xs">
                    <span className="block font-mono text-base font-semibold leading-tight">{countdown.minutes}</span>
                    <span className="text-[9px] uppercase opacity-60">{language === 'hi' ? 'मिनट' : 'Min'}</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-white/70 border border-stone-200/80 shadow-xs">
                    <span className="block font-mono text-base font-semibold leading-tight">{countdown.seconds}</span>
                    <span className="text-[9px] uppercase opacity-60">{language === 'hi' ? 'सेकंड' : 'Sec'}</span>
                  </div>
                </div>
              </div>

              {/* Add to Calendar button */}
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium text-stone-700 bg-white/80 hover:bg-white border border-stone-200 shadow-xs transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-rose-700" />
                <span>{language === 'hi' ? 'गूगल कैलेंडर में जोड़ें' : 'Add to Google Calendar'}</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </motion.div>
          )}

          {/* PAGE 2: TIMELINE PROGRAM */}
          {currentPage === 2 && (
            <motion.div
              key="page-timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center space-y-4 my-auto px-2"
            >
              {/* Cameo Cartouche Header */}
              <div
                className="py-1.5 px-6 rounded-full border shadow-xs inline-flex items-center gap-2"
                style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
              >
                <span className="text-xs">✦</span>
                <h2 className="font-serif text-base tracking-wide font-medium">
                  {language === 'hi' ? 'कार्यक्रम की रूपरेखा' : 'Day\'s Program'}
                </h2>
                <span className="text-xs">✦</span>
              </div>

              {/* Timeline List */}
              <div className="space-y-3 w-full max-w-xs">
                {invitation.timeline.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <div className="flex flex-col items-center text-center">
                      <span className="font-mono text-xs opacity-60 tracking-wider">
                        {item.time}
                      </span>
                      <h3 className="font-serif text-lg font-medium text-stone-900 mt-0.5">
                        {item.title[language]}
                      </h3>
                      {item.description && (
                        <p className="font-sans text-[11px] opacity-75 max-w-[240px] mt-0.5 leading-snug">
                          {item.description[language]}
                        </p>
                      )}
                    </div>

                    {idx < invitation.timeline.length - 1 && (
                      <div className="flex justify-center opacity-40">
                        <span className="text-[10px]">✦</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          )}

          {/* PAGE 3: MENÜ / DINNER */}
          {currentPage === 3 && (
            <motion.div
              key="page-menu"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center space-y-4 my-auto px-2"
            >
              {/* Cameo Cartouche Header */}
              <div
                className="py-1.5 px-6 rounded-full border shadow-xs inline-flex items-center gap-2"
                style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
              >
                <span className="text-xs">✦</span>
                <h2 className="font-serif text-base tracking-wide font-medium">
                  {language === 'hi' ? 'शाही मेन्यू' : 'Gourmet Menu'}
                </h2>
                <span className="text-xs">✦</span>
              </div>

              {/* Menu Courses */}
              <div className="space-y-3 w-full max-w-xs">
                {invitation.menu.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <div className="flex flex-col items-center text-center">
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase opacity-65 font-medium">
                        {item.course[language]}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-medium text-stone-900 mt-0.5">
                        {item.title[language]}
                      </h3>
                      <p className="font-serif italic text-xs opacity-75 max-w-[250px] mt-0.5 leading-snug">
                        {item.description[language]}
                      </p>
                    </div>

                    {idx < invitation.menu.length - 1 && (
                      <div className="flex justify-center opacity-40">
                        <span className="text-[10px]">✦</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          )}

          {/* PAGE 4: RSVP / KATILIM FORM */}
          {currentPage === 4 && (
            <motion.div
              key="page-rsvp"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center space-y-3 my-auto w-full max-w-xs mx-auto"
            >
              {/* Cameo Cartouche Header */}
              <div
                className="py-1 px-5 rounded-full border shadow-xs inline-flex items-center gap-1.5"
                style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
              >
                <span className="text-[10px]">✦</span>
                <h2 className="font-serif text-sm tracking-widest font-semibold uppercase">
                  RSVP
                </h2>
                <span className="text-[10px]">✦</span>
              </div>

              <div className="space-y-0.5">
                <h3 className="font-serif text-base uppercase tracking-wider font-medium text-stone-800">
                  {language === 'hi' ? 'आपकी उपस्थिति' : 'YOUR ATTENDANCE'}
                </h3>
                <p className="font-serif italic text-xs opacity-75">
                  {language === 'hi'
                    ? 'कृपया अपनी उपस्थिति की सूचना हमें अवश्य दें।'
                    : 'Kindly let us know if you will be celebrating with us.'}
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-5 rounded-2xl bg-white/90 border border-stone-200 shadow-sm text-center space-y-2 w-full"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-stone-900">
                    {language === 'hi' ? 'आपकी प्रतिक्रिया प्राप्त हुई!' : 'RSVP Received!'}
                  </h4>
                  <p className="text-xs opacity-75 leading-relaxed">
                    {status === 'attending'
                      ? (language === 'hi'
                          ? `धन्यवाद ${fullName}, आपके स्वागत के लिए हम अत्यंत उत्सुक हैं!`
                          : `Thank you ${fullName}, we cannot wait to celebrate with you!`)
                      : (language === 'hi'
                          ? `सूचना देने के लिए धन्यवाद, ${fullName}।`
                          : `Thank you for letting us know, ${fullName}.`)}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-sans text-stone-600 underline hover:text-stone-900 pt-2 block mx-auto"
                  >
                    {language === 'hi' ? 'प्रतिक्रिया संपादित करें' : 'Edit Response'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="w-full space-y-2.5 text-left">
                  {/* FULL NAME Field */}
                  <div>
                    <label className="block text-[10px] uppercase font-sans tracking-widest opacity-70 mb-1 text-center">
                      {language === 'hi' ? 'पूरा नाम' : 'FULL NAME'}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={language === 'hi' ? 'अपना नाम दर्ज करें...' : 'Enter your name...'}
                      className="w-full px-3 py-1.5 rounded-xl border bg-white/80 text-stone-800 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-stone-400 placeholder:italic placeholder:text-stone-400 text-center"
                      style={{ borderColor: theme.doorBorder }}
                    />
                  </div>

                  {/* Radio Choice: Attending / Declined */}
                  <div className="space-y-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setStatus('attending')}
                      className={`w-full py-2 px-3 rounded-xl border text-xs font-serif flex items-center justify-center gap-2 transition-all ${
                        status === 'attending'
                          ? 'bg-white shadow-xs font-semibold'
                          : 'bg-white/40 opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        borderColor: status === 'attending' ? theme.primary : theme.doorBorder
                      }}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          status === 'attending' ? 'border-rose-800' : 'border-stone-400'
                        }`}
                      >
                        {status === 'attending' && (
                          <div className="w-2 h-2 rounded-full bg-rose-800" />
                        )}
                      </div>
                      <span>{language === 'hi' ? 'अवश्य उपस्थित रहूँगा/रहूँगी' : 'I will attend'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStatus('declined')}
                      className={`w-full py-2 px-3 rounded-xl border text-xs font-serif flex items-center justify-center gap-2 transition-all ${
                        status === 'declined'
                          ? 'bg-white shadow-xs font-semibold'
                          : 'bg-white/40 opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        borderColor: status === 'declined' ? theme.primary : theme.doorBorder
                      }}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          status === 'declined' ? 'border-rose-800' : 'border-stone-400'
                        }`}
                      >
                        {status === 'declined' && (
                          <div className="w-2 h-2 rounded-full bg-rose-800" />
                        )}
                      </div>
                      <span>{language === 'hi' ? 'दुर्भाग्यवश उपस्थित नहीं हो पाऊँगा/पाऊँगी' : 'Unfortunately I cannot attend'}</span>
                    </button>
                  </div>

                  {/* Guest count stepper (if attending) */}
                  {status === 'attending' && (
                    <div className="pt-1">
                      <label className="block text-[10px] uppercase font-sans tracking-widest opacity-70 mb-1 text-center">
                        {language === 'hi' ? 'अतिथियों की संख्या' : 'NUMBER OF GUESTS'}
                      </label>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                          className="w-7 h-7 rounded-full border bg-white/80 hover:bg-white text-stone-700 flex items-center justify-center text-sm font-medium shadow-xs"
                          style={{ borderColor: theme.doorBorder }}
                        >
                          -
                        </button>
                        <span className="font-mono text-base font-semibold w-6 text-center">
                          {guestCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount((c) => Math.min(6, c + 1))}
                          className="w-7 h-7 rounded-full border bg-white/80 hover:bg-white text-stone-700 flex items-center justify-center text-sm font-medium shadow-xs"
                          style={{ borderColor: theme.doorBorder }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl font-serif text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98]"
                      style={{
                        backgroundColor: theme.badgeBg,
                        color: theme.textColor,
                        border: `1px solid ${theme.doorBorder}`
                      }}
                    >
                      <span>{language === 'hi' ? 'स्वीकृति भेजें' : 'SUBMIT RSVP'}</span>
                      <span>→</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {/* PAGE 5: VENUE & MAP DIRECTIONS */}
          {currentPage === 5 && (
            <motion.div
              key="page-venue"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center space-y-3.5 my-auto px-2"
            >
              <div
                className="py-1.5 px-6 rounded-full border shadow-xs inline-flex items-center gap-2"
                style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
              >
                <span className="text-xs">✦</span>
                <h2 className="font-serif text-base tracking-wide font-medium">
                  {language === 'hi' ? 'स्थान एवं मार्ग दर्शन' : 'Venue & Directions'}
                </h2>
                <span className="text-xs">✦</span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl font-medium text-stone-900">
                  {invitation.venueName}
                </h3>
                <p className="font-sans text-xs opacity-75 max-w-xs mx-auto">
                  {invitation.venueAddress}, {invitation.city}
                </p>
              </div>

              {/* Styled Mini Map Mockup */}
              <div
                className="w-full max-w-[260px] h-32 rounded-2xl border overflow-hidden relative shadow-inner flex items-center justify-center"
                style={{ backgroundColor: '#e8ece9', borderColor: theme.doorBorder }}
              >
                {/* Stylized water / land graphics */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#4a7c59_1px,transparent_1px)] [background-size:12px_12px]" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-blue-100/60 border-l border-blue-200" />

                <div className="relative z-10 flex flex-col items-center p-2 rounded-xl bg-white/95 shadow-md border border-stone-200">
                  <MapPin className="w-5 h-5 text-rose-700 animate-bounce" />
                  <span className="text-[10px] font-sans font-medium text-stone-800">
                    {invitation.venueName}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full max-w-xs">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${invitation.venueName} ${invitation.venueAddress}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl border bg-white/90 hover:bg-white text-xs font-sans font-medium text-stone-800 flex items-center justify-center gap-2 shadow-xs transition-colors"
                  style={{ borderColor: theme.doorBorder }}
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-700" />
                  <span>{language === 'hi' ? 'गूगल मैप्स पर देखें (मार्ग)' : 'Open in Google Maps'}</span>
                </a>

                <div className="p-2 rounded-xl bg-white/60 border border-stone-200/80 text-[11px] font-sans opacity-80">
                  <span className="font-semibold block mb-0.5">
                    {language === 'hi' ? 'परिधान (ड्रेस कोड):' : 'Dress Code:'}
                  </span>
                  <span>{language === 'hi' ? 'पारंपरिक भारतीय / फॉर्मल इवनिंग भव्यता' : 'Formal Evening Elegance / Black Tie'}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* PAGE 6: WISHES / ANILAR GUESTBOOK */}
          {currentPage === 6 && (
            <motion.div
              key="page-wishes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-between h-full space-y-3 py-1 px-2"
            >
              <div
                className="py-1 px-5 rounded-full border shadow-xs inline-flex items-center gap-2"
                style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
              >
                <Heart className="w-3 h-3 text-rose-600 fill-current" />
                <h2 className="font-serif text-sm tracking-wide font-medium">
                  {language === 'hi' ? 'शुभकामनाएं एवं आशीर्वाद' : 'Guest Wishes Wall'}
                </h2>
              </div>

              {/* Feed of messages */}
              <div className="w-full flex-1 overflow-y-auto space-y-2 pr-1 max-h-48 text-left">
                {guestWishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="p-2.5 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-serif font-semibold text-stone-800">
                        {wish.author}
                      </span>
                      <span className="text-[9px] opacity-50">{wish.date}</span>
                    </div>
                    <p className="font-serif italic text-xs text-stone-700 leading-snug">
                      "{wish.message}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Form to leave wish */}
              <form onSubmit={handleWishSubmit} className="w-full space-y-1.5 pt-1 text-left">
                {wishSent ? (
                  <div className="py-2 text-center text-xs text-emerald-700 bg-emerald-50 rounded-xl">
                    {language === 'hi' ? 'आपकी शुभकामना प्रेषित हो गई!' : 'Your wish was shared!'}
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      required
                      placeholder={language === 'hi' ? 'आपका नाम...' : 'Your name...'}
                      value={wishAuthor}
                      onChange={(e) => setWishAuthor(e.target.value)}
                      className="w-full px-2.5 py-1 text-xs rounded-lg border bg-white/90 text-stone-800 focus:outline-none"
                      style={{ borderColor: theme.doorBorder }}
                    />
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        required
                        placeholder={language === 'hi' ? 'नवदंपति के लिए मंगलकामनाएं लिखें...' : 'Write a warm wish to the couple...'}
                        value={wishText}
                        onChange={(e) => setWishText(e.target.value)}
                        className="flex-1 px-2.5 py-1 text-xs rounded-lg border bg-white/90 text-stone-800 focus:outline-none"
                        style={{ borderColor: theme.doorBorder }}
                      />
                      <button
                        type="submit"
                        className="px-3 py-1 rounded-lg text-xs font-sans font-medium bg-stone-800 text-white hover:bg-stone-900 transition-colors"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM SCROLL BUTTON & PAGE INDICATORS */}
      <div className="relative z-10 pt-2 flex flex-col items-center space-y-2">
        <button
          onClick={nextPage}
          className="py-1 px-4 rounded-full border shadow-xs inline-flex items-center gap-1.5 text-xs font-serif italic transition-transform active:scale-95 hover:bg-white/90"
          style={{
            backgroundColor: theme.badgeBg,
            borderColor: theme.doorBorder,
            color: theme.textColor
          }}
        >
          <span>
            {currentPage === totalPages - 1
              ? (language === 'hi' ? 'प्रारंभ पर जाएं ↑' : 'Back to Top ↑')
              : (language === 'hi' ? 'नीचे स्क्रॉल करें ↓' : 'Scroll Down ↓')}
          </span>
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Page progress dots */}
        <div className="flex items-center justify-center gap-1.5 pb-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentPage ? 'w-5 bg-stone-800' : 'w-1.5 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
