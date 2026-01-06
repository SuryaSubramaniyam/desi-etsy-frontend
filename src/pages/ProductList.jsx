// src/pages/ProductList.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../services/api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const limit = 8;

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await API.get("/categories/public");
      return res.data;
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page, category, search],
    queryFn: () =>
      API.get(
        `/products?page=${page}&limit=${limit}&category=${category}&search=${search}`
      ).then((res) => res.data),
    keepPreviousData: true,
  });

  const addToCartMutation = useMutation({
    mutationFn: (productId) => API.post("/cart", { productId, quantity: 1 }),
    onSuccess: () => {
      toast.success("Added to cart");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: () => {
      toast.error("Failed to add to cart");
    },
  });

  const handleAddToCart = (productId) => {
    if (!user) return navigate("/login");
    addToCartMutation.mutate(productId);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (newCategory) newParams.set("category", newCategory);
    else newParams.delete("category");
    setSearchParams(newParams);
    setPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchKeyword.trim()) newParams.set("search", searchKeyword.trim());
    else newParams.delete("search");
    setSearchParams(newParams);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setSearchKeyword("");
    setPage(1);
  };

  if (isLoading) return <div className="p-6">Loading products...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;

  const { products, pages } = data;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Explore Handmade Products
        </h1>

        {/* 🔍 Search + Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <form onSubmit={handleSearchSubmit} className="col-span-2 flex gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="input input-bordered w-full"
            />
            <button
              type="submit"
              className="btn bg-[#800000] text-white hover:bg-[#9a0000]"
            >
              Search
            </button>
          </form>

          <div>
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(search || category) && (
          <button
            onClick={handleClearFilters}
            className="btn btn-sm btn-outline mb-6"
          >
            ✖ Clear Filters
          </button>
        )}

        {/* 🛍️ Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-sm border flex flex-col"
              style={{ borderRadius: "0px" }} // no border radius
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={
                    product.images?.[0]
                      ? `http://localhost:8888${product.images[0]}`
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <div className="p-4 flex flex-col flex-grow">
                <Link to={`/products/${product._id}`}>
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </Link>

                <div className="flex justify-between items-center mt-auto pt-4">
                  <span className="text-gray-800 font-semibold text-base">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="btn btn-sm bg-[#800000] text-white hover:bg-[#9a0000] border-none px-4"
                  >
                    {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ⏮️ Pagination Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            ⬅ Prev
          </button>
          <span className="btn btn-sm btn-disabled">
            Page {page} of {pages}
          </span>
          <button
            className="btn btn-sm"
            disabled={page === pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next ➡
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductList;
