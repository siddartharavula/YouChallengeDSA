import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHome = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://youchallengedsa.onrender.com/api/home"
        );

        setData(response.data);
      } catch (error) {
        console.error("Failed to load home:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load home page."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-6xl">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-sm text-gray-400">
              Loading...
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
          <div className="rounded-2xl border border-red-900 bg-gray-900 p-5">
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
        <div className="mb-8 sm:mb-10">
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
              Practice. Improve. Repeat.
            </p>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Choose a sheet and start solving. Practice
            DSA topic-wise, strengthen your SQL skills,
            or follow a structured challenge.
          </p>
        </div>

        {/* DSA */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                DSA
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Build and strengthen your problem-solving
                skills.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Beginner */}
            <Link
              to="/dsa/beginner"
              className="group rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:border-green-500/50 hover:bg-gray-900/80 sm:p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-500">
                    DSA
                  </p>

                  <h4 className="mt-2 text-xl font-semibold text-white">
                    Beginner
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Start with fundamental DSA problems
                    and build your basics.
                  </p>
                </div>

                <span className="text-xl text-gray-600 transition group-hover:translate-x-1 group-hover:text-green-500">
                  →
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4 text-xs text-gray-500">
                <span>
                  {data?.dsa?.beginner?.count || 0} Problems
                </span>

                <span className="text-gray-700">
                  •
                </span>

                <span>
                  {data?.dsa?.beginner?.topics || 0} Topics
                </span>
              </div>
            </Link>

            {/* DSA Practice */}
            <Link
              to="/dsa/practice"
              className="group rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:border-green-500/50 hover:bg-gray-900/80 sm:p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-500">
                    DSA
                  </p>

                  <h4 className="mt-2 text-xl font-semibold text-white">
                    DSA Practice
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Practice problems organized topic-wise
                    across important DSA concepts.
                  </p>
                </div>

                <span className="text-xl text-gray-600 transition group-hover:translate-x-1 group-hover:text-green-500">
                  →
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4 text-xs text-gray-500">
                <span>
                  {data?.dsa?.practice?.count || 0} Problems
                </span>

                <span className="text-gray-700">
                  •
                </span>

                <span>
                  {data?.dsa?.practice?.topics || 0} Topics
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* SQL */}
        <section className="mb-8">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">
              SQL
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Practice SQL problems for interviews and
              placements.
            </p>
          </div>

          <Link
            to="/sql"
            className="group block rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:border-green-500/50 hover:bg-gray-900/80 sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-green-500">
                  SQL
                </p>

                <h4 className="mt-2 text-xl font-semibold text-white">
                  SQL Practice
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Solve SQL problems from different
                  platforms and improve your query skills.
                </p>
              </div>

              <span className="text-xl text-gray-600 transition group-hover:translate-x-1 group-hover:text-green-500">
                →
              </span>
            </div>

            <div className="mt-5 text-xs text-gray-500">
              {data?.sql?.count || 0} Problems
            </div>
          </Link>
        </section>

        {/* Challenges */}
        <section className="pb-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">
              Challenges
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Follow a structured day-by-day DSA plan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data?.challenges?.map((challenge) => (
              <Link
                key={challenge.days}
                to={`/dashboard/${challenge.days}`}
                className="group rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:border-green-500/50 hover:bg-gray-900/80 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-green-500">
                      {challenge.days}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      Days Challenge
                    </p>
                  </div>

                  <span className="text-xl text-gray-600 transition group-hover:translate-x-1 group-hover:text-green-500">
                    →
                  </span>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  {challenge.title}
                </p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}

export default Home;