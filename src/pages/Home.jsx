// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (search.trim() !== "") {
//       navigate(`/plastic-types?search=${encodeURIComponent(search.trim())}`);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto">
//       <h1 className="text-4xl font-bold text-center text-green-700 mb-4">Know Your Plastic</h1>
//       <div className="flex w-full max-w-lg mx-auto mb-2">
//         <input
//           className="flex-1 px-5 py-3 rounded-l-2xl bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 shadow placeholder-gray-400"
//           type="text"
//           placeholder="Know Your Plastic"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           onKeyDown={handleKeyPress}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-green-600 text-white px-6 py-3 rounded-r-2xl font-semibold hover:bg-green-700 transition"
//         >
//           Search
//         </button>
//       </div>
//       <div className="mb-8 text-gray-500 text-sm text-center w-full max-w-lg mx-auto">
//         Try searching: <span className="italic text-gray-700">Bottle, Pen, Wrapper</span>
//       </div>
//       {/* Rest of your component unchanged */}
//       <div className="bg-white rounded-2xl shadow p-8 mb-8 w-full text-center">
//         <div className="text-xl font-semibold text-green-700 mb-2">Learn to identify and segregate plastics easily.</div>
//         <div className="text-gray-600 mb-5">
//           This platform helps you understand different plastic types and the proper way to dispose of them.
//         </div>
//         <div className="flex flex-col md:flex-row gap-4 justify-center">
//           <button onClick={() => navigate("/plastic-types")} className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-700 transition">Learn About Plastic Types</button>
//           <button onClick={() => navigate("/segregation-tips")} className="bg-green-100 text-green-700 px-6 py-2 rounded-xl font-semibold border border-green-600 hover:bg-green-200 transition">Segregation Tips</button>
//         </div>
//       </div>
//       <div className="bg-green-50 border-l-4 border-green-500 rounded-2xl shadow p-6 mb-8 flex items-center">
//         <svg className="w-8 h-8 text-green-500 mr-4" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M12 2C8 10 2 14 2 14s4 6 10 8c6-2 10-8 10-8s-6-4-10-12z" />
//         </svg>
//         <div>
//           <div className="font-bold text-green-700 mb-1">Why Plastic Segregation Matters</div>
//           <div className="text-gray-600 text-sm">
//             Properly segregating plastic waste helps reduce environmental impact and promote recycling.
//           </div>
//         </div>
//       </div>
//       <div className="bg-white rounded-2xl shadow p-6 w-full text-center">
//         <div className="text-gray-700 mb-2">Learn more about our mission and the team behind this platform.</div>
//         <a href="#" className="text-green-600 font-semibold hover:underline">Read More</a>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentSearches from "../components/RecentSearches";
import PopularSearches from "../components/PopularSearches";

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const goSearch = (term) => {
    const s = term.trim();
    if (!s) return;
    navigate(`/plastic-types?search=${encodeURIComponent(s)}`);
  };

  const handleSearch = () => goSearch(search);
  const handleKeyPress = (e) => { if (e.key === "Enter") handleSearch(); };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-4">Know Your Plastic</h1>

      <div className="flex w-full max-w-lg mx-auto mb-2">
        <input
          className="flex-1 px-5 py-3 rounded-l-2xl bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 shadow placeholder-gray-400"
          type="text"
          placeholder="Know Your Plastic"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-6 py-3 rounded-r-2xl font-semibold hover:bg-green-700 transition"
        >
          Search
        </button>
      </div>

      {/* 👇 Global history appears right under your search bar */}
      <RecentSearches limit={10} onPick={goSearch} />
      <PopularSearches limit={10} onPick={goSearch} />

      <div className="mb-8 text-gray-500 text-sm text-center w-full max-w-lg mx-auto">
        Try searching: <span className="italic text-gray-700">Bottle, Pen, Wrapper</span>
      </div>

      {/* Rest of your component unchanged */}
      <div className="bg-white rounded-2xl shadow p-8 mb-8 w-full text-center">
        <div className="text-xl font-semibold text-green-700 mb-2">
          Learn to identify and segregate plastics easily.
        </div>
        <div className="text-gray-600 mb-5">
          This platform helps you understand different plastic types and the proper way to dispose of them.
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/plastic-types")}
            className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Learn About Plastic Types
          </button>
          <button
            onClick={() => navigate("/segregation-tips")}
            className="bg-green-100 text-green-700 px-6 py-2 rounded-xl font-semibold border border-green-600 hover:bg-green-200 transition"
          >
            Segregation Tips
          </button>
        </div>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 rounded-2xl shadow p-6 mb-8 flex items-center">
        <svg className="w-8 h-8 text-green-500 mr-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8 10 2 14 2 14s4 6 10 8c6-2 10-8 10-8s-6-4-10-12z" />
        </svg>
        <div>
          <div className="font-bold text-green-700 mb-1">Why Plastic Segregation Matters</div>
          <div className="text-gray-600 text-sm">
            Properly segregating plastic waste helps reduce environmental impact and promote recycling.
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 w-full text-center">
        <div className="text-gray-700 mb-2">
          Learn more about our mission and the team behind this platform.
        </div>
        <a href="#" className="text-green-600 font-semibold hover:underline">Read More</a>
      </div>
    </div>
  );
}
