
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER,
  user_id TEXT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  contact_method TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_property ON leads(property_id);
CREATE INDEX idx_leads_created ON leads(created_at);
