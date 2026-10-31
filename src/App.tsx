/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Share2, 
  Volume2, 
  VolumeX, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { InvitationData, Language, RsvpEntry, GuestWish } from './types/invitation';
import { DEFAULT_INVITATION, INITIAL_RSVP_LIST, INITIAL_GUEST_WISHES } from './data/defaultInvitation';
import { InvitationDoor3D } from './components/InvitationDoor3D';
import { InvitationCard } from './components/InvitationCard';
import { ShareModal } from './components/ShareModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [invitation, setInvitation] = useState<InvitationData>(DEFAULT_INVITATION);
  const [isDoorOpen, setIsDoorOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // Guest list and wishes
  const [rsvpList, setRsvpList] = useState<RsvpEntry[]>(INITIAL_RSVP_LIST);
  const [guestWishes, setGuestWishes] = useState<GuestWish[]>(INITIAL_GUEST_WISHES);

  // Background romantic soundtrack audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/navrai_maajhi.mp3');
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const handleToggleOpen = () => {
    const nextState = !isDoorOpen;
    setIsDoorOpen(nextState);

    if (audioRef.current && !isMuted) {
      if (nextState) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      if (nextMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleUserInteraction = () => {
    if (audioRef.current && audioRef.current.paused && !isMuted) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleRsvpSubmit = (entry: Omit<RsvpEntry, 'id' | 'submittedAt'>) => {
    const newEntry: RsvpEntry = {
      ...entry,
      id: `rsvp-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setRsvpList((prev) => [newEntry, ...prev]);

    if (entry.blessingMessage) {
      handleAddWish(entry.fullName, entry.blessingMessage);
    }
  };

  const handleAddWish = (author: string, message: string) => {
    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      author,
      message,
      date: language === 'hi' ? 'अभी' : 'Just now',
      likes: 1
    };
    setGuestWishes((prev) => [newWish, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans text-stone-900" onClick={handleUserInteraction}>
      {/* Refined Minimalist Top Control Bar (Language, Sound, Share) */}
      <header className="w-full py-4 px-6 flex items-center justify-between max-w-2xl mx-auto">
        {/* Couple Monogram / Date indicator */}
        <div className="flex items-center gap-2">
          <span className="font-serif italic text-base sm:text-lg text-stone-800 tracking-wide">
            {invitation.brideName} & {invitation.groomName}
          </span>
        </div>

        {/* Action Controls: EN / Hindi, Mute, Share */}
        <div className="flex items-center gap-2.5">
          {/* EN / Hindi Switcher */}
          <div className="flex items-center p-0.5 bg-stone-200/90 rounded-lg text-xs font-medium shadow-2xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                language === 'hi'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Sound Toggle with Navrai Maajhi track label */}
          <button
            onClick={handleToggleMute}
            className="px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
            title={
              isMuted
                ? (language === 'hi' ? 'संगीत चालू करें: नवराई माझी' : 'Unmute: Navrai Maajhi (0:18 - 1:40)')
                : (language === 'hi' ? 'संगीत बंद करें' : 'Mute')
            }
            aria-label="Sound Toggle"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-stone-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-rose-700 animate-pulse" />
            )}
            <span className="text-[11px] font-serif text-stone-700">
              {language === 'hi' ? 'नवराई माझी' : 'Navrai Maajhi'}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'hi' ? 'शेयर करें' : 'Share'}</span>
          </button>
        </div>
      </header>
      {/* MAIN VIEWPORT: Digital Wedding Invitation */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 flex flex-col space-y-4">
        {/* 3D Interactive Doors & Luxury Stationery Presentation */}
        <div className="flex-1 flex items-center justify-center py-2">
          <InvitationDoor3D
            invitation={invitation}
            isOpen={isDoorOpen}
            onToggleOpen={handleToggleOpen}
            language={language}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          >
            <InvitationCard
              invitation={invitation}
              language={language}
              onRsvpSubmit={handleRsvpSubmit}
              guestWishes={guestWishes}
              onAddWish={handleAddWish}
              onOpenShareModal={() => setIsShareModalOpen(true)}
            />
          </InvitationDoor3D>
        </div>

        {/* Helpful Hint */}
        <div className="text-center text-xs text-stone-500 font-sans max-w-md mx-auto pt-1 pb-4">
          <p>
            {isDoorOpen
              ? (language === 'hi'
                  ? 'पृष्ठों को पलटने के लिए "नीचे स्क्रॉल करें ↓" बटन अथवा ऊपर दिए गए प्रगति बिंदुओं पर क्लिक करें।'
                  : 'Click "Scroll Down ↓" or the progress dots to browse each page of the invitation.')
              : (language === 'hi'
                  ? 'कपाट खोलने के लिए केंद्र में स्थित सुनहरी पुष्प मुहर को स्पर्श करें।'
                  : 'Tap the floral wax seal in the center to break the seal and swing open the 3D doors.')}
          </p>
        </div>
      </main>

      {/* SHARE / QR CODE MODAL */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        invitation={invitation}
        language={language}
      />
    </div>
  );
}
