import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../services/api";
import toast from "react-hot-toast";

const UsersTable = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await API.get("/admin/users");
      return res.data;
    },
  });

  const blockMutation = useMutation({
    mutationFn: async (id) => {
      await API.patch(`/admin/users/${id}/block`);
    },
    onSuccess: () => {
      toast.success("User status updated");
      queryClient.invalidateQueries(["allUsers"]);
    },
    onError: () => {
      toast.error("Failed to update user status");
    },
  });

  if (isLoading) return <p className="p-4">Loading users...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        👥 All Registered Users
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 font-medium text-gray-900">
                  {u.name}
                </td>
                <td className="py-3 px-4 text-gray-600">{u.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`badge ${
                      u.role === "admin"
                        ? "badge-secondary"
                        : u.role === "artisan"
                        ? "badge-accent"
                        : "badge-info"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.isBlocked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {u.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    className={`btn btn-sm ${
                      u.isBlocked ? "btn-success" : "btn-error"
                    }`}
                    onClick={() => blockMutation.mutate(u._id)}
                  >
                    {u.isBlocked ? "Unblock" : "Block"}
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

export default UsersTable;
