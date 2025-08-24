// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import PlasticTypes from "./components/PlasticTypes";
// import SegregationTips from "./components/SegregationTips";
// import AboutUs from "./components/AboutUs";
// import PlasticDetail from "./components/PlasticDetail";



// // ✅ ProtectedRoute for authentication
// function ProtectedRoute({ children }) {
//   const isLoggedIn = localStorage.getItem("plastic-saathi-session");
//   return isLoggedIn ? children : <Navigate to="/login" />;
// }

// function App() {
//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Protected Dashboard routes */}
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Home />} />
//         <Route path="plastic-types" element={<PlasticTypes />} />
//         <Route path="plastic-types/:type" element={<PlasticDetail />} />
//         <Route path="segregation-tips" element={<SegregationTips />} />
//         <Route path="about" element={<AboutUs />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

// src/App.jsx

// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import PlasticTypes from "./components/PlasticTypes";
// import SegregationTips from "./components/SegregationTips";
// import AboutUs from "./components/AboutUs";
// import PlasticDetail from "./components/PlasticDetail";
// import useAutoLogout from "./components/useAutoLogout"; // ⬅️ Import the hook

// // ✅ ProtectedRoute for authentication
// function ProtectedRoute({ children }) {
//   const isLoggedIn = localStorage.getItem("plastic-saathi-session");
//   return isLoggedIn ? children : <Navigate to="/login" />;
// }

// function App() {
//   useAutoLogout(); // ⬅️ Add the hook here

//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Protected Dashboard routes */}
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Home />} />
//         <Route path="plastic-types" element={<PlasticTypes />} />
//         <Route path="plastic-types/:type" element={<PlasticDetail />} />
//         <Route path="segregation-tips" element={<SegregationTips />} />
//         <Route path="about" element={<AboutUs />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PlasticTypes from "./components/PlasticTypes";
import SegregationTips from "./components/SegregationTips";
import AboutUs from "./components/AboutUs";
import PlasticDetail from "./components/PlasticDetail";
import useAutoLogout from "./components/useAutoLogout"; // ⬅️ Import the hook
import TestComponent from "./components/TestComponent.jsx"; // ⬅️ Import the test component

// ProtectedRoute for authentication
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("plastic-saathi-session");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  useAutoLogout(); // ⬅️ Add the hook here

  return (
    <Routes>
       {/* Public test route */}
       <Route path="/test" element={<TestComponent />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Dashboard routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="plastic-types" element={<PlasticTypes />} />
        <Route path="plastic-types/:type" element={<PlasticDetail />} />
        <Route path="segregation-tips" element={<SegregationTips />} />
        <Route path="about" element={<AboutUs />} />
      </Route>
    </Routes>
  );
}

export default App;

