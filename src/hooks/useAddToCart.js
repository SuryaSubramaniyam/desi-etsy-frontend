import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../services/api";
import toast from "react-hot-toast";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const res = await API.post("/cart", { productId, quantity });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Added to cart!");
      queryClient.invalidateQueries(["cart"]); // optional
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    },
  });
};
