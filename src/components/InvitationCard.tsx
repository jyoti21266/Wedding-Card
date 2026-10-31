import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  MapPin, 
  ExternalLink,
  Share2,
  ChevronLeft,
  ChevronRight
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
  onOpenShareModal
}) => {
  const theme = THEMES[invitation.themeId] || THEMES.blush_lace;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isDateScratched, setIsDateScratched] = useState<boolean>(false);
  const totalPages = 4; // 0: Couple Cover, 1: Date & Scratch, 2: Program, 3: Venue

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

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
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
      className="relative w-full h-full min-h-[82vh] flex flex-col justify-between p-4 sm:p-8 overflow-hidden text-center transition-colors duration-500 select-none"
      style={{
        backgroundColor: theme.cardBg,
        color: theme.textColor
      }}
    >
      {/* Outer Luxury Decorative Arch Border */}
      <div
        className="absolute inset-2 sm:inset-4 rounded-[32px] sm:rounded-[40px] border pointer-events-none"
        style={{
          borderColor: theme.doorBorder,
          boxShadow: 'inset 0 0 24px rgba(180, 150, 130, 0.12)'
        }}
      />

      {/* Top Bar: Section Title & Share Button */}
      <div className="relative z-20 pt-2 flex items-center justify-between px-4 max-w-3xl mx-auto w-full">
        <span className="text-xs sm:text-sm uppercase font-serif tracking-[0.25em] opacity-70">
          {currentPage === 0 && (language === 'hi' ? 'विवाह आमंत्रण' : 'THE WEDDING')}
          {currentPage === 1 && (language === 'hi' ? 'शुभ तिथि एवं समय' : 'DATE & TIME')}
          {currentPage === 2 && (language === 'hi' ? 'कार्यक्रम की रूपरेखा' : 'PROGRAM')}
          {currentPage === 3 && (language === 'hi' ? 'स्थान एवं मार्ग' : 'VENUE & DIRECTIONS')}
        </span>

        <button
          onClick={onOpenShareModal}
          className="p-2 rounded-full border bg-white/90 hover:bg-white text-xs font-sans font-medium text-stone-800 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          style={{ borderColor: theme.doorBorder }}
          title={language === 'hi' ? 'शेयर करें' : 'Share'}
        >
          <Share2 className="w-4 h-4 text-rose-700" />
          <span className="hidden sm:inline">{language === 'hi' ? 'शेयर करें' : 'Share'}</span>
        </button>
      </div>

      {/* FULL SCREEN SWIPEABLE CONTENT CONTAINER */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-auto overflow-hidden px-2 py-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* CARD 0: COUPLE COVER */}
          {currentPage === 0 && (
            <motion.div
              key="card-couple"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -30) nextPage();
                else if (info.offset.x > 30) prevPage();
              }}
              className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 my-auto cursor-grab active:cursor-grabbing w-full h-full py-6"
            >
              <div className="space-y-3">
                <span className="text-xs sm:text-sm uppercase font-sans tracking-[0.3em] opacity-60 block">
                  {language === 'hi' ? 'विवाह आमंत्रण' : 'TOGETHER WITH THEIR FAMILIES'}
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-normal font-normal text-stone-900 leading-tight">
                  {invitation.brideName}
                  <span className="block font-script text-3xl sm:text-5xl font-light text-rose-800/80 my-2">
                    {language === 'hi' ? 'संग' : '&'}
                  </span>
                  {invitation.groomName}
                </h1>
              </div>

              <div className="flex items-center justify-center gap-3 opacity-50 w-44 mx-auto">
                <div className="h-[1px] flex-1 bg-current" />
                <span className="text-sm">✦</span>
                <div className="h-[1px] flex-1 bg-current" />
              </div>

              <p className="font-serif italic text-base sm:text-xl px-4 max-w-md leading-relaxed opacity-85">
                {invitation.invitationNote[language]}
              </p>

              <div className="pt-4 text-xs font-sans tracking-widest opacity-60 animate-pulse flex items-center gap-1.5">
                <span>{language === 'hi' ? 'स्वाइप करें ← →' : 'Swipe left / right ← →'}</span>
              </div>
            </motion.div>
          )}

          {/* CARD 1: DATE & TIME SCRATCH CARD */}
          {currentPage === 1 && (
            <motion.div
              key="card-date"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -30) nextPage();
                else if (info.offset.x > 30) prevPage();
              }}
              className="flex flex-col items-center justify-center space-y-5 sm:space-y-6 my-auto cursor-grab active:cursor-grabbing w-full h-full py-4"
            >
              <div
                className="py-2 px-6 rounded-full border shadow-xs inline-flex items-center gap-2"
                style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
              >
                <span className="text-xs">✦</span>
                <h2 className="font-serif text-sm sm:text-base tracking-widest uppercase font-medium">
                  {language === 'hi' ? 'शुभ तिथि एवं समय' : 'Date & Time'}
                </h2>
                <span className="text-xs">✦</span>
              </div>

              {/* Scratch Card Date Container */}
              <div className="relative w-52 sm:w-60 mx-auto">
                <div
                  className="w-full py-7 px-4 rounded-[40px] flex flex-col items-center justify-center shadow-xl border relative transition-transform"
                  style={{
                    backgroundColor: theme.badgeBg,
                    borderColor: theme.doorBorder,
                    boxShadow: `0 12px 30px -4px rgba(130, 100, 90, 0.18)`
                  }}
                >
                  <div
                    className="absolute inset-2 rounded-[34px] border pointer-events-none opacity-40"
                    style={{ borderColor: theme.fontAccent }}
                  />

                  <span className="font-serif text-6xl sm:text-7xl font-light text-stone-900 leading-none">
                    {invitation.date.split('-')[2] || '04'}
                  </span>

                  <span className="font-serif uppercase tracking-[0.25em] text-sm sm:text-base font-medium mt-1.5">
                    {invitation.monthName[language]}
                  </span>

                  <span className="text-xs opacity-40 my-2">✦</span>

                  <span className="font-serif tracking-widest text-xs opacity-75">
                    {invitation.date.split('-')[0] || '2026'}
                  </span>
                </div>

                {/* Scratch-Off Metallic Foil Overlay */}
                <AnimatePresence>
                  {!isDateScratched && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                      transition={{ duration: 0.5 }}
                      onClick={() => {
                        setIsDateScratched(true);
                        try {
                          confetti({
                            particleCount: 70,
                            spread: 80,
                            origin: { y: 0.5 },
                            colors: ['#c5a059', '#e2e8f0', '#f43f5e']
                          });
                        } catch {}
                      }}
                      className="absolute inset-0 rounded-[40px] cursor-pointer flex flex-col items-center justify-center p-3 text-center z-20 overflow-hidden shadow-xl border-2 border-amber-200/60"
                      style={{
                        background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 50%, #64748b 100%)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                      }}
                    >
                      <div className="relative z-10 bg-white/95 backdrop-blur-xs px-4 py-3 rounded-2xl shadow-md border border-stone-200 flex flex-col items-center gap-1">
                        <span className="text-2xl">🪙✨</span>
                        <span className="font-serif font-semibold text-xs sm:text-sm text-stone-900 tracking-wide">
                          {language === 'hi' ? 'तिथि के लिए स्क्रैच करें' : 'Scratch to Reveal'}
                        </span>
                        <span className="text-[10px] text-stone-500 font-sans">
                          {language === 'hi' ? '(टैप करें)' : '(Tap here)'}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Day & Time Pills */}
              <div className="flex items-center justify-center gap-3 w-full max-w-sm">
                <div
                  className="flex-1 py-2.5 px-3 rounded-2xl border text-center text-xs sm:text-sm font-serif uppercase tracking-wider font-medium shadow-2xs"
                  style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
                >
                  {invitation.dayOfWeek[language]}
                </div>

                <div
                  className="flex-1 py-2.5 px-3 rounded-2xl border text-center text-xs sm:text-sm font-serif uppercase tracking-wider font-medium shadow-2xs"
                  style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
                >
                  {invitation.time}
                </div>
              </div>

              {/* Live Countdown Clock */}
              <div className="pt-2 w-full max-w-md">
                <span className="text-[10px] uppercase font-sans tracking-widest opacity-60 block mb-1.5">
                  {language === 'hi' ? 'शुभ घड़ी की उल्टी गिनती' : 'COUNTDOWN TO THE CELEBRATION'}
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-2xl bg-white/80 border border-stone-200/80 shadow-2xs">
                    <span className="block font-mono text-xl sm:text-2xl font-semibold leading-tight">{countdown.days}</span>
                    <span className="text-[9px] uppercase opacity-60">{language === 'hi' ? 'दिन' : 'Days'}</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/80 border border-stone-200/80 shadow-2xs">
                    <span className="block font-mono text-xl sm:text-2xl font-semibold leading-tight">{countdown.hours}</span>
                    <span className="text-[9px] uppercase opacity-60">{language === 'hi' ? 'घंटे' : 'Hrs'}</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/80 border border-stone-200/80 shadow-2xs">
                    <span className="block font-mono text-xl sm:text-2xl font-semibold leading-tight">{countdown.minutes}</span>
                    <span className="text-[9px] uppercase opacity-60">{language === 'hi' ? 'मिनट' : 'Min'}</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/80 border border-stone-200/80 shadow-2xs">
                    <span className="block font-mono text-xl sm:text-2xl font-semibold leading-tight">{countdown.seconds}</span>
                    <span className="text-[9px] uppercase opacity-60">{language === 'hi' ? 'सेकंड' : 'Sec'}</span>
                  </div>
                </div>
              </div>

              {/* Add to Calendar button */}
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium text-stone-700 bg-white/90 hover:bg-white border border-stone-200 shadow-2xs transition-colors"
              >
                <Calendar className="w-4 h-4 text-rose-700" />
                <span>{language === 'hi' ? 'गूगल कैलेंडर में जोड़ें' : 'Add to Google Calendar'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-50" />
              </a>
            </motion.div>
          )}

          {/* CARD 2: TIMELINE PROGRAM */}
          {currentPage === 2 && (
            <motion.div
              key="card-timeline"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -30) nextPage();
                else if (info.offset.x > 30) prevPage();
              }}
              className="flex flex-col items-center justify-center space-y-4 my-auto px-2 cursor-grab active:cursor-grabbing w-full h-full py-4"
            >
              <div
                className="py-2 px-6 rounded-full border shadow-xs inline-flex items-center gap-2"
                style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
              >
                <span className="text-xs">✦</span>
                <h2 className="font-serif text-sm sm:text-base tracking-wide font-medium">
                  {language === 'hi' ? 'कार्यक्रम की रूपरेखा' : 'Day\'s Program'}
                </h2>
                <span className="text-xs">✦</span>
              </div>

              {/* Timeline List */}
              <div className="space-y-4 w-full max-w-md bg-white/70 backdrop-blur-xs p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs text-center">
                {invitation.timeline.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <div className="flex flex-col items-center text-center space-y-1">
                      {item.dateLabel && (
                        <span className="font-sans text-xs uppercase font-semibold text-rose-800 tracking-wider">
                          {item.dateLabel[language]}
                        </span>
                      )}
                      <span className="font-mono text-xs opacity-60 tracking-wider">
                        {item.time}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900">
                        {item.title[language]}
                      </h3>
                      {item.description && (
                        <p className="font-sans text-xs opacity-80 max-w-[280px] leading-relaxed">
                          {item.description[language]}
                        </p>
                      )}
                    </div>

                    {idx < invitation.timeline.length - 1 && (
                      <div className="flex justify-center opacity-30 py-1">
                        <span className="text-xs">✦ ✦ ✦</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          )}

          {/* CARD 3: VENUE & MAP DIRECTIONS */}
          {currentPage === 3 && (
            <motion.div
              key="card-venue"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -30) nextPage();
                else if (info.offset.x > 30) prevPage();
              }}
              className="flex flex-col items-center justify-center space-y-5 my-auto px-2 cursor-grab active:cursor-grabbing w-full h-full py-4"
            >
              <div
                className="py-2 px-6 rounded-full border shadow-xs inline-flex items-center gap-2"
                style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
              >
                <span className="text-xs">✦</span>
                <h2 className="font-serif text-sm sm:text-base tracking-wide font-medium">
                  {language === 'hi' ? 'स्थान एवं मार्ग दर्शन' : 'Venue & Directions'}
                </h2>
                <span className="text-xs">✦</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                  {invitation.venueName}
                </h3>
                <p className="font-sans text-xs sm:text-sm opacity-80 max-w-sm mx-auto leading-relaxed">
                  {invitation.venueAddress}, {invitation.city}
                </p>
              </div>

              {/* Styled Mini Map Mockup */}
              <div
                className="w-full max-w-[300px] sm:max-w-[340px] h-36 sm:h-40 rounded-3xl border overflow-hidden relative shadow-inner flex items-center justify-center"
                style={{ backgroundColor: '#e8ece9', borderColor: theme.doorBorder }}
              >
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#4a7c59_1px,transparent_1px)] [background-size:14px_14px]" />
                <div className="absolute right-0 top-0 bottom-0 w-28 bg-blue-100/60 border-l border-blue-200" />

                <div className="relative z-10 flex flex-col items-center p-3 rounded-2xl bg-white/95 shadow-md border border-stone-200">
                  <MapPin className="w-6 h-6 text-rose-700 animate-bounce" />
                  <span className="text-xs font-sans font-medium text-stone-800 mt-0.5">
                    {invitation.venueName}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full max-w-xs pt-1">
                <a
                  href={invitation.venueMapUrl || 'https://share.google/xkzQAxwm8RNDp9yi5'}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-5 rounded-xl border bg-white/90 hover:bg-white text-xs sm:text-sm font-sans font-medium text-stone-800 flex items-center justify-center gap-2 shadow-2xs transition-colors"
                  style={{ borderColor: theme.doorBorder }}
                >
                  <MapPin className="w-4 h-4 text-rose-700" />
                  <span>{language === 'hi' ? 'गूगल मैप्स पर देखें (मार्ग)' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM SWIPE NAVIGATION CONTROLS */}
      <div className="relative z-20 pb-2 pt-1 flex items-center justify-between px-4 max-w-3xl mx-auto w-full">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`py-2 px-4 rounded-full border shadow-2xs inline-flex items-center gap-1.5 text-xs font-serif transition-all active:scale-95 ${
            currentPage === 0 ? 'opacity-30 pointer-events-none' : 'hover:bg-white/90 cursor-pointer'
          }`}
          style={{
            backgroundColor: theme.badgeBg,
            borderColor: theme.doorBorder,
            color: theme.textColor
          }}
          aria-label="Previous card"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'पीछे' : 'Prev'}</span>
        </button>

        {/* Page progress dots */}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentPage ? 'w-6 bg-stone-800' : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className={`py-2 px-4 rounded-full border shadow-2xs inline-flex items-center gap-1.5 text-xs font-serif transition-all active:scale-95 ${
            currentPage === totalPages - 1 ? 'opacity-30 pointer-events-none' : 'hover:bg-white/90 cursor-pointer'
          }`}
          style={{
            backgroundColor: theme.badgeBg,
            borderColor: theme.doorBorder,
            color: theme.textColor
          }}
          aria-label="Next card"
        >
          <span>{language === 'hi' ? 'आगे' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
