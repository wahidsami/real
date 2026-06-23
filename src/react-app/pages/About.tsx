import { useLanguage } from '@/react-app/contexts/LanguageContext';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import { Target, Eye, Award, Users, TrendingUp, Shield } from 'lucide-react';

export default function About() {
  const { language, t } = useLanguage();

  const values = [
    {
      icon: Shield,
      titleAr: 'نزاهة',
      titleEn: 'Integrity',
      descAr: 'نلتزم بأعلى معايير الأخلاق والشفافية في جميع معاملاتنا',
      descEn: 'We uphold the highest standards of ethics and transparency',
    },
    {
      icon: Users,
      titleAr: 'خدمة العملاء',
      titleEn: 'Client Service',
      descAr: 'رضا عملائنا هو أولويتنا القصوى في كل ما نقوم به',
      descEn: 'Client satisfaction is our top priority in everything we do',
    },
    {
      icon: TrendingUp,
      titleAr: 'احترافية',
      titleEn: 'Professionalism',
      descAr: 'فريق من الخبراء المحترفين لخدمتك على مدار الساعة',
      descEn: 'Professional experts serving you around the clock',
    },
    {
      icon: Award,
      titleAr: 'التميز',
      titleEn: 'Excellence',
      descAr: 'نسعى دائماً لتقديم أفضل الخدمات وتجاوز التوقعات',
      descEn: 'Always striving to deliver the best service and exceed expectations',
    },
  ];

  const stats = [
    { value: '15+', labelAr: 'سنة خبرة', labelEn: 'Years Experience' },
    { value: '2,500+', labelAr: 'عقار منجز', labelEn: 'Properties Completed' },
    { value: '1,200+', labelAr: 'عميل راضٍ', labelEn: 'Happy Clients' },
    { value: '50+', labelAr: 'محترف', labelEn: 'Professionals' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-primary to-primary/90 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80" 
          alt="من نحن" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              {t('من نحن', 'About Us')}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t(
                'شركة عقارية رائدة تقدم خدمات متميزة منذ أكثر من 15 عاماً',
                'Leading real estate company providing exceptional services for over 15 years'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Company Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('بناء و ادارة', 'Binaa & Idarah')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t(
                  'بناء و ادارة شركة متخصّصة في بناء وإدارة العقارات في المملكة العربية السعودية. مهمتنا توفير تجربة سهلة، شفافة، ومتميزة للمشترين والمالكين على حد سواء.',
                  'Binaa & Idarah is a specialized company in construction and property management in Saudi Arabia. Our mission is to deliver a simple, transparent and exceptional experience for buyers and owners.'
                )}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t(
                  'نفخر بتقديم خدمات عقارية شاملة تشمل التسويق، البيع، التأجير، وإدارة العقارات. فريقنا من المحترفين ذوي الخبرة الطويلة يعمل على مدار الساعة لضمان تحقيق أهدافك العقارية.',
                  'We pride ourselves on providing comprehensive real estate services including marketing, sales, rentals, and property management. Our team of experienced professionals works around the clock to ensure your real estate goals are met.'
                )}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
                  alt="Office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-xl overflow-hidden mt-8">
                <img
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80"
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/90">
                  {language === 'ar' ? stat.labelAr : stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('مهمتنا', 'Our Mission')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t(
                  'تمكين العملاء من اتخاذ قرارات عقارية ذكية عبر بيانات دقيقة وخدمات متميزة. نسعى لتبسيط عملية البحث عن العقارات وتوفير تجربة استثنائية لكل عميل.',
                  'Empowering clients to make smart real estate decisions through accurate data and exceptional services. We strive to simplify the property search process and provide an exceptional experience for every client.'
                )}
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 p-8 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('رؤيتنا', 'Our Vision')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t(
                  'أن نصبح المنصة العقارية الأولى في المنطقة للبحث وإدارة العقارات، معروفين بالابتكار، الجودة، والموثوقية في خدماتنا.',
                  'To become the leading real estate platform in the region for property search and management, known for innovation, quality, and reliability in our services.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('قيمنا', 'Our Values')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'القيم التي نلتزم بها في كل ما نقوم به',
                'The values we uphold in everything we do'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'ar' ? value.titleAr : value.titleEn}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' ? value.descAr : value.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('فريقنا', 'Our Team')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'مجموعة من المحترفين المتخصصين في خدمتك',
                'A team of dedicated professionals at your service'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-xl overflow-hidden group">
                <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Users className="w-24 h-24 text-primary/40" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {language === 'ar' ? `عضو الفريق ${i}` : `Team Member ${i}`}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('مستشار عقاري', 'Real Estate Consultant')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t(
                      'خبرة واسعة في السوق العقاري وخدمة العملاء المتميزة',
                      'Extensive experience in real estate market and exceptional client service'
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
