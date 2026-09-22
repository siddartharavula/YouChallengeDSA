import { Link, useLocation } from "react-router-dom";
import { X, ChevronRight } from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const challenges = [15, 30, 45];

  const isActive = (path) => location.pathname === path;

  const isDSAPracticeActive =
    location.pathname === "/dsa/practice" ||
    location.pathname.startsWith("/dsa/practice/");

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static
          top-0 left-0
          z-50 md:z-auto
          h-full md:h-full
          w-64 shrink-0
          border-r border-gray-800
          bg-gray-950
          transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Mobile header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-5 md:hidden">
          <h2 className="text-lg font-bold">
            <span className="text-white">YouChallenge</span>
            <span className="text-green-500">DSA</span>
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-900 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="p-5">
          {/* DSA */}
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
            DSA
          </p>

          <div className="space-y-1">
            {/* Beginner */}
            <Link
              to="/dsa/beginner"
              onClick={onClose}
              className={`
                flex items-center justify-between
                rounded-lg px-4 py-3
                text-sm font-medium
                transition
                ${
                  isActive("/dsa/beginner")
                    ? "bg-green-500 text-gray-950"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }
              `}
            >
              <span>Beginner</span>

              {isActive("/dsa/beginner") && (
                <ChevronRight size={15} />
              )}
            </Link>

            {/* DSA Practice */}
            <Link
              to="/dsa/practice"
              onClick={onClose}
              className={`
                flex items-center justify-between
                rounded-lg px-4 py-3
                text-sm font-medium
                transition
                ${
                  isDSAPracticeActive
                    ? "bg-green-500 text-gray-950"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }
              `}
            >
              <span>DSA Practice</span>

              {isDSAPracticeActive && (
                <ChevronRight size={15} />
              )}
            </Link>
          </div>

          {/* SQL */}
          <p className="mb-3 mt-7 px-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
            SQL
          </p>

          <Link
            to="/sql"
            onClick={onClose}
            className={`
              flex items-center justify-between
              rounded-lg px-4 py-3
              text-sm font-medium
              transition
              ${
                isActive("/sql")
                  ? "bg-green-500 text-gray-950"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              }
            `}
          >
            <span>SQL Practice</span>

            {isActive("/sql") && <ChevronRight size={15} />}
          </Link>

          {/* Challenges */}
          <p className="mb-3 mt-7 px-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
            Challenges
          </p>

          <div className="space-y-1">
            {challenges.map((days) => (
              <Link
                key={days}
                to={`/dashboard/${days}`}
                onClick={onClose}
                className={`
                  flex items-center justify-between
                  rounded-lg px-4 py-3
                  text-sm font-medium
                  transition
                  ${
                    isActive(`/dashboard/${days}`)
                      ? "bg-green-500 text-gray-950"
                      : "text-gray-400 hover:bg-gray-900 hover:text-white"
                  }
                `}
              >
                <span>{days} Days</span>

                {isActive(`/dashboard/${days}`) && (
                  <ChevronRight size={15} />
                )}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;