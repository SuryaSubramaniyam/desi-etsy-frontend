import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api"; // your axios instance
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      navigate("/home"); // redirect to home or dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-pink-50 to-white px-4 py-12">
      <div className="card w-full max-w-md shadow-2xl bg-white border border-gray-200 rounded-2xl">
        <div className="card-body px-8 py-10">
          <h2 className="text-3xl font-extrabold text-center text-[#7b1e3b] mb-2">
            Login to DesiEtsy
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Welcome back! Please enter your credentials 🧵
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="btn w-full bg-yellow-400 text-[#7b1e3b] hover:bg-yellow-500 font-semibold tracking-wide rounded-md"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-[#7b1e3b] font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
