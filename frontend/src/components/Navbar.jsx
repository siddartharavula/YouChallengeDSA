import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu } from "lucide-react";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  const [streak, setStreak] = useState(0);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
      setStreak(0);
      return;
    }

    const fetchStreak = async () => {
      try {
        const response = await axios.get(
          "https://youchallengedsa.onrender.com/api/progress/15",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStreak(response.data.streak || 0);
      } catch (error) {
        console.error(
          "Failed to fetch streak:",
          error
        );
      }
    };

    fetchStreak();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setStreak(0);
    setShowMenu(false);

    navigate("/dashboard/15");
  };

  return (
    <nav className="sticky top-0 z-[60] h-16 border-b border-gray-800 bg-gray-950 px-4 sm:px-6 flex items-center justify-between">

      {/* Left side */}
      <div className="flex items-center gap-3">

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition"
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>

        {/* App Name */}
        <Link to="/dashboard/15">
          <h1 className="text-lg sm:text-xl font-bold">
            <span className="text-white">
              YouChallenge
            </span>
            <span className="text-green-500">
              DSA
            </span>
          </h1>
        </Link>

      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-5">

        {/* Logged in */}
        {user ? (
          <>
            {/* Streak */}
            <span className="hidden sm:block text-sm text-gray-400">
              🔥 {streak} Day Streak
            </span>

            {/* Mobile streak */}
            <span className="sm:hidden text-sm text-gray-400">
              🔥 {streak}
            </span>

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setShowMenu(!showMenu)
                }
                className="flex items-center gap-2 rounded-lg px-2 sm:px-3 py-2 text-sm font-semibold text-gray-300 transition hover:bg-gray-900 hover:text-white"
              >

                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-gray-950 font-bold shrink-0">
                  {user.username
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                {/* Hide username on very small screens */}
                <span className="hidden sm:block max-w-[120px] truncate">
                  {user.username}
                </span>

                <span
                  className={`hidden sm:block text-xs text-gray-500 transition-transform ${
                    showMenu
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  ▼
                </span>

              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-800 bg-gray-900 p-2 shadow-xl">

                  <Link
                    to="/profile"
                    onClick={() =>
                      setShowMenu(false)
                    }
                    className="block rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white"
                  >
                    Profile
                  </Link>

                  <div className="my-1 border-t border-gray-800" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg px-4 py-3 text-left text-sm text-red-400 transition hover:bg-gray-800"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          </>
        ) : (

          /* Logged out */
          <>
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-400 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-green-500 px-3 sm:px-4 py-2 text-sm font-semibold text-gray-950 transition hover:bg-green-400"
            >
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;