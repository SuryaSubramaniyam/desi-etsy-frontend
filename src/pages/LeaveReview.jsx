import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const LeaveReview = () => {
  const { id: orderId } = useParams();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderRes = await API.get(`/orders/${orderId}`);
      const order = orderRes.data;
      console.log("ORDER DATA:", order);
      if (!order.items || order.items.length === 0) {
        toast.error("No items found in this order.");
        return;
      }

      const firstItem = order.items[0];
      const productId =
        typeof firstItem.product === "object"
          ? firstItem.product._id
          : firstItem.product;

      if (!productId) {
        toast.error("Product not found in order item.");
        return;
      }

      await API.post(`/reviews/${productId}`, { rating, comment });

      toast.success("Review submitted!");
      queryClient.invalidateQueries(["reviews", productId]);
      navigate("/user/dashboard/reviews");
    } catch (err) {
      console.error(
        "Error submitting review:",
        err.response?.data || err.message
      );
      toast.error(err.response?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-6 py-8 bg-white shadow-xl rounded-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center text-[#7b1e3b] mb-6">
        📝 Leave a Review
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="rating rating-md">
            {[1, 2, 3, 4, 5].map((num) => (
              <input
                key={num}
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-yellow-400"
                checked={rating === num}
                onChange={() => setRating(num)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered w-full h-24"
            placeholder="Share your thoughts..."
          />
        </div>

        <button
          type="submit"
          className="btn w-full bg-yellow-400 text-[#7b1e3b] hover:bg-yellow-300 font-semibold"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default LeaveReview;
