
CREATE TABLE properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  price INTEGER NOT NULL,
  currency TEXT DEFAULT 'SAR',
  status TEXT NOT NULL,
  property_type TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  area_m2 INTEGER,
  street TEXT,
  city TEXT,
  region TEXT,
  postal TEXT,
  lat REAL,
  lng REAL,
  amenities TEXT,
  gallery TEXT,
  floor_plan_ids TEXT,
  owner_id TEXT,
  agent_id TEXT,
  published_at TIMESTAMP,
  is_featured BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_type ON properties(property_type);
CREATE INDEX idx_properties_featured ON properties(is_featured);
CREATE INDEX idx_properties_price ON properties(price);
