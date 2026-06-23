import {
  ChevronLeft,
  ChevronRight,
  Copy,
  GripVertical,
  Layers3,
  Plus,
  Trash2,
} from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { AccordionShell, SectionLabel, SettingRow, ToggleRow } from './HeroEditorPrimitives';
import type { HeroHeight, HeroSettings, MediaType, Slide, SlideTextAlign, TransitionType } from './heroTypes';

const label = (ar: string, en: string, language: string) => (language === 'ar' ? ar : en);

export function HeroEditorPanel({
  language,
  settings,
  setSettings,
  slides,
  openPanel,
  setOpenPanel,
  dragId,
  setDragId,
  activateSlide,
  moveSlide,
  copySlide,
  duplicateSlide,
  deleteSlide,
  updateSlide,
  addSlide,
}: {
  language: string;
  settings: HeroSettings;
  setSettings: Dispatch<SetStateAction<HeroSettings>>;
  slides: Slide[];
  openPanel: string;
  setOpenPanel: Dispatch<SetStateAction<string>>;
  dragId: string | null;
  setDragId: Dispatch<SetStateAction<string | null>>;
  activateSlide: (slideId: string) => void;
  moveSlide: (fromIndex: number, toIndex: number) => void;
  copySlide: (slide: Slide) => Promise<void>;
  duplicateSlide: (slide: Slide) => void;
  deleteSlide: (slideId: string) => void;
  updateSlide: (slideId: string, patch: Partial<Slide>) => void;
  addSlide: () => void;
}) {
  return (
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

        <button
          type="button"
          onClick={addSlide}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-[10px] font-black text-white transition-colors hover:bg-emerald-500"
        >
          <Plus className="h-3.5 w-3.5" />
          {label('إضافة شريحة', 'Add Slide', language)}
        </button>
      </div>

      <div className="space-y-2">
        <AccordionShell
          title={label('⚙ إعدادات الهيرو العامة', '⚙ Global Hero Settings', language)}
          subtitle={label('تنطبق على كل الشرائح', 'Applies to all slides', language)}
          open={openPanel === 'global'}
          onToggle={() => setOpenPanel(openPanel === 'global' ? '' : 'global')}
        >
          <div className="space-y-2.5">
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-3">
              <ToggleRow
                label={label('إظهار مربع البحث فوق الهيرو', 'Show Search Box Over Hero', language)}
                checked={settings.showSearchOverlay}
                onChange={(checked) => setSettings((current) => ({ ...current, showSearchOverlay: checked }))}
              />
              <p className="mt-2 text-[11px] leading-relaxed text-amber-100/75">
                {label(
                  'عند تفعيله يظهر مربع البحث فوق شريط الهيرو في الصفحة الرئيسية.',
                  'When enabled, the search box appears over the hero section on the public page.',
                  language,
                )}
              </p>
            </div>

            <SettingRow labelAr="ارتفاع الهيرو" labelEn="Hero Height" language={language}>
              <select
                value={settings.height}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, height: event.target.value as HeroHeight }))
                }
              >
                <option value="fullscreen">{label('ملء الشاشة', 'Fullscreen', language)}</option>
                <option value="large">{label('كبير', 'Large', language)}</option>
                <option value="medium">{label('متوسط', 'Medium', language)}</option>
                <option value="custom">{label('مخصص', 'Custom', language)}</option>
              </select>
            </SettingRow>

            <SettingRow labelAr="المحاذاة الأفقية" labelEn="Content Horizontal Alignment" language={language}>
              <select
                value={settings.contentHorizontalAlignment}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    contentHorizontalAlignment: event.target.value as HeroSettings['contentHorizontalAlignment'],
                  }))
                }
              >
                <option value="left">{label('يسار', 'Left', language)}</option>
                <option value="center">{label('وسط', 'Center', language)}</option>
                <option value="right">{label('يمين', 'Right', language)}</option>
              </select>
            </SettingRow>

            <SettingRow labelAr="المحاذاة الرأسية" labelEn="Content Vertical Alignment" language={language}>
              <select
                value={settings.contentVerticalAlignment}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    contentVerticalAlignment: event.target.value as HeroSettings['contentVerticalAlignment'],
                  }))
                }
              >
                <option value="top">{label('أعلى', 'Top', language)}</option>
                <option value="center">{label('وسط', 'Center', language)}</option>
                <option value="bottom">{label('أسفل', 'Bottom', language)}</option>
              </select>
            </SettingRow>

            <SettingRow labelAr="لون الغطاء" labelEn="Overlay Color" language={language}>
              <input
                type="color"
                value={settings.overlayColor}
                onChange={(event) => setSettings((current) => ({ ...current, overlayColor: event.target.value }))}
              />
            </SettingRow>

            <SettingRow labelAr="شفافية الغطاء" labelEn="Overlay Opacity" language={language}>
              <input
                type="range"
                min={0}
                max={100}
                value={settings.overlayOpacity}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, overlayOpacity: Number(event.target.value) }))
                }
              />
            </SettingRow>

            <SettingRow labelAr="شكل الحركة" labelEn="Transition Type" language={language}>
              <select
                value={settings.transitionType}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    transitionType: event.target.value as TransitionType,
                  }))
                }
              >
                <option value="fade">{label('تلاشي', 'Fade', language)}</option>
                <option value="slide">{label('انزلاق', 'Slide', language)}</option>
                <option value="zoom">{label('تكبير', 'Zoom', language)}</option>
              </select>
            </SettingRow>

            <div className="grid gap-2 md:grid-cols-2">
              <ToggleRow
                label={label('تشغيل تلقائي', 'Autoplay', language)}
                checked={settings.autoplay}
                onChange={(checked) => setSettings((current) => ({ ...current, autoplay: checked }))}
              />
              <ToggleRow
                label={label('تكرار مستمر', 'Infinite Loop', language)}
                checked={settings.infiniteLoop}
                onChange={(checked) => setSettings((current) => ({ ...current, infiniteLoop: checked }))}
              />
              <ToggleRow
                label={label('إيقاف عند المرور', 'Pause on Hover', language)}
                checked={settings.pauseOnHover}
                onChange={(checked) => setSettings((current) => ({ ...current, pauseOnHover: checked }))}
              />
              <ToggleRow
                label={label('أسهم التنقل', 'Navigation Arrows', language)}
                checked={settings.navigationArrows}
                onChange={(checked) => setSettings((current) => ({ ...current, navigationArrows: checked }))}
              />
              <ToggleRow
                label={label('نقاط الشرائح', 'Pagination Dots', language)}
                checked={settings.paginationDots}
                onChange={(checked) => setSettings((current) => ({ ...current, paginationDots: checked }))}
              />
            </div>

            <SettingRow labelAr="الفاصل الزمني" labelEn="Autoplay Speed" language={language}>
              <input
                type="number"
                min={1000}
                step={250}
                value={settings.autoplaySpeed}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, autoplaySpeed: Number(event.target.value) }))
                }
              />
            </SettingRow>

            <SettingRow labelAr="ارتفاع الجوال" labelEn="Mobile Height" language={language}>
              <input
                type="text"
                dir="ltr"
                value={settings.mobileHeight}
                onChange={(event) => setSettings((current) => ({ ...current, mobileHeight: event.target.value }))}
              />
            </SettingRow>

            <SettingRow labelAr="ارتفاع التابلت" labelEn="Tablet Height" language={language}>
              <input
                type="text"
                dir="ltr"
                value={settings.tabletHeight}
                onChange={(event) => setSettings((current) => ({ ...current, tabletHeight: event.target.value }))}
              />
            </SettingRow>

            <SettingRow labelAr="ارتفاع الديسكتوب" labelEn="Desktop Height" language={language}>
              <input
                type="text"
                dir="ltr"
                value={settings.desktopHeight}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, desktopHeight: event.target.value }))
                }
              />
            </SettingRow>
          </div>
        </AccordionShell>

        <div className="space-y-2">
          {slides.map((slide, index) => {
            const isOpen = openPanel === slide.id;
            const slideNumber = index + 1;
            return (
              <AccordionShell
                key={slide.id}
                title={`${label('الشريحة', 'Slide', language)} ${slideNumber} - ${label(slide.titleAr, slide.titleEn, language)}`}
                subtitle={label(slide.badgeAr, slide.badgeEn, language)}
                open={isOpen}
                onToggle={() => activateSlide(slide.id)}
                dragHandle={
                  <button
                    type="button"
                    draggable
                    onDragStart={() => setDragId(slide.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      if (!dragId || dragId === slide.id) return;
                      const fromIndex = slides.findIndex((item) => item.id === dragId);
                      const toIndex = slides.findIndex((item) => item.id === slide.id);
                      if (fromIndex < 0 || toIndex < 0) return;
                      moveSlide(fromIndex, toIndex);
                      setDragId(null);
                    }}
                    title={label('اسحب لإعادة الترتيب', 'Drag to reorder', language)}
                    className="cursor-grab active:cursor-grabbing text-slate-400 transition-colors hover:text-white"
                  >
                    <GripVertical className="h-4 w-4" />
                  </button>
                }
                badge={label(slide.mediaType === 'video' ? 'فيديو' : 'صورة', slide.mediaType === 'video' ? 'Video' : 'Image', language)}
                actions={
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        copySlide(slide);
                      }}
                      className="rounded bg-indigo-950/90 px-2 py-1 text-[10px] font-black text-indigo-200 transition-colors hover:bg-indigo-900"
                    >
                      {label('نسخ', 'Copy', language)}
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        duplicateSlide(slide);
                      }}
                      className="rounded bg-slate-800 px-2 py-1 text-[10px] font-black text-slate-200 transition-colors hover:bg-slate-700"
                    >
                      {label('تكرار', 'Duplicate', language)}
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (index > 0) moveSlide(index, index - 1);
                      }}
                      className="rounded bg-slate-800 px-2 py-1 text-[10px] font-black text-slate-200 transition-colors hover:bg-slate-700 disabled:opacity-40"
                      disabled={index === 0}
                    >
                      {label('أعلى', 'Up', language)}
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (index < slides.length - 1) moveSlide(index, index + 1);
                      }}
                      className="rounded bg-slate-800 px-2 py-1 text-[10px] font-black text-slate-200 transition-colors hover:bg-slate-700 disabled:opacity-40"
                      disabled={index === slides.length - 1}
                    >
                      {label('أسفل', 'Down', language)}
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteSlide(slide.id);
                      }}
                      className="rounded bg-rose-950/80 px-2 py-1 text-[10px] font-black text-rose-200 transition-colors hover:bg-rose-900"
                      disabled={slides.length === 1}
                    >
                      {label('حذف', 'Delete', language)}
                    </button>
                  </div>
                }
              >
                <div className="space-y-4">
                  <section className="space-y-2">
                    <SectionLabel titleAr="المعلومات الأساسية" titleEn="Basic Information" language={language} />
                    <SettingRow labelAr="العنوان (عربي)" labelEn="Arabic Title" language={language}>
                      <input
                        type="text"
                        value={slide.titleAr}
                        onChange={(event) => updateSlide(slide.id, { titleAr: event.target.value })}
                      />
                    </SettingRow>
                    <SettingRow labelAr="Title (English)" labelEn="English Title" language={language}>
                      <input
                        type="text"
                        dir="ltr"
                        value={slide.titleEn}
                        onChange={(event) => updateSlide(slide.id, { titleEn: event.target.value })}
                      />
                    </SettingRow>
                    <SettingRow labelAr="الوصف (عربي)" labelEn="Arabic Subtitle" language={language}>
                      <textarea
                        rows={3}
                        value={slide.subtitleAr}
                        onChange={(event) => updateSlide(slide.id, { subtitleAr: event.target.value })}
                      />
                    </SettingRow>
                    <SettingRow labelAr="Subtitle (English)" labelEn="English Subtitle" language={language}>
                      <textarea
                        rows={3}
                        dir="ltr"
                        value={slide.subtitleEn}
                        onChange={(event) => updateSlide(slide.id, { subtitleEn: event.target.value })}
                      />
                    </SettingRow>
                  </section>

                  <section className="space-y-2">
                    <SectionLabel titleAr="الميديا" titleEn="Media" language={language} />
                    <SettingRow labelAr="نوع الميديا" labelEn="Media Type" language={language}>
                      <select
                        value={slide.mediaType}
                        onChange={(event) =>
                          updateSlide(slide.id, { mediaType: event.target.value as MediaType })
                        }
                      >
                        <option value="image">{label('صورة', 'Image', language)}</option>
                        <option value="video">{label('فيديو', 'Video', language)}</option>
                      </select>
                    </SettingRow>
                    <SettingRow labelAr="Image Upload" labelEn="Image Upload" language={language}>
                      <input
                        type="url"
                        dir="ltr"
                        value={slide.imageUrl}
                        onChange={(event) => updateSlide(slide.id, { imageUrl: event.target.value })}
                        placeholder="https://..."
                      />
                    </SettingRow>
                    <SettingRow labelAr="Video Upload" labelEn="Video Upload" language={language}>
                      <input
                        type="url"
                        dir="ltr"
                        value={slide.videoUrl}
                        onChange={(event) => updateSlide(slide.id, { videoUrl: event.target.value })}
                        placeholder="https://..."
                      />
                    </SettingRow>
                  </section>

                  <section className="space-y-2">
                    <SectionLabel titleAr="الأزرار" titleEn="Buttons" language={language} />
                    <SettingRow labelAr="نص الزر الأساسي (عربي)" labelEn="Primary CTA Text AR" language={language}>
                      <input
                        type="text"
                        value={slide.primaryCtaAr}
                        onChange={(event) => updateSlide(slide.id, { primaryCtaAr: event.target.value })}
                      />
                    </SettingRow>
                    <SettingRow labelAr="Primary CTA Text EN" labelEn="Primary CTA Text EN" language={language}>
                      <input
                        type="text"
                        dir="ltr"
                        value={slide.primaryCtaEn}
                        onChange={(event) => updateSlide(slide.id, { primaryCtaEn: event.target.value })}
                      />
                    </SettingRow>
                    <SettingRow labelAr="رابط الزر الأساسي" labelEn="Primary CTA Link" language={language}>
                      <input
                        type="text"
                        dir="ltr"
                        value={slide.primaryLink}
                        onChange={(event) => updateSlide(slide.id, { primaryLink: event.target.value })}
                      />
                    </SettingRow>
                    <SettingRow labelAr="نص الزر الثانوي (عربي)" labelEn="Secondary CTA Text AR" language={language}>
                      <input
                        type="text"
                        value={slide.secondaryCtaAr}
                        onChange={(event) => updateSlide(slide.id, { secondaryCtaAr: event.target.value })}
                      />
                    </SettingRow>
                    <SettingRow labelAr="Secondary CTA Text EN" labelEn="Secondary CTA Text EN" language={language}>
                      <input
                        type="text"
                        dir="ltr"
                        value={slide.secondaryCtaEn}
                        onChange={(event) => updateSlide(slide.id, { secondaryCtaEn: event.target.value })}
                      />
                    </SettingRow>
                    <SettingRow labelAr="رابط الزر الثانوي" labelEn="Secondary CTA Link" language={language}>
                      <input
                        type="text"
                        dir="ltr"
                        value={slide.secondaryLink}
                        onChange={(event) => updateSlide(slide.id, { secondaryLink: event.target.value })}
                      />
                    </SettingRow>
                  </section>

                  <section className="space-y-2">
                    <SectionLabel titleAr="مظهر الشريحة" titleEn="Slide Appearance" language={language} />
                    <SettingRow labelAr="شارة عربية" labelEn="Badge Text AR" language={language}>
                      <input
                        type="text"
                        value={slide.badgeAr}
                        onChange={(event) => updateSlide(slide.id, { badgeAr: event.target.value })}
                      />
                    </SettingRow>
                    <SettingRow labelAr="Badge Text EN" labelEn="Badge Text EN" language={language}>
                      <input
                        type="text"
                        dir="ltr"
                        value={slide.badgeEn}
                        onChange={(event) => updateSlide(slide.id, { badgeEn: event.target.value })}
                      />
                    </SettingRow>
                    <SettingRow labelAr="محاذاة النص" labelEn="Text Alignment Override" language={language}>
                      <select
                        value={slide.textAlign}
                        onChange={(event) =>
                          updateSlide(slide.id, { textAlign: event.target.value as SlideTextAlign })
                        }
                      >
                        <option value="left">{label('يسار', 'Left', language)}</option>
                        <option value="center">{label('وسط', 'Center', language)}</option>
                        <option value="right">{label('يمين', 'Right', language)}</option>
                      </select>
                    </SettingRow>
                    <SettingRow
                      labelAr="تراكب مخصص"
                      labelEn="Custom Overlay Override"
                      language={language}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={slide.customOverlay || ''}
                          onChange={(event) => updateSlide(slide.id, { customOverlay: event.target.value })}
                          className="h-10 w-12 shrink-0 rounded border border-slate-800 bg-transparent"
                        />
                        <input
                          type="text"
                          dir="ltr"
                          value={slide.customOverlay || ''}
                          onChange={(event) => updateSlide(slide.id, { customOverlay: event.target.value })}
                          placeholder="#000000"
                        />
                      </div>
                    </SettingRow>
                  </section>

                  <section className="space-y-2">
                    <SectionLabel titleAr="إجراءات الشريحة" titleEn="Slide Actions" language={language} />
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => copySlide(slide)}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-950/90 px-3 py-2 text-[11px] font-black text-indigo-200 hover:bg-indigo-900"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {label('نسخ', 'Copy', language)}
                      </button>
                      <button
                        type="button"
                        onClick={() => duplicateSlide(slide)}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-[11px] font-black text-slate-200 hover:bg-slate-700"
                      >
                        <Layers3 className="h-3.5 w-3.5" />
                        {label('تكرار', 'Duplicate', language)}
                      </button>
                      <button
                        type="button"
                        onClick={() => index > 0 && moveSlide(index, index - 1)}
                        disabled={index === 0}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-[11px] font-black text-slate-200 hover:bg-slate-700 disabled:opacity-40"
                      >
                        <ChevronLeft className="h-3.5 w-3.5 rtl:rotate-180" />
                        {label('نقل لأعلى', 'Move Up', language)}
                      </button>
                      <button
                        type="button"
                        onClick={() => index < slides.length - 1 && moveSlide(index, index + 1)}
                        disabled={index === slides.length - 1}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-[11px] font-black text-slate-200 hover:bg-slate-700 disabled:opacity-40"
                      >
                        <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                        {label('نقل لأسفل', 'Move Down', language)}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSlide(slide.id)}
                        disabled={slides.length === 1}
                        className="inline-flex items-center gap-2 rounded-lg bg-rose-950/80 px-3 py-2 text-[11px] font-black text-rose-200 hover:bg-rose-900 disabled:opacity-40"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {label('حذف', 'Delete', language)}
                      </button>
                    </div>
                  </section>
                </div>
              </AccordionShell>
            );
          })}
        </div>

        <button
          type="button"
          onClick={addSlide}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-emerald-500/50 bg-emerald-500/10 px-4 py-3 text-[11px] font-black text-emerald-200 transition-colors hover:bg-emerald-500/15"
        >
          <Plus className="h-4 w-4" />
          {label('إضافة شريحة جديدة', 'Add New Slide', language)}
        </button>
      </div>
    </div>
  );
}
