import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { makeRequest } from "../../services/apiServices";
import { useSelector } from "react-redux";

const useUserData = (userId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userInfo: user, isLoggedIn } = useSelector((state) => state.user);

  // Fetch user data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => makeRequest(`/user/${userId}`, "GET"),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    enabled: !!userId, // Only fetch if `userId` exists
    onError: () => {
      toast.error("Failed to fetch user data.");
    }
  });

  // Update user data
  const updateMutation = useMutation({
    mutationFn: ({ id, updateData }) =>
      makeRequest(`/user/update/${id}`, "PUT", updateData),
    onMutate: async ({ id, updateData }) => {
      await queryClient.cancelQueries(["user", id]);
      // Optimistic update
      const previousData = queryClient.getQueryData(["user", id]);
      queryClient.setQueryData(["user", id], (oldData) =>
        oldData ? { ...oldData, ...updateData } : oldData
      );

      return { previousData };
    },
    onError: (_, __, context) => {
      // Rollback to previous data
      if (context?.previousData) {
        queryClient.setQueryData(["user", userId], context.previousData);
      }
      toast.error("Update failed. Please try again.");
    },
    onSuccess: () => {
      toast.success("User updated successfully.");
      const redirect = isLoggedIn
        ? user?.role === "admin"
          ? "/admin"
          : "/user"
        : "/login";
      navigate(redirect);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["user", userId]); // Ensure fresh data
    }
  });

  // Delete user data
  const deleteMutation = useMutation({
    mutationFn: (id) => makeRequest(`/user/delete/${id}`, "DELETE"),
    onSuccess: () => {
      toast.success("User deleted successfully.");
      queryClient.invalidateQueries(["user"]); // Invalidate all users cache

      if (user?.role === "user" || user?.role === "vendor") {
        localStorage.clear("userInfo");
      }
      navigate("/"); // Redirect after deletion
    },
    onError: () => {
      toast.error("Failed to delete user. Please try again.");
    }
  });

  return {
    userData: data,
    isLoading,
    isError,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate
  };
};

export default useUserData;
