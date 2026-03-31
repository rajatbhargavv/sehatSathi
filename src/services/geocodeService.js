// Geocoding helper to derive lat/lng from a place string (address or city)
// Uses OpenCage Data API; set VITE_OPENCAGE_KEY in your env. Returns { lat, lng } or null on failure.
export const geocodePlace = async (query) => {
  const apiKey = import.meta.env.VITE_OPENCAGE_KEY;
  if (!apiKey || !query) return null;

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&limit=1`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const first = data?.results?.[0];
    if (!first?.geometry) return null;
    return { lat: first.geometry.lat, lng: first.geometry.lng };
  } catch (err) {
    console.error('geocode error:', err);
    return null;
  }
};
