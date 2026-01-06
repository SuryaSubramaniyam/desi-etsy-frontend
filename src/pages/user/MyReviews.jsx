import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyReviews = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: async () => {
      const res = await API.get("/reviews/my");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => API.delete(`/reviews/${id}`),
    onSuccess: () => {
      toast.success("Review deleted");
      queryClient.invalidateQueries(["my-reviews"]);
    },
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#7b1e3b] mb-6 text-center">
        My Reviews
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error loading reviews</p>
      ) : data.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          <p className="text-lg">You haven't written any reviews yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {data.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-sm border rounded-lg p-5 hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                {/* Review Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {review.product?.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{review.comment}</p>
                  <p className="text-yellow-500 text-sm">
                    {"⭐".repeat(review.rating)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 self-start md:self-center">
                  <Link
                    to={`/product/${review.product?._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit-review/${review._id}`}
                    className="btn btn-sm btn-outline btn-warning"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
