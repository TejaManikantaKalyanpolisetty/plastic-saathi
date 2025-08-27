// src/main.jsx
import './mobile.css';
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";   
import "./index.css";
import App from "./App.jsx"; // Make sure the path is correct

const root = document.getElementById("root");
createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
