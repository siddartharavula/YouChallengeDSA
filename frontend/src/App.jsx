import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard is PUBLIC */}
        <Route
          path="/dashboard/:days"
          element={<Dashboard />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Default */}
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard/15"
              replace
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Navigate
              to="/dashboard/15"
              replace
            />
          }
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard/15"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;