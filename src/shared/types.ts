import z from "zod";

export const PropertySchema = z.object({
  id: z.number(),
  title_ar: z.string(),
  title_en: z.string(),
  description_ar: z.string().nullable(),
  description_en: z.string().nullable(),
  price: z.number(),
  currency: z.string(),
  status: z.enum(['for_sale', 'for_rent']),
  property_type: z.enum(['apartment', 'villa', 'land', 'commercial']),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  area_m2: z.number().nullable(),
  street: z.string().nullable(),
  city: z.string().nullable(),
  region: z.string().nullable(),
  postal: z.string().nullable(),
  lat: z.number().nullable(),
  lng: z.number().nullable(),
  amenities: z.string().nullable(),
  gallery: z.string().nullable(),
  floor_plan_ids: z.string().nullable(),
  owner_id: z.string().nullable(),
  agent_id: z.string().nullable(),
  published_at: z.string().nullable(),
  is_featured: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Property = z.infer<typeof PropertySchema>;

export const LeadSchema = z.object({
  property_id: z.number().optional(),
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  contact_method: z.string().optional(),
});

export type Lead = z.infer<typeof LeadSchema>;

export const PropertyFilters = z.object({
  city: z.string().optional(),
  status: z.string().optional(),
  property_type: z.string().optional(),
  min_price: z.coerce.number().optional(),
  max_price: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  min_area: z.coerce.number().optional(),
  max_area: z.coerce.number().optional(),
  amenities: z.array(z.string()).optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(12),
});

export type PropertyFiltersType = z.infer<typeof PropertyFilters>;
