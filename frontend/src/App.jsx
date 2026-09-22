import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Beginner from "./pages/Beginner";
import DSA from "./pages/DSA";
import DSATopic from "./pages/DSATopic";
import SQL from "./pages/SQL";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= HOME ================= */}
        <Route path="/" element={<Home />} />

        {/* ================= DSA ================= */}
        <Route path="/dsa" element={<DSA />} />

        <Route
          path="/dsa/beginner"
          element={<Beginner />}
        />

        <Route
          path="/dsa/practice"
          element={<DSA />}
        />

        <Route
          path="/dsa/practice/:topic"
          element={<DSATopic />}
        />

        {/* Old beginner URL */}
        <Route
          path="/beginner"
          element={
            <Navigate
              to="/dsa/beginner"
              replace
            />
          }
        />

        {/* ================= SQL ================= */}
        <Route
          path="/sql"
          element={<SQL />}
        />

        {/* ================= CHALLENGES ================= */}
        <Route
          path="/dashboard/:days"
          element={<Dashboard />}
        />

        {/* Old dashboard URL */}
        <Route
          path="/dashboard"
          element={
            <Navigate
              to="/dashboard/15"
              replace
            />
          }
        />

        {/* ================= AUTH ================= */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= PROFILE ================= */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ================= UNKNOWN ================= */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;