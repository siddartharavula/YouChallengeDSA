import { useEffect, useState } from "react";
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
  smartinterviews: {
    name: "SmartInterviews",
    logo: "/logos/smartinterviews.png",
  },
};

function SQL() {
  const [problems, setProblems] = useState([]);
  const [completed, setCompleted] = useState(() => {
    try {
      return new Set(
        JSON.parse(
          localStorage.getItem("sqlSolvedProblems") || "[]"
        )
      );
    } catch {
      return new Set();
    }
  });

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

        setProblems(response.data?.problems || []);
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

  const toggleCompleted = (link) => {
    setCompleted((previous) => {
      const updated = new Set(previous);

      if (updated.has(link)) {
        updated.delete(link);
      } else {
        updated.add(link);
      }

      localStorage.setItem(
        "sqlSolvedProblems",
        JSON.stringify([...updated])
      );

      return updated;
    });
  };

  const getPlatform = (problem) => {
    const platform =
      problem.platform
        ?.toLowerCase()
        ?.replace(/[\s+_-]/g, "") || "";

    return (
      platformData[platform] || {
        name: problem.platform || "Open",
        logo: null,
      }
    );
  };

  const completedCount = problems.filter((problem) =>
    completed.has(problem.link)
  ).length;

  const progress =
    problems.length > 0
      ? (completedCount / problems.length) * 100
      : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-500">
              Loading SQL problems...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-2xl border border-red-900/50 bg-gray-900 p-5">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-500">
            Practice
          </p>

          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                SQL Practice
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Practice SQL problems for interviews and placements.
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold text-white">
                {completedCount}
                <span className="text-gray-600">
                  {" "}
                  / {problems.length}
                </span>
              </p>

              <p className="text-xs text-gray-500">
                completed
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        {problems.length > 0 && (
          <div className="mb-4 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Progress
              </span>

              <span className="text-xs font-medium text-green-500">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* SQL Problems */}
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
          {problems.map((problem, index) => {
            const problemLink =
              problem.link ||
              problem.url ||
              "#";

            const problemName =
              problem.name ||
              problem.title ||
              problem.question ||
              `SQL Problem ${index + 1}`;

            const isCompleted =
              completed.has(problemLink);

            const platform = getPlatform(problem);

            return (
              <div
                key={problemLink}
                className={`group flex items-center gap-3 border-b border-gray-800 px-4 py-2.5 transition-colors last:border-b-0 sm:px-6 sm:py-3 ${
                  isCompleted
                    ? "bg-gray-900/60"
                    : "hover:bg-gray-800/40"
                }`}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() =>
                    toggleCompleted(problemLink)
                  }
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                    isCompleted
                      ? "border-green-500 bg-green-500"
                      : "border-gray-600 bg-gray-950 hover:border-green-500"
                  }`}
                  aria-label={
                    isCompleted
                      ? "Mark as unsolved"
                      : "Mark as solved"
                  }
                >
                  {isCompleted && (
                    <span className="text-sm font-bold text-gray-950">
                      ✓
                    </span>
                  )}
                </button>

                {/* Number */}
                <span className="w-5 shrink-0 text-xs text-gray-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Question */}
                <a
                  href={problemLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={problemName}
                  className={`min-w-0 flex-1 text-sm transition-colors ${
                    isCompleted
                      ? "text-gray-600 line-through"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                >
                  <span className="block truncate">
                    {problemName}
                  </span>
                </a>

                {/* Platform */}
                <a
                  href={problemLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                  title={`Open on ${platform.name}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-950 transition-all hover:border-green-500"
                >
                  {platform.logo ? (
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="h-6 w-6 rounded-md object-contain"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">
                      ↗
                    </span>
                  )}
                </a>
              </div>
            );
          })}

          {/* Empty State */}
          {problems.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-500">
                No SQL problems available.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SQL;