import { Link } from 'react-router';
import { useLanguage } from '@/react-app/contexts/LanguageContext';
import { Heart, Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { Property } from '@/shared/types';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { language, t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);

  const parseGallery = (g: unknown): string[] => {
    if (!g) return [];
    if (Array.isArray(g)) return g.filter((x) => typeof x === 'string');
    if (typeof g === 'string') {
      const trimmed = g.trim();
      // Try JSON array string
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.filter((x) => typeof x === 'string');
        }
      } catch {
        // Not JSON, fall through
      }
      // Comma-separated fallback
      if (trimmed.includes(',')) {
        return trimmed.split(',').map((s) => s.trim()).filter(Boolean);
      }
      // Single URL string
      if (/^https?:\/\//.test(trimmed)) {
        return [trimmed];
      }
    }
    return [];
  };

  const gallery = parseGallery((property as any).gallery);
  const toProxy = (url: string) => `/api/image?src=${encodeURIComponent(url)}`;
  const fallbackImageRaw = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80';
  const fallbackImage = toProxy(fallbackImageRaw);
  // Derive a stable initial image index per property to avoid identical card images
  const initialIndex = gallery.length > 0 ? (property.id % gallery.length) : 0;
  const [imageIndex, setImageIndex] = useState(initialIndex);
  const proxiedGallery = gallery.map(toProxy);
  const mainImage = proxiedGallery[imageIndex] || fallbackImage;

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

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/properties/${property.id}`} className="block relative">
        <div className="relative h-64 overflow-hidden">
          <img
            src={mainImage}
            alt={language === 'ar' ? property.title_ar : property.title_en}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={() => {
              // Advance to next gallery image if available; otherwise use fallback
              setImageIndex((idx) => {
                const next = idx + 1;
                return next < gallery.length ? next : -1; // -1 will resolve to fallback
              });
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Featured Badge */}
          {property.is_featured === 1 && (
            <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
              {t('مميز', 'Featured')}
            </div>
          )}

          {/* Price Badge */}
          <div className="absolute bottom-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-bold">
            {formatPrice(property.price)}
          </div>

          {/* Favorite Heart */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Add to favorites"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/properties/${property.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 hover:text-primary transition-colors">
            {language === 'ar' ? property.title_ar : property.title_en}
          </h3>
        </Link>

        {property.city && (
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.city}</span>
          </div>
        )}

        <div className="flex items-center gap-4 text-gray-600 mb-4">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
          )}
          {property.area_m2 && (
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              <span className="text-sm">{property.area_m2} {t('م²', 'm²')}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            property.status === 'for_sale' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {property.status === 'for_sale' ? t('للبيع', 'For Sale') : t('للإيجار', 'For Rent')}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {property.property_type === 'apartment' && t('شقة', 'Apartment')}
            {property.property_type === 'villa' && t('فيلا', 'Villa')}
            {property.property_type === 'land' && t('أرض', 'Land')}
            {property.property_type === 'commercial' && t('تجاري', 'Commercial')}
          </span>
        </div>
      </div>
    </div>
  );
}
