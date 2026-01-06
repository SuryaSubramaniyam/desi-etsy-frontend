import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";

const CategoryManager = () => {
  const queryClient = useQueryClient();
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Get categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await API.get("/categories");
      return res.data;
    },
  });

  // Add category
  const addMutation = useMutation({
    mutationFn: async () => {
      await API.post("/categories", { name: newCategory });
    },
    onSuccess: () => {
      toast.success("Category added");
      setNewCategory("");
      queryClient.invalidateQueries(["categories"]);
    },
  });

  // Update category
  const updateMutation = useMutation({
    mutationFn: async () => {
      await API.patch(`/categories/${editingId}`, { name: editName });
    },
    onSuccess: () => {
      toast.success("Category updated");
      setEditingId(null);
      setEditName("");
      queryClient.invalidateQueries(["categories"]);
    },
  });

  // Delete category
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await API.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries(["categories"]);
    },
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        🗂️ Manage Product Categories
      </h2>

      {/* Add Category Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newCategory) addMutation.mutate();
        }}
        className="flex gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="New category name"
          className="input input-bordered w-full"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="btn btn-primary">Add</button>
      </form>

      {/* Category List */}
      {isLoading ? (
        <p className="text-gray-500">Loading categories...</p>
      ) : (
        <ul className="divide-y border rounded bg-white shadow-sm">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
            >
              {/* Edit Mode */}
              {editingId === cat._id ? (
                <>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="input input-sm input-bordered w-full mr-3"
                  />
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => updateMutation.mutate()}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="font-medium text-gray-800">{cat.name}</span>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => {
                        setEditingId(cat._id);
                        setEditName(cat.name);
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this category?"
                          )
                        ) {
                          deleteMutation.mutate(cat._id);
                        }
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryManager;
