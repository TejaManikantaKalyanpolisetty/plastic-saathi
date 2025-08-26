// src/lib/api.js
const API =
  import.meta.env.VITE_API_BASE_URL ||
  "https://plastic-saathi-api.onrender.com";

export async function fetchPlastics(query) {
  const url = query
    ? `${API}/api/plastic-types?search=${encodeURIComponent(query)}`
    : `${API}/api/plastic-types`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch plastic types");
  return res.json();
}
