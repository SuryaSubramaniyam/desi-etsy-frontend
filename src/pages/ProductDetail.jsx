// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => API.get(`/products/${id}`).then((res) => res.data),
    retry: false,
  });

  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => API.get(`/reviews/product/${id}`).then((res) => res.data),
    retry: false,
  });

  if (productLoading || reviewsLoading) return <p>Loading...</p>;
  if (productError) return <p>Error loading product: {productError.message}</p>;
  if (reviewsError) return <p>Error loading reviews: {reviewsError.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#7b1e3b]">{product?.name}</h1>
      <p className="text-gray-600 mt-2">{product?.description}</p>

      <h2 className="text-xl font-semibold mt-8 text-[#7b1e3b]">
        💬 Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500 mt-2 italic">No reviews yet.</p>
      ) : (
        <div className="space-y-4 mt-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-yellow-500 mb-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-800">{review.comment}</p>

              {/* Reviewer */}
              <p className="text-xs text-gray-500 mt-2">
                — {review.user?.name || "Anonymous"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
