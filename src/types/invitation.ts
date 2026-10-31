export type Language = 'en' | 'hi';

export type EventType = 'wedding' | 'engagement' | 'civil' | 'henna';

export type ThemeId = 'blush_lace' | 'emerald_gold' | 'midnight_silver' | 'champagne_pearl';

export interface ThemeConfig {
  id: ThemeId;
  name: { en: string; hi: string };
  primary: string;
  accent: string;
  doorBg: string;
  doorBorder: string;
  doorTexture: string;
  sealColor: string;
  sealAccent: string;
  cardBg: string;
  textColor: string;
  badgeBg: string;
  fontAccent: string;
}

export interface TimelineItem {
  id: string;
  dateLabel?: { en: string; hi: string };
  time: string;
  title: { en: string; hi: string };
  description?: { en: string; hi: string };
}

export interface MenuItem {
  id: string;
  course: { en: string; hi: string };
  title: { en: string; hi: string };
  description: { en: string; hi: string };
}

export interface RsvpEntry {
  id: string;
  fullName: string;
  status: 'attending' | 'declined';
  guestCount: number;
  dietaryNote?: string;
  submittedAt: string;
  phone?: string;
  blessingMessage?: string;
}

export interface GuestWish {
  id: string;
  author: string;
  message: string;
  date: string;
  likes: number;
}

export interface InvitationData {
  brideName: string;
  groomName: string;
  eventType: EventType;
  tagline: { en: string; hi: string };
  invitationNote: { en: string; hi: string };
  brideFamily: { en: string; hi: string };
  groomFamily: { en: string; hi: string };
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  dayOfWeek: { en: string; hi: string };
  monthName: { en: string; hi: string };
  venueName: string;
  venueAddress: string;
  city: string;
  venueMapUrl?: string;
  mapCoordinates: { lat: number; lng: number };
  themeId: ThemeId;
  musicEnabled: boolean;
  timeline: TimelineItem[];
  menu: MenuItem[];
}
