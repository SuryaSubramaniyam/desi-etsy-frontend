import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../../services/api";
import BookingStatusTracker from "../../components/BookingStatusTracker"; // Reuse this if suitable, otherwise rename to OrderStatusTracker
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import logo from "../../assets/logo.png";

const TrackOrder = () => {
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await API.get("/orders/my");
      return res.data;
    },
  });

  const handleCancel = async (orderId) => {
    try {
      await API.patch(`/orders/${orderId}/status`, { status: "Cancelled" });
      alert("Order cancelled.");
      window.location.reload();
    } catch (err) {
      console.error("Cancel failed", err);
      alert("Failed to cancel order.");
    }
  };

  const handleDownloadInvoice = (order) => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = logo;

    img.onload = () => {
      // Logo
      doc.addImage(img, "PNG", 150, 10, 40, 15);

      // Heading
      doc.setFontSize(18);
      doc.text("Desi Etsy - Invoice", 20, 20);

      // Order Info
      doc.setFontSize(12);
      doc.text(`Order ID: ${order._id}`, 20, 35);
      doc.text(
        `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
        20,
        42
      );
      doc.text(`Status: ${order.status}`, 20, 49);

      const total = order.items.reduce(
        (sum, i) => sum + (i.product?.price || 0) * (i.quantity || 1),
        0
      );

      doc.text(`Total: ₹${total}`, 20, 56);

      // Build table data
      const tableData = order.items.map((item, index) => [
        index + 1,
        item.product?.name || "Unnamed",
        item.quantity || 1,
        `₹${item.product?.price || 0}`,
        `₹${(item.product?.price || 0) * (item.quantity || 1)}`,
      ]);

      // 🧾 Render table below all text
      autoTable(doc, {
        startY: 70,
        head: [["#", "Product", "quantity", "Price", "Subtotal"]],
        body: tableData,
        theme: "striped",
        styles: { fontSize: 11 },
        headStyles: { fillColor: [41, 128, 185] },
      });

      // Save
      doc.save(`invoice_${order._id}.pdf`);
    };
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">Failed to load orders</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#7b1e3b] mb-6 text-center">
        📦 Track Your Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          You have no orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md border rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-500"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="mb-4">
                <BookingStatusTracker status={order.status} />
              </div>

              {/* Items List */}
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="font-medium text-sm mb-2">Items:</h3>
                <ul className="text-sm space-y-1">
                  {order.items.map((item) => (
                    <li key={item._id} className="flex justify-between">
                      <span>
                        {item.product?.name || "Deleted Product"} ×{" "}
                        {item.quantity}
                      </span>
                      <span>
                        ₹{item.product?.price * item.quantity || "N/A"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Summary Info */}
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Total:</strong> ₹
                  {order.items.reduce(
                    (sum, i) => sum + i.product?.price * i.quantity,
                    0
                  )}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {order.status === "Pending" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="text-red-600 hover:text-red-800 underline"
                  >
                    Cancel Order
                  </button>
                )}

                <Link
                  to={`/orders/${order._id}`}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleDownloadInvoice(order)}
                  disabled={!order.items}
                  className="text-green-600 hover:text-green-800 underline disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  🧾 Download Invoice
                </button>

                <Link
                  to={`/orders/${order._id}/review`}
                  className="text-yellow-600 hover:text-yellow-700 underline"
                >
                  ⭐ Leave a Review
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
