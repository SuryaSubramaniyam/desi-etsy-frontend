import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../services/api";
import toast from "react-hot-toast";

const AdminProductsTable = () => {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: async () => {
      const res = await API.get("/admin/products");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      await API.patch(`/admin/products/${id}/approve`);
    },
    onSuccess: () => {
      toast.success("Product approved");
      queryClient.invalidateQueries(["adminProducts"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await API.delete(`/admin/products/${id}`);
    },
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries(["adminProducts"]);
    },
  });

  if (isLoading) return <p className="p-4">Loading products...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🛍️ All Products</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full table-auto text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-3">
                  <img
                    src={
                      product.images?.[0]
                        ? `http://localhost:8888${product.images[0]}`
                        : "https://via.placeholder.com/100"
                    }
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded border"
                  />
                </td>
                <td className="px-4 py-3 font-medium">
                  {product.title || "Untitled"}
                </td>
                <td className="px-4 py-3 font-semibold text-green-600">
                  ₹{product.price}
                </td>
                <td className="px-4 py-3">
                  {product.category || "Uncategorized"}
                </td>
                <td className="px-4 py-3">
                  {new Date(product.createdAt).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3">
                  {product.isApproved ? (
                    <span className="badge badge-success">Approved</span>
                  ) : (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  {!product.isApproved && (
                    <button
                      onClick={() => approveMutation.mutate(product._id)}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this product?")
                      ) {
                        deleteMutation.mutate(product._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsTable;
