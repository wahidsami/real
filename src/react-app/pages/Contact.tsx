import { useLanguage } from '@/react-app/contexts/LanguageContext';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

export default function Contact() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, contact_method: 'contact_form' }),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Failed to submit contact form', error);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      titleAr: 'اتصل بنا',
      titleEn: 'Call Us',
      valueAr: '+966 50 123 4567',
      valueEn: '+966 50 123 4567',
      link: 'tel:+966501234567',
    },
    {
      icon: Mail,
      titleAr: 'راسلنا',
      titleEn: 'Email Us',
      valueAr: 'info@binaaidarah.sa',
      valueEn: 'info@binaaidarah.sa',
      link: 'mailto:info@binaaidarah.sa',
    },
    {
      icon: MapPin,
      titleAr: 'موقعنا',
      titleEn: 'Visit Us',
      valueAr: 'الرياض، المملكة العربية السعودية',
      valueEn: 'Riyadh, Saudi Arabia',
      link: '#',
    },
    {
      icon: Clock,
      titleAr: 'أوقات العمل',
      titleEn: 'Working Hours',
      valueAr: 'السبت - الخميس: 9 صباحاً - 6 مساءً',
      valueEn: 'Sat - Thu: 9 AM - 6 PM',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-primary to-primary/90 overflow-hidden">
        <img 
          src="https://mocha-cdn.com/019a8fd3-ee2c-7b2b-97fa-e5479f7045ab/contact-banner.png" 
          alt="تواصل معنا" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              {t('تواصل معنا', 'Contact Us')}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t(
                'نحن هنا للإجابة على جميع استفساراتك ومساعدتك',
                'We are here to answer all your questions and help you'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {language === 'ar' ? info.titleAr : info.titleEn}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' ? info.valueAr : info.valueEn}
                </p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('أرسل لنا رسالة', 'Send Us a Message')}
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t('تم الإرسال بنجاح!', 'Message Sent Successfully!')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t('شكراً لتواصلك معنا. سنرد عليك قريباً.', 'Thank you for contacting us. We will respond soon.')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary hover:underline"
                  >
                    {t('إرسال رسالة أخرى', 'Send Another Message')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('الاسم', 'Name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('اسمك الكامل', 'Your full name')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('البريد الإلكتروني', 'Email')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('بريدك الإلكتروني', 'your@email.com')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('رقم الهاتف', 'Phone')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('رقم هاتفك', 'Your phone number')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('الرسالة', 'Message')} *
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('اكتب رسالتك هنا...', 'Write your message here...')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {t('إرسال الرسالة', 'Send Message')}
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-full min-h-[500px]">
                <MapContainer
                  center={[24.7136, 46.6753]}
                  zoom={12}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[24.7136, 46.6753]}>
                    <Popup>{t('الرياض، المملكة العربية السعودية', 'Riyadh, Saudi Arabia')}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('الأسئلة الشائعة', 'Frequently Asked Questions')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('إجابات سريعة على الأسئلة الأكثر شيوعاً', 'Quick answers to common questions')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: { ar: 'كيف يمكنني إدراج عقاري؟', en: 'How can I list my property?' },
                a: {
                  ar: 'يمكنك التواصل معنا عبر الهاتف أو البريد الإلكتروني وسيساعدك فريقنا في إدراج عقارك.',
                  en: 'You can contact us by phone or email and our team will help you list your property.',
                },
              },
              {
                q: { ar: 'ما هي رسوم خدماتكم؟', en: 'What are your service fees?' },
                a: {
                  ar: 'تختلف الرسوم حسب نوع الخدمة. تواصل معنا للحصول على عرض سعر مخصص.',
                  en: 'Fees vary depending on the service type. Contact us for a customized quote.',
                },
              },
              {
                q: { ar: 'هل تقدمون خدمات التقييم العقاري؟', en: 'Do you offer property valuation services?' },
                a: {
                  ar: 'نعم، نقدم خدمات تقييم عقاري احترافية معتمدة من خبراء متخصصين.',
                  en: 'Yes, we offer professional property valuation services certified by specialized experts.',
                },
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {language === 'ar' ? faq.q.ar : faq.q.en}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' ? faq.a.ar : faq.a.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
