import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../services/api";
import toast from "react-hot-toast";

const PendingArtisans = () => {
  const queryClient = useQueryClient();

  const { data: artisans = [], isLoading } = useQuery({
    queryKey: ["allArtisans"],
    queryFn: async () => {
      const res = await API.get("/admin/artisans");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      await API.patch(`/admin/artisans/${id}/approve`);
    },
    onSuccess: () => {
      toast.success("Artisan approved");
      queryClient.invalidateQueries(["allArtisans"]);
    },
    onError: () => {
      toast.error("Approval failed");
    },
  });

  if (isLoading) return <p className="p-4">Loading artisans...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        🧵 Pending Artisan Approvals
      </h2>

      {artisans.length === 0 ? (
        <p className="text-gray-600">No artisan accounts found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 font-medium">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {artisans.map((artisan) => (
                <tr key={artisan._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{artisan.user?.name}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {artisan.user?.email}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        artisan.isApproved
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {artisan.isApproved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {!artisan.isApproved ? (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => approveMutation.mutate(artisan._id)}
                      >
                        ✅ Approve
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Approved
                      </span>
                    )}
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

export default PendingArtisans;
