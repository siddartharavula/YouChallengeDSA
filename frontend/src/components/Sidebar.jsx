import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Code2,
  Database,
  Trophy,
  X,
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const challenges = [15, 30, 45];

  const active = (path) => location.pathname === path;

  const challengeActive = (days) =>
    location.pathname === `/dashboard/${days}`;

  const itemClass = (isActive) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-green-500 text-gray-950"
        : "text-gray-400 hover:bg-gray-900 hover:text-white"
    }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-full w-64
          border-r border-gray-800 bg-gray-950
          transition-transform duration-300
          md:static md:z-auto
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-5 md:hidden">
          <h2 className="text-lg font-bold">
            <span className="text-white">YouChallenge</span>
            <span className="text-green-500">DSA</span>
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-900 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          {/* HOME */}
          <Link
            to="/"
            onClick={onClose}
            className={itemClass(active("/"))}
          >
            <Home size={17} />
            Home
          </Link>

          {/* PRACTICE */}
          <p className="mb-3 mt-7 px-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
            Practice
          </p>

          <div className="space-y-1">
            <Link
              to="/dsa/beginner"
              onClick={onClose}
              className={itemClass(active("/dsa/beginner"))}
            >
              <Code2 size={17} />
              DSA Beginner
            </Link>

            <Link
              to="/dsa/practice"
              onClick={onClose}
              className={itemClass(active("/dsa/practice"))}
            >
              <Code2 size={17} />
              DSA Practice
            </Link>

            <Link
              to="/sql"
              onClick={onClose}
              className={itemClass(active("/sql"))}
            >
              <Database size={17} />
              SQL Practice
            </Link>
          </div>

          {/* CHALLENGES */}
          <p className="mb-3 mt-7 px-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
            Challenges
          </p>

          <div className="space-y-1">
            {challenges.map((days) => (
              <Link
                key={days}
                to={`/dashboard/${days}`}
                onClick={onClose}
                className={itemClass(challengeActive(days))}
              >
                <Trophy size={17} />
                {days} Days Challenge
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;