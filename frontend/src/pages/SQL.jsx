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

  const toggleCompleted = (index) => {
    setCompleted((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
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

  const completedCount =
    Object.values(completed).filter(Boolean).length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
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
          <div className="rounded-xl border border-red-900/50 bg-gray-900 p-5">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-500">
            Practice
          </p>

          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                SQL Practice
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Practice SQL problems for interviews and placements.
              </p>
            </div>

            <div className="text-right text-xs text-gray-500">
              <span className="text-green-500">
                {completedCount}
              </span>
              {" / "}
              {problems.length} completed
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
                {Math.round(
                  (completedCount / problems.length) * 100
                )}
                %
              </span>
            </div>

            <div className="h-1 overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-300"
                style={{
                  width: `${
                    (completedCount / problems.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Problem list */}
        <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
          {problems.map((problem, index) => {
            const isCompleted = Boolean(completed[index]);
            const platform = getPlatform(problem);

            const problemName =
              problem.name ||
              problem.title ||
              problem.question ||
              `SQL Problem ${index + 1}`;

            const problemLink =
              problem.link ||
              problem.url ||
              "#";

            return (
              <div
                key={
                  problem._id ||
                  problem.id ||
                  `sql-${index}`
                }
                className={`
                  group flex items-center gap-3
                  border-b border-gray-800
                  px-4 py-2.5
                  transition-colors
                  last:border-b-0
                  sm:px-5 sm:py-3
                  ${
                    isCompleted
                      ? "bg-green-500/[0.03]"
                      : "hover:bg-gray-800/40"
                  }
                `}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() => toggleCompleted(index)}
                  className={`
                    flex h-5 w-5 shrink-0
                    items-center justify-center
                    rounded border transition
                    ${
                      isCompleted
                        ? "border-green-500 bg-green-500 text-gray-950"
                        : "border-gray-600 hover:border-green-500"
                    }
                  `}
                >
                  {isCompleted && (
                    <span className="text-xs font-bold">
                      ✓
                    </span>
                  )}
                </button>

                {/* Number */}
                <span className="w-7 shrink-0 text-xs text-gray-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Question */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`
                      truncate text-sm font-medium transition
                      ${
                        isCompleted
                          ? "text-gray-500 line-through"
                          : "text-gray-200 group-hover:text-white"
                      }
                    `}
                    title={problemName}
                  >
                    {problemName}
                  </p>
                </div>

                {/* Platform */}
                <a
                  href={problemLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open on ${platform.name}`}
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg border border-gray-700
                    bg-gray-950
                    transition
                    hover:border-green-500
                  "
                >
                  {platform.logo ? (
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="h-5 w-5 rounded object-contain"
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
      </div>
    </DashboardLayout>
  );
}

export default SQL;