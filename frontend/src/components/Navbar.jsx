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
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
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
        console.error("Failed to fetch streak:", error);
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

    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-[60] flex h-16 items-center justify-between border-b border-gray-800 bg-gray-950 px-4 sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-900 hover:text-white md:hidden"
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>

        {/* Logo */}
        <Link to="/">
          <h1 className="text-lg font-bold sm:text-xl">
            <span className="text-white">YouChallenge</span>
            <span className="text-green-500">DSA</span>
          </h1>
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-5">
        {user ? (
          <>
            {/* Desktop streak */}
            <span className="hidden text-sm text-gray-400 sm:block">
              🔥 {streak} Day Streak
            </span>

            {/* Mobile streak */}
            <span className="text-sm text-gray-400 sm:hidden">
              🔥 {streak}
            </span>

            {/* User menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-gray-300 transition hover:bg-gray-900 hover:text-white sm:px-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 font-bold text-gray-950">
                  {user.username?.charAt(0).toUpperCase()}
                </div>

                <span className="hidden max-w-[120px] truncate sm:block">
                  {user.username}
                </span>

                <span
                  className={`hidden text-xs text-gray-500 transition-transform sm:block ${
                    showMenu ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-800 bg-gray-900 p-2 shadow-xl">
                  <Link
                    to="/profile"
                    onClick={() => setShowMenu(false)}
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
          <>
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-400 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-green-500 px-3 py-2 text-sm font-semibold text-gray-950 transition hover:bg-green-400 sm:px-4"
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