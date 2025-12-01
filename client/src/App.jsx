import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import "./global.css";
import "./styles.css";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";

function App() {
  // Keep token in state + read from localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Logout clears token and triggers rerender, route redirects automatically
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <Router>
      <Routes>

        {/* Public login route */}
        <Route 
          path="/login" 
          element={<Login token={token} setToken={setToken} />} 
        />

        {/* Protected dashboard route */}
        <Route
          path="/"
          element={
            token ? (
              <Dashboard token={token} logout={logout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all route, redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
