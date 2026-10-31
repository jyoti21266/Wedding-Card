import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  QrCode, 
  ExternalLink
} from 'lucide-react';
import { InvitationData, Language } from '../types/invitation';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitation: InvitationData;
  language: Language;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  invitation,
  language
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = encodeURIComponent(
    `${invitation.brideName} & ${invitation.groomName} ${language === 'hi' ? 'शुभ विवाह आमंत्रण' : 'Wedding Invitation'}\n${invitation.date} · ${invitation.venueName}\n${currentUrl}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-stone-200 text-stone-900 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-800 flex items-center justify-center mx-auto mb-2">
            <QrCode className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-medium">
            {language === 'hi' ? 'निमंत्रण शेयर करें' : 'Share Invitation'}
          </h3>
          <p className="text-xs text-stone-500 font-sans leading-relaxed">
            {language === 'hi'
              ? 'आपके अतिथि इस क्यूआर (QR) कोड को स्कैन करके या लिंक खोलकर 3D निमंत्रण देख सकते हैं।'
              : 'Guests can scan this QR code or click the link to experience the invitation.'}
          </p>
        </div>

        {/* Generated QR Code Card */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col items-center justify-center shadow-inner">
          <div className="p-2 bg-white rounded-lg shadow-xs border border-stone-200">
            <svg
              viewBox="0 0 160 160"
              className="w-36 h-36"
              fill="currentColor"
              aria-label="QR Code"
            >
              {/* Corner position markers */}
              <rect x="10" y="10" width="40" height="40" rx="4" fill="#2d2825" />
              <rect x="18" y="18" width="24" height="24" rx="2" fill="#fff" />
              <rect x="24" y="24" width="12" height="12" rx="1" fill="#2d2825" />

              <rect x="110" y="10" width="40" height="40" rx="4" fill="#2d2825" />
              <rect x="118" y="18" width="24" height="24" rx="2" fill="#fff" />
              <rect x="124" y="24" width="12" height="12" rx="1" fill="#2d2825" />

              <rect x="10" y="110" width="40" height="40" rx="4" fill="#2d2825" />
              <rect x="18" y="118" width="24" height="24" rx="2" fill="#fff" />
              <rect x="24" y="124" width="12" height="12" rx="1" fill="#2d2825" />

              {/* Data pattern matrix */}
              <rect x="60" y="15" width="8" height="8" fill="#2d2825" />
              <rect x="75" y="15" width="8" height="16" fill="#2d2825" />
              <rect x="90" y="20" width="10" height="8" fill="#2d2825" />
              <rect x="60" y="35" width="16" height="8" fill="#2d2825" />
              <rect x="85" y="35" width="12" height="12" fill="#2d2825" />

              <rect x="15" y="60" width="8" height="12" fill="#2d2825" />
              <rect x="30" y="65" width="16" height="8" fill="#2d2825" />
              <rect x="55" y="55" width="12" height="12" fill="#2d2825" />
              <rect x="75" y="60" width="16" height="16" rx="2" fill="#881337" />
              <rect x="100" y="60" width="8" height="8" fill="#2d2825" />
              <rect x="120" y="65" width="24" height="8" fill="#2d2825" />

              <rect x="15" y="80" width="16" height="8" fill="#2d2825" />
              <rect x="40" y="85" width="8" height="16" fill="#2d2825" />
              <rect x="60" y="85" width="12" height="8" fill="#2d2825" />
              <rect x="80" y="90" width="12" height="12" fill="#2d2825" />
              <rect x="105" y="80" width="24" height="8" fill="#2d2825" />
              <rect x="135" y="85" width="12" height="12" fill="#2d2825" />

              <rect x="60" y="115" width="12" height="12" fill="#2d2825" />
              <rect x="80" y="110" width="16" height="8" fill="#2d2825" />
              <rect x="105" y="115" width="8" height="24" fill="#2d2825" />
              <rect x="125" y="125" width="20" height="8" fill="#2d2825" />
              <rect x="65" y="135" width="24" height="8" fill="#2d2825" />
            </svg>
          </div>
          <span className="text-[11px] font-mono text-stone-500 mt-2">
            {invitation.brideName} & {invitation.groomName} · {invitation.date}
          </span>
        </div>

        {/* Copy Link Input */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl border border-stone-200 bg-stone-50">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-transparent px-2 text-xs font-mono text-stone-600 truncate focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 rounded-lg text-xs font-sans font-medium text-white bg-stone-900 hover:bg-stone-800 transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>{language === 'hi' ? 'कॉपी हो गया' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{language === 'hi' ? 'कॉपी करें' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}`}
            target="_blank"
            rel="noreferrer"
            className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-sans font-medium text-stone-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>WhatsApp</span>
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>

          <a
            href={`mailto:?subject=${encodeURIComponent(
              `${invitation.brideName} & ${invitation.groomName} ${language === 'hi' ? 'विवाह निमंत्रण' : 'Wedding Invitation'}`
            )}&body=${shareText}`}
            className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-sans font-medium text-stone-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Email</span>
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>
        </div>
      </div>
    </div>
  );
};
