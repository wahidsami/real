import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/react-app/contexts/LanguageContext';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    titleAr: 'ابحث عن عقارك المثالي في ثوانٍ',
    titleEn: 'Find your perfect property in seconds',
    subtitleAr: 'آلاف العقارات المميزة بانتظارك',
    subtitleEn: 'Thousands of premium properties waiting for you',
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
    titleAr: 'خدمة إدارة عقارات احترافية',
    titleEn: 'Professional property management services',
    subtitleAr: 'نوفر لك راحة البال في إدارة استثماراتك',
    subtitleEn: 'Peace of mind for your real estate investments',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    titleAr: 'القيمة تبدأ من اختيارٍ سليم',
    titleEn: 'Value starts with the right choice',
    subtitleAr: 'دعنا نساعدك في العثور على منزل أحلامك',
    subtitleEn: "Let us help you find your dream home",
  },
];

export default function HeroSlider() {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
          
          <div className="relative h-full flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                {language === 'ar' ? slide.titleAr : slide.titleEn}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-delay">
                {language === 'ar' ? slide.subtitleAr : slide.subtitleEn}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
