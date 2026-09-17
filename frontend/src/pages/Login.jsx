import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "https://youchallengedsa.onrender.com/api/auth/login",
        formData,
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard/15");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            <span className="text-white">YouChallenge</span>
            <span className="text-green-500">DSA</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-gray-500">
            Continue your DSA challenge
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-7">
          <h2 className="text-xl font-semibold mb-6">Login</h2>

          {error && (
            <div className="mb-5 rounded-lg border border-red-900 bg-red-950/30 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username / Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Username or Email
              </label>

              <input
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
                placeholder="Enter username or email"
                required
                autoComplete="username"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-500 py-3 text-sm sm:text-base font-semibold text-gray-950 transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-green-500 hover:text-green-400"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
