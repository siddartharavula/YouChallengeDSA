import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";
import DayAccordion from "../components/DayAccordion";

function Dashboard() {
  const { days } = useParams();

  const [challenge, setChallenge] = useState([]);
  const [solvedProblems, setSolvedProblems] =
    useState(new Set());

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [guestMessage, setGuestMessage] =
    useState("");

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        setError("");
        setGuestMessage("");

        const challengeResponse =
          await axios.get(
            `https://youchallengedsa.onrender.com/api/challenges/${days}`
          );

        setChallenge(
          challengeResponse.data.challenge || []
        );

        const token =
          localStorage.getItem("token");

        if (token) {
          try {
            const progressResponse =
              await axios.get(
                `https://youchallengedsa.onrender.com/api/progress/${days}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

            setSolvedProblems(
              new Set(
                progressResponse.data
                  .solvedProblems || []
              )
            );
          } catch (progressError) {
            console.error(
              "Failed to load progress:",
              progressError
            );

            setSolvedProblems(new Set());
          }
        } else {
          setSolvedProblems(new Set());
        }
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [days]);

  const toggleProblem = async (
    problemLink
  ) => {
    const token =
      localStorage.getItem("token");

    const isCurrentlySolved =
      solvedProblems.has(problemLink);

    setSolvedProblems((previous) => {
      const updated = new Set(previous);

      if (isCurrentlySolved) {
        updated.delete(problemLink);
      } else {
        updated.add(problemLink);
      }

      return updated;
    });

    if (!token) {
      setGuestMessage(
        "Login to save your progress."
      );

      setTimeout(() => {
        setGuestMessage("");
      }, 2500);

      return;
    }

    try {
      await axios.put(
        `https://youchallengedsa.onrender.com/api/progress/${days}`,
        {
          problemLink,
          solved: !isCurrentlySolved,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);

      setSolvedProblems((previous) => {
        const reverted = new Set(previous);

        if (isCurrentlySolved) {
          reverted.add(problemLink);
        } else {
          reverted.delete(problemLink);
        }

        return reverted;
      });

      setError(
        error.response?.data?.message ||
          "Failed to save progress."
      );
    }
  };

  /*
   * Count DSA + SQL
   */
  const totalProblems = challenge.reduce(
    (total, day) => {
      const dsaCount =
        day.problems?.length || 0;

      const sqlCount =
        day.sql?.length || 0;

      return total + dsaCount + sqlCount;
    },
    0
  );

  const solvedCount = solvedProblems.size;

  /*
   * A day is completed only when
   * BOTH DSA and SQL are completed.
   */
  const completedDays = challenge.filter(
    (day) => {
      const allProblems = [
        ...(day.problems || []),
        ...(day.sql || []),
      ];

      return (
        allProblems.length > 0 &&
        allProblems.every((problem) =>
          solvedProblems.has(problem.link)
        )
      );
    }
  ).length;

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="text-white">
                  YouChallenge
                </span>

                <span className="text-green-500">
                  DSA
                </span>
              </h2>

              <div className="mt-3 flex items-center gap-3">
                <div className="h-px w-8 bg-green-500 sm:w-10" />

                <p className="text-xs font-medium uppercase tracking-widest text-gray-500 sm:text-sm">
                  {days} Days Challenge
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid w-full grid-cols-2 gap-3 lg:w-auto">

              <div className="min-w-0 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 lg:min-w-[140px]">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Problems
                </p>

                <p className="mt-1 text-lg font-bold text-white sm:text-xl">
                  <span className="text-green-500">
                    {solvedCount}
                  </span>

                  <span className="text-gray-600">
                    {" / "}
                  </span>

                  {totalProblems}
                </p>

                <p className="mt-0.5 text-[10px] text-gray-600">
                  DSA + SQL
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 lg:min-w-[140px]">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Days
                </p>

                <p className="mt-1 text-lg font-bold text-white sm:text-xl">
                  <span className="text-green-500">
                    {completedDays}
                  </span>

                  <span className="text-gray-600">
                    {" / "}
                  </span>

                  {days}
                </p>

                <p className="mt-0.5 text-[10px] text-gray-600">
                  completed
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Guest Message */}
        {guestMessage && (
          <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 shadow-2xl">
            <p className="whitespace-nowrap text-sm text-gray-300">
              🔒 {guestMessage}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-900 bg-gray-900 p-4">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Challenge */}
        <div className="space-y-3 sm:space-y-4">

          {loading && (
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 sm:p-6">
              <p className="text-sm text-gray-400">
                Loading challenge...
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            challenge.map((day) => (
              <DayAccordion
                key={day.day}
                day={day}
                solvedProblems={solvedProblems}
                onToggleProblem={
                  toggleProblem
                }
              />
            ))}

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;