import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/react-app/contexts/LanguageContext';
import { Search, MapPin, Home, Bed } from 'lucide-react';

export default function QuickSearch() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    city: '',
    property_type: '',
    min_price: '',
    max_price: '',
    bedrooms: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="relative -mt-20 z-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t('ابحث عن عقارك المثالي', 'Find Your Perfect Property')}
          </h2>
          
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('المدينة أو المنطقة', 'City or Area')}
              </label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  placeholder={t('ابحث بالمدينة أو الحي', 'Search by city or area')}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('نوع العقار', 'Property Type')}
              </label>
              <div className="relative">
                <Home className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filters.property_type}
                  onChange={(e) => setFilters({ ...filters, property_type: e.target.value })}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="">{t('الكل', 'All')}</option>
                  <option value="apartment">{t('شقة', 'Apartment')}</option>
                  <option value="villa">{t('فيلا', 'Villa')}</option>
                  <option value="land">{t('أرض', 'Land')}</option>
                  <option value="commercial">{t('تجاري', 'Commercial')}</option>
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('السعر الأدنى', 'Min Price')}
              </label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 saudi-currency">
                  {'\u20C0'}
                </span>
                <input
                  type="number"
                  value={filters.min_price}
                  onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
                  placeholder={t('من', 'From')}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('السعر الأقصى', 'Max Price')}
              </label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 saudi-currency">
                  {'\u20C0'}
                </span>
                <input
                  type="number"
                  value={filters.max_price}
                  onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
                  placeholder={t('إلى', 'To')}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('الغرف', 'Bedrooms')}
              </label>
              <div className="relative">
                <Bed className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="">{t('الكل', 'All')}</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>
          </form>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full mt-6 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Search className="w-5 h-5" />
            {t('ابحث الآن', 'Search Now')}
          </button>
        </div>
      </div>
    </div>
  );
}
