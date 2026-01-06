import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-rose-200 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-[#7b1e3b] mb-4 drop-shadow">
        Welcome to <span className="text-yellow-500">Desi Etsy</span>
      </h1>

      <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-8 leading-relaxed">
        Discover unique handmade treasures crafted with passion by India's
        talented rural & urban artisans.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="/login"
          className="btn bg-[#7b1e3b] text-white hover:bg-[#60172e] px-6 py-2 text-lg rounded-full shadow-lg transition duration-300"
        >
          Login
        </a>
        <a
          href="/register"
          className="btn border-2 border-[#7b1e3b] text-[#7b1e3b] hover:bg-[#7b1e3b] hover:text-white px-6 py-2 text-lg rounded-full shadow-lg transition duration-300"
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
