import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const res = await API.get("/products/me");
        setProducts(res.data);
      } catch (err) {
        toast.error("Failed to fetch your products");
      }
    };
    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-[#7b1e3b] mb-8 text-center tracking-tight">
        🧵 My Handmade Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300"
            >
              <img
                src={
                  product.images?.[0]
                    ? `http://localhost:8888${product.images[0]}`
                    : "https://via.placeholder.com/300"
                }
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  ₹{product.price} • <span>{product.category}</span>
                </p>

                <div className="flex items-center gap-2">
                  <span
                    className={`badge px-3 py-1 rounded-full text-xs font-semibold ${
                      product.isApproved
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {product.isApproved ? "Approved" : "Pending Approval"}
                  </span>
                </div>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/artisan/dashboard/edit/${product._id}`}
                    className="btn btn-sm btn-outline"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    🗑️ Delete
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

export default MyProducts;
