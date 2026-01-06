import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const EditReview = () => {
  const { id } = useParams(); // review id
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await API.get(`/reviews/${id}`);
        setRating(res.data.rating);
        setComment(res.data.comment);
      } catch (err) {
        toast.error("Failed to load review.");
      }
    };
    fetchReview();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/reviews/${id}`, { rating, comment });
      toast.success("Review updated!");
      navigate("/user/dashboard/reviews");
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-center text-[#7b1e3b] mb-6">
        ✏️ Edit Your Review
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Rating (1-5):
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Comment:
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered w-full h-28"
            placeholder="Write your thoughts about the product..."
            required
          />
        </div>

        <button
          type="submit"
          className="btn bg-[#7b1e3b] text-white hover:bg-[#5e182e] w-full"
        >
          Update Review
        </button>
      </form>
    </div>
  );
};

export default EditReview;
