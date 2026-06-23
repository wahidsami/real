export type HeroHeight = 'fullscreen' | 'large' | 'medium' | 'custom';
export type MediaType = 'image' | 'video';
export type SlideTextAlign = 'left' | 'center' | 'right';
export type TransitionType = 'fade' | 'slide' | 'zoom';

export type Slide = {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  badgeAr: string;
  badgeEn: string;
  mediaType: MediaType;
  imageUrl: string;
  videoUrl: string;
  primaryCtaAr: string;
  primaryCtaEn: string;
  primaryLink: string;
  secondaryCtaAr: string;
  secondaryCtaEn: string;
  secondaryLink: string;
  textAlign: SlideTextAlign;
  overlayPreset?: string | null;
  customOverlay?: string | null;
};

export type HeroSettings = {
  showSearchOverlay: boolean;
  height: HeroHeight;
  contentHorizontalAlignment: 'left' | 'center' | 'right';
  contentVerticalAlignment: 'top' | 'center' | 'bottom';
  overlayColor: string;
  overlayOpacity: number;
  transitionType: TransitionType;
  autoplay: boolean;
  infiniteLoop: boolean;
  pauseOnHover: boolean;
  navigationArrows: boolean;
  paginationDots: boolean;
  autoplaySpeed: number;
  mobileHeight: string;
  tabletHeight: string;
  desktopHeight: string;
};

export type HeroEditorState = {
  settings: HeroSettings;
  slides: Slide[];
};
