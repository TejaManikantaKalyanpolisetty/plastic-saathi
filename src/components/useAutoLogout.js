// src/components/useAutoLogout.js

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AUTO_LOGOUT_TIME = 5 * 60 * 1000; // 5 minutes

export default function useAutoLogout() {
  const navigate = useNavigate();
  const timer = useRef();

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem("plastic-saathi-session");
      navigate("/login", { replace: true });
    };

    const resetTimer = () => {
      if (timer.current) clearTimeout(timer.current);
      if (localStorage.getItem("plastic-saathi-session")) {
        timer.current = setTimeout(logout, AUTO_LOGOUT_TIME);
      }
    };

    // List of events to listen to for activity
    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // Start timer on mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, [navigate]);
}
