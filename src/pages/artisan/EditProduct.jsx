import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const EditProduct = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Fetch existing product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        const { title, price, description, category } = res.data;
        setForm((prev) => ({
          ...prev,
          title,
          price,
          description,
          category,
        }));
      } catch (err) {
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "artisan") fetchProduct();
    else {
      toast.error("Unauthorized access");
      navigate("/login");
    }
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      await API.put(`/products/${id}`, formData);
      toast.success("Product updated!");
      navigate("/artisan/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-10">
      <h2 className="text-3xl font-bold text-center text-[#7b1e3b] mb-6">
        Edit Your Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Ex: Handcrafted Terracotta Necklace"
            className="input input-bordered w-full"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter price in INR"
            className="input input-bordered w-full"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Describe your product, materials, and craft process"
            className="textarea textarea-bordered w-full"
            rows={4}
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            placeholder="e.g. Jewelry, Pottery, Handloom"
            className="input input-bordered w-full"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Update Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full text-lg tracking-wide"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
