import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { LeadSchema, PropertyFilters } from "@/shared/types";

const app = new Hono<{ Bindings: Env }>();

// Get properties with filtering
app.get("/api/properties", zValidator("query", PropertyFilters), async (c) => {
  const filters = c.req.valid("query");
  const db = c.env.DB;

  let query = "SELECT * FROM properties WHERE published_at IS NOT NULL";
  const params: any[] = [];

  if (filters.city) {
    query += " AND city LIKE ?";
    params.push(`%${filters.city}%`);
  }

  if (filters.status) {
    query += " AND status = ?";
    params.push(filters.status);
  }

  if (filters.property_type) {
    query += " AND property_type = ?";
    params.push(filters.property_type);
  }

  if (filters.min_price) {
    query += " AND price >= ?";
    params.push(filters.min_price);
  }

  if (filters.max_price) {
    query += " AND price <= ?";
    params.push(filters.max_price);
  }

  if (filters.bedrooms) {
    query += " AND bedrooms >= ?";
    params.push(filters.bedrooms);
  }

  if (filters.bathrooms) {
    query += " AND bathrooms >= ?";
    params.push(filters.bathrooms);
  }

  if (filters.min_area) {
    query += " AND area_m2 >= ?";
    params.push(filters.min_area);
  }

  if (filters.max_area) {
    query += " AND area_m2 <= ?";
    params.push(filters.max_area);
  }

  if (c.req.query("is_featured")) {
    query += " AND is_featured = 1";
  }

  query += " ORDER BY created_at DESC";

  const limit = filters.limit || 12;
  const offset = ((filters.page || 1) - 1) * limit;
  query += ` LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const result = await db.prepare(query).bind(...params).all();

  // Get total count for pagination
  let countQuery = "SELECT COUNT(*) as total FROM properties WHERE published_at IS NOT NULL";
  const countParams: any[] = [];
  
  if (filters.city) {
    countQuery += " AND city LIKE ?";
    countParams.push(`%${filters.city}%`);
  }
  if (filters.status) {
    countQuery += " AND status = ?";
    countParams.push(filters.status);
  }
  if (filters.property_type) {
    countQuery += " AND property_type = ?";
    countParams.push(filters.property_type);
  }
  if (c.req.query("is_featured")) {
    countQuery += " AND is_featured = 1";
  }

  const countResult = await db.prepare(countQuery).bind(...countParams).first();

  return c.json({
    properties: result.results,
    total: countResult?.total || 0,
    page: filters.page || 1,
    limit,
  });
});

// Get single property by ID
app.get("/api/properties/:id", async (c) => {
  const id = c.req.param("id");
  const db = c.env.DB;

  const property = await db
    .prepare("SELECT * FROM properties WHERE id = ?")
    .bind(id)
    .first();

  if (!property) {
    return c.json({ error: "Property not found" }, 404);
  }

  return c.json(property);
});

// Submit lead/contact
app.post("/api/leads", zValidator("json", LeadSchema), async (c) => {
  const data = c.req.valid("json");
  const db = c.env.DB;

  const result = await db
    .prepare(
      `INSERT INTO leads (property_id, name, email, phone, message, contact_method, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    )
    .bind(
      data.property_id || null,
      data.name,
      data.email || null,
      data.phone || null,
      data.message || null,
      data.contact_method || null
    )
    .run();

  return c.json({ success: true, id: result.meta.last_row_id });
});

// Get location autocomplete suggestions
app.get("/api/locations/autocomplete", async (c) => {
  const query = c.req.query("q");
  const db = c.env.DB;

  if (!query || query.length < 2) {
    return c.json({ suggestions: [] });
  }

  const result = await db
    .prepare(
      `SELECT DISTINCT city FROM properties 
       WHERE city LIKE ? AND published_at IS NOT NULL 
       LIMIT 10`
    )
    .bind(`%${query}%`)
    .all();

  return c.json({
    suggestions: result.results.map((r: any) => r.city),
  });
});

// Same-origin image proxy to mitigate ORB/CORB when loading remote images in <img>
app.get("/api/image", async (c) => {
  const src = c.req.query("src");
  if (!src) {
    return c.text("Missing src parameter", 400);
  }
  try {
    const res = await fetch(src, {
      headers: {
        "User-Agent": "MochaApp/1.0 (+https://getmocha.com)",
      },
    });
    if (!res.ok || !res.body) {
      return c.text("Failed to fetch image", 502);
    }
    const contentType = res.headers.get("content-type") || "image/jpeg";
    return new Response(res.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=604800",
        "Cross-Origin-Resource-Policy": "cross-origin",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return c.text("Error proxying image", 500);
  }
});

export default app;
