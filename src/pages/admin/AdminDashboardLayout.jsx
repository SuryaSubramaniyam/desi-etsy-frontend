import { Outlet, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AdminDashboardLayout = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shadow-md p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              🛠️ Admin Panel
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Manage platform settings
            </p>

            <nav className="flex flex-col gap-2 text-sm text-gray-700">
              <Link
                className="btn btn-sm btn-outline justify-start"
                to="/admin/dashboard"
              >
                📊 Dashboard
              </Link>
              <Link
                className="btn btn-sm btn-outline justify-start"
                to="/admin/dashboard/users"
              >
                👥 Manage Users
              </Link>
              <Link
                className="btn btn-sm btn-outline justify-start"
                to="/admin/dashboard/pending-artisans"
              >
                🧵 Approve Artisans
              </Link>
              <Link
                className="btn btn-sm btn-outline justify-start"
                to="/admin/dashboard/products"
              >
                🛍️ Manage Products
              </Link>
              <Link
                className="btn btn-sm btn-outline justify-start"
                to="/admin/dashboard/orders"
              >
                📦 View Orders
              </Link>
              <Link
                className="btn btn-sm btn-outline justify-start"
                to="/admin/dashboard/categories"
              >
                🗂️ Manage Categories
              </Link>
              <Link
                className="btn btn-sm btn-outline justify-start"
                to="/admin/dashboard/reviews"
              >
                ⭐ Manage Reviews
              </Link>
            </nav>
          </div>

          <div className="mt-6">
            <p className="text-xs text-gray-400">DesiEtsy Admin © 2025</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, Admin 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Here’s an overview of the system and quick access tools.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboardLayout;
