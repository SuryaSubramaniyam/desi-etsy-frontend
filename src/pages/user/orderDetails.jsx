import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";

const OrderDetails = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: async () => {
      const res = await API.get(`/orders/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading order details...</p>;
  if (error)
    return <p className="text-red-500">Failed to load order details.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-[#7b1e3b] mb-2">
        🧾 Order #{order._id}
      </h1>

      <div className="text-sm text-gray-600 mb-4">
        <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>
          Status:{" "}
          <span className="font-semibold text-black">{order.status}</span>
        </p>
        <p>
          Payment Method:{" "}
          <span className="font-semibold text-black">
            {order.paymentMethod}
          </span>
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#7b1e3b] mb-2">📦 Items</h2>
        <ul className="divide-y">
          {order.items.map((item) => (
            <li
              key={item._id}
              className="py-3 flex items-center gap-4 hover:bg-gray-50 rounded transition"
            >
              <img
                src={
                  item.product.images?.[0]
                    ? `http://localhost:8888${item.product.images[0]}`
                    : "https://via.placeholder.com/100"
                }
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded border"
              />
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  Price: ₹{item.product.price}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  Subtotal: ₹{item.product.price * item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#7b1e3b] mb-2">
          🚚 Shipping Info
        </h2>
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <p>
            <strong>Phone:</strong> {order.phone}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h2 className="text-lg font-semibold text-[#7b1e3b] mb-1">💰 Total</h2>
        <p className="text-xl font-bold text-gray-800">
          ₹
          {order.items.reduce(
            (total, i) => total + i.product.price * i.quantity,
            0
          )}
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
