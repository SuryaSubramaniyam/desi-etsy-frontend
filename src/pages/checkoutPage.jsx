import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { FaMapMarkerAlt, FaPhoneAlt, FaCreditCard } from "react-icons/fa";

const CheckoutPage = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await API.get("/cart");
      return res.data;
    },
  });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const items = cartItems.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
  }));

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Cart is empty.");
      return;
    }

    if (paymentMethod === "cod") {
      try {
        await API.post("/orders", {
          items,
          address,
          phone,
          paymentMethod,
          totalAmount,
        });
        toast.success("Order placed successfully!");
        localStorage.setItem("latestOrderId", orderData._id);

        navigate("/order-success");
      } catch (err) {
        toast.error("Failed to place COD order.");
        navigate("/order-failure");
      }
    } else if (paymentMethod === "razorpay") {
      try {
        const { data: razorpayOrder } = await API.post(
          "/orders/create-razorpay-order",
          {
            amount: totalAmount,
          }
        );

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "Desi Etsy",
          description: "Artisan Marketplace Order",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;

            // verify payment
            const { data: verifyRes } = await API.post(
              "/orders/verify-razorpay",
              {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
              }
            );

            if (verifyRes.success) {
              await API.post("/orders", {
                items,
                address,
                phone,
                paymentMethod,
                totalAmount,
              });

              toast.success("Payment successful! Order placed.");
              navigate("/order-success");
            } else {
              toast.error("Payment verification failed.");
              navigate("/order-failure");
            }
          },
          theme: {
            color: "#7b1e3b",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (err) {
        console.error(err);
        toast.error("Razorpay error. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#7b1e3b] mb-6">
          Checkout
        </h2>

        <form onSubmit={handleCheckout} className="space-y-6">
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaMapMarkerAlt className="inline mr-1 text-[#7b1e3b]" />
              Delivery Address
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaPhoneAlt className="inline mr-1 text-[#7b1e3b]" />
              Phone Number
            </label>
            <input
              type="tel"
              className="input input-bordered w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaCreditCard className="inline mr-1 text-[#7b1e3b]" />
              Payment Method
            </label>
            <select
              className="select select-bordered w-full"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cod">💵 Cash on Delivery</option>
              <option value="razorpay">💳 Razorpay</option>
            </select>
            {paymentMethod === "razorpay" && (
              <div className="mt-2 text-sm text-green-600 font-medium">
                🔄 Razorpay selected. You’ll be redirected to payment gateway.
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-base-100 p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-[#7b1e3b] mb-2">
              🧾 Order Summary
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Total Items: {cartItems.length}</li>
              <li>• Estimated Delivery: 4-6 days</li>
              <li>
                • Payment: {paymentMethod === "cod" ? "Cash" : "Razorpay"}
              </li>
              <li className="font-bold text-[#7b1e3b]">
                • Total: ₹{totalAmount}
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-[#7b1e3b] text-white hover:bg-[#5e182e] w-full text-lg"
          >
            ✅ Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
