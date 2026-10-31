import React from 'react';
import { 
  Palette, 
  Heart, 
  Calendar, 
  Clock, 
  RotateCcw,
  Plus,
  Trash2
} from 'lucide-react';
import { InvitationData, Language } from '../types/invitation';
import { THEMES } from '../data/defaultInvitation';

interface InvitationStudioProps {
  invitation: InvitationData;
  onChangeInvitation: (updated: InvitationData) => void;
  language: Language;
  onReset: () => void;
}

export const InvitationStudio: React.FC<InvitationStudioProps> = ({
  invitation,
  onChangeInvitation,
  language,
  onReset
}) => {
  const updateField = <K extends keyof InvitationData>(key: K, value: InvitationData[K]) => {
    onChangeInvitation({
      ...invitation,
      [key]: value
    });
  };

  const handleAddTimeline = () => {
    const newItem = {
      id: Date.now().toString(),
      time: '22:00',
      title: { en: 'New Event', hi: 'नया कार्यक्रम' },
      description: { en: 'Event description', hi: 'कार्यक्रम विवरण' }
    };
    updateField('timeline', [...invitation.timeline, newItem]);
  };

  const handleDeleteTimeline = (id: string) => {
    updateField(
      'timeline',
      invitation.timeline.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span>Invitely Studio</span>
            <span aria-hidden="true">·</span>
            <span>{language === 'hi' ? 'कस्टमाइज़र स्टू़डियो' : 'Invitation Customizer'}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
            {language === 'hi' ? 'अपना 3D निमंत्रण पत्र तैयार करें' : 'Customize Your 3D Invitation'}
          </h2>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-200 shadow-xs transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
          <span>{language === 'hi' ? 'मूल डिफ़ॉल्ट पर रीसेट करें' : 'Reset to Video Defaults'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SECTION 1: COUPLE & EVENT DETAILS */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Heart className="w-4 h-4 text-rose-700" />
            <h3 className="font-serif text-lg font-medium text-stone-900">
              {language === 'hi' ? 'वर-वधू एवं पारिवारिक विवरण' : 'Couple & Event Details'}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {language === 'hi' ? 'वधू (दुल्हन)' : 'Bride / Partner 1'}
              </label>
              <input
                type="text"
                value={invitation.brideName}
                onChange={(e) => updateField('brideName', e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {language === 'hi' ? 'वर (दूल्हा)' : 'Groom / Partner 2'}
              </label>
              <input
                type="text"
                value={invitation.groomName}
                onChange={(e) => updateField('groomName', e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {language === 'hi' ? 'वधू पक्ष का परिवार' : 'Bride Family'}
              </label>
              <input
                type="text"
                value={invitation.brideFamily[language]}
                onChange={(e) =>
                  updateField('brideFamily', {
                    ...invitation.brideFamily,
                    [language]: e.target.value
                  })
                }
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {language === 'hi' ? 'वर पक्ष का परिवार' : 'Groom Family'}
              </label>
              <input
                type="text"
                value={invitation.groomFamily[language]}
                onChange={(e) =>
                  updateField('groomFamily', {
                    ...invitation.groomFamily,
                    [language]: e.target.value
                  })
                }
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              {language === 'hi' ? 'आमंत्रण संदेश (आशीर्वाद नोट)' : 'Invitation Witness Note'}
            </label>
            <input
              type="text"
              value={invitation.invitationNote[language]}
              onChange={(e) =>
                updateField('invitationNote', {
                  ...invitation.invitationNote,
                  [language]: e.target.value
                })
              }
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none"
            />
          </div>
        </div>

        {/* SECTION 2: THEMES & DOOR PALETTES */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Palette className="w-4 h-4 text-rose-700" />
            <h3 className="font-serif text-lg font-medium text-stone-900">
              {language === 'hi' ? '3D कपाट एवं रंग थीम' : '3D Door & Color Palette'}
            </h3>
          </div>

          <div className="space-y-2">
            {Object.values(THEMES).map((theme) => {
              const isSelected = invitation.themeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => updateField('themeId', theme.id)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-stone-900 bg-stone-50/80 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full border shadow-inner shrink-0"
                      style={{ backgroundColor: theme.doorBg, borderColor: theme.doorBorder }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border shrink-0 -ml-2"
                      style={{ backgroundColor: theme.accent, borderColor: '#fff' }}
                    />
                    <span className="text-xs font-serif font-medium text-stone-900">
                      {theme.name[language]}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="text-[10px] font-sans font-medium text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full">
                      {language === 'hi' ? 'सक्रिय' : 'Active'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: DATE, TIME & VENUE */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Calendar className="w-4 h-4 text-rose-700" />
            <h3 className="font-serif text-lg font-medium text-stone-900">
              {language === 'hi' ? 'शुभ तिथि, समय एवं स्थल' : 'Date, Time & Venue'}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {language === 'hi' ? 'तिथि' : 'Date'}
              </label>
              <input
                type="date"
                value={invitation.date}
                onChange={(e) => updateField('date', e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {language === 'hi' ? 'प्रारंभ समय' : 'Start Time'}
              </label>
              <input
                type="text"
                value={invitation.time}
                onChange={(e) => updateField('time', e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              {language === 'hi' ? 'स्थल का नाम' : 'Venue Name'}
            </label>
            <input
              type="text"
              value={invitation.venueName}
              onChange={(e) => updateField('venueName', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              {language === 'hi' ? 'पता एवं शहर' : 'Address & City'}
            </label>
            <input
              type="text"
              value={invitation.venueAddress}
              onChange={(e) => updateField('venueAddress', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none"
            />
          </div>
        </div>

        {/* SECTION 4: TIMELINE PROGRAM */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-700" />
              <h3 className="font-serif text-lg font-medium text-stone-900">
                {language === 'hi' ? 'कार्यक्रम की रूपरेखा' : 'Timeline & Program'}
              </h3>
            </div>
            <button
              onClick={handleAddTimeline}
              className="inline-flex items-center gap-1 text-xs text-rose-800 hover:text-rose-900 font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'नया जोड़ें' : 'Add'}</span>
            </button>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {invitation.timeline.map((item, index) => (
              <div
                key={item.id}
                className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={item.time}
                  onChange={(e) => {
                    const copy = [...invitation.timeline];
                    copy[index].time = e.target.value;
                    updateField('timeline', copy);
                  }}
                  className="w-16 px-2 py-1 text-xs rounded border border-stone-300 bg-white font-mono text-center"
                />
                <input
                  type="text"
                  value={item.title[language]}
                  onChange={(e) => {
                    const copy = [...invitation.timeline];
                    copy[index].title[language] = e.target.value;
                    updateField('timeline', copy);
                  }}
                  className="flex-1 px-2 py-1 text-xs rounded border border-stone-300 bg-white font-serif"
                />
                <button
                  onClick={() => handleDeleteTimeline(item.id)}
                  className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                  aria-label="Delete item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
