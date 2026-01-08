import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Register = () => {
  const { register, handleSubmit, watch } = useForm();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/api/auth/register", data);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      navigate("/login"); // redirect to homepage
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-yellow-50 to-white px-4 py-10">
      <div className="card w-full max-w-md shadow-2xl bg-white border border-gray-200 rounded-2xl">
        <div className="card-body px-8 py-10">
          <h2 className="text-3xl font-extrabold text-center text-[#7b1e3b] mb-2">
            Register to DesiEtsy
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Join the world of handcrafted elegance 🌿
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("name", { required: true })}
            />

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("email", { required: true })}
            />

            <input
              type="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("phone", { required: true })}
            />

            <input
              type="password"
              placeholder="Create Password"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("password", { required: true })}
            />

            <select
              className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("role", { required: true })}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="artisan">Artisan</option>
              <option value="admin">Admin</option>
            </select>

            {/* Show Shop Name for Artisan only */}
            {watch("role") === "artisan" && (
              <input
                type="text"
                placeholder="Shop Name"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                {...register("shopName", { required: true })}
              />
            )}

            {/* Error message */}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="btn w-full bg-yellow-400 text-[#7b1e3b] hover:bg-yellow-500 font-semibold tracking-wide rounded-md"
            >
              Register
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#7b1e3b] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
