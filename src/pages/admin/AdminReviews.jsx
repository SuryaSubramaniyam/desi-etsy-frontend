import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../services/api";
import toast from "react-hot-toast";

const AdminReviews = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch all reviews for admin
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const res = await API.get("/admin/reviews");
      return res.data;
    },
  });

  // ✅ Delete review mutation
  const { mutate: deleteReview } = useMutation({
    mutationFn: async (id) => {
      await API.delete(`/admin/reviews/${id}`);
    },
    onSuccess: () => {
      toast.success("Review deleted");
      queryClient.invalidateQueries(["admin-reviews"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to delete review");
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview(id);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📝 All Product Reviews
      </h2>

      {isLoading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-600">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="table w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-left">Comment</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y">
              {reviews.map((rev, idx) => (
                <tr key={rev._id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{rev.user?.name}</p>
                      <p className="text-xs text-gray-500">{rev.user?.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">{rev.product?.title || "—"}</td>
                  <td className="py-3 px-4 text-center text-yellow-500">
                    {Array(rev.rating).fill("⭐").join("")}
                  </td>
                  <td className="py-3 px-4">{rev.comment}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(rev._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
