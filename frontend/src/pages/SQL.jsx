import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

const platformData = {
  leetcode: {
    name: "LeetCode",
    logo: "/logos/leetcode.png",
  },
  geeksforgeeks: {
    name: "GeeksforGeeks",
    logo: "/logos/geeksforgeeks.png",
  },
  hackerrank: {
    name: "HackerRank",
    logo: "/logos/hackerrank.png",
  },
  codechef: {
    name: "CodeChef",
    logo: "/logos/codechef.png",
  },
};

function SQL() {
  const [data, setData] = useState(null);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSQL = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://youchallengedsa.onrender.com/api/sql"
        );

        setData(response.data);
      } catch (error) {
        console.error("Failed to load SQL:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load SQL problems."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSQL();
  }, []);

  const toggleCompleted = (index) => {
    setCompleted((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  const getPlatform = (problem) => {
    const platform =
      problem.platform?.toLowerCase()?.replace(/\s+/g, "") || "";

    return (
      platformData[platform] || {
        name: problem.platform || "Platform",
        logo: null,
      }
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-400">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-2xl border border-red-900 bg-gray-900 p-5">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const problems = data?.problems || [];
  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-500">
            SQL
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            SQL Practice
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Practice SQL questions for interviews and placement preparation.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span>
              {problems.length}{" "}
              {problems.length === 1 ? "Problem" : "Problems"}
            </span>

            <span className="text-gray-700">•</span>

            <span>{completedCount} Completed</span>
          </div>
        </div>

        {/* Progress */}
        {problems.length > 0 && (
          <div className="mb-5 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-gray-500">Progress</span>

              <span className="font-medium text-green-500">
                {completedCount}/{problems.length}
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-300"
                style={{
                  width: `${(completedCount / problems.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Problems */}
        <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
          {problems.map((problem, index) => {
            const platform = getPlatform(problem);
            const isCompleted = completed[index];

            return (
              <div
                key={problem._id || problem.id || index}
                className={`group flex items-center gap-3 border-b border-gray-800 px-4 py-2.5 transition-colors last:border-b-0 sm:px-5 sm:py-3 ${
                  isCompleted
                    ? "bg-green-500/[0.03]"
                    : "hover:bg-gray-800/40"
                }`}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() => toggleCompleted(index)}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                    isCompleted
                      ? "border-green-500 bg-green-500 text-gray-950"
                      : "border-gray-600 hover:border-green-500"
                  }`}
                  aria-label={
                    isCompleted
                      ? "Mark as incomplete"
                      : "Mark as completed"
                  }
                >
                  {isCompleted && (
                    <span className="text-xs font-bold">✓</span>
                  )}
                </button>

                {/* Number */}
                <span className="w-7 shrink-0 text-xs text-gray-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Question */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-medium transition ${
                      isCompleted
                        ? "text-gray-500 line-through"
                        : "text-gray-200 group-hover:text-white"
                    }`}
                  >
                    {problem.name ||
                      problem.title ||
                      problem.question ||
                      `SQL Problem ${index + 1}`}
                  </p>
                </div>

                {/* Platform logo */}
                <a
                  href={problem.link || problem.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  title={`Open on ${platform.name}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-950 transition hover:border-green-500"
                >
                  {platform.logo ? (
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="h-6 w-6 rounded-md object-contain"
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-gray-400">
                      ↗
                    </span>
                  )}
                </a>
              </div>
            );
          })}

          {problems.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-500">
                No SQL problems available.
              </p>
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-5">
          <Link
            to="/"
            className="text-sm text-gray-600 transition hover:text-green-500"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SQL;