import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("plastic-saathi-session"); // Clear session
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Plastic Saathi</h2>
      <ul className="space-y-4">
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/plastic-types">🥤 Plastic Types</Link></li>
        <li><Link to="/segregation-tips">♻ Segregation Tips</Link></li>
        <li><Link to="/about">ℹ About Us</Link></li>
      </ul>

      {/* Logout button instead of Login */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        🚪 Logout
      </button>
    </div>
  );
}
