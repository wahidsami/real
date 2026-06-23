import { useLanguage } from '@/react-app/contexts/LanguageContext';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import HeroSlider from '@/react-app/components/HeroSlider';
import QuickSearch from '@/react-app/components/QuickSearch';
import { Link } from 'react-router';
import { Search, Eye, Handshake, Building, TrendingUp, Shield, Award, Users, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Property } from '@/shared/types';
import PropertyCard from '@/react-app/components/PropertyCard';

export default function Home() {
  const { language, t } = useLanguage();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties?is_featured=1&limit=6')
      .then(res => res.json())
      .then(data => {
        setFeaturedProperties(data.properties || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const steps = [
    {
      icon: Search,
      titleAr: 'ابحث',
      titleEn: 'Search',
      descAr: 'استخدم أدوات البحث المتقدمة للعثور على عقارك المثالي',
      descEn: 'Use our advanced search tools to find your ideal property',
    },
    {
      icon: Eye,
      titleAr: 'زيارة',
      titleEn: 'Visit',
      descAr: 'احجز موعد لزيارة العقارات المفضلة لديك',
      descEn: 'Schedule visits to your favorite properties',
    },
    {
      icon: Handshake,
      titleAr: 'اتفاق',
      titleEn: 'Agreement',
      descAr: 'أتمم الصفقة بسهولة مع خبرائنا',
      descEn: 'Complete the deal easily with our experts',
    },
  ];

  const services = [
    {
      icon: Building,
      titleAr: 'إدارة العقارات',
      titleEn: 'Property Management',
      descAr: 'إدارة شاملة لعقاراتك الاستثمارية',
      descEn: 'Comprehensive management for your investment properties',
    },
    {
      icon: TrendingUp,
      titleAr: 'التسويق والبيع',
      titleEn: 'Marketing & Sales',
      descAr: 'استراتيجيات تسويق احترافية لبيع عقارك',
      descEn: 'Professional marketing strategies to sell your property',
    },
    {
      icon: Shield,
      titleAr: 'التقييم العقاري',
      titleEn: 'Property Valuation',
      descAr: 'تقييمات دقيقة معتمدة من خبراء',
      descEn: 'Accurate valuations from certified experts',
    },
  ];

  const stats = [
    { value: '2,500+', labelAr: 'عقار متاح', labelEn: 'Properties Available' },
    { value: '1,200+', labelAr: 'عميل راضٍ', labelEn: 'Happy Clients' },
    { value: '15+', labelAr: 'سنة خبرة', labelEn: 'Years Experience' },
    { value: '98%', labelAr: 'نسبة رضا', labelEn: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroSlider />
      <QuickSearch />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/90">
                  {language === 'ar' ? stat.labelAr : stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('عقارات مميزة', 'Featured Properties')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'اكتشف مجموعة مختارة من أفضل العقارات المتاحة',
                'Discover our handpicked selection of the finest properties'
              )}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl h-96 animate-pulse" />
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {t('لا توجد عقارات مميزة حالياً', 'No featured properties available')}
            </div>
          )}

          <div className="text-center">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              {t('عرض جميع العقارات', 'View All Properties')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('كيف نعمل', 'How It Works')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'ثلاث خطوات بسيطة للعثور على منزلك المثالي',
                'Three simple steps to find your perfect home'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'ar' ? step.titleAr : step.titleEn}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' ? step.descAr : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('خدماتنا', 'Our Services')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'نقدم مجموعة شاملة من الخدمات العقارية المتميزة',
                'We offer a comprehensive range of premium real estate services'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'ar' ? service.titleAr : service.titleEn}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' ? service.descAr : service.descEn}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-200"
            >
              {t('جميع الخدمات', 'All Services')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('آراء عملائنا', 'Client Testimonials')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'اكتشف تجارب عملائنا السعداء',
                'Discover the experiences of our happy clients'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {language === 'ar' ? `عميل ${i}` : `Client ${i}`}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('مشترٍ', 'Buyer')}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'ar'
                    ? 'تجربة ممتازة مع روّاي للعقارات. فريق محترف ومتعاون ساعدني في العثور على منزل أحلامي.'
                    : 'Excellent experience with ROYA Properties. Professional and helpful team that helped me find my dream home.'}
                </p>
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Award key={star} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('هل لديك عقار تريد إدراجه؟', 'Have a property to list?')}
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            {t(
              'تواصل معنا الآن وسنساعدك في تسويق عقارك بأفضل طريقة',
              'Contact us now and we will help you market your property in the best way'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
            >
              {t('تواصل معنا', 'Contact Us')}
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
