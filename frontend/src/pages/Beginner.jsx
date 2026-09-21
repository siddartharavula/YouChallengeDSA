import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

function Beginner() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Frontend-only solved state
  const [solvedProblems, setSolvedProblems] = useState(new Set());

  useEffect(() => {
    const fetchBeginnerProblems = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://youchallengedsa.onrender.com/api/challenges/beginner",
        );

        setTopics(response.data.problems);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load beginner problems.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBeginnerProblems();
  }, []);

  const toggleProblem = (link) => {
    setSolvedProblems((prev) => {
      const updated = new Set(prev);

      if (updated.has(link)) {
        updated.delete(link);
      } else {
        updated.add(link);
      }

      return updated;
    });
  };

  const totalProblems = topics.reduce(
    (total, topic) => total + topic.problems.length,
    0,
  );

  const solvedCount = solvedProblems.size;

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
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="text-white">YouChallenge</span>
                <span className="text-green-500">DSA</span>
              </h2>

              <div className="mt-3 flex items-center gap-3">
                <div className="h-px w-8 bg-green-500 sm:w-10" />

                <p className="text-xs font-medium uppercase tracking-widest text-gray-500 sm:text-sm">
                  Beginner Problems
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid w-full grid-cols-2 gap-3 lg:w-auto">

              <div className="min-w-0 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 sm:px-5 lg:min-w-[130px]">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Solved
                </p>

                <p className="mt-1 text-lg font-bold text-white sm:text-xl">
                  <span className="text-green-500">
                    {solvedCount}
                  </span>{" "}
                  / {totalProblems}
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 sm:px-5 lg:min-w-[130px]">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Topics
                </p>

                <p className="mt-1 text-lg font-bold text-white sm:text-xl">
                  <span className="text-green-500">
                    {topics.length}
                  </span>
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-900 bg-gray-900 p-4">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6">
            <p className="text-sm text-gray-400">
              Loading beginner problems...
            </p>
          </div>
        )}

        {/* Topics */}
        {!loading && !error && (
          <div className="space-y-4">

            {topics.map((topic) => {
              const completedProblems = topic.problems.filter(
                (problem) => solvedProblems.has(problem.link),
              ).length;

              const isTopicCompleted =
                completedProblems === topic.problems.length;

              return (
                <div
                  key={topic.topic}
                  className={`overflow-hidden rounded-2xl transition-all duration-200 ${
                    isTopicCompleted
                      ? "border border-green-500/50 bg-gray-900"
                      : "border border-gray-800 bg-gray-900 hover:border-gray-700"
                  }`}
                >

                  {/* Topic Header */}
                  <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">

                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                      {/* Topic Number */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold sm:h-11 sm:w-11 ${
                          isTopicCompleted
                            ? "bg-green-500 text-gray-950"
                            : "bg-gray-800 text-gray-300"
                        }`}
                      >
                        {isTopicCompleted
                          ? "✓"
                          : topics.indexOf(topic) + 1}
                      </div>

                      {/* Topic Info */}
                      <div className="min-w-0">

                        <div className="flex items-center gap-2 sm:gap-3">
                          <h3 className="text-sm font-semibold text-white sm:text-base">
                            {topic.topic}
                          </h3>

                          {isTopicCompleted && (
                            <span className="text-[10px] font-semibold text-green-500 sm:text-xs">
                              Completed
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                          {completedProblems} /{" "}
                          {topic.problems.length} solved
                        </p>

                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex shrink-0 items-center gap-3 sm:gap-4">

                      <div className="hidden w-24 sm:block">
                        <div className="h-1.5 overflow-hidden rounded-full bg-gray-800">
                          <div
                            className="h-full rounded-full bg-green-500 transition-all duration-300"
                            style={{
                              width: `${
                                (completedProblems /
                                  topic.problems.length) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      <span className="text-lg text-gray-500 sm:text-xl">
                        {topic.problems.length}
                      </span>

                    </div>
                  </div>

                  {/* Problems */}
                  <div className="border-t border-gray-800">

                    {topic.problems.map((problem, index) => {
                      const isSolved = solvedProblems.has(
                        problem.link,
                      );

                      const platform =
                        platformData[problem.platform];

                      return (
                        <div
                          key={problem.link}
                          className={`group px-4 py-3.5 transition-colors sm:px-6 sm:py-4 ${
                            index !==
                            topic.problems.length - 1
                              ? "border-b border-gray-800"
                              : ""
                          } ${
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
                                toggleProblem(problem.link)
                              }
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
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
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* Problem Name */}
                            <span
                              className={`min-w-0 flex-1 text-sm transition-colors ${
                                isSolved
                                  ? "text-gray-600 line-through"
                                  : "text-gray-300 group-hover:text-white"
                              }`}
                            >
                              <span className="block truncate">
                                {problem.name}
                              </span>
                            </span>

                            {/* Platform Logo */}
                            {platform && (
                              <a
                                href={problem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(event) =>
                                  event.stopPropagation()
                                }
                                title={`Open on ${platform.name}`}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-950 transition-all hover:border-green-500"
                              >
                                <img
                                  src={platform.logo}
                                  alt={platform.name}
                                  className="h-6 w-6 rounded-md object-contain"
                                />
                              </a>
                            )}

                          </div>
                        </div>
                      );
                    })}

                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Beginner;