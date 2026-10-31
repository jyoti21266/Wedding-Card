/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
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
      className={`w-full transition-all duration-700 ${
        isOpen ? 'min-h-screen relative' : 'fixed inset-0 z-50 w-screen h-screen overflow-hidden'
      }`}
      style={{ backgroundColor: theme.cardBg }}
    >
      {/* Revealed Swipeable Cards Content */}
      <div 
        className={`w-full min-h-screen flex items-center justify-center p-3 sm:p-6 transition-opacity duration-700 ${
          isOpen ? 'opacity-100 z-10 relative' : 'opacity-0 pointer-events-none absolute inset-0'
        }`}
      >
        {children}
      </div>

      {/* Full-Screen 3D Doors Overlay */}
      <div
        className={`fixed inset-0 w-screen h-screen transform-style-preserve-3d transition-opacity duration-700 z-50 ${
          isOpen ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100 cursor-pointer'
        }`}
        onClick={!isOpen ? onToggleOpen : undefined}
        title={!isOpen ? (language === 'hi' ? 'खोलने के लिए क्लिक करें' : 'Click to open') : undefined}
      >
        {/* LEFT DOOR */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full door-left-hinge transform-style-preserve-3d z-30 overflow-hidden"
          initial={false}
          animate={{
            rotateY: isOpen ? -115 : 0,
            opacity: isOpen ? 0 : 1
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
              : 'inset -2px 0 16px rgba(0,0,0,0.08), 8px 0 24px rgba(0,0,0,0.15)'
          }}
        >
          {/* Left Door Realistic Floral & Molded Panel Decoration */}
          <div className="relative w-full h-full p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
            <div
              className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(${theme.doorTexture} 1.5px, transparent 1.5px)`,
                backgroundSize: '24px 24px'
              }}
            />

            <div
              className="absolute top-6 left-6 right-0 bottom-6 rounded-tl-[60px] rounded-bl-[30px] border border-white/65 pointer-events-none"
              style={{
                borderRight: 'none',
                boxShadow: 'inset 3px 3px 10px rgba(0,0,0,0.05), 2px 2px 0 rgba(255,255,255,0.8)'
              }}
            />

            {/* Top-Left Ornate Floral Lace Relief */}
            <div className="relative z-10 w-40 h-40 opacity-80 filter drop-shadow-[0_4px_8px_rgba(140,110,100,0.18)]">
              <svg viewBox="0 0 120 120" className="w-full h-full fill-current text-white/90">
                <path d="M10,10 Q40,5 50,30 Q60,5 90,10 Q85,40 60,45 Q90,55 90,85 Q65,75 50,95 Q40,65 10,70 Q25,45 10,10 Z" opacity="0.6"/>
                <circle cx="35" cy="35" r="14" fill="white" opacity="0.7"/>
                <circle cx="35" cy="35" r="7" fill="none" stroke={theme.accent} strokeWidth="1.5" opacity="0.4"/>
                <path d="M20,20 C30,10 50,15 45,35 C40,55 20,45 20,20 Z" fill="white" opacity="0.8"/>
                <path d="M50,25 C65,15 80,30 70,45 C60,55 45,45 50,25 Z" fill="white" opacity="0.75"/>
                <path d="M15,45 C10,65 30,75 40,60 C48,50 30,40 15,45 Z" fill="white" opacity="0.75"/>
              </svg>
            </div>

            {/* Middle Floral Cluster */}
            <div className="relative z-10 w-28 h-40 my-auto opacity-70 filter drop-shadow-[0_4px_8px_rgba(140,110,100,0.15)]">
              <svg viewBox="0 0 80 120" className="w-full h-full fill-white/80">
                <path d="M40,20 Q60,40 40,60 Q20,40 40,20 Z" />
                <path d="M40,60 Q65,80 40,100 Q15,80 40,60 Z" />
                <circle cx="40" cy="60" r="12" fill="white" opacity="0.9"/>
              </svg>
            </div>

            {/* Bottom Floral Lace */}
            <div className="relative z-10 w-40 h-40 opacity-80 filter drop-shadow-[0_4px_8px_rgba(140,110,100,0.18)]">
              <svg viewBox="0 0 120 120" className="w-full h-full fill-current text-white/90">
                <path d="M10,110 Q40,115 50,90 Q60,115 90,110 Q85,80 60,75 Q90,65 90,35 Q65,45 50,25 Q40,55 10,50 Q25,75 10,110 Z" opacity="0.6"/>
                <circle cx="35" cy="85" r="14" fill="white" opacity="0.7"/>
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
            opacity: isOpen ? 0 : 1
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
              : 'inset 2px 0 16px rgba(0,0,0,0.08), -8px 0 24px rgba(0,0,0,0.15)'
          }}
        >
          {/* Right Door Floral & Molded Panel Decoration */}
          <div className="relative w-full h-full p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
            <div
              className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(${theme.doorTexture} 1.5px, transparent 1.5px)`,
                backgroundSize: '24px 24px'
              }}
            />

            <div
              className="absolute top-6 left-0 right-6 bottom-6 rounded-tr-[60px] rounded-br-[30px] border border-white/65 pointer-events-none"
              style={{
                borderLeft: 'none',
                boxShadow: 'inset -3px 3px 10px rgba(0,0,0,0.05), -2px 2px 0 rgba(255,255,255,0.8)'
              }}
            />

            {/* Top-Right Ornate Floral Lace Relief */}
            <div className="relative z-10 w-40 h-40 ml-auto opacity-80 filter drop-shadow-[0_4px_8px_rgba(140,110,100,0.18)]">
              <svg viewBox="0 0 120 120" className="w-full h-full fill-current text-white/90 transform scale-x-[-1]">
                <path d="M10,10 Q40,5 50,30 Q60,5 90,10 Q85,40 60,45 Q90,55 90,85 Q65,75 50,95 Q40,65 10,70 Q25,45 10,10 Z" opacity="0.6"/>
                <circle cx="35" cy="35" r="14" fill="white" opacity="0.7"/>
                <circle cx="35" cy="35" r="7" fill="none" stroke={theme.accent} strokeWidth="1.5" opacity="0.4"/>
              </svg>
            </div>

            {/* Middle Floral Cluster */}
            <div className="relative z-10 w-28 h-40 ml-auto my-auto opacity-70 filter drop-shadow-[0_4px_8px_rgba(140,110,100,0.15)]">
              <svg viewBox="0 0 80 120" className="w-full h-full fill-white/80 transform scale-x-[-1]">
                <path d="M40,20 Q60,40 40,60 Q20,40 40,20 Z" />
                <circle cx="40" cy="60" r="12" fill="white" opacity="0.9"/>
              </svg>
            </div>

            {/* Bottom Floral Lace */}
            <div className="relative z-10 w-40 h-40 ml-auto opacity-80 filter drop-shadow-[0_4px_8px_rgba(140,110,100,0.18)]">
              <svg viewBox="0 0 120 120" className="w-full h-full fill-current text-white/90 transform scale-x-[-1]">
                <path d="M10,110 Q40,115 50,90 Q60,115 90,110 Q85,80 60,75 Q90,65 90,35 Q65,45 50,25 Q40,55 10,50 Q25,75 10,110 Z" opacity="0.6"/>
                <circle cx="35" cy="85" r="14" fill="white" opacity="0.7"/>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* CENTER WAX SEAL CONTAINER */}
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
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
                exit={{ scale: 1.4, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="pointer-events-auto cursor-pointer relative focus:outline-none p-3 rounded-full transition-transform active:scale-95"
                aria-label={language === 'hi' ? 'मुहर खोलें' : 'Open Seal'}
              >
                {/* Pulsing Aura */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-60 filter blur-xl -z-10"
                  animate={{
                    scale: isHovered ? [1.1, 1.35, 1.1] : [1, 1.15, 1],
                    opacity: isHovered ? 0.9 : 0.5
                  }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  style={{ backgroundColor: theme.accent }}
                />

                {/* Oval Wax Seal Stamp */}
                <div
                  className="relative w-28 h-40 sm:w-32 sm:h-44 rounded-[50%] flex items-center justify-center shadow-2xl transition-transform duration-200"
                  style={{
                    backgroundColor: theme.sealColor,
                    border: `2px solid ${theme.doorBorder}`,
                    boxShadow: `
                      0 15px 35px -6px rgba(60, 40, 30, 0.45),
                      inset 0 3px 6px rgba(255, 255, 255, 0.7),
                      inset 0 -4px 8px rgba(0, 0, 0, 0.2)
                    `
                  }}
                >
                  <div
                    className="absolute inset-3 rounded-[50%] border pointer-events-none"
                    style={{ borderColor: theme.sealAccent, opacity: 0.4 }}
                  />

                  {/* Botanical Sprig Motif */}
                  <svg
                    viewBox="0 0 60 90"
                    className="w-14 h-20 fill-current filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                    style={{ color: theme.sealAccent }}
                  >
                    <path
                      d="M30,80 Q29,45 31,12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M30,70 Q16,65 20,55 Q27,58 30,70 Z" />
                    <path d="M30,68 Q44,63 40,53 Q33,56 30,68 Z" />
                    <path d="M30,52 Q14,47 18,37 Q26,40 30,52 Z" />
                    <path d="M30,50 Q46,45 42,35 Q34,38 30,50 Z" />
                    <path d="M30,34 Q18,28 22,20 Q28,24 30,34 Z" />
                    <path d="M30,32 Q42,26 38,18 Q32,22 30,32 Z" />
                    <path d="M30,16 Q28,6 31,2 Q34,6 30,16 Z" />
                  </svg>

                  {/* Interactive Tap Hint Badge */}
                  <div
                    className="absolute -bottom-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wider shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
                    style={{
                      backgroundColor: theme.cardBg,
                      color: theme.textColor,
                      border: `1px solid ${theme.doorBorder}`
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                    <span>{language === 'hi' ? 'मुहर खोलें (टैप करें)' : 'Tap to Open'}</span>
                  </div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FLOATING ACTION OVERLAYS (Sound & Share when open) */}
      {isOpen && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleMute}
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md backdrop-blur-sm transition-transform active:scale-95 border border-stone-200 cursor-pointer"
            title={isMuted ? (language === 'hi' ? 'संगीत चालू करें (नवराई माझी)' : 'Play Music (Navrai Maajhi)') : (language === 'hi' ? 'संगीत बंद करें' : 'Mute Music')}
            aria-label="Sound Toggle"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-rose-700 animate-pulse" />}
          </button>
        </div>
      )}
    </div>
  );
};
