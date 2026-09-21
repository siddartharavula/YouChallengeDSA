import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

function Beginner() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBeginnerProblems = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "https://youchallengedsa.onrender.com/api/challenges/beginner"
        );

        setTopics(response.data.problems);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load beginner problems."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBeginnerProblems();
  }, []);

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="text-white">
              Beginner
            </span>{" "}
            <span className="text-green-500">
              Problems
            </span>
          </h2>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-px w-10 bg-green-500" />

            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-widest">
              Start your DSA journey
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-400">
              Loading beginner problems...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-900 bg-gray-900 p-5">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Problems */}
        {!loading && !error && (
          <div className="space-y-6">

            {topics.map((topic) => (
              <div
                key={topic.topic}
                className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden"
              >
                {/* Topic */}
                <div className="border-b border-gray-800 px-5 py-4">
                  <h3 className="text-lg font-semibold text-white">
                    {topic.topic}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {topic.problems.length} problems
                  </p>
                </div>

                {/* Problems */}
                <div className="divide-y divide-gray-800">

                  {topic.problems.map((problem, index) => (
                    <div
                      key={problem.link}
                      className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-gray-800/40 transition"
                    >
                      <div className="flex items-center gap-4 min-w-0">

                        <span className="text-sm text-gray-600">
                          {index + 1}
                        </span>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-200">
                            {problem.name}
                          </p>

                          <p className="mt-1 text-xs uppercase text-gray-600">
                            {problem.platform}
                          </p>
                        </div>

                      </div>

                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-lg bg-green-500 px-3 py-2 text-xs font-semibold text-gray-950 hover:bg-green-400 transition"
                      >
                        Solve →
                      </a>

                    </div>
                  ))}

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default Beginner;