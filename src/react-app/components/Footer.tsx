import { Link } from 'react-router';
import { useLanguage } from '@/react-app/contexts/LanguageContext';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { language, t } = useLanguage();

  const quickLinks = [
    { path: '/', labelAr: 'الرئيسية', labelEn: 'Home' },
    { path: '/properties', labelAr: 'العقارات', labelEn: 'Properties' },
    { path: '/about', labelAr: 'من نحن', labelEn: 'About' },
    { path: '/services', labelAr: 'الخدمات', labelEn: 'Services' },
    { path: '/contact', labelAr: 'تواصل معنا', labelEn: 'Contact' },
  ];

  const services = [
    { labelAr: 'إدارة العقارات', labelEn: 'Property Management' },
    { labelAr: 'التسويق والبيع', labelEn: 'Marketing & Sales' },
    { labelAr: 'التقييم العقاري', labelEn: 'Valuation' },
    { labelAr: 'التأجير', labelEn: 'Leasing' },
    { labelAr: 'خدمات التصوير', labelEn: 'Photography' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://mocha-cdn.com/019a8fd3-ee2c-7b2b-97fa-e5479f7045ab/Group-47.png" 
                alt="بناء و ادارة" 
                className="h-12 w-auto brightness-0 invert"
              />
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg leading-none">
                  بناء و ادارة
                </span>
                <span className="text-xs text-gray-400">
                  {t('للعقارات', 'Real Estate')}
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {t(
                'منصة عقارية متخصصة في بناء وإدارة العقارات في المملكة العربية السعودية. نوفر تجربة سهلة وشفافة.',
                'Specialized real estate platform for construction and property management in Saudi Arabia. We provide a simple and transparent experience.'
              )}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('روابط سريعة', 'Quick Links')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {language === 'ar' ? link.labelAr : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('خدماتنا', 'Our Services')}</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-400 text-sm">
                    {language === 'ar' ? service.labelAr : service.labelEn}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('تواصل معنا', 'Contact Us')}</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <span dir="ltr">+966 50 123 4567</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <span>info@binaaidarah.sa</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{t('الرياض، المملكة العربية السعودية', 'Riyadh, Saudi Arabia')}</span>
              </div>
            </div>
            
            <h4 className="font-semibold mb-2 text-sm">{t('اشترك في النشرة', 'Newsletter')}</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('بريدك الإلكتروني', 'Your email')}
                className="flex-1 px-3 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
                {t('اشترك', 'Subscribe')}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>
            {t(
              '© 2025 بناء و ادارة. جميع الحقوق محفوظة.',
              '© 2025 Binaa & Idarah. All rights reserved.'
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
