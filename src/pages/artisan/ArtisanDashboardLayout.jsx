import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

const ArtisanDashboardLayout = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex bg-gradient-to-tr from-amber-100 via-pink-50 to-white">
        {/* Sidebar */}
        <aside className="w-72 min-h-screen bg-white/90 backdrop-blur-lg border-r shadow-md p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-rose-800 mb-1">
              👩‍🎨 Artisan Panel
            </h2>
            <p className="text-sm text-gray-500">Your creative business hub</p>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { path: "/artisan/dashboard", label: "📊 Dashboard Stats" },
              { path: "/artisan/dashboard/upload", label: "⬆️ Upload Product" },
              { path: "/artisan/dashboard/orders", label: "🧾 My Orders" },
              { path: "/artisan/dashboard/reviews", label: "⭐ My Reviews" },
              { path: "/artisan/dashboard/products", label: "🛍️ My Products" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-100 hover:text-rose-800 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome back, {user?.name || "Artisan"} 👋
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Manage your listings, orders and reviews from your artisan space.
            </p>
          </div>

          {/* Main Panel Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-rose-100">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default ArtisanDashboardLayout;
