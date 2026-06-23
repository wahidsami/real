import type { HeroSettings, Slide } from './heroTypes';

export function createId(prefix = 's') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`;
}

export function createSlide(partial?: Partial<Slide>): Slide {
  const base: Slide = {
    id: createId('slide'),
    titleAr: 'عنوان',
    titleEn: 'Title',
    subtitleAr: '',
    subtitleEn: '',
    badgeAr: '',
    badgeEn: '',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
    videoUrl: '',
    primaryCtaAr: '',
    primaryCtaEn: '',
    primaryLink: '/properties',
    secondaryCtaAr: '',
    secondaryCtaEn: '',
    secondaryLink: '/contact',
    textAlign: 'center',
    overlayPreset: null,
    customOverlay: null,
  };

  return { ...base, ...(partial || {}) };
}

export const initialSettings: HeroSettings = {
  showSearchOverlay: true,
  height: 'fullscreen',
  contentHorizontalAlignment: 'center',
  contentVerticalAlignment: 'center',
  overlayColor: '#000000',
  overlayOpacity: 60,
  transitionType: 'fade',
  autoplay: true,
  infiniteLoop: true,
  pauseOnHover: true,
  navigationArrows: true,
  paginationDots: true,
  autoplaySpeed: 5000,
  mobileHeight: '50vh',
  tabletHeight: '60vh',
  desktopHeight: '70vh',
};

export const initialSlides: Slide[] = [
  createSlide({
    titleAr: 'شريحة مميزة',
    titleEn: 'Featured Slide',
    subtitleAr: 'وصف الشريحة هنا',
    subtitleEn: 'Slide description here',
    badgeAr: 'عرض',
    badgeEn: 'Featured',
  }),
];
