import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const challenges = [15, 30, 45];

  const isChallengeActive = (days) =>
    location.pathname === `/dashboard/${days}`;

  const isBeginnerActive = location.pathname === "/beginner";

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
          w-64
          shrink-0
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
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-900 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="p-5">

          {/* Beginner */}
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
            Practice
          </p>

          <Link
            to="/beginner"
            onClick={onClose}
            className={`
              flex items-center justify-between
              rounded-lg
              px-4 py-3
              text-sm font-medium
              transition
              ${
                isBeginnerActive
                  ? "bg-green-500 text-gray-950"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              }
            `}
          >
            <span>Beginner Problems</span>

            {isBeginnerActive && (
              <span className="text-xs font-bold">→</span>
            )}
          </Link>

          {/* Challenges */}
          <p className="mb-3 mt-6 px-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
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
                  rounded-lg
                  px-4 py-3
                  text-sm font-medium
                  transition
                  ${
                    isChallengeActive(days)
                      ? "bg-green-500 text-gray-950"
                      : "text-gray-400 hover:bg-gray-900 hover:text-white"
                  }
                `}
              >
                <span>{days} Days</span>

                {isChallengeActive(days) && (
                  <span className="text-xs font-bold">→</span>
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