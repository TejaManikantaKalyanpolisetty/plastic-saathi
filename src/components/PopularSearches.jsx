import { useEffect, useState } from 'react';

export default function PopularSearches({ limit = 10, onPick }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/top-searches?limit=${limit}`);
        const data = await res.json();
        if (alive) setItems(data);
      } catch (e) {
        console.error('Failed to load popular searches:', e);
      }
    })();
    return () => { alive = false; };
  }, [limit]);

  if (!items.length) return null;

  return (
    <div className="max-w-xl mx-auto mt-4">
      <strong className="block mb-1 text-sm text-gray-700">Popular searches (global)</strong>
      <ul className="list-disc list-inside text-sm text-gray-700">
        {items.map((r, i) => (
          <li key={i} className="cursor-pointer hover:underline" onClick={() => onPick?.(r.term)}>
            {r.term} <small className="text-gray-500">• {r.count}×</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
