import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main routed content */}
      <main className="flex-1 bg-gray-50 p-10">
        <Outlet /> {/* This dynamically loads Home, PlasticTypes, AboutUs */}
      </main>
    </div>
  );
}
