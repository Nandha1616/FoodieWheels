import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { makeRequest } from "../../services/apiServices";
import { useSelector } from "react-redux";

const QUERY_KEYS = {
  USERS: "users",
  USER: (id) => ["user", id],
};

const useUserCrud = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    userInfo ,
    isLoggedIn,
  } = useSelector((state) => state.user);
console.log(userInfo)
  // Navigate based on user role
  const redirectUser = () => {
    if (!isLoggedIn) return navigate("/login");
    const path = userInfo.user?.role === "admin" ? "/admin" : "/user";
    navigate(path);
  };

  // Fetch user data
  const useFetchUsers = ({ userId } = {}) => {
    
    return useQuery({
      queryKey: userId ? QUERY_KEYS.USER(userId) : [QUERY_KEYS.USERS],
      queryFn: () => makeRequest(userId ? `/user/${userId}` : `/admin/all/users`, "GET", null,{}, userInfo?.token ? userInfo.token : ""),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      enabled: userId !== undefined, // Ensure fetching only when needed
      refetchOnWindowFocus: false,
      select: (data) => (userId ? data : data || []),
    });
  };

  // Update user mutation
  const updateUser = useMutation({
    mutationFn: ({ id, updateData }) => makeRequest(`/user/update/${id}`, "PUT", updateData,{}, userInfo?.token ? userInfo.token : "",),
    onMutate: async ({ id, updateData }) => {
      await queryClient.cancelQueries(QUERY_KEYS.USER(id));

      // Optimistic update
      const previousData = queryClient.getQueryData(QUERY_KEYS.USER(id));
      queryClient.setQueryData(QUERY_KEYS.USER(id), (oldData) => ({
        ...oldData,
        ...updateData,
      }));

      return { previousData };
    },
    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(QUERY_KEYS.USER(context.previousData.id), context.previousData);
      }
      toast.error(error.message || "Update failed. Please try again.");
    },
    onSuccess: () => {
      toast.success("User updated successfully.");
      redirectUser();
    },
    onSettled: ({ id }) => {
      queryClient.invalidateQueries(QUERY_KEYS.USER(id));
    },
  });

  // Delete user mutation
  const deleteUser = useMutation({
    mutationFn: (id) => makeRequest(`/user/delete/${id}`, "DELETE", null,{},  userInfo?.token ? userInfo.token : "",),
    onSuccess: () => {
      toast.success("User deleted successfully.");
      queryClient.invalidateQueries([QUERY_KEYS.USERS]);

      if (userInfo.user?.role === "user" || userInfo.user?.role === "vendor") {
        localStorage.removeItem("userInfo");
      }
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete user. Please try again.");
    },
  });

  return {
    useFetchUsers,
    updateUser: updateUser.mutate,
    deleteUser: deleteUser.mutate,
  };
};

export default useUserCrud;
