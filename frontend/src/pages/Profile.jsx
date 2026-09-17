import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pencil } from "lucide-react";

import DashboardLayout from "../components/DashboardLayout";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [progress, setProgress] = useState({
    15: {
      solved: 0,
      total: 0,
      completedDays: 0,
    },
    30: {
      solved: 0,
      total: 0,
      completedDays: 0,
    },
    45: {
      solved: 0,
      total: 0,
      completedDays: 0,
    },
  });

  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
          navigate("/login");
          return;
        }

        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);

        setEditData({
          name: parsedUser.name || "",
          username: parsedUser.username || "",
          email: parsedUser.email || "",
          password: "",
        });

        const challenges = [15, 30, 45];

        const results = await Promise.all(
          challenges.map(async (days) => {
            const response = await axios.get(
              `http://localhost:5000/api/progress/${days}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            return {
              days,
              data: response.data,
            };
          })
        );

        const updatedProgress = {
          15: {
            solved: 0,
            total: 0,
            completedDays: 0,
          },
          30: {
            solved: 0,
            total: 0,
            completedDays: 0,
          },
          45: {
            solved: 0,
            total: 0,
            completedDays: 0,
          },
        };

        results.forEach(({ days, data }) => {
          updatedProgress[days] = {
            solved: data.solvedProblems.length,
            total: 0,
            completedDays:
              data.completedDays.length,
          };

          if (data.streak !== undefined) {
            setStreak(data.streak);
          }
        });

        const challengeResults =
          await Promise.all(
            challenges.map(async (days) => {
              const response = await axios.get(
                `http://localhost:5000/api/challenges/${days}`
              );

              return {
                days,
                challenge:
                  response.data.challenge,
              };
            })
          );

        challengeResults.forEach(
          ({ days, challenge }) => {
            updatedProgress[days].total =
              challenge.reduce(
                (total, day) =>
                  total + day.problems.length,
                0
              );
          }
        );

        setProgress(updatedProgress);
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleEditChange = (event) => {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value,
    });

    setEditError("");
    setEditSuccess("");
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      setEditError("");
      setEditSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.put(
        "http://localhost:5000/api/profile",
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      setEditData({
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        password: "",
      });

      setEditSuccess(
        "Profile updated successfully."
      );

      setTimeout(() => {
        setShowEdit(false);
        setEditSuccess("");
      }, 1000);
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );

      setEditError(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/dashboard/15");
  };

  const handleOpenEdit = () => {
    setEditError("");
    setEditSuccess("");

    setEditData({
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      password: "",
    });

    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    if (saving) {
      return;
    }

    setShowEdit(false);
    setEditError("");
    setEditSuccess("");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-5xl">
          <p className="text-gray-400">
            Loading profile...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-5xl">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Profile
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your YouChallengeDSA progress
          </p>
        </div>

        {/* User Information */}
        <div className="mb-5 sm:mb-6 rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:p-6">

          <div className="flex items-start justify-between gap-4">

            <div className="flex min-w-0 items-center gap-3 sm:gap-5">

              {/* Avatar */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-green-500 flex items-center justify-center text-gray-950 text-xl sm:text-2xl font-bold">
                {user.username
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              {/* User details */}
              <div className="min-w-0">

                <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                  {user.name}
                </h3>

                <p className="mt-1 text-sm text-green-500 truncate">
                  @{user.username}
                </p>

                <p className="mt-1 text-sm text-gray-500 truncate">
                  {user.email}
                </p>

              </div>
            </div>

            {/* Edit */}
            <button
              type="button"
              onClick={handleOpenEdit}
              title="Edit profile"
              className="shrink-0 w-9 h-9 rounded-lg border border-gray-700 bg-gray-950 flex items-center justify-center text-gray-400 transition hover:border-green-500 hover:text-green-500"
            >
              <Pencil size={16} />
            </button>

          </div>
        </div>

        {/* Edit Modal */}
        {showEdit && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-6"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                handleCloseEdit();
              }
            }}
          >
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-7 shadow-2xl">

              <div className="flex items-center justify-between mb-6">

                <h3 className="text-xl font-bold text-white">
                  Edit Profile
                </h3>

                <button
                  type="button"
                  onClick={handleCloseEdit}
                  disabled={saving}
                  className="text-gray-500 hover:text-white text-xl disabled:opacity-50"
                >
                  ×
                </button>

              </div>

              {editError && (
                <div className="mb-5 rounded-lg border border-red-900 bg-red-950/30 px-4 py-3">
                  <p className="text-sm text-red-400">
                    {editError}
                  </p>
                </div>
              )}

              {editSuccess && (
                <div className="mb-5 rounded-lg border border-green-900 bg-green-950/30 px-4 py-3">
                  <p className="text-sm text-green-500">
                    {editSuccess}
                  </p>
                </div>
              )}

              <div className="space-y-5">

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    disabled={saving}
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none focus:border-green-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={editData.username}
                    onChange={handleEditChange}
                    disabled={saving}
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none focus:border-green-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    disabled={saving}
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none focus:border-green-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={editData.password}
                    onChange={handleEditChange}
                    disabled={saving}
                    placeholder="Leave blank to keep current password"
                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none focus:border-green-500 disabled:opacity-50"
                  />
                </div>

              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7">

                <button
                  type="button"
                  onClick={handleCloseEdit}
                  disabled={saving}
                  className="w-full sm:w-auto rounded-lg border border-gray-700 px-5 py-3 text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={saving}
                  className="w-full sm:w-auto rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-gray-950 hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>
            </div>
          </div>
        )}

        {/* Streak */}
        <div className="mb-5 sm:mb-6 rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6">

          <p className="text-xs uppercase tracking-wider text-gray-500">
            Current Streak
          </p>

          <div className="mt-2 flex items-center gap-3">

            <span className="text-2xl sm:text-3xl">
              🔥
            </span>

            <span className="text-2xl sm:text-3xl font-bold text-white">
              {streak}
            </span>

            <span className="text-sm sm:text-base text-gray-500">
              days
            </span>

          </div>
        </div>

        {/* Challenge Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {[15, 30, 45].map((days) => {
            const data = progress[days];

            const percentage =
              data.total > 0
                ? Math.round(
                    (data.solved /
                      data.total) *
                      100
                  )
                : 0;

            return (
              <div
                key={days}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6"
              >

                <p className="text-sm font-semibold text-gray-400">
                  {days} Days Challenge
                </p>

                <p className="mt-3 text-2xl font-bold text-white">

                  <span className="text-green-500">
                    {data.solved}
                  </span>

                  <span className="text-gray-600">
                    {" "}/{" "}
                  </span>

                  {data.total}

                </p>

                <div className="mt-4 h-2 rounded-full bg-gray-800 overflow-hidden">

                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

                <div className="mt-3 flex items-center justify-between gap-2 text-xs text-gray-500">

                  <span>
                    {percentage}% completed
                  </span>

                  <span>
                    {data.completedDays} days done
                  </span>

                </div>

              </div>
            );
          })}

        </div>

        {/* Logout */}
        <div className="mt-6 sm:mt-8 pb-4">

          <button
            type="button"
            onClick={handleLogout}
            className="w-full sm:w-auto rounded-lg border border-red-900 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-950/40"
          >
            Logout
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;