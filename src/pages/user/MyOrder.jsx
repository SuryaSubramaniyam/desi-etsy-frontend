import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";
import moment from "moment";

const MyOrders = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await API.get("/orders/my");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading your orders...</p>;
  if (error) return <p className="text-red-500">Failed to load orders.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-[#7b1e3b] mb-6 text-center">
        🧾 My Orders
      </h2>

      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          <p className="text-lg">You haven’t placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md border rounded-lg p-6"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Order Date:{" "}
                    {moment(order.createdAt).format("DD MMM YYYY, h:mm A")}
                  </p>
                  <p className="font-medium text-[#7b1e3b] text-sm">
                    Order ID: {order._id}
                  </p>
                </div>
                <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold capitalize">
                  {order.status}
                </span>
              </div>

              {/* Contact & Payment Info */}
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
                <p>
                  <strong>📞 Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>🏠 Address:</strong> {order.address}
                </p>
                <p>
                  <strong>💳 Payment:</strong> {order.paymentMethod}
                </p>
              </div>

              {/* Order Items */}
              <div className="divide-y border rounded bg-gray-50">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.product?.images?.[0]
                            ? `http://localhost:8888${item.product.images[0]}`
                            : "https://via.placeholder.com/100"
                        }
                        alt={item.product?.name || "Product"}
                        className="w-14 h-14 rounded-md object-cover border"
                      />
                      <div>
                        <p className="font-medium">
                          {item.product?.name || "Deleted Product"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ₹
                      {item.product
                        ? item.product.price * item.quantity
                        : "N/A"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                  Total Items: {order.items.length}
                </p>
                <p className="text-lg font-bold text-[#7b1e3b]">
                  Total: ₹
                  {order.items.reduce(
                    (acc, item) =>
                      item.product
                        ? acc + item.product.price * item.quantity
                        : acc,
                    0
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
