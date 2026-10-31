import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  MapPin, 
  ExternalLink,
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
  onOpenShareModal
}) => {
  const theme = THEMES[invitation.themeId] || THEMES.blush_lace;
  const [isDateScratched, setIsDateScratched] = useState<boolean>(false);

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
      className="relative w-full min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-6 overflow-y-auto text-center transition-colors duration-500 space-y-16"
      style={{ backgroundColor: theme.cardBg, color: theme.textColor }}
    >
      {/* Background Decorative Parchment Frame */}
      <div
        className="absolute inset-4 rounded-[32px] border pointer-events-none"
        style={{
          borderColor: theme.doorBorder,
          boxShadow: 'inset 0 0 24px rgba(180, 150, 130, 0.1)'
        }}
      />

      {/* Share Button top right float */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={onOpenShareModal}
          className="px-3.5 py-2 rounded-full border bg-white/90 hover:bg-white text-xs font-sans font-medium text-stone-800 shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          style={{ borderColor: theme.doorBorder }}
        >
          <Share2 className="w-4 h-4 text-rose-700" />
          <span>{language === 'hi' ? 'शेयर करें' : 'Share'}</span>
        </button>
      </div>

      {/* SECTION 1: COUPLE COVER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center justify-center space-y-6 pt-10 max-w-lg mx-auto"
      >
        <div className="space-y-2">
          <span className="text-xs uppercase font-sans tracking-[0.3em] opacity-60 block">
            {language === 'hi' ? 'विवाह आमंत्रण' : 'THE WEDDING INVITATION'}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-normal font-normal text-stone-900 leading-tight">
            {invitation.brideName}
            <span className="block font-script text-3xl sm:text-4xl font-light text-rose-800/80 my-1.5">
              {language === 'hi' ? 'संग' : '&'}
            </span>
            {invitation.groomName}
          </h1>
        </div>

        {/* Ornamental Divider */}
        <div className="flex items-center justify-center gap-3 opacity-50 w-40 mx-auto">
          <div className="h-[1px] flex-1 bg-current" />
          <span className="text-xs">✦</span>
          <div className="h-[1px] flex-1 bg-current" />
        </div>

        {/* Witness Note */}
        <p className="font-serif italic text-base sm:text-lg px-4 max-w-md leading-relaxed opacity-85">
          {invitation.invitationNote[language]}
        </p>
      </motion.div>

      {/* SECTION 2: DATE & TIME SCRATCH CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center justify-center space-y-6 max-w-md mx-auto w-full pt-4"
      >
        <div className="py-2 px-6 rounded-full border shadow-xs inline-flex items-center gap-2" style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}>
          <span className="text-xs">✦</span>
          <h2 className="font-serif text-sm tracking-widest uppercase font-medium">
            {language === 'hi' ? 'शुभ तिथि एवं समय' : 'Date & Time'}
          </h2>
          <span className="text-xs">✦</span>
        </div>

        {/* Scratch Card Date Container */}
        <div className="relative w-52 sm:w-56 mx-auto">
          <div
            className="w-full py-7 px-4 rounded-[40px] flex flex-col items-center justify-center shadow-lg border relative transition-transform"
            style={{
              backgroundColor: theme.badgeBg,
              borderColor: theme.doorBorder,
              boxShadow: `
                0 10px 30px -4px rgba(130, 100, 90, 0.15),
                inset 0 1px 2px rgba(255, 255, 255, 0.9),
                inset 0 -2px 4px rgba(0, 0, 0, 0.04)
              `
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
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.6)'
                }}
              >
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
                
                <div className="relative z-10 bg-white/95 backdrop-blur-xs px-4 py-3 rounded-2xl shadow-md border border-stone-200 flex flex-col items-center gap-1 transition-transform hover:scale-105">
                  <span className="text-2xl">🪙✨</span>
                  <span className="font-serif font-semibold text-xs sm:text-sm text-stone-900 tracking-wide">
                    {language === 'hi' ? 'तिथि के लिए स्क्रैच करें' : 'Scratch to Reveal'}
                  </span>
                  <span className="text-[10px] text-stone-500 font-sans">
                    {language === 'hi' ? '(क्लिक करें)' : '(Tap here)'}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Two pill badges below: Day of Week & Hour */}
        <div className="flex items-center justify-center gap-3 w-full max-w-sm">
          <div
            className="flex-1 py-3 px-4 rounded-2xl border text-center text-xs sm:text-sm font-serif uppercase tracking-wider font-medium shadow-sm"
            style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
          >
            {invitation.dayOfWeek[language]}
          </div>

          <div
            className="flex-1 py-3 px-4 rounded-2xl border text-center text-xs sm:text-sm font-serif uppercase tracking-wider font-medium shadow-sm"
            style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
          >
            {invitation.time}
          </div>
        </div>

        {/* Live Countdown Clock */}
        <div className="pt-2 w-full max-w-md">
          <span className="text-[11px] uppercase font-sans tracking-widest opacity-60 block mb-2">
            {language === 'hi' ? 'शुभ घड़ी की उल्टी गिनती' : 'COUNTDOWN TO THE CELEBRATION'}
          </span>
          <div className="grid grid-cols-4 gap-2.5 text-center">
            <div className="p-3 rounded-2xl bg-white/80 border border-stone-200/80 shadow-xs">
              <span className="block font-mono text-2xl font-semibold leading-tight">{countdown.days}</span>
              <span className="text-[10px] uppercase opacity-60">{language === 'hi' ? 'दिन' : 'Days'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-stone-200/80 shadow-xs">
              <span className="block font-mono text-2xl font-semibold leading-tight">{countdown.hours}</span>
              <span className="text-[10px] uppercase opacity-60">{language === 'hi' ? 'घंटे' : 'Hrs'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-stone-200/80 shadow-xs">
              <span className="block font-mono text-2xl font-semibold leading-tight">{countdown.minutes}</span>
              <span className="text-[10px] uppercase opacity-60">{language === 'hi' ? 'मिनट' : 'Min'}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/80 border border-stone-200/80 shadow-xs">
              <span className="block font-mono text-2xl font-semibold leading-tight">{countdown.seconds}</span>
              <span className="text-[10px] uppercase opacity-60">{language === 'hi' ? 'सेकंड' : 'Sec'}</span>
            </div>
          </div>
        </div>

        {/* Add to Calendar button */}
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium text-stone-700 bg-white/90 hover:bg-white border border-stone-200 shadow-xs transition-colors"
        >
          <Calendar className="w-4 h-4 text-rose-700" />
          <span>{language === 'hi' ? 'गूगल कैलेंडर में जोड़ें' : 'Add to Google Calendar'}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-50" />
        </a>
      </motion.div>

      {/* SECTION 3: TIMELINE PROGRAM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 flex flex-col items-center justify-center space-y-6 max-w-md mx-auto w-full pt-4"
      >
        <div
          className="py-2 px-6 rounded-full border shadow-xs inline-flex items-center gap-2"
          style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
        >
          <span className="text-xs">✦</span>
          <h2 className="font-serif text-base sm:text-lg tracking-wide font-medium">
            {language === 'hi' ? 'कार्यक्रम की रूपरेखा' : 'Day\'s Program'}
          </h2>
          <span className="text-xs">✦</span>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 w-full max-w-md bg-white/70 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
          {invitation.timeline.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center text-center space-y-1.5">
                {item.dateLabel && (
                  <span className="font-sans text-xs uppercase font-semibold text-rose-800 tracking-wider">
                    {item.dateLabel[language]}
                  </span>
                )}
                <span className="font-mono text-xs opacity-60 tracking-wider">
                  {item.time}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900">
                  {item.title[language]}
                </h3>
                {item.description && (
                  <p className="font-sans text-xs sm:text-sm opacity-80 max-w-[320px] leading-relaxed">
                    {item.description[language]}
                  </p>
                )}
              </div>

              {idx < invitation.timeline.length - 1 && (
                <div className="flex justify-center opacity-40 py-2">
                  <span className="text-xs">✦ ✦ ✦</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* SECTION 4: VENUE & MAP DIRECTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 flex flex-col items-center justify-center space-y-6 max-w-md mx-auto w-full pb-16 pt-4"
      >
        <div
          className="py-2 px-6 rounded-full border shadow-xs inline-flex items-center gap-2"
          style={{ backgroundColor: theme.badgeBg, borderColor: theme.doorBorder }}
        >
          <span className="text-xs">✦</span>
          <h2 className="font-serif text-base sm:text-lg tracking-wide font-medium">
            {language === 'hi' ? 'स्थान एवं मार्ग दर्शन' : 'Venue & Directions'}
          </h2>
          <span className="text-xs">✦</span>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
            {invitation.venueName}
          </h3>
          <p className="font-sans text-xs sm:text-sm opacity-80 max-w-sm mx-auto leading-relaxed">
            {invitation.venueAddress}, {invitation.city}
          </p>
        </div>

        {/* Styled Mini Map Mockup */}
        <div
          className="w-full max-w-[320px] h-40 rounded-3xl border overflow-hidden relative shadow-inner flex items-center justify-center"
          style={{ backgroundColor: '#e8ece9', borderColor: theme.doorBorder }}
        >
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#4a7c59_1px,transparent_1px)] [background-size:14px_14px]" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-blue-100/60 border-l border-blue-200" />

          <div className="relative z-10 flex flex-col items-center p-3.5 rounded-2xl bg-white/95 shadow-md border border-stone-200">
            <MapPin className="w-6 h-6 text-rose-700 animate-bounce" />
            <span className="text-xs font-sans font-medium text-stone-800 mt-1">
              {invitation.venueName}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs pt-2">
          <a
            href={invitation.venueMapUrl || 'https://share.google/xkzQAxwm8RNDp9yi5'}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-5 rounded-xl border bg-white/90 hover:bg-white text-xs sm:text-sm font-sans font-medium text-stone-800 flex items-center justify-center gap-2 shadow-xs transition-colors"
            style={{ borderColor: theme.doorBorder }}
          >
            <MapPin className="w-4 h-4 text-rose-700" />
            <span>{language === 'hi' ? 'गूगल मैप्स पर देखें (मार्ग)' : 'Open in Google Maps'}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-50" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};
