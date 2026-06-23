import { Link } from 'react-router';
import { useLanguage } from '@/react-app/contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', labelAr: 'الرئيسية', labelEn: 'Home' },
    { path: '/properties', labelAr: 'العقارات', labelEn: 'Properties' },
    { path: '/about', labelAr: 'من نحن', labelEn: 'About' },
    { path: '/services', labelAr: 'الخدمات', labelEn: 'Services' },
    { path: '/contact', labelAr: 'تواصل معنا', labelEn: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img 
              src="https://mocha-cdn.com/019a8fd3-ee2c-7b2b-97fa-e5479f7045ab/Group-47.png" 
              alt="بناء و ادارة" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-white/90 hover:text-secondary transition-colors duration-200 font-medium"
              >
                {language === 'ar' ? item.labelAr : item.labelEn}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5 text-white/90" />
              <span className="text-sm font-medium text-white/90">
                {language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/20">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-white/90 hover:text-secondary hover:bg-white/10 px-2 rounded-lg transition-colors"
              >
                {language === 'ar' ? item.labelAr : item.labelEn}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
