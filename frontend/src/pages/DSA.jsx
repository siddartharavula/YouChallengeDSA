import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

function DSA() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDSA = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://youchallengedsa.onrender.com/api/dsa/practice"
        );

        setData(response.data);
      } catch (error) {
        console.error("Failed to load DSA:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load DSA practice."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDSA();
  }, []);

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

  const topics = data?.problems || [];

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-500">
            DSA
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            DSA Practice
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Practice DSA problems topic-wise and strengthen your
            problem-solving skills.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span>{data?.count || 0} Problems</span>

            <span className="text-gray-700">•</span>

            <span>{data?.topics || topics.length} Topics</span>
          </div>
        </div>

        {/* Topics */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => {
            const problemCount = topic.problems?.length || 0;

            return (
              <Link
                key={topic.slug || topic.name || index}
                to={`/dsa/practice/${topic.slug}`}
                className="group rounded-xl border border-gray-800 bg-gray-900 px-5 py-4 transition hover:border-green-500/50 hover:bg-gray-900/80"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-white transition group-hover:text-green-400">
                      {topic.name || topic.title || "Topic"}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {problemCount}{" "}
                      {problemCount === 1 ? "Problem" : "Problems"}
                    </p>
                  </div>

                  <span className="shrink-0 text-lg text-gray-600 transition group-hover:translate-x-1 group-hover:text-green-500">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {topics.length === 0 && (
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-center">
            <p className="text-sm text-gray-500">
              No DSA topics available.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DSA;