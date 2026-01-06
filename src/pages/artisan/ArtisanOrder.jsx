import { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ArtisanOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/artisan/orders");
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
      console.log("Fetch error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.patch(`/orders/${orderId}/status`, { status: newStatus });
      toast.success("Order status updated!");
      fetchOrders(); // Refresh the orders list
    } catch (err) {
      toast.error("Failed to update status.");
      console.log(err.response?.data);
    }
  };

  useEffect(() => {
    if (user?.role === "artisan") {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        📦 My Orders
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-lg shadow-sm bg-white">
            <thead className="bg-gray-100 text-gray-700 font-semibold text-sm uppercase">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 border-b transition"
                >
                  <td className="py-3 px-4 font-medium">{order.user?.name}</td>

                  <td className="py-3 px-4 space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.product?.name} ×{" "}
                        <span className="font-semibold">{item.quantity}</span>
                      </div>
                    ))}
                  </td>

                  <td className="py-3 px-4 font-semibold text-gray-900">
                    ₹{order.totalAmount}
                  </td>

                  <td className="py-3 px-4 text-gray-600">{order.address}</td>

                  <td className="py-3 px-4">
                    <select
                      className="select select-sm select-bordered text-sm"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      disabled={
                        order.status === "Delivered" ||
                        order.status === "Cancelled"
                      }
                    >
                      {[
                        "Pending",
                        "Accepted",
                        "Shipped",
                        "Delivered",
                        "Cancelled",
                      ].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 px-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ArtisanOrder;
