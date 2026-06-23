import { useLanguage } from '@/react-app/contexts/LanguageContext';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import { Link } from 'react-router';
import { Building, TrendingUp, Scale, Key, Camera, ClipboardCheck, ArrowRight } from 'lucide-react';

export default function Services() {
  const { language, t } = useLanguage();

  const services = [
    {
      icon: Building,
      titleAr: 'إدارة العقارات',
      titleEn: 'Property Management',
      descAr: 'نوفر خدمات إدارة عقارية شاملة تشمل التسويق، تحصيل الإيجار، والصيانة الدورية. نتولى كافة جوانب إدارة عقارك لضمان عائد استثماري مثالي.',
      descEn: 'We provide comprehensive property management services including marketing, rent collection, and regular maintenance. We handle all aspects of managing your property to ensure optimal return on investment.',
      features: [
        { ar: 'تسويق العقار', en: 'Property Marketing' },
        { ar: 'فحص وفلترة المستأجرين', en: 'Tenant Screening' },
        { ar: 'تحصيل الإيجار', en: 'Rent Collection' },
        { ar: 'الصيانة والإصلاحات', en: 'Maintenance & Repairs' },
        { ar: 'تقارير دورية', en: 'Regular Reports' },
      ],
    },
    {
      icon: TrendingUp,
      titleAr: 'التسويق والبيع',
      titleEn: 'Marketing & Sales',
      descAr: 'استراتيجيات تسويق عقاري احترافية مع تصوير فوتوغرافي عالي الجودة، وإعلانات موجهة على أفضل المنصات العقارية.',
      descEn: 'Professional real estate marketing strategies with high-quality photography, and targeted advertising on the best real estate platforms.',
      features: [
        { ar: 'تصوير احترافي', en: 'Professional Photography' },
        { ar: 'جولات افتراضية', en: 'Virtual Tours' },
        { ar: 'إعلانات موجهة', en: 'Targeted Advertising' },
        { ar: 'استشارات تسعير', en: 'Pricing Consultation' },
        { ar: 'مفاوضات البيع', en: 'Sales Negotiations' },
      ],
    },
    {
      icon: Scale,
      titleAr: 'التقييم العقاري',
      titleEn: 'Property Valuation',
      descAr: 'تقارير تقييم عقاري دقيقة ومعتمدة من خبراء متخصصين، تساعدك في اتخاذ قرارات استثمارية سليمة.',
      descEn: 'Accurate and certified property valuation reports from specialized experts, helping you make sound investment decisions.',
      features: [
        { ar: 'تحليل السوق', en: 'Market Analysis' },
        { ar: 'تقييم معتمد', en: 'Certified Valuation' },
        { ar: 'مقارنات سوقية', en: 'Market Comparisons' },
        { ar: 'تقارير مفصلة', en: 'Detailed Reports' },
        { ar: 'استشارات استثمارية', en: 'Investment Consultation' },
      ],
    },
    {
      icon: Key,
      titleAr: 'التأجير',
      titleEn: 'Leasing Services',
      descAr: 'خدمات تأجير متكاملة من فلترة المستأجرين إلى إعداد العقود الرقمية وإدارة العلاقة مع المستأجرين.',
      descEn: 'Complete leasing services from tenant screening to digital contract preparation and tenant relationship management.',
      features: [
        { ar: 'فحص المستأجرين', en: 'Tenant Screening' },
        { ar: 'عقود رقمية', en: 'Digital Contracts' },
        { ar: 'إدارة الإيجار', en: 'Rent Management' },
        { ar: 'حل النزاعات', en: 'Dispute Resolution' },
        { ar: 'تجديد العقود', en: 'Contract Renewals' },
      ],
    },
    {
      icon: Camera,
      titleAr: 'التصوير الاحترافي',
      titleEn: 'Professional Photography',
      descAr: 'خدمات تصوير عقاري احترافية تشمل الصور الفوتوغرافية، الفيديو، والجولات الافتراضية بتقنية 360 درجة.',
      descEn: 'Professional real estate photography services including photos, videos, and 360-degree virtual tours.',
      features: [
        { ar: 'تصوير فوتوغرافي', en: 'Photography' },
        { ar: 'فيديو احترافي', en: 'Professional Video' },
        { ar: 'جولة افتراضية 360', en: '360 Virtual Tour' },
        { ar: 'تصوير جوي بالدرون', en: 'Drone Photography' },
        { ar: 'تعديل الصور', en: 'Photo Editing' },
      ],
    },
    {
      icon: ClipboardCheck,
      titleAr: 'الاستشارات العقارية',
      titleEn: 'Real Estate Consulting',
      descAr: 'استشارات متخصصة في الاستثمار العقاري، تحليل السوق، والتخطيط العقاري طويل المدى.',
      descEn: 'Specialized consulting in real estate investment, market analysis, and long-term real estate planning.',
      features: [
        { ar: 'تحليل الاستثمار', en: 'Investment Analysis' },
        { ar: 'دراسات الجدوى', en: 'Feasibility Studies' },
        { ar: 'تخطيط العقارات', en: 'Property Planning' },
        { ar: 'إدارة المحافظ', en: 'Portfolio Management' },
        { ar: 'استشارات قانونية', en: 'Legal Consultation' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-primary to-primary/90 overflow-hidden">
        <img 
          src="https://mocha-cdn.com/019a8fd3-ee2c-7b2b-97fa-e5479f7045ab/services-banner.png" 
          alt="خدماتنا" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              {t('خدماتنا', 'Our Services')}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t(
                'نقدم مجموعة شاملة من الخدمات العقارية المتميزة',
                'We offer a comprehensive range of premium real estate services'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {language === 'ar' ? service.titleAr : service.titleEn}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {language === 'ar' ? service.descAr : service.descEn}
                  </p>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      {t('ما نقدمه:', 'What We Offer:')}
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700">
                          <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                          <span>{language === 'ar' ? feature.ar : feature.en}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('لماذا تختارنا', 'Why Choose Us')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'نتميز بخبرة واسعة واحترافية عالية في تقديم الخدمات العقارية',
                'We excel with extensive experience and high professionalism in providing real estate services'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">15+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('سنة خبرة', 'Years Experience')}
              </h3>
              <p className="text-gray-600">
                {t('خبرة واسعة في السوق العقاري', 'Extensive experience in real estate market')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">98%</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('نسبة رضا', 'Satisfaction Rate')}
              </h3>
              <p className="text-gray-600">
                {t('عملاء راضون عن خدماتنا', 'Clients satisfied with our services')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">24/7</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('دعم مستمر', 'Continuous Support')}
              </h3>
              <p className="text-gray-600">
                {t('فريقنا متاح لخدمتك دائماً', 'Our team is always available to serve you')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('جاهز لبدء مشروعك العقاري؟', 'Ready to start your real estate project?')}
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            {t(
              'تواصل معنا اليوم واحصل على استشارة مجانية من خبرائنا',
              'Contact us today and get a free consultation from our experts'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              {t('تواصل معنا', 'Contact Us')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200"
            >
              {t('استعرض العقارات', 'Browse Properties')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
