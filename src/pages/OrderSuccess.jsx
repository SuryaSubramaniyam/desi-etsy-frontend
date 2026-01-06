import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // Replace with actual logic: you can also pass via `navigate("/order-success", { state })`
    const savedOrderId = localStorage.getItem("latestOrderId");
    setOrderId(savedOrderId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full text-center border border-green-200">
        <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Thank you for shopping with Desi Etsy.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-left text-sm">
          <p className="font-medium text-gray-700 mb-1">🧾 Invoice Details</p>
          <p className="text-gray-600">
            <span className="font-semibold">Order ID:</span>{" "}
            <span className="text-gray-800">{orderId || "Loading..."}</span>
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Save this ID for future reference or support.
          </p>
        </div>

        <Link
          to="/user/dashboard/orders"
          className="btn bg-green-600 hover:bg-green-700 text-white w-full mt-4"
        >
          View My Orders
        </Link>

        <Link
          to="/"
          className="text-sm text-green-700 underline mt-3 inline-block"
        >
          Continue Shopping →
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
