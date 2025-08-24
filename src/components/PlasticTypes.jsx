
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PlasticTypes() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const query = useQuery();
  const search = query.get("search") || "";

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`/api/plastic-types${search ? `?search=${encodeURIComponent(search)}` : ""}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch plastic types");
        return res.json();
      })
      .then((data) => {
        setTypes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [search]);

  if (loading)
    return <div className="p-6 text-center text-gray-500">Loading plastic types...</div>;
  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Plastic Types</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {types.length > 0 ? (
          types.map((t) => {
            // Check if result is from Wikipedia
            const isWikipedia = !!t._fromWikipedia;
            return (
              <div
                key={t._id || t.code || t.name}
                className={`bg-white rounded-xl shadow-lg p-6 text-center transition-all border-l-4 ${
                  isWikipedia ? "border-blue-400" : "border-green-500"
                } ${t.code ? "cursor-pointer hover:scale-105 hover:shadow-xl" : ""}`}
                onClick={t.code ? () => navigate(`/plastic-types/${t.code}`) : undefined}
                style={{ cursor: t.code ? 'pointer' : 'default', minHeight: "260px", display: "flex", flexDirection: "column", justifyContent: "center" }}
              >
                <div className={`text-2xl font-extrabold mb-2 ${isWikipedia ? "text-blue-700" : "text-green-700"}`}>
                  {t.name}
                  {isWikipedia && (
                    <span className="ml-2 align-middle" title="Wikipedia result" style={{ verticalAlign: "middle" }}>
                      <svg className="inline w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM9 9V5h2v4h3l-4 5-4-5h3z" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{t.description}</p>
                {t.examples && (
                  <div className="mt-2 text-xs text-gray-500">
                    <strong>Examples:</strong> {t.examples}
                  </div>
                )}
                {isWikipedia && t.wikipediaUrl && (
                  <div className="mt-4">
                    <a
                      href={t.wikipediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View on Wikipedia
                    </a>
                    <div className="text-xs text-blue-500 mt-1">
                      This result is from Wikipedia and may not be specific to plastic types.
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">No plastic types found.</div>
        )}
      </div>
    </div>
  );
}
