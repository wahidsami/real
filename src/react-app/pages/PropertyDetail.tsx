import { useLanguage } from '@/react-app/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import { Property } from '@/shared/types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Share2,
  Heart,
  Home,
  Building,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';

export default function PropertyDetail() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-xl mb-8" />
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('العقار غير موجود', 'Property Not Found')}
          </h2>
          <Link to="/properties" className="text-primary hover:underline">
            {t('العودة للعقارات', 'Back to Properties')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse gallery safely; fall back to default image if invalid
  const galleryRaw = property.gallery ?? '[]';
  let gallery: string[] = [];
  try {
    const parsed = JSON.parse(galleryRaw);
    gallery = Array.isArray(parsed) ? parsed : [];
  } catch {
    // Comma-separated or single URL fallback
    if (typeof galleryRaw === 'string' && galleryRaw.includes(',')) {
      gallery = galleryRaw.split(',').map((s) => s.trim()).filter(Boolean);
    } else if (typeof galleryRaw === 'string' && /^https?:\/\//.test(galleryRaw.trim())) {
      gallery = [galleryRaw.trim()];
    } else {
      gallery = [];
    }
  }
  const toProxy = (url: string) => `/api/image?src=${encodeURIComponent(url)}`;
  const fallbackImageRaw = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80';
  const fallbackImage = toProxy(fallbackImageRaw);
  const images = (gallery.length > 0 ? gallery : [fallbackImageRaw]).map(toProxy);

  // Parse amenities robustly: support JSON array or comma-separated string
  const amenitiesRaw = property.amenities ?? '';
  let amenities: string[] = [];
  try {
    const parsed = JSON.parse(amenitiesRaw);
    amenities = Array.isArray(parsed) ? parsed : [];
  } catch {
    amenities = amenitiesRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const formatPrice = (price: number) => {
    const formattedNumber = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
    // Using Unicode U+20C0 for Saudi Riyal symbol as per Central Bank guidelines
    // Symbol appears to the left of the number with a space
    return (
      <span className="saudi-currency">
        {'\u20C0'} {formattedNumber}
      </span>
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_id: property.id,
          ...formData,
          contact_method: 'form',
        }),
      });
      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Failed to submit lead', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <img
            src={images[currentImageIndex]}
            alt=""
            className="max-w-full max-h-full object-contain"
            onError={() => {
              setCurrentImageIndex((idx) => (idx + 1 < images.length ? idx + 1 : 0));
            }}
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Main Gallery with Thumbnails */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <div
            className="h-[500px] relative rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setShowGallery(true)}
          >
            <img
              src={images[currentImageIndex]}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => {
                setCurrentImageIndex((idx) => (idx + 1 < images.length ? idx + 1 : 0));
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {images.map((img: string, i: number) => (
            <div
              key={i}
              className={`h-24 relative rounded-lg overflow-hidden cursor-pointer ${
                i === currentImageIndex ? 'ring-4 ring-primary' : 'ring-1 ring-gray-200'
              }`}
              onClick={() => setCurrentImageIndex(i)}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = fallbackImage;
                }}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Price */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {language === 'ar' ? property.title_ar : property.title_en}
                  </h1>
                  {property.city && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{property.city}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-12 h-12 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center hover:border-primary"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  <button className="w-12 h-12 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center hover:border-primary">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="text-4xl font-bold text-primary mb-4">
                {formatPrice(property.price)}
                {property.status === 'for_rent' && (
                  <span className="text-lg text-gray-600 font-normal"> / {t('شهرياً', 'monthly')}</span>
                )}
              </div>
              <div className="flex gap-2">
                <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  property.status === 'for_sale'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {property.status === 'for_sale' ? t('للبيع', 'For Sale') : t('للإيجار', 'For Rent')}
                </span>
                <span className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-800">
                  {property.property_type === 'apartment' && t('شقة', 'Apartment')}
                  {property.property_type === 'villa' && t('فيلا', 'Villa')}
                  {property.property_type === 'land' && t('أرض', 'Land')}
                  {property.property_type === 'commercial' && t('تجاري', 'Commercial')}
                </span>
              </div>
            </div>

            {/* Key Facts */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('معلومات أساسية', 'Key Facts')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {property.bedrooms && (
                  <div className="text-center">
                    <Bed className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">{t('غرف نوم', 'Bedrooms')}</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center">
                    <Bath className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">{t('حمامات', 'Bathrooms')}</div>
                  </div>
                )}
                {property.area_m2 && (
                  <div className="text-center">
                    <Maximize className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.area_m2.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{t('م²', 'm²')}</div>
                  </div>
                )}
                <div className="text-center">
                  <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-900">
                    {property.status === 'for_sale' ? t('للبيع', 'For Sale') : t('للإيجار', 'For Rent')}
                  </div>
                  <div className="text-sm text-gray-600">{t('الحالة', 'Status')}</div>
                </div>
              </div>
            </div>

            {/* Property Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('نظرة عامة', 'Overview')}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Building className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-xs text-gray-600">{t('نوع العقار', 'Property Type')}</div>
                    <div className="font-semibold text-gray-900">
                      {property.property_type === 'apartment' && t('شقة', 'Apartment')}
                      {property.property_type === 'villa' && t('فيلا', 'Villa')}
                      {property.property_type === 'land' && t('أرض', 'Land')}
                      {property.property_type === 'commercial' && t('تجاري', 'Commercial')}
                    </div>
                  </div>
                </div>
                {property.city && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-xs text-gray-600">{t('المدينة', 'City')}</div>
                      <div className="font-semibold text-gray-900">{property.city}</div>
                    </div>
                  </div>
                )}
                {property.region && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-xs text-gray-600">{t('المنطقة', 'Region')}</div>
                      <div className="font-semibold text-gray-900">{property.region}</div>
                    </div>
                  </div>
                )}
                {property.created_at && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-xs text-gray-600">{t('تاريخ الإضافة', 'Listed On')}</div>
                      <div className="font-semibold text-gray-900">
                        {new Date(property.created_at).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('الوصف', 'Description')}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {language === 'ar' ? property.description_ar : property.description_en}
              </p>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {t('المميزات والمرافق', 'Amenities & Features')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            {property.lat && property.lng && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {t('الموقع على الخريطة', 'Location on Map')}
                </h2>
                <div className="h-80 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[property.lat, property.lng]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[property.lat, property.lng]}>
                      <Popup>{language === 'ar' ? property.title_ar : property.title_en}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('استفسر عن العقار', 'Inquire About Property')}
              </h2>

              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {t('تم الإرسال بنجاح', 'Message Sent')}
                  </h3>
                  <p className="text-gray-600">
                    {t('سنتواصل معك قريباً', 'We will contact you soon')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('الاسم', 'Name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('اسمك الكامل', 'Your full name')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('البريد الإلكتروني', 'Email')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('بريدك الإلكتروني', 'your@email.com')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('رقم الهاتف', 'Phone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('رقم هاتفك', 'Your phone number')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('الرسالة', 'Message')}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('استفسارك عن العقار...', 'Your inquiry about the property...')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    {t('إرسال الاستفسار', 'Send Inquiry')}
                  </button>

                  <div className="flex gap-2">
                    <a
                      href="tel:+966501234567"
                      className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {t('اتصل', 'Call')}
                    </a>
                    <a
                      href="mailto:info@binaaidarah.sa"
                      className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {t('بريد', 'Email')}
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
