export async function fetchProperties(q = ''): Promise<{ properties: any[] }> {
  // Minimal stub: try to call a backend if `REACT_APP_API_URL` exists, otherwise return empty list.
  try {
    const base = (process.env.REACT_APP_API_URL || process.env.VITE_API_URL || '') as string;
    if (base) {
      const url = `${base.replace(/\/$/, '')}/properties${q ? `?${q}` : ''}`;
      const res = await fetch(url);
      return (await res.json()) as { properties: any[] };
    }
  } catch (e) {
    // ignore
  }

  return { properties: [] };
}

export async function fetchWidgetConfig<T = any>(key: string): Promise<{ config?: T } | null> {
  try {
    const base = (process.env.REACT_APP_API_URL || process.env.VITE_API_URL || '') as string;
    if (base) {
      const url = `${base.replace(/\/$/, '')}/widgets/${encodeURIComponent(key)}`;
      const res = await fetch(url);
      if (!res.ok) return null;
      return (await res.json()) as { config?: T } | null;
    }
  } catch (e) {
    // ignore
  }

  return null;
}

export async function saveWidgetConfig(key: string, config: any, type = 'json'): Promise<void> {
  try {
    const base = (process.env.REACT_APP_API_URL || process.env.VITE_API_URL || '') as string;
    if (base) {
      const url = `${base.replace(/\/$/, '')}/widgets/${encodeURIComponent(key)}`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, type }),
      });
    }
  } catch (e) {
    // ignore
  }
}
