import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: cartItems = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await API.get("/cart");
      return res.data;
    },
    enabled: !!user,
  });

  const removeMutation = useMutation({
    mutationFn: async (itemId) => {
      await API.delete(`/cart/${itemId}`);
    },
    onSuccess: () => {
      toast.success("Removed from cart");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });
  const updateMutation = useMutation({
    mutationFn: async ({ id, quantity }) => {
      return await API.patch(`/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (isLoading) return <p className="text-center mt-10">Loading cart...</p>;
  if (error) return <p className="text-center mt-10">Failed to load cart.</p>;

  return (
    <>
      <Navbar />
      <div className="bg-base-200 py-10 min-h-screen px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-[#7b1e3b] mb-6">
            🛒 Your Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 text-base mb-4">
                Your cart is empty.
              </p>
              <Link to="/" className="btn btn-outline btn-sm btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center border rounded-md p-4 bg-base-100"
                  >
                    {/* Image */}
                    <div className="sm:col-span-1">
                      <img
                        src={
                          item.product.images?.[0]
                            ? `http://localhost:8888${item.product.images[0]}`
                            : "https://via.placeholder.com/100"
                        }
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    </div>

                    {/* Info */}
                    <div className="sm:col-span-2">
                      <h3 className="text-base font-medium text-gray-800">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ₹{item.product.price}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 sm:col-span-1">
                      <button
                        className="btn btn-xs btn-outline"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateMutation.mutate({
                            id: item._id,
                            quantity: item.quantity - 1,
                          })
                        }
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        className="btn btn-xs btn-outline"
                        onClick={() =>
                          updateMutation.mutate({
                            id: item._id,
                            quantity: item.quantity + 1,
                          })
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal + Remove */}
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-sm font-semibold text-[#7b1e3b]">
                        ₹{item.product.price * item.quantity}
                      </p>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => removeMutation.mutate(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center border-t pt-4">
                <h2 className="text-xl font-bold text-[#7b1e3b]">
                  Total: ₹{totalPrice}
                </h2>
                <Link
                  to="/checkout"
                  className="btn btn-sm btn-success mt-3 sm:mt-0"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
