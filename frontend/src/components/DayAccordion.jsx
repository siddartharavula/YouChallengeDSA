import { useState } from "react";

function DayAccordion({
  day,
  solvedProblems,
  onToggleProblem,
}) {
  const [open, setOpen] = useState(false);
  const [dsaOpen, setDsaOpen] = useState(false);
  const [sqlOpen, setSqlOpen] = useState(false);

  const dsaProblems = day.problems || [];
  const sqlProblems = day.sql || [];

  const allProblems = [
    ...dsaProblems,
    ...sqlProblems,
  ];

  const dsaSolved = dsaProblems.filter((problem) =>
    solvedProblems.has(problem.link)
  ).length;

  const sqlSolved = sqlProblems.filter((problem) =>
    solvedProblems.has(problem.link)
  ).length;

  const totalProblems = allProblems.length;

  const completedProblems =
    dsaSolved + sqlSolved;

  const progress =
    totalProblems > 0
      ? (completedProblems / totalProblems) * 100
      : 0;

  const isDayCompleted =
    totalProblems > 0 &&
    completedProblems === totalProblems;

  const getPlatformLogo = (platform) => {
    const normalized = platform
      ?.toLowerCase()
      ?.replace(/[\s+_-]/g, "");

    const platforms = {
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
      hackerrank: {
        name: "HackerRank",
        logo: "/logos/hackerrank.png",
      },
      codechef: {
        name: "CodeChef",
        logo: "/logos/codechef.png",
      },
    };

    return (
      platforms[normalized] || {
        name: platform || "Platform",
        logo: null,
      }
    );
  };

  const renderProblem = (
    problem,
    index,
    total
  ) => {
    const isSolved = solvedProblems.has(
      problem.link
    );

    const platform = getPlatformLogo(
      problem.platform
    );

    return (
      <div
        key={problem.link}
        className={`group flex items-center gap-3 px-4 py-2.5 transition-colors sm:px-5 sm:py-3 ${
          index !== total - 1
            ? "border-b border-gray-800"
            : ""
        } ${
          isSolved
            ? "bg-green-500/[0.02]"
            : "hover:bg-gray-800/40"
        }`}
      >
        {/* Checkbox */}
        <button
          type="button"
          onClick={() =>
            onToggleProblem(problem.link)
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
        <span className="w-6 shrink-0 text-xs text-gray-600">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Name */}
        <span
          className={`min-w-0 flex-1 text-sm ${
            isSolved
              ? "text-gray-600 line-through"
              : "text-gray-300 group-hover:text-white"
          }`}
          title={problem.name}
        >
          <span className="block truncate">
            {problem.name}
          </span>
        </span>

        {/* Platform */}
        <a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) =>
            event.stopPropagation()
          }
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
            <span className="text-xs text-gray-400">
              ↗
            </span>
          )}
        </a>
      </div>
    );
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all ${
        isDayCompleted
          ? "border-green-500/40 bg-gray-900"
          : "border-gray-800 bg-gray-900"
      }`}
    >
      {/* ================= DAY HEADER ================= */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-gray-800/30 sm:px-5 sm:py-4"
      >
        <div className="flex min-w-0 items-center gap-3">
          {/* Day Number */}
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
              isDayCompleted
                ? "bg-green-500 text-gray-950"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            {isDayCompleted ? "✓" : day.day}
          </div>

          {/* Day Info */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white sm:text-base">
                Day {day.day}
              </h3>

              {isDayCompleted && (
                <span className="text-[10px] font-semibold text-green-500 sm:text-xs">
                  Completed
                </span>
              )}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span>
                {dsaProblems.length} DSA
              </span>

              <span className="text-gray-700">
                •
              </span>

              <span>
                {sqlProblems.length} SQL
              </span>

              <span className="text-gray-700">
                •
              </span>

              <span>
                {completedProblems}/{totalProblems}
                {" "}solved
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {/* Progress */}
          <div className="hidden w-24 sm:block">
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Percentage */}
          <span className="hidden w-10 text-right text-xs text-gray-500 sm:block">
            {Math.round(progress)}%
          </span>

          {/* Arrow */}
          <span
            className={`text-lg text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            ↓
          </span>
        </div>
      </button>

      {/* ================= DAY CONTENT ================= */}
      {open && (
        <div className="border-t border-gray-800">

          {/* ================= DSA ================= */}
          {dsaProblems.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() =>
                  setDsaOpen(!dsaOpen)
                }
                className="flex w-full items-center justify-between border-b border-gray-800 bg-gray-950/70 px-4 py-3 text-left transition-colors hover:bg-gray-800/50 sm:px-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-500/10">
                    <span className="text-xs font-bold text-green-500">
                      D
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                      DSA Problems
                    </p>

                    <p className="mt-0.5 text-[11px] text-gray-600">
                      {dsaSolved}/{dsaProblems.length} solved
                    </p>
                  </div>
                </div>

                <span
                  className={`text-gray-500 transition-transform ${
                    dsaOpen ? "rotate-180" : ""
                  }`}
                >
                  ↓
                </span>
              </button>

              {dsaOpen && (
                <div>
                  {dsaProblems.map(
                    (problem, index) =>
                      renderProblem(
                        problem,
                        index,
                        dsaProblems.length
                      )
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= SQL ================= */}
          {sqlProblems.length > 0 && (
            <div className="border-t border-gray-800">
              <button
                type="button"
                onClick={() =>
                  setSqlOpen(!sqlOpen)
                }
                className="flex w-full items-center justify-between bg-gray-950/70 px-4 py-3 text-left transition-colors hover:bg-gray-800/50 sm:px-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-500/10">
                    <span className="text-xs font-bold text-green-500">
                      SQL
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                      SQL Problems
                    </p>

                    <p className="mt-0.5 text-[11px] text-gray-600">
                      {sqlSolved}/{sqlProblems.length} solved
                    </p>
                  </div>
                </div>

                <span
                  className={`text-gray-500 transition-transform ${
                    sqlOpen ? "rotate-180" : ""
                  }`}
                >
                  ↓
                </span>
              </button>

              {sqlOpen && (
                <div>
                  {sqlProblems.map(
                    (problem, index) =>
                      renderProblem(
                        problem,
                        index,
                        sqlProblems.length
                      )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DayAccordion;