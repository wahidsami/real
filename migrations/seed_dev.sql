-- Development seed data for local D1 database
-- Inserts a couple of published properties so cards render in dev

INSERT INTO properties (
  title_ar,
  title_en,
  description_ar,
  description_en,
  price,
  currency,
  status,
  property_type,
  bedrooms,
  bathrooms,
  area_m2,
  street,
  city,
  region,
  postal,
  lat,
  lng,
  amenities,
  gallery,
  floor_plan_ids,
  owner_id,
  agent_id,
  published_at,
  is_featured
) VALUES (
  'شقة حديثة في جدة',
  'Modern apartment in Jeddah',
  NULL,
  NULL,
  850000,
  'SAR',
  'for_sale',
  'apartment',
  3,
  2,
  120,
  'شارع فلسطين',
  'Jeddah',
  'Makkah',
  '23333',
  21.542,
  -39.196,
  'pool,parking',
  '["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80"]',
  NULL,
  NULL,
  NULL,
  datetime('now'),
  1
);

INSERT INTO properties (
  title_ar,
  title_en,
  description_ar,
  description_en,
  price,
  currency,
  status,
  property_type,
  bedrooms,
  bathrooms,
  area_m2,
  street,
  city,
  region,
  postal,
  lat,
  lng,
  amenities,
  gallery,
  floor_plan_ids,
  owner_id,
  agent_id,
  published_at,
  is_featured
) VALUES (
  'فيلا واسعة في الرياض',
  'Spacious villa in Riyadh',
  NULL,
  NULL,
  12000,
  'SAR',
  'for_rent',
  'villa',
  5,
  4,
  380,
  'حي الياسمين',
  'Riyadh',
  'Riyadh',
  '11672',
  24.7136,
  46.6753,
  'garden,parking,gym',
  '["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80"]',
  NULL,
  NULL,
  NULL,
  datetime('now'),
  0
);

-- Additional diverse properties across Saudi cities and types
INSERT INTO properties (title_ar,title_en,description_ar,description_en,price,currency,status,property_type,bedrooms,bathrooms,area_m2,street,city,region,postal,lat,lng,amenities,gallery,floor_plan_ids,owner_id,agent_id,published_at,is_featured) VALUES
('شقة فاخرة في الرياض','Luxury Apartment in Riyadh',NULL,NULL,950000,'SAR','for_sale','apartment',4,3,180,'شارع التحلية','Riyadh','Riyadh','12211',24.7136,46.6753,'parking,elevator,gym','["https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),1),
('فيلا حديثة في جدة','Modern Villa in Jeddah',NULL,NULL,2400000,'SAR','for_sale','villa',6,5,520,'حي الشاطئ','Jeddah','Makkah','23511',21.543,39.172,'pool,garden,parking','["https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),1),
('أرض سكنية في مكة','Residential Land in Mecca',NULL,NULL,700000,'SAR','for_sale','land',NULL,NULL,600,'حي النسيم','Mecca','Makkah','24231',21.3891,39.8579,'','["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('مساحة تجارية في الدمام','Commercial Space in Dammam',NULL,NULL,180000,'SAR','for_rent','commercial',NULL,2,240,'شارع الملك سعود','Dammam','Eastern','31433',26.3927,49.9777,'parking,elevator','["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('شقة متوسطة في المدينة','Mid-range Apartment in Medina',NULL,NULL,520000,'SAR','for_sale','apartment',3,2,140,'حي الخالدية','Medina','Medina','42361',24.467,39.611,'parking,elevator','["https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('شقة بالقرب من البحر في الخبر','Sea-view Apartment in Khobar',NULL,NULL,780000,'SAR','for_sale','apartment',3,3,160,'كورنيش الخبر','Khobar','Eastern','31952',26.2797,50.215,'parking,elevator,gym','["https://images.unsplash.com/photo-1502005229762-cf1b2c0bda3a?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),1),
('فيلا عائلية في الطائف','Family Villa in Taif',NULL,NULL,1350000,'SAR','for_sale','villa',5,4,420,'حي القيم','Taif','Makkah','26513',21.270,40.415,'garden,parking','["https://images.unsplash.com/photo-1600585154340-0d49d1d4b3f5?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('شقة إيجار في ينبع','Rental Apartment in Yanbu',NULL,NULL,3500,'SAR','for_rent','apartment',2,2,95,'حي الصناعية','Yanbu','Medina','46429',24.094,38.049,'parking','["https://images.unsplash.com/photo-1505691723518-36a5ac3b2d39?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('مكتب حديث في الرياض','Modern Office in Riyadh',NULL,NULL,25000,'SAR','for_rent','commercial',NULL,2,180,'طريق الملك فهد','Riyadh','Riyadh','12272',24.7136,46.6753,'parking,elevator','["https://images.unsplash.com/photo-1591382694101-457a1f63f2ab?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),1),
('أرض استثمارية في أبها','Investment Land in Abha',NULL,NULL,1200000,'SAR','for_sale','land',NULL,NULL,1200,'حي الضباب','Abha','Asir','61421',18.216,42.504,'','["https://images.unsplash.com/photo-1472224371017-08207f84aaae?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('فيلا فاخرة في الدمام','Luxury Villa in Dammam',NULL,NULL,3200000,'SAR','for_sale','villa',7,6,680,'حي الشاطئ الغربي','Dammam','Eastern','32415',26.3927,49.9777,'pool,garden,parking,gym','["https://images.unsplash.com/photo-1600607687939-6fb6f6b3b9f4?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),1),
('شقة حديثة في بريدة','Modern Apartment in Buraydah',NULL,NULL,430000,'SAR','for_sale','apartment',2,2,110,'حي الريان','Buraydah','Qassim','52359',26.325,43.975,'parking,elevator','["https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('شقة واسعة في جدة','Spacious Apartment in Jeddah',NULL,NULL,1200000,'SAR','for_sale','apartment',4,3,220,'حي الروضة','Jeddah','Makkah','23435',21.543,39.172,'parking,elevator,gym','["https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),1),
('شقة إيجار في مكة','Rental Apartment in Mecca',NULL,NULL,5500,'SAR','for_rent','apartment',3,2,130,'شارع إبراهيم الخليل','Mecca','Makkah','24231',21.3891,39.8579,'elevator,parking','["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('فيلا فاخرة في المدينة','Luxury Villa in Medina',NULL,NULL,2800000,'SAR','for_sale','villa',6,5,540,'حي العزيزية','Medina','Medina','42361',24.467,39.611,'pool,garden,parking','["https://images.unsplash.com/photo-1560448070-7c3a6b6f9724?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),1),
('محل تجاري في الخبر','Retail Shop in Khobar',NULL,NULL,9500,'SAR','for_rent','commercial',NULL,1,90,'شارع الملك فيصل','Khobar','Eastern','31952',26.2797,50.215,'parking','["https://images.unsplash.com/photo-1507679799833-7f4f7ab1d3c2?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('أرض سكنية في الرياض','Residential Land in Riyadh',NULL,NULL,990000,'SAR','for_sale','land',NULL,NULL,750,'حي النرجس','Riyadh','Riyadh','13322',24.7136,46.6753,'','["https://images.unsplash.com/photo-1531539134681-1b247f0b8f20?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('شقة مطلة على البحر في جدة','Sea View Apartment in Jeddah',NULL,NULL,1450000,'SAR','for_sale','apartment',3,3,200,'كورنيش جدة','Jeddah','Makkah','23511',21.543,39.172,'parking,elevator,gym','["https://images.unsplash.com/photo-1507133750040-4a8f570215c5?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),1),
('شقة إيجار في الدمام','Rental Apartment in Dammam',NULL,NULL,4200,'SAR','for_rent','apartment',2,2,100,'حي الأندلس','Dammam','Eastern','31146',26.3927,49.9777,'parking,elevator','["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('مستودع في الرياض','Warehouse in Riyadh',NULL,NULL,30000,'SAR','for_rent','commercial',NULL,2,900,'الصناعية الثانية','Riyadh','Riyadh','14335',24.7136,46.6753,'parking','["https://images.unsplash.com/photo-1602524812162-8b36ac0f3d3a?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('فيلا حديثة في الطائف','Modern Villa in Taif',NULL,NULL,1600000,'SAR','for_sale','villa',5,4,450,'حي الوسام','Taif','Makkah','26711',21.270,40.415,'garden,parking','["https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('شقة اقتصادية في مكة','Budget Apartment in Mecca',NULL,NULL,350000,'SAR','for_sale','apartment',2,1,85,'حي الشوقية','Mecca','Makkah','24361',21.3891,39.8579,'','["https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0),
('فيلا فاخرة في الخبر','Luxury Villa in Khobar',NULL,NULL,3100000,'SAR','for_sale','villa',7,6,700,'حي الصفا','Khobar','Eastern','31952',26.2797,50.215,'pool,garden,parking,gym','["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),1),
('شقة حديثة في المدينة','Modern Apartment in Medina',NULL,NULL,620000,'SAR','for_sale','apartment',3,2,150,'حي الهجرة','Medina','Medina','42361',24.467,39.611,'parking,elevator','["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80"]',NULL,NULL,NULL,datetime('now'),0);

-- Improve all existing rows: set multiple gallery images everywhere
UPDATE properties
SET gallery='["https://images.unsplash.com/photo-1600585154340-0d49d1d4b3f5?w=1200&q=80","https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=1200&q=80","https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&q=80","https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80"]'
WHERE gallery IS NULL OR gallery = '[]' OR gallery LIKE '%["https://images.unsplash.com%"%]';

-- Ensure any single-image galleries are expanded
UPDATE properties
SET gallery='["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80","https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&q=80","https://images.unsplash.com/photo-1502005229762-cf1b2c0bda3a?w=1200&q=80","https://images.unsplash.com/photo-1507133750040-4a8f570215c5?w=1200&q=80"]'
WHERE gallery LIKE '%e02f11c3d0e2%';