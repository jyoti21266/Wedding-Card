import React, { useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ExternalLink, 
  Sparkles
} from 'lucide-react';
import { Language } from '../types/invitation';

interface VideoShowcaseProps {
  language: Language;
  onJumpToSimulator: () => void;
}

interface Chapter {
  time: number;
  label: { en: string; hi: string };
  description: { en: string; hi: string };
}

const CHAPTERS: Chapter[] = [
  {
    time: 0,
    label: { 
      en: '0:00 · Closed Doors & Seal', 
      hi: '0:00 · बंद 3D द्वार एवं शाही मुहर' 
    },
    description: {
      en: 'Embossed floral double-doors with central botanical oval wax seal.',
      hi: 'उत्कीर्ण पुष्प नक्काशीदार दोहरे कपाट एवं केंद्र में वनस्पति रूपांकन वाली अंडाकार मुहर।'
    }
  },
  {
    time: 4,
    label: { 
      en: '0:04 · 3D Door Swing Open', 
      hi: '0:04 · सजीव 3D कपाट उद्घाटन' 
    },
    description: {
      en: 'Tapping the seal triggers realistic 3D perspective opening of both doors.',
      hi: 'मुहर को स्पर्श करते ही दोनों कपाट यथार्थवादी 3D परिप्रेक्ष्य में बाहर की ओर खुलते हैं।'
    }
  },
  {
    time: 8,
    label: { 
      en: '0:08 · Melisa & Kerem Card', 
      hi: '0:08 · मुख्य युगल आमंत्रण पत्र' 
    },
    description: {
      en: 'Arched stationery card with floral lace corners and family blessing.',
      hi: 'मेहराबदार सुंदर कार्ड, कोनों में लेस की नाजुक बनावट एवं परिवारों का आशीर्वाद।'
    }
  },
  {
    time: 13,
    label: { 
      en: '0:13 · Vintage Date Cartouche', 
      hi: '0:13 · विंटेज तिथि एवं समय पदक' 
    },
    description: {
      en: 'Embossed cameo medallion showing August 8, 2026, Saturday, 19:00.',
      hi: 'शाही उभरा हुआ पदक: 08 अगस्त 2026, शनिवार एवं सायं 07:00 बजे का समय।'
    }
  },
  {
    time: 19,
    label: { 
      en: '0:19 · Day\'s Schedule', 
      hi: '0:19 · कार्यक्रम की रूपरेखा' 
    },
    description: {
      en: 'Ceremony, cocktail hour, and dinner celebration breakdown.',
      hi: 'वरमाला-विवाह संस्कार, स्वागत कॉकटेल एवं शुभ प्रीतिभोज का संपूर्ण समय।'
    }
  },
  {
    time: 25,
    label: { 
      en: '0:25 · Wedding Banquet Menu', 
      hi: '0:25 · शाही विवाह भोज मेन्यू' 
    },
    description: {
      en: 'Multi-course menu with starter cocktail, signature entrée and cake.',
      hi: 'क्षुधावर्धक स्नैक्स, मुख्य शाही पकवान एवं मिष्ठान्न केक का स्वादिष्ट क्रम।'
    }
  },
  {
    time: 31,
    label: { 
      en: '0:31 · Interactive RSVP Form', 
      hi: '0:31 · डिजिटल RSVP उपस्थिति प्रपत्र' 
    },
    description: {
      en: 'Guest name input, attending/regrets radio, guest counter, and submit button.',
      hi: 'अतिथि का नाम, उपस्थिति चयन, व्यक्ति संख्या काउंटर एवं स्वीकृति भेजने का बटन।'
    }
  }
];

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  language,
  onJumpToSimulator
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(37.6);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (time >= CHAPTERS[i].time) {
        setActiveChapterIndex(i);
        break;
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 37.6);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans text-stone-500 mb-1">
              <span>Pinterest Pin Showcase</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">pin.it/4YmveAbdj</span>
              <span aria-hidden="true">·</span>
              <span>Invitely Experience</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
              {language === 'hi'
                ? 'मूल वीडियो विश्लेषण: "आपका हमसफ़र इसके लिए ना नहीं कह सकता..."'
                : 'Featured Video: "Your fiancé cannot say No to this..."'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://pin.it/4YmveAbdj"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-rose-700" />
              <span>{language === 'hi' ? 'पिनट्रेस्ट पर देखें' : 'Open on Pinterest'}</span>
            </a>

            <button
              onClick={onJumpToSimulator}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              <span>{language === 'hi' ? '3D मॉडल चलाएं' : 'Try Live 3D Model'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split: Left Player + Right Interactive Chapters & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Dedicated Video Player */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-[28px] overflow-hidden bg-black shadow-2xl border-4 border-stone-700">
            <video
              ref={videoRef}
              src="/invitely_video.mp4"
              className="w-full h-full object-cover"
              playsInline
              loop
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
            />

            {/* Play overlay button if paused */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Play Video"
              >
                <Play className="w-7 h-7 ml-1 fill-white" />
              </button>
            )}

            {/* Bottom Controls Bar on Video */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-1.5 text-white text-xs">
              {/* Progress Slider */}
              <input
                type="range"
                min={0}
                max={duration || 37.6}
                step={0.1}
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-1 hover:text-rose-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-1 hover:text-rose-400 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px] opacity-80 tabular-nums">
                    {Math.floor(currentTime)}s / {Math.floor(duration)}s
                  </span>
                </div>

                <button
                  onClick={() => seekTo(0)}
                  className="p-1 hover:text-rose-400 transition-colors"
                  title="Restart"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          <span className="text-[11px] text-stone-500 mt-2 font-sans">
            {language === 'hi' ? 'मूल पिनट्रेस्ट वीडियो (720x1280 60fps)' : 'Original Pinterest video stream (720x1280 60fps)'}
          </span>
        </div>

        {/* RIGHT COLUMN: Chapter Breakdown & Feature Analysis */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Milestone Card */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
                {CHAPTERS[activeChapterIndex].label[language]}
              </span>
              <span className="text-xs text-stone-400">
                {language === 'hi' ? 'अध्याय' : 'Chapter'} {activeChapterIndex + 1} / {CHAPTERS.length}
              </span>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed font-sans">
              {CHAPTERS[activeChapterIndex].description[language]}
            </p>
          </div>

          {/* Clickable Timeline Chapters */}
          <div className="space-y-2">
            <h3 className="text-xs font-sans uppercase tracking-widest text-stone-500 font-medium">
              {language === 'hi' ? 'वीडियो की सभी विशेषताएं एवं समय-चिह्न' : 'All Video Features & Timestamps'}
            </h3>

            <div className="space-y-1.5">
              {CHAPTERS.map((ch, idx) => {
                const isActive = idx === activeChapterIndex;
                return (
                  <button
                    key={ch.time}
                    onClick={() => seekTo(ch.time)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isActive
                        ? 'bg-white border-stone-900 shadow-xs'
                        : 'bg-white/60 border-stone-200 hover:bg-white hover:border-stone-300'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-semibold ${
                        isActive
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-medium text-stone-900 truncate">
                          {ch.label[language]}
                        </span>
                        <span className="text-[11px] font-mono text-stone-400 shrink-0">
                          {ch.time}s
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-sans mt-0.5 line-clamp-1">
                        {ch.description[language]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Product Takeaways from Invitely */}
          <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 text-xs text-stone-700 space-y-2">
            <h4 className="font-serif text-sm font-semibold text-stone-900">
              {language === 'hi' ? 'यह वीडियो इतना लोकप्रिय क्यों हुआ?' : 'Why Did This Video Go Viral?'}
            </h4>
            <ul className="space-y-1.5 list-disc list-inside opacity-90 font-sans leading-relaxed">
              <li>
                <strong>{language === 'hi' ? 'स्पर्शनीय मोम की मुहर का अनुभव:' : 'Tactile Wax Seal Interaction:'}</strong>{' '}
                {language === 'hi'
                  ? 'पारंपरिक लिफाफा खोलने के अनुभव को स्मार्टफोन पर सजीव 3D दोहरे कपाट एनिमेशन से पुनः जीवंत करता है।'
                  : 'Reinvents physical envelope unboxing with intuitive 3D double-hinge doors.'}
              </li>
              <li>
                <strong>{language === 'hi' ? 'कार्यक्रम एवं मेन्यू की पूर्व जानकारी:' : 'Schedule & Menu Transparency:'}</strong>{' '}
                {language === 'hi'
                  ? 'अतिथि न केवल समय और स्थान, बल्कि वरमाला, कॉकटेल और रात्रिभोज के व्यंजनों से भी पूरी तरह अवगत रहते हैं।'
                  : 'Guests know exact cocktail timings, courses, and dietary accommodations in advance.'}
              </li>
              <li>
                <strong>{language === 'hi' ? 'कागज़ की बचत एवं तुरंत उपस्थिति (RSVP):' : 'Zero Paper Waste & Real-Time Headcount:'}</strong>{' '}
                {language === 'hi'
                  ? 'मुद्रण की बर्बादी को समाप्त कर आने वाले मेहमानों की संख्या और खान-पान संबंधी जरूरतों को लाइव डैशबोर्ड पर दर्ज करता है।'
                  : 'Eliminates paper printing cost while syncing attendee headcount and dietary restrictions instantly.'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
