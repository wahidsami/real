import { useLanguage } from '@/react-app/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import Header from '@/react-app/components/Header';
import Footer from '@/react-app/components/Footer';
import PropertyCard from '@/react-app/components/PropertyCard';
import { Property } from '@/shared/types';
import { SlidersHorizontal, Grid, List, MapPin, Home, X } from 'lucide-react';

export default function Properties() {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    property_type: searchParams.get('property_type') || '',
    status: searchParams.get('status') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    min_area: searchParams.get('min_area') || '',
    max_area: searchParams.get('max_area') || '',
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenitiesList = [
    { value: 'pool', labelAr: 'مسبح', labelEn: 'Pool' },
    { value: 'parking', labelAr: 'موقف سيارات', labelEn: 'Parking' },
    { value: 'elevator', labelAr: 'مصعد', labelEn: 'Elevator' },
    { value: 'furnished', labelAr: 'مفروش', labelEn: 'Furnished' },
    { value: 'garden', labelAr: 'حديقة', labelEn: 'Garden' },
    { value: 'gym', labelAr: 'صالة رياضية', labelEn: 'Gym' },
  ];

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  const fetchProperties = async () => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    const response = await fetch(`/api/properties?${params.toString()}`);
    const data = await response.json();
    setProperties(data.properties || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    
    const params = new URLSearchParams();
    Object.entries(updated).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      property_type: '',
      status: '',
      min_price: '',
      max_price: '',
      bedrooms: '',
      bathrooms: '',
      min_area: '',
      max_area: '',
    });
    setSelectedAmenities([]);
    setSearchParams({});
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary to-primary/90 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">
            {t('جميع العقارات', 'All Properties')}
          </h1>
          <p className="text-white/90">
            {t(`وجدنا ${total} عقار`, `Found ${total} properties`)}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  {t('فلترة', 'Filters')}
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  {t('مسح الكل', 'Clear All')}
                </button>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('المدينة', 'City')}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={filters.city}
                      onChange={(e) => updateFilters({ city: e.target.value })}
                      placeholder={t('ابحث بالمدينة', 'Search by city')}
                      className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('الحالة', 'Status')}
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => updateFilters({ status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">{t('الكل', 'All')}</option>
                    <option value="for_sale">{t('للبيع', 'For Sale')}</option>
                    <option value="for_rent">{t('للإيجار', 'For Rent')}</option>
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('نوع العقار', 'Property Type')}
                  </label>
                  <select
                    value={filters.property_type}
                    onChange={(e) => updateFilters({ property_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">{t('الكل', 'All')}</option>
                    <option value="apartment">{t('شقة', 'Apartment')}</option>
                    <option value="villa">{t('فيلا', 'Villa')}</option>
                    <option value="land">{t('أرض', 'Land')}</option>
                    <option value="commercial">{t('تجاري', 'Commercial')}</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('السعر', 'Price')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={filters.min_price}
                      onChange={(e) => updateFilters({ min_price: e.target.value })}
                      placeholder={t('من', 'Min')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={filters.max_price}
                      onChange={(e) => updateFilters({ max_price: e.target.value })}
                      placeholder={t('إلى', 'Max')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('غرف النوم', 'Bedrooms')}
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => updateFilters({ bedrooms: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">{t('الكل', 'All')}</option>
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}+</option>
                    ))}
                  </select>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('الحمامات', 'Bathrooms')}
                  </label>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => updateFilters({ bathrooms: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">{t('الكل', 'All')}</option>
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num}+</option>
                    ))}
                  </select>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('المساحة (م²)', 'Area (m²)')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={filters.min_area}
                      onChange={(e) => updateFilters({ min_area: e.target.value })}
                      placeholder={t('من', 'Min')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={filters.max_area}
                      onChange={(e) => updateFilters({ max_area: e.target.value })}
                      placeholder={t('إلى', 'Max')}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t('المميزات', 'Amenities')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesList.map((amenity) => (
                      <button
                        key={amenity.value}
                        onClick={() => toggleAmenity(amenity.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedAmenities.includes(amenity.value)
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {language === 'ar' ? amenity.labelAr : amenity.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {t('فلترة', 'Filters')}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(Object.values(filters).some(v => v) || selectedAmenities.length > 0) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) =>
                  value ? (
                    <span
                      key={key}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {value}
                      <button
                        onClick={() => updateFilters({ [key]: '' })}
                        className="hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ) : null
                )}
                {selectedAmenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                  >
                    {amenitiesList.find(a => a.value === amenity)?.[language === 'ar' ? 'labelAr' : 'labelEn']}
                    <button
                      onClick={() => toggleAmenity(amenity)}
                      className="hover:bg-secondary/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Properties Grid/List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl h-96 animate-pulse" />
                ))}
              </div>
            ) : properties.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl">
                <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t('لم نجد عقارات', 'No Properties Found')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('جرب تغيير الفلاتر أو البحث', 'Try changing filters or search')}
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                >
                  {t('مسح الفلاتر', 'Clear Filters')}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
