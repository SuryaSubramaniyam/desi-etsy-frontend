import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await API.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        📊 Dashboard Analytics
        <span className="text-sm font-medium text-gray-400">Overview</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="text-gray-500 text-sm">Total Users</div>
          <div className="text-3xl font-bold text-blue-600 mt-1">
            {stats.totalUsers}
          </div>
          <div className="text-xs text-gray-400 mt-1">Active & registered</div>
        </div>

        {/* Total Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="text-gray-500 text-sm">Total Orders</div>
          <div className="text-3xl font-bold text-purple-600 mt-1">
            {stats.totalOrders}
          </div>
          <div className="text-xs text-gray-400 mt-1">Completed & pending</div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="text-gray-500 text-sm">Total Revenue</div>
          <div className="text-3xl font-bold text-green-600 mt-1">
            ₹{stats.totalRevenue}
          </div>
          <div className="text-xs text-gray-400 mt-1">All-time gross</div>
        </div>

        {/* Pending Products */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="text-gray-500 text-sm">Pending Products</div>
          <div className="text-3xl font-bold text-yellow-600 mt-1">
            {stats.pendingProducts}
          </div>
          <div className="text-xs text-gray-400 mt-1">Awaiting approval</div>
        </div>

        {/* Artisans */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="text-gray-500 text-sm">Total Artisans</div>
          <div className="text-3xl font-bold text-indigo-600 mt-1">
            {stats.artisans}
          </div>
          <div className="text-xs text-gray-400 mt-1">Verified sellers</div>
        </div>

        {/* Duplicate pending products removed, optional extra */}
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-6 text-center flex items-center justify-center text-gray-400">
          <span className="text-sm">📈 More metrics coming soon...</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
