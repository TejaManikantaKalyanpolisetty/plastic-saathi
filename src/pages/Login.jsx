import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// SVG Person Illustration Component
function AnimatedLoginIllustration() {
  return (
    <svg
      width="220"
      height="220"
      viewBox="0 0 220 220"
      fill="none"
      className="mx-auto mb-2"
    >
      {/* ...your SVG code remains unchanged... */}
      {/* Light green circle background */}
      <circle cx="110" cy="110" r="104" fill="#e5f9ec" />
      {/* Recycle icon left */}
      <g>
        <circle cx="55" cy="65" r="18" fill="#d1fae5" />
        <path d="M53 72l-4-7h7l-2 3" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        <path d="M63 66a7 7 0 0 1-13 3" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        <path d="M49 65l2-4 3 2" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Globe icon right */}
      <g>
        <circle cx="170" cy="58" r="16" fill="#d1fae5" />
        <ellipse cx="170" cy="58" rx="10" ry="6" fill="#4ade80" />
        <ellipse cx="170" cy="58" rx="5" ry="2.5" fill="#bbf7d0" />
      </g>
      {/* Leaves background */}
      <ellipse cx="35" cy="150" rx="28" ry="12" fill="#bbf7d0" />
      <ellipse cx="190" cy="130" rx="18" ry="8" fill="#bbf7d0" />
      {/* Person head/hair */}
      <ellipse cx="112" cy="90" rx="36" ry="32" fill="#4ade80" />
      {/* Face */}
      <ellipse cx="112" cy="107" rx="18" ry="18" fill="#fbeedb" />
      {/* Body */}
      <rect x="85" y="124" width="55" height="40" rx="18" fill="#6ee7b7" />
      {/* Arm holding bottle */}
      <rect x="138" y="123" width="10" height="32" rx="5" fill="#fbeedb" />
      {/* Bottle */}
      <rect x="142" y="130" width="14" height="28" rx="5" fill="#bbf7d0" stroke="#059669" strokeWidth="1.5" />
      <rect x="146" y="126" width="6" height="8" rx="3" fill="#bbf7d0" stroke="#059669" strokeWidth="1" />
      {/* Simple smile and eye */}
      <path d="M116 112q-2 2-4 0" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="116" cy="105" rx="1.5" ry="2" fill="#047857" />
      <ellipse cx="108" cy="105" rx="1.5" ry="2" fill="#047857" />
    </svg>
  );
}

// Animated falling leaves SVG
function Leaf({ style, duration = 8, delay = 0, left = "10%" }) {
  return (
    <motion.svg
      initial={{ y: -100, rotate: -20 }}
      animate={{ y: "100vh", rotate: 10 }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      className="absolute"
      style={{ ...style, left, zIndex: 0, pointerEvents: "none" }}
      width="44"
      height="44"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path
        d="M40 8C27 11 11 25 8 40c15-3 29-19 32-32Z"
        fill="#4ade80"
        stroke="#15803d"
        strokeWidth="2"
      />
    </motion.svg>
  );
}

// Eye icon for show/hide password
function EyeIcon({ visible }) {
  return visible ? (
    // Eye Open SVG
    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" className="text-green-700">
      <path
        d="M12 4.5C7 4.5 2.73 8.11 1 12c1.73 3.89 6 7.5 11 7.5s9.27-3.61 11-7.5C21.27 8.11 17 4.5 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        fill="none"
      />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
    </svg>
  ) : (
    // Eye Closed SVG
    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" className="text-green-700">
      <path
        d="M17.94 17.94C16.03 19.22 14.07 19.92 12 19.92c-5 0-9.27-3.61-11-7.5 1.16-2.6 3.29-4.98 6.21-6.61m3.38-1.28C12 4.5 17 4.5 21 12c-.62 1.38-1.57 2.71-2.77 3.91M1 1l22 22"
        stroke="currentColor"
        strokeWidth="1.7"
        fill="none"
      />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function Login() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- added state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem("plastic-saathi-user");
    const registeredUser = stored ? JSON.parse(stored) : null;

    if (!registeredUser) {
      setError("No user found. Please sign up first.");
      return;
    }

    if (
      fields.email !== registeredUser.email ||
      fields.password !== registeredUser.password
    ) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("plastic-saathi-session", JSON.stringify(registeredUser));
    navigate("/");
  };

  const leaves = [
    { left: "8%", duration: 10, delay: 0 },
    { left: "28%", duration: 7, delay: 2 },
    { left: "55%", duration: 11, delay: 1.5 },
    { left: "80%", duration: 8, delay: 3.5 },
    { left: "65%", duration: 12, delay: 0.5 },
    { left: "38%", duration: 9, delay: 2.5 },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
      {/* Animated Leaves */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {leaves.map((leaf, i) => (
          <Leaf key={i} {...leaf} style={{ opacity: 0.5 + Math.random() * 0.5 }} />
        ))}
      </div>
      {/* Main Card */}
      <div className="relative z-10 w-full max-w-sm mx-auto rounded-3xl bg-white shadow-xl p-6 flex flex-col items-center mt-8">
        {/* Animated SVG Illustration */}
        <AnimatedLoginIllustration />

        <h1 className="text-3xl font-extrabold text-green-700 mb-1 flex items-center gap-2 mt-2">
          <span role="img" aria-label="leaf">🍃</span>
          Plastic Saathi
        </h1>
        <h2 className="text-2xl font-bold mb-4 text-green-800 w-full text-center">Login</h2>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium text-gray-800"
            value={fields.email}
            onChange={handleChange}
            required
            autoFocus
          />
          {/* --- Password Input with Eye Icon --- */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium text-gray-800"
              value={fields.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon visible={showPassword} />
            </button>
          </div>
          {/* --- End password field --- */}
          {error && <div className="text-red-600 text-sm mb-2 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-green-600 text-white font-bold text-lg mt-2 hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center text-base mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-700 cursor-pointer underline font-semibold"
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}
