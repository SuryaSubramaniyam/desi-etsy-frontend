import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-5">
        {/* Sidebar */}
        <aside className="bg-gradient-to-b from-[#fdf2f8] to-[#fff] p-6 md:col-span-1 shadow-inner">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-[#7b1e3b]">👋 Welcome!</h2>
            <p className="text-sm text-gray-600">to your DesiEtsy Dashboard</p>
          </div>
          <ul className="space-y-3">
            <li>
              <Link
                to="/user/dashboard/orders"
                className="btn btn-outline w-full"
              >
                🧾 My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/user/dashboard/reviews"
                className="btn btn-outline w-full"
              >
                📝 My Reviews
              </Link>
            </li>
            <li>
              <Link
                to="/user/dashboard/track"
                className="btn btn-outline w-full"
              >
                🚚 Track Order
              </Link>
            </li>
            <li>
              <Link to="/profile" className="btn btn-outline w-full">
                ⚙️ Edit Profile
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="p-6 md:col-span-4 bg-base-100">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#7b1e3b] mb-2">
              🎉 Hello, User!
            </h1>
            <p className="text-gray-600">
              Welcome back! Here's a snapshot of your recent activity.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#fff7ed] border-l-4 border-orange-400 p-4 rounded shadow">
              <p className="text-sm text-gray-600">Total Orders</p>
              <h3 className="text-2xl font-bold text-orange-500">12</h3>
            </div>
            <div className="bg-[#f0fdf4] border-l-4 border-green-400 p-4 rounded shadow">
              <p className="text-sm text-gray-600">Pending Deliveries</p>
              <h3 className="text-2xl font-bold text-green-500">3</h3>
            </div>
            <div className="bg-[#fef2f2] border-l-4 border-red-400 p-4 rounded shadow">
              <p className="text-sm text-gray-600">Total Reviews</p>
              <h3 className="text-2xl font-bold text-red-500">8</h3>
            </div>
          </div>

          {/* Render Nested Routes */}
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
