import { useState } from "react";

function DayAccordion({
  day,
  solvedProblems,
  onToggleProblem,
}) {
  const [open, setOpen] = useState(false);

  const completedProblems = day.problems.filter(
    (problem) => solvedProblems.has(problem.link)
  ).length;

  const isDayCompleted =
    completedProblems === day.problems.length;

  const getPlatformLogo = (platform) => {
    if (platform === "leetcode") {
      return {
        name: "LeetCode",
        logo: "/logos/leetcode.png",
      };
    }

    if (platform === "geeksforgeeks") {
      return {
        name: "GeeksforGeeks",
        logo: "/logos/geeksforgeeks.png",
      };
    }

    return {
      name: "SmartInterviews",
      logo: "/logos/smartinterviews.png",
    };
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl transition-all duration-200 ${
        isDayCompleted
          ? "border border-green-500/50 bg-gray-900"
          : "border border-gray-800 bg-gray-900 hover:border-gray-700"
      }`}
    >
      {/* Day Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
      >
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">

          {/* Day Number */}
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold sm:h-11 sm:w-11 ${
              isDayCompleted
                ? "bg-green-500 text-gray-950"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            {isDayCompleted ? "✓" : day.day}
          </div>

          {/* Day Info */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <h3 className="text-sm font-semibold text-white sm:text-base">
                Day {day.day}
              </h3>

              {isDayCompleted && (
                <span className="text-[10px] font-semibold text-green-500 sm:text-xs">
                  Completed
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {completedProblems} / {day.problems.length} solved
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
                      day.problems.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          <span
            className={`text-lg text-gray-500 transition-transform duration-200 sm:text-xl ${
              open ? "rotate-180" : ""
            }`}
          >
            ↓
          </span>
        </div>
      </button>

      {/* Problems */}
      {open && (
        <div className="border-t border-gray-800">
          {day.problems.map((problem, index) => {
            const isSolved = solvedProblems.has(
              problem.link
            );

            const platform = getPlatformLogo(
              problem.platform
            );

            return (
              <div
                key={problem.link}
                className={`group px-4 py-3.5 transition-colors sm:px-6 sm:py-4 ${
                  index !== day.problems.length - 1
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
                      onToggleProblem(problem.link)
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

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DayAccordion;