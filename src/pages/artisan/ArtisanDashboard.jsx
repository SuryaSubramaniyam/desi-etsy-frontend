import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";

const ArtisanDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["artisanStats"],
    queryFn: async () => {
      const res = await API.get("/artisan/dashboard");
      return res.data;
    },
  });

  if (isLoading) return <p className="p-4">Loading dashboard...</p>;
  if (error) return <p className="text-red-500 p-4">Failed to load stats.</p>;

  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div className="stat bg-base-100 shadow rounded">
        <div className="stat-title">🛍️ Total Products</div>
        <div className="stat-value">{data.totalProducts}</div>
      </div>

      <div className="stat bg-base-100 shadow rounded">
        <div className="stat-title">📦 Total Orders</div>
        <div className="stat-value">{data.totalOrders}</div>
      </div>

      <div className="stat bg-base-100 shadow rounded">
        <div className="stat-title">💰 Total Revenue</div>
        <div className="stat-value">₹{data.totalRevenue}</div>
      </div>

      <div className="stat bg-base-100 shadow rounded">
        <div className="stat-title">⭐ Avg Rating</div>
        <div className="stat-value">{data.avgRating}</div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;
