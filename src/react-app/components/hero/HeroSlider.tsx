import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import {
  ChevronRight,
  Search,
  MapPin,
  Bed,
  Home,
  Sparkles,
  ChevronLeft,
} from 'lucide-react';
import { useLanguage } from '@/react-app/contexts/LanguageContext';
import { useLocation, useNavigate } from 'react-router';
import { fetchProperties, fetchWidgetConfig, saveWidgetConfig } from '@/react-app/lib/api';
import {
  HeroEditorPanel,
  createId,
  createSlide,
  initialSettings,
  initialSlides,
  type HeroEditorState,
  type HeroSettings,
  FieldLabel,
  type Slide,
} from '@/react-app/components/hero';

function clampIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function label(ar: string, en: string, language: string) {
  return language === 'ar' ? ar : en;
}

function adjustHeight(value: string, deltaVh: number) {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)vh$/i);
  if (!match) {
    return value;
  }

  const adjusted = Math.max(30, Number(match[1]) - deltaVh);
  return `${adjusted}vh`;
}

function resolvePreviewHeight(settings: HeroSettings, viewportWidth: number) {
  const baseHeight =
    viewportWidth < 768 ? settings.mobileHeight : viewportWidth < 1024 ? settings.tabletHeight : settings.desktopHeight;

  switch (settings.height) {
    case 'large':
      return adjustHeight(baseHeight, 10);
    case 'medium':
      return adjustHeight(baseHeight, 20);
    case 'custom':
    case 'fullscreen':
    default:
      return baseHeight;
  }
}

export default function HeroSlider() {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminSurface = location.pathname.startsWith('/admin');
  const [settings, setSettings] = useState<HeroSettings>(initialSettings);
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [openPanel, setOpenPanel] = useState<string>('');
  const [previewIndex, setPreviewIndex] = useState(0);
  const [dragId, setDragId] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroSearch, setHeroSearch] = useState({
    city: '',
    status: '',
    property_type: '',
    min_price: '',
    max_price: '',
    bedrooms: '',
  });
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const saveTimerRef = useRef<number | null>(null);

  const previewSlide = useMemo(() => slides[clampIndex(previewIndex, slides.length)] ?? slides[0], [previewIndex, slides]);
  const previewHeight = useMemo(() => resolvePreviewHeight(settings, viewportWidth), [settings, viewportWidth]);

  const handleHeroSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    Object.entries(heroSearch).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    navigate(`/properties${params.toString() ? `?${params.toString()}` : ''}`);
  };

  useEffect(() => {
    let cancelled = false;

    fetchWidgetConfig<HeroEditorState>('hero_carousel')
      .then((widget) => {
        if (cancelled || !widget?.config) {
          return;
        }

        const config = widget.config as Partial<HeroEditorState>;
        if (config.settings) {
          setSettings({ ...initialSettings, ...config.settings });
        }
        if (Array.isArray(config.slides) && config.slides.length > 0) {
          setSlides(config.slides as Slide[]);
          setOpenPanel('');
          setPreviewIndex(0);
        }
      })
      .catch(() => {
        // Keep default editor state if the API is not reachable yet.
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const syncWidth = () => setViewportWidth(window.innerWidth);
    syncWidth();
    window.addEventListener('resize', syncWidth);
    return () => window.removeEventListener('resize', syncWidth);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchProperties('limit=200')
      .then((data) => {
        if (cancelled) {
          return;
        }

        const cities = (data.properties || [])
          .map((property) => {
            const cityAr = typeof property?.city_ar === 'string' ? property.city_ar.trim() : '';
            const cityEn = typeof property?.city_en === 'string' ? property.city_en.trim() : '';
            const city = typeof property?.city === 'string' ? property.city.trim() : '';
            return cityAr || cityEn || city;
          })
          .filter(Boolean);

        setCitySuggestions(Array.from(new Set(cities)).slice(0, 24));
      })
      .catch(() => {
        if (!cancelled) {
          setCitySuggestions([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (slides.length === 0 || !openPanel) {
      return;
    }

    if (!slides.some((slide) => slide.id === openPanel)) {
      setOpenPanel(slides[0].id);
    }
  }, [openPanel, slides]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isAdminSurface) {
      return;
    }

    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = window.setTimeout(() => {
      saveWidgetConfig('hero_carousel', { settings, slides }, 'json').catch(() => {
        // Persistence should not block editing; surface errors in a later UI pass if needed.
      });
    }, 500);

    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [isAdminSurface, isLoaded, settings, slides]);

  useEffect(() => {
    if (!settings.autoplay || slides.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setPreviewIndex((current) => clampIndex(current + 1, slides.length));
    }, settings.autoplaySpeed);

    return () => window.clearInterval(timer);
  }, [settings.autoplay, settings.autoplaySpeed, slides.length]);

  const goToPrevious = () => {
    setPreviewIndex((current) => clampIndex(current - 1, slides.length));
  };

  const goToNext = () => {
    setPreviewIndex((current) => clampIndex(current + 1, slides.length));
  };

  const activateSlide = (slideId: string) => {
    setOpenPanel(slideId);
    const index = slides.findIndex((slide) => slide.id === slideId);
    if (index >= 0) {
      setPreviewIndex(index);
    }
  };

  const updateSlide = (slideId: string, patch: Partial<Slide>) => {
    setSlides((current) =>
      current.map((slide) => (slide.id === slideId ? { ...slide, ...patch } : slide)),
    );
  };

  const moveSlide = (fromIndex: number, toIndex: number) => {
    setSlides((current) => {
      const next = [...current];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item);
      return next;
    });
    setPreviewIndex(() => clampIndex(toIndex, slides.length));
  };

  const copySlide = async (slide: Slide) => {
    const payload = {
      titleAr: slide.titleAr,
      titleEn: slide.titleEn,
      subtitleAr: slide.subtitleAr,
      subtitleEn: slide.subtitleEn,
      badgeAr: slide.badgeAr,
      badgeEn: slide.badgeEn,
      mediaType: slide.mediaType,
      imageUrl: slide.imageUrl,
      videoUrl: slide.videoUrl,
      primaryCtaAr: slide.primaryCtaAr,
      primaryCtaEn: slide.primaryCtaEn,
      primaryLink: slide.primaryLink,
      secondaryCtaAr: slide.secondaryCtaAr,
      secondaryCtaEn: slide.secondaryCtaEn,
      secondaryLink: slide.secondaryLink,
      textAlign: slide.textAlign,
      overlayPreset: slide.overlayPreset,
      customOverlay: slide.customOverlay,
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    } catch {
      // Ignore clipboard failures; the slide is still accessible for manual duplication.
    }
  };

  const duplicateSlide = (slide: Slide) => {
    const clone = createSlide({
      ...slide,
      id: createId(),
      titleAr: `${slide.titleAr} - ${label('نسخة', 'Copy', language)}`,
      titleEn: `${slide.titleEn} - Copy`,
    });

    setSlides((current) => {
      const index = current.findIndex((item) => item.id === slide.id);
      const next = [...current];
      next.splice(index + 1, 0, clone);
      return next;
    });
    setOpenPanel(clone.id);
    setPreviewIndex(slides.findIndex((item) => item.id === slide.id) + 1);
  };

  const deleteSlide = (slideId: string) => {
    setSlides((current) => {
      if (current.length <= 1) {
        return current;
      }

      const index = current.findIndex((slide) => slide.id === slideId);
      const next = current.filter((slide) => slide.id !== slideId);

      if (openPanel === slideId) {
        const fallback = next[index] ?? next[index - 1] ?? next[0];
        if (fallback) {
          setOpenPanel(fallback.id);
        }
      }

      setPreviewIndex((currentIndex) => clampIndex(currentIndex, next.length));
      return next;
    });
  };

  const addSlide = () => {
    const slide = createSlide({
      titleAr: `شريحة جديدة ${slides.length + 1}`,
      titleEn: `New Slide ${slides.length + 1}`,
      subtitleAr: 'أضف محتوى الشريحة الجديدة هنا.',
      subtitleEn: 'Add the new slide content here.',
      badgeAr: 'شريحة جديدة',
      badgeEn: 'New Slide',
    });

    setSlides((current) => [...current, slide]);
    setOpenPanel(slide.id);
    setPreviewIndex(slides.length);
  };

  return (
    <section className={`relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#130f0b] text-white ${settings.showSearchOverlay ? 'pb-24 md:pb-36' : ''}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,177,122,0.12),_transparent_30%)]" />

      <div className="relative w-full px-0 py-0">
        <div className="w-full space-y-0">
          <div className="overflow-hidden border-y border-white/10 bg-slate-950/90 shadow-2xl">
            <div className="relative overflow-hidden" style={{ minHeight: previewHeight }}>
              <div className="absolute inset-0">
                <img
                  src={
                    previewSlide?.mediaType === 'image'
                      ? previewSlide.imageUrl
                      : previewSlide?.imageUrl || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80'
                  }
                  alt={label(previewSlide?.titleAr ?? '', previewSlide?.titleEn ?? '', language)}
                  className="h-full w-full object-cover object-center transition-all duration-700 ease-out"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.52) 45%, rgba(0, 0, 0, 0.72) 100%)',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundColor: settings.overlayColor,
                    opacity: settings.overlayOpacity / 100,
                  }}
                />
              </div>

              <div className="relative z-10 flex items-center justify-center px-5 py-8 md:px-10 md:py-12 text-center" style={{ minHeight: previewHeight }}>
                <div className="w-full max-w-4xl space-y-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] backdrop-blur">
                    <Sparkles className="h-3 w-3" />
                    {label('العرض البارز', 'Featured Banner', language)}
                  </span>
                  <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
                    {label(previewSlide?.titleAr ?? '', previewSlide?.titleEn ?? '', language)}
                  </h2>
                  <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/90 md:text-xl">
                    {label(previewSlide?.subtitleAr ?? '', previewSlide?.subtitleEn ?? '', language)}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href={previewSlide?.primaryLink || '/properties'}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-slate-950 shadow-lg transition-colors hover:bg-amber-50"
                    >
                      <span>{label(previewSlide?.primaryCtaAr ?? '', previewSlide?.primaryCtaEn ?? '', language)}</span>
                      <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                    </a>
                    <a
                      href={previewSlide?.secondaryLink || '/contact'}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition-colors hover:bg-white/15"
                    >
                      <span>{label(previewSlide?.secondaryCtaAr ?? '', previewSlide?.secondaryCtaEn ?? '', language)}</span>
                    </a>
                  </div>
                </div>
              </div>

              {settings.showSearchOverlay ? (
                <div className="absolute bottom-0 left-1/2 z-30 w-[min(1180px,calc(100%-1.5rem))] -translate-x-1/2 translate-y-1/2">
                  <div className="rounded-[28px] bg-white/97 p-4 text-slate-900 shadow-[0_28px_80px_rgba(0,0,0,0.3)] ring-1 ring-black/5 backdrop-blur">
                    <div className="mb-4 text-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.32em] text-slate-500">
                        {label('ابحث عن عقارك المثالي', 'Find Your Ideal Property', language)}
                      </p>
                      <h3 className="mt-1 text-xl font-black text-slate-900 md:text-2xl">
                        {label('ابحث عن عقارك المثالي', 'Search Your Property', language)}
                      </h3>
                    </div>

                    <form onSubmit={handleHeroSearch} className="grid grid-cols-1 gap-3 md:grid-cols-6">
                      <FieldLabel labelAr="المدينة أو المنطقة" labelEn="City or Area" language={language}>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            list="hero-city-suggestions"
                            value={heroSearch.city}
                            onChange={(event) => setHeroSearch((current) => ({ ...current, city: event.target.value }))}
                            placeholder={label('ابحث بالمدينة أو الحي', 'Search by city or neighborhood', language)}
                            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                          />
                          <datalist id="hero-city-suggestions">
                            {citySuggestions.map((city) => (
                              <option key={city} value={city} />
                            ))}
                          </datalist>
                        </div>
                      </FieldLabel>

                      <FieldLabel labelAr="نوع الطلب" labelEn="Listing Type" language={language}>
                        <div className="relative">
                          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <select
                            value={heroSearch.status}
                            onChange={(event) =>
                              setHeroSearch((current) => ({ ...current, status: event.target.value }))
                            }
                            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                          >
                            <option value="">{label('الكل', 'All', language)}</option>
                            <option value="for_sale">{label('للبيع', 'For Sale', language)}</option>
                            <option value="for_rent">{label('للإيجار', 'For Rent', language)}</option>
                          </select>
                        </div>
                      </FieldLabel>

                      <FieldLabel labelAr="نوع العقار" labelEn="Property Type" language={language}>
                        <div className="relative">
                          <Home className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <select
                            value={heroSearch.property_type}
                            onChange={(event) =>
                              setHeroSearch((current) => ({ ...current, property_type: event.target.value }))
                            }
                            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                          >
                            <option value="">{label('الكل', 'All', language)}</option>
                            <option value="apartment">{label('شقة', 'Apartment', language)}</option>
                            <option value="villa">{label('فيلا', 'Villa', language)}</option>
                            <option value="land">{label('أرض', 'Land', language)}</option>
                            <option value="commercial">{label('تجاري', 'Commercial', language)}</option>
                            <option value="other">{label('أخرى', 'Other', language)}</option>
                          </select>
                        </div>
                      </FieldLabel>

                      <FieldLabel labelAr="السعر الأدنى" labelEn="Min Price" language={language}>
                        <input
                          type="number"
                          min={0}
                          inputMode="numeric"
                          value={heroSearch.min_price}
                          onChange={(event) => setHeroSearch((current) => ({ ...current, min_price: event.target.value }))}
                          placeholder={label('من', 'From', language)}
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                        />
                      </FieldLabel>

                      <FieldLabel labelAr="السعر الأقصى" labelEn="Max Price" language={language}>
                        <input
                          type="number"
                          min={0}
                          inputMode="numeric"
                          value={heroSearch.max_price}
                          onChange={(event) => setHeroSearch((current) => ({ ...current, max_price: event.target.value }))}
                          placeholder={label('إلى', 'To', language)}
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                        />
                      </FieldLabel>

                      <FieldLabel labelAr="غرف النوم" labelEn="Bedrooms" language={language}>
                        <div className="relative">
                          <Bed className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <select
                            value={heroSearch.bedrooms}
                            onChange={(event) =>
                              setHeroSearch((current) => ({ ...current, bedrooms: event.target.value }))
                            }
                            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                          >
                            <option value="">{label('الكل', 'All', language)}</option>
                            {[1, 2, 3, 4, 5].map((count) => (
                              <option key={count} value={count}>
                                {count}+
                              </option>
                            ))}
                          </select>
                        </div>
                      </FieldLabel>

                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-black text-white transition-colors hover:bg-slate-900 md:col-span-6"
                      >
                        <Search className="h-4 w-4" />
                        {label('ابحث الآن', 'Search Now', language)}
                      </button>
                    </form>
                  </div>
                </div>
              ) : null}

              {settings.navigationArrows && slides.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-white backdrop-blur transition-colors hover:bg-black/60"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-white backdrop-blur transition-colors hover:bg-black/60"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              ) : null}

              {settings.paginationDots && slides.length > 1 ? (
                <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setPreviewIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === previewIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/55'
                      }`}
                      aria-label={`${label('الشريحة', 'Slide', language)} ${index + 1}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {isAdminSurface ? (
            <div className="hero-slider-editor w-full border-t border-slate-800 bg-slate-950/80 px-3 py-3 shadow-sm md:px-4 md:py-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.28em] text-[#D4AF37]">
                    {label('إعدادات المكون: hero_carousel', 'Widget Settings: hero_carousel', language)}
                  </div>
                  <h3 className="mt-1 text-[15px] font-black text-white">
                    {label('شريط البطل الفاخر', 'Full Width Hero Slider', language)}
                  </h3>
                  <p className="mt-1 max-w-3xl text-[11px] leading-relaxed text-slate-400">
                    {label(
                      'هذا القسم مخصص كواجهة رئيسية بعرض كامل مع صور وفيديو ونصوص وأزرار.',
                      'This section is the full-width hero entry for images, video, text, and buttons.',
                      language,
                    )}
                  </p>
                </div>
              </div>

              <HeroEditorPanel
                language={language}
                settings={settings}
                setSettings={setSettings}
                slides={slides}
                openPanel={openPanel}
                setOpenPanel={setOpenPanel}
                dragId={dragId}
                setDragId={setDragId}
                activateSlide={activateSlide}
                moveSlide={moveSlide}
                copySlide={copySlide}
                duplicateSlide={duplicateSlide}
                deleteSlide={deleteSlide}
                updateSlide={updateSlide}
                addSlide={addSlide}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
