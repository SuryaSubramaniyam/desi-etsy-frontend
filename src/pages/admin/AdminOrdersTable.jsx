import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useState } from "react";

const AdminOrdersTable = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminOrders", page],
    queryFn: async () => {
      const res = await API.get(`/admin/orders?page=${page}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const orders = data?.orders || [];
  const totalPages = data?.totalPages || 1;

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }) => {
      await API.patch(`/admin/orders/${orderId}/status`, { status });
    },
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries(["adminOrders"]);
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const updateStatus = (orderId, status) => {
    updateStatusMutation.mutate({ orderId, status });
  };

  if (isLoading) return <p className="p-4">Loading orders...</p>;
  if (isError)
    return <p className="text-red-500 p-4">Failed to load orders.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📦 All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="table w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
                <tr>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{order.user?.name || "N/A"}</td>
                    <td className="py-3 px-4">
                      {order.items.map((item, i) => (
                        <div key={i}>
                          {item.product?.title || "Untitled"} × {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-4 font-medium text-green-600">
                      ₹{order.totalAmount}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`badge ${
                          order.status === "Pending"
                            ? "badge-warning"
                            : order.status === "Accepted"
                            ? "badge-info"
                            : order.status === "Shipped"
                            ? "badge-accent"
                            : order.status === "Delivered"
                            ? "badge-success"
                            : order.status === "Cancelled"
                            ? "badge-error"
                            : ""
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{order.paymentMethod}</td>
                    <td className="py-3 px-4">{order.address}</td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 space-y-1 text-center">
                      {order.status === "Pending" && (
                        <button
                          className="btn btn-xs btn-info w-full"
                          onClick={() => updateStatus(order._id, "Accepted")}
                        >
                          Accept
                        </button>
                      )}
                      {order.status === "Accepted" && (
                        <button
                          className="btn btn-xs btn-warning w-full"
                          onClick={() => updateStatus(order._id, "Shipped")}
                        >
                          Ship
                        </button>
                      )}
                      {order.status === "Shipped" && (
                        <button
                          className="btn btn-xs btn-success w-full"
                          onClick={() => updateStatus(order._id, "Delivered")}
                        >
                          Deliver
                        </button>
                      )}
                      {["Pending", "Accepted"].includes(order.status) && (
                        <button
                          className="btn btn-xs btn-error w-full"
                          onClick={() => updateStatus(order._id, "Cancelled")}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              className="btn btn-sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="btn btn-sm btn-disabled">
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrdersTable;
