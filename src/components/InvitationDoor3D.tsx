import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { InvitationData, Language } from '../types/invitation';
import { THEMES } from '../data/defaultInvitation';

interface InvitationDoor3DProps {
  invitation: InvitationData;
  isOpen: boolean;
  onToggleOpen: () => void;
  language: Language;
  isMuted: boolean;
  onToggleMute: () => void;
  children: React.ReactNode;
}

export const InvitationDoor3D: React.FC<InvitationDoor3DProps> = ({
  invitation,
  isOpen,
  onToggleOpen,
  language,
  isMuted,
  onToggleMute,
  children
}) => {
  const theme = THEMES[invitation.themeId] || THEMES.blush_lace;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-[420px] aspect-[9/16] max-h-[740px] mx-auto select-none overflow-hidden rounded-[28px] border transition-all duration-300"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.doorBorder,
        boxShadow: `0 24px 60px -12px rgba(130, 100, 90, 0.22), 0 6px 20px -4px rgba(0,0,0,0.06)`
      }}
    >
      {/* 3D Perspective Container */}
      <div
        className="relative w-full h-full perspective-1200 overflow-hidden"
        style={{ backgroundColor: theme.cardBg }}
      >
        {/* INNER CONTENT (Revealed when doors swing open) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden flex flex-col">
          {children}
        </div>

        {/* 3D DOORS OVERLAY */}
        <div
          className="absolute inset-0 w-full h-full transform-style-preserve-3d transition-opacity duration-700 z-30"
          style={{ 
            pointerEvents: isOpen ? 'none' : 'auto',
            cursor: isOpen ? 'default' : 'pointer'
          }}
          onClick={!isOpen ? onToggleOpen : undefined}
          title={!isOpen ? (language === 'hi' ? 'खोलने के लिए क्लिक करें' : 'Click to open') : undefined}
        >
          {/* LEFT DOOR */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full door-left-hinge transform-style-preserve-3d z-30 overflow-hidden"
            initial={false}
            animate={{
              rotateY: isOpen ? -115 : 0,
              opacity: isOpen ? 0.05 : 1
            }}
            transition={{
              duration: 1.35,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              backgroundColor: theme.doorBg,
              borderRight: `1px solid ${theme.doorBorder}`,
              boxShadow: isOpen
                ? 'none'
                : 'inset -2px 0 8px rgba(0,0,0,0.06), 4px 0 12px rgba(0,0,0,0.1)'
            }}
          >
            {/* Left Door Realistic Floral & Molded Panel Decoration */}
            <div className="relative w-full h-full p-4 flex flex-col justify-between overflow-hidden">
              {/* Subtle Parchment Stippling Texture */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(${theme.doorTexture} 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Inner Arch Inset Molding */}
              <div
                className="absolute top-3 left-3 right-0 bottom-3 rounded-tl-[40px] rounded-bl-[20px] border border-white/60 pointer-events-none"
                style={{
                  borderRight: 'none',
                  boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.04), 1px 1px 0 rgba(255,255,255,0.8)'
                }}
              />

              {/* Top-Left Ornate Floral Lace Relief */}
              <div className="relative z-10 w-28 h-28 opacity-80 filter drop-shadow-[0_2px_4px_rgba(140,110,100,0.18)]">
                <svg viewBox="0 0 120 120" className="w-full h-full fill-current text-white/90">
                  <path d="M10,10 Q40,5 50,30 Q60,5 90,10 Q85,40 60,45 Q90,55 90,85 Q65,75 50,95 Q40,65 10,70 Q25,45 10,10 Z" opacity="0.6"/>
                  <circle cx="35" cy="35" r="14" fill="white" opacity="0.7"/>
                  <circle cx="35" cy="35" r="7" fill="none" stroke={theme.accent} strokeWidth="1.5" opacity="0.4"/>
                  <path d="M20,20 C30,10 50,15 45,35 C40,55 20,45 20,20 Z" fill="white" opacity="0.8"/>
                  <path d="M50,25 C65,15 80,30 70,45 C60,55 45,45 50,25 Z" fill="white" opacity="0.75"/>
                  <path d="M15,45 C10,65 30,75 40,60 C48,50 30,40 15,45 Z" fill="white" opacity="0.75"/>
                  <circle cx="18" cy="18" r="2.5" fill="#fff" filter="drop-shadow(0 1px 1px rgba(0,0,0,0.1))"/>
                  <circle cx="28" cy="14" r="2" fill="#fff"/>
                  <circle cx="40" cy="14" r="2.5" fill="#fff"/>
                  <circle cx="52" cy="18" r="2" fill="#fff"/>
                  <circle cx="62" cy="25" r="2.5" fill="#fff"/>
                </svg>
              </div>

              {/* Middle Floral Cluster */}
              <div className="relative z-10 w-20 h-28 my-auto opacity-70 filter drop-shadow-[0_2px_4px_rgba(140,110,100,0.15)]">
                <svg viewBox="0 0 80 120" className="w-full h-full fill-white/80">
                  <path d="M40,20 Q60,40 40,60 Q20,40 40,20 Z" />
                  <path d="M40,60 Q65,80 40,100 Q15,80 40,60 Z" />
                  <circle cx="40" cy="60" r="12" fill="white" opacity="0.9"/>
                  <circle cx="40" cy="60" r="6" fill={theme.sealColor} opacity="0.3"/>
                </svg>
              </div>

              {/* Bottom Floral Lace */}
              <div className="relative z-10 w-28 h-28 opacity-80 filter drop-shadow-[0_2px_4px_rgba(140,110,100,0.18)]">
                <svg viewBox="0 0 120 120" className="w-full h-full fill-current text-white/90">
                  <path d="M10,110 Q40,115 50,90 Q60,115 90,110 Q85,80 60,75 Q90,65 90,35 Q65,45 50,25 Q40,55 10,50 Q25,75 10,110 Z" opacity="0.6"/>
                  <circle cx="35" cy="85" r="14" fill="white" opacity="0.7"/>
                  <path d="M20,100 C30,110 50,105 45,85 C40,65 20,75 20,100 Z" fill="white" opacity="0.8"/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* RIGHT DOOR */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full door-right-hinge transform-style-preserve-3d z-30 overflow-hidden"
            initial={false}
            animate={{
              rotateY: isOpen ? 115 : 0,
              opacity: isOpen ? 0.05 : 1
            }}
            transition={{
              duration: 1.35,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              backgroundColor: theme.doorBg,
              borderLeft: `1px solid ${theme.doorBorder}`,
              boxShadow: isOpen
                ? 'none'
                : 'inset 2px 0 8px rgba(0,0,0,0.06), -4px 0 12px rgba(0,0,0,0.1)'
            }}
          >
            {/* Right Door Floral & Molded Panel Decoration */}
            <div className="relative w-full h-full p-4 flex flex-col justify-between overflow-hidden">
              <div
                className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(${theme.doorTexture} 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Inner Arch Inset Molding */}
              <div
                className="absolute top-3 left-0 right-3 bottom-3 rounded-tr-[40px] rounded-br-[20px] border border-white/60 pointer-events-none"
                style={{
                  borderLeft: 'none',
                  boxShadow: 'inset -2px 2px 6px rgba(0,0,0,0.04), -1px 1px 0 rgba(255,255,255,0.8)'
                }}
              />

              {/* Top-Right Ornate Floral Lace Relief */}
              <div className="relative z-10 w-28 h-28 ml-auto opacity-80 filter drop-shadow-[0_2px_4px_rgba(140,110,100,0.18)]">
                <svg viewBox="0 0 120 120" className="w-full h-full fill-current text-white/90 transform scale-x-[-1]">
                  <path d="M10,10 Q40,5 50,30 Q60,5 90,10 Q85,40 60,45 Q90,55 90,85 Q65,75 50,95 Q40,65 10,70 Q25,45 10,10 Z" opacity="0.6"/>
                  <circle cx="35" cy="35" r="14" fill="white" opacity="0.7"/>
                  <circle cx="35" cy="35" r="7" fill="none" stroke={theme.accent} strokeWidth="1.5" opacity="0.4"/>
                  <path d="M20,20 C30,10 50,15 45,35 C40,55 20,45 20,20 Z" fill="white" opacity="0.8"/>
                  <path d="M50,25 C65,15 80,30 70,45 C60,55 45,45 50,25 Z" fill="white" opacity="0.75"/>
                  <path d="M15,45 C10,65 30,75 40,60 C48,50 30,40 15,45 Z" fill="white" opacity="0.75"/>
                </svg>
              </div>

              {/* Middle Floral Cluster */}
              <div className="relative z-10 w-20 h-28 ml-auto my-auto opacity-70 filter drop-shadow-[0_2px_4px_rgba(140,110,100,0.15)]">
                <svg viewBox="0 0 80 120" className="w-full h-full fill-white/80 transform scale-x-[-1]">
                  <path d="M40,20 Q60,40 40,60 Q20,40 40,20 Z" />
                  <path d="M40,60 Q65,80 40,100 Q15,80 40,60 Z" />
                  <circle cx="40" cy="60" r="12" fill="white" opacity="0.9"/>
                </svg>
              </div>

              {/* Bottom Floral Lace */}
              <div className="relative z-10 w-28 h-28 ml-auto opacity-80 filter drop-shadow-[0_2px_4px_rgba(140,110,100,0.18)]">
                <svg viewBox="0 0 120 120" className="w-full h-full fill-current text-white/90 transform scale-x-[-1]">
                  <path d="M10,110 Q40,115 50,90 Q60,115 90,110 Q85,80 60,75 Q90,65 90,35 Q65,45 50,25 Q40,55 10,50 Q25,75 10,110 Z" opacity="0.6"/>
                  <circle cx="35" cy="85" r="14" fill="white" opacity="0.7"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CENTER WAX SEAL CONTAINER (Centered via Flexbox, above doors) */}
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
          <AnimatePresence>
            {!isOpen && (
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleOpen();
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: isHovered ? 1.08 : 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="pointer-events-auto cursor-pointer relative focus:outline-none p-2 rounded-full transition-transform active:scale-95"
                aria-label={language === 'hi' ? 'मुहर खोलें' : 'Open Seal'}
              >
                {/* Pulsing Aura */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-60 filter blur-md -z-10"
                  animate={{
                    scale: isHovered ? [1.1, 1.3, 1.1] : [1, 1.15, 1],
                    opacity: isHovered ? 0.8 : 0.4
                  }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  style={{ backgroundColor: theme.accent }}
                />

                {/* Oval Wax Seal Stamp */}
                <div
                  className="relative w-20 h-28 rounded-[50%] flex items-center justify-center shadow-2xl transition-transform duration-200"
                  style={{
                    backgroundColor: theme.sealColor,
                    border: `2px solid ${theme.doorBorder}`,
                    boxShadow: `
                      0 10px 25px -4px rgba(60, 40, 30, 0.35),
                      inset 0 2px 4px rgba(255, 255, 255, 0.7),
                      inset 0 -3px 6px rgba(0, 0, 0, 0.15)
                    `
                  }}
                >
                  {/* Subtle Inner Wax Ring */}
                  <div
                    className="absolute inset-2 rounded-[50%] border pointer-events-none"
                    style={{ borderColor: theme.sealAccent, opacity: 0.4 }}
                  />

                  {/* Botanical Sprig / Olive Branch Motif */}
                  <svg
                    viewBox="0 0 60 90"
                    className="w-12 h-18 fill-current filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                    style={{ color: theme.sealAccent }}
                  >
                    {/* Stem */}
                    <path
                      d="M30,80 Q29,45 31,12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Leaves pair 1 */}
                    <path d="M30,70 Q16,65 20,55 Q27,58 30,70 Z" />
                    <path d="M30,68 Q44,63 40,53 Q33,56 30,68 Z" />
                    {/* Leaves pair 2 */}
                    <path d="M30,52 Q14,47 18,37 Q26,40 30,52 Z" />
                    <path d="M30,50 Q46,45 42,35 Q34,38 30,50 Z" />
                    {/* Leaves pair 3 */}
                    <path d="M30,34 Q18,28 22,20 Q28,24 30,34 Z" />
                    <path d="M30,32 Q42,26 38,18 Q32,22 30,32 Z" />
                    {/* Top leaf */}
                    <path d="M30,16 Q28,6 31,2 Q34,6 30,16 Z" />
                  </svg>

                  {/* Interactive Tap Hint Badge */}
                  <div
                    className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-sans font-medium tracking-wide shadow-md flex items-center gap-1.5 transition-transform hover:scale-105"
                    style={{
                      backgroundColor: theme.cardBg,
                      color: theme.textColor,
                      border: `1px solid ${theme.doorBorder}`
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-amber-600 animate-spin" />
                    <span>{language === 'hi' ? 'मुहर खोलें' : 'Open Seal'}</span>
                  </div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* FLOATING ACTION OVERLAYS INSIDE SIMULATOR */}
        {isOpen && (
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleMute}
              className="p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md backdrop-blur-sm transition-transform active:scale-95 border border-stone-200 cursor-pointer"
              title={isMuted ? (language === 'hi' ? 'संगीत चालू करें (नवराई माझी)' : 'Play Music (Navrai Maajhi)') : (language === 'hi' ? 'संगीत बंद करें' : 'Mute Music')}
              aria-label="Sound Toggle"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-rose-700 animate-pulse" />}
            </button>
          </div>
        )}

        {/* Closed Door Tagline Header */}
        {!isOpen && (
          <div className="absolute top-6 left-0 right-0 z-30 px-6 text-center pointer-events-none">
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif italic text-lg sm:text-xl tracking-wide drop-shadow-sm"
              style={{ color: theme.primary }}
            >
              {invitation.tagline[language]}
            </motion.p>
          </div>
        )}
      </div>
    </div>
  );
};
