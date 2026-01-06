// pages/artisan/ArtisanReview.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const ArtisanReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await API.get("/artisan/reviews");
      console.log("Reviews from API:", res.data); // ✅ check this
      setReviews(res.data);
    } catch (err) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#7b1e3b] mb-6 text-center">
        🌟 Reviews for Your Products
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-600">
          No reviews for your products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                🛍 {review.product?.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                By{" "}
                <span className="font-medium text-black">
                  {review.user?.name}
                </span>
              </p>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
                {"⭐".repeat(review.rating)}{" "}
                <span className="ml-1 text-gray-600 text-xs">
                  ({review.rating})
                </span>
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-3">{review.comment}</p>

              <p className="text-xs text-gray-400">
                Reviewed on {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtisanReview;
