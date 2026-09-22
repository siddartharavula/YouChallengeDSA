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

  smartinterviews: {
    name: "SmartInterviews",
    logo: "/logos/smartinterviews.png",
  },

  codechef: {
    name: "CodeChef",
    logo: "/logos/codechef.png",
  },

  hackerrank: {
    name: "HackerRank",
    logo: "/logos/hackerrank.png",
  },
};

function Beginner() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Only one topic open at a time
  const [openTopic, setOpenTopic] = useState(null);

  // Completed problems
  const [completed, setCompleted] = useState(() => {
    try {
      return new Set(
        JSON.parse(localStorage.getItem("beginnerSolvedProblems") || "[]")
      );
    } catch {
      return new Set();
    }
  });

  // ==============================
  // Fetch Beginner Problems
  // ==============================
  useEffect(() => {
    const fetchBeginner = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://youchallengedsa.onrender.com/api/dsa/beginner"
        );

        console.log("Beginner Problems Response:", response.data);

        setData(response.data);
      } catch (error) {
        console.log("ERROR:", error);
        console.log("RESPONSE:", error.response);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);

        setError(
          error.response?.data?.message ||
            "Failed to load beginner problems."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBeginner();
  }, []);

  // ==============================
  // Toggle Topic
  // ==============================
  const toggleTopic = (index) => {
    setOpenTopic((current) => (current === index ? null : index));
  };

  // ==============================
  // Toggle Problem
  // ==============================
  const toggleProblem = (link) => {
    setCompleted((current) => {
      const updated = new Set(current);

      if (updated.has(link)) {
        updated.delete(link);
      } else {
        updated.add(link);
      }

      localStorage.setItem(
        "beginnerSolvedProblems",
        JSON.stringify([...updated])
      );

      return updated;
    });
  };

  // ==============================
  // Platform Logo
  // ==============================
  const getPlatform = (platform) => {
    const normalized =
      platform?.toLowerCase()?.replace(/[\s+_-]/g, "") || "";

    return (
      platformData[normalized] || {
        name: platform || "Platform",
        logo: null,
      }
    );
  };

  // ==============================
  // Loading
  // ==============================
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

  // ==============================
  // Error
  // ==============================
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

  const topics = data?.problems || [];

  // ==============================
  // Total Problems
  // ==============================
  const totalProblems = topics.reduce(
    (total, topic) => total + (topic.problems?.length || 0),
    0
  );

  // ==============================
  // Total Solved
  // ==============================
  const solvedCount = topics.reduce((total, topic) => {
    return (
      total +
      (topic.problems || []).filter((problem) =>
        completed.has(problem.link)
      ).length
    );
  }, 0);

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl">

        {/* =========================================
            Header
        ========================================= */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-500">
            DSA
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Beginner
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Start with fundamental DSA problems and build your
            problem-solving foundation.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span>{totalProblems} Problems</span>

            <span className="text-gray-700">•</span>

            <span>{topics.length} Topics</span>

            <span className="text-gray-700">•</span>

            <span>{solvedCount} Solved</span>
          </div>
        </div>

        {/* =========================================
            Topics
        ========================================= */}
        <div className="space-y-3">
          {topics.map((topic, index) => {
            const problems = topic.problems || [];

            // Problems solved in this topic
            const topicSolvedCount = problems.filter((problem) =>
              completed.has(problem.link)
            ).length;

            // Is topic open?
            const isOpen = openTopic === index;

            // Is entire topic completed?
            const isCompleted =
              problems.length > 0 &&
              topicSolvedCount === problems.length;

            // Progress percentage
            const progressPercentage = problems.length
              ? (topicSolvedCount / problems.length) * 100
              : 0;

            return (
              <div
                key={topic.slug || topic.name || topic.topic || index}
                className={`overflow-hidden rounded-2xl border bg-gray-900 transition-all ${
                  isCompleted
                    ? "border-green-500/40"
                    : "border-gray-800"
                }`}
              >
                {/* =====================================
                    Topic Header
                ===================================== */}
                <button
                  type="button"
                  onClick={() => toggleTopic(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-800/40 sm:px-6"
                >
                  {/* Left Side */}
                  <div className="flex min-w-0 items-center gap-4">

                    {/* Topic Number */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                        isCompleted
                          ? "bg-green-500 text-gray-950"
                          : "bg-gray-800 text-gray-300"
                      }`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>

                    {/* Topic Info */}
                    <div className="min-w-0">
                      <h3
                        className={`truncate text-sm font-semibold sm:text-base ${
                          isCompleted
                            ? "text-green-400"
                            : "text-white"
                        }`}
                      >
                        {topic.name ||
                          topic.title ||
                          topic.topic ||
                          "Topic"}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {topicSolvedCount} / {problems.length} solved
                      </p>
                    </div>
                  </div>

                  {/* =====================================
                      Right Side
                  ===================================== */}
                  <div className="flex shrink-0 items-center gap-4">

                    {/* Progress Bar */}
                    <div className="hidden w-24 sm:block">
                      <div className="h-1.5 overflow-hidden rounded-full bg-gray-800">
                        <div
                          className="h-full rounded-full bg-green-500 transition-all duration-300"
                          style={{
                            width: `${progressPercentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Problem Count */}
                    <span className="hidden text-xs text-gray-500 sm:block">
                      {problems.length}{" "}
                      {problems.length === 1
                        ? "Problem"
                        : "Problems"}
                    </span>

                    {/* Arrow */}
                    <span
                      className={`text-lg text-gray-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ↓
                    </span>
                  </div>
                </button>

                {/* =====================================
                    Problems
                ===================================== */}
                {isOpen && (
                  <div className="border-t border-gray-800">
                    {problems.map((problem, problemIndex) => {
                      const problemLink =
                        problem.link || problem.url || "";

                      const isSolved = completed.has(problemLink);

                      const platform = getPlatform(
                        problem.platform
                      );

                      return (
                        <div
                          key={
                            problem._id ||
                            problem.id ||
                            problemLink ||
                            problemIndex
                          }
                          className={`group border-b border-gray-800 px-4 py-2.5 transition-colors last:border-b-0 sm:px-6 sm:py-3 ${
                            isSolved
                              ? "bg-gray-900/60"
                              : "hover:bg-gray-800/40"
                          }`}
                        >
                          <div className="flex items-center gap-3">

                            {/* Checkbox */}
                            <button
                              type="button"
                              onClick={() =>
                                toggleProblem(problemLink)
                              }
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                isSolved
                                  ? "border-green-500 bg-green-500"
                                  : "border-gray-600 bg-gray-950 hover:border-green-500"
                              }`}
                              aria-label={
                                isSolved
                                  ? "Mark as unsolved"
                                  : "Mark as solved"
                              }
                            >
                              {isSolved && (
                                <span className="text-sm font-bold text-gray-950">
                                  ✓
                                </span>
                              )}
                            </button>

                            {/* Number */}
                            <span className="w-5 shrink-0 text-xs text-gray-600">
                              {String(problemIndex + 1).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            {/* Problem Name */}
                            <a
                              href={problemLink || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`min-w-0 flex-1 text-sm transition-colors ${
                                isSolved
                                  ? "text-gray-600 line-through"
                                  : "text-gray-300 group-hover:text-white"
                              }`}
                            >
                              <span className="block truncate">
                                {problem.name ||
                                  problem.title ||
                                  problem.question ||
                                  `Problem ${
                                    problemIndex + 1
                                  }`}
                              </span>
                            </a>

                            {/* Platform Logo */}
                            <a
                              href={problemLink || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
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
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* =========================================
            Empty State
        ========================================= */}
        {topics.length === 0 && (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-center">
            <p className="text-sm text-gray-500">
              No beginner problems available.
            </p>
          </div>
        )}

        {/* =========================================
            Back
        ========================================= */}
        <div className="mt-5 pb-5">
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

export default Beginner;