import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../services/apiServices";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function useProductCrud() {
  const {userInfo, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch products (single product, vendor-specific, or all)
  const useFetchProducts = ({ vendorId = null, productId = null } = {}) => {
    // Determine the appropriate endpoint based on input parameters
    const endpoint = productId
      ? `/product/one/${productId}`
      : vendorId
      ? `/product/vendor/${vendorId}`
      : `/product/all`;
    return useQuery({
      queryKey: ["products", { vendorId, productId }], // Include an object for clarity in query keys
      queryFn: () => makeRequest(endpoint, "GET", null,{}, userInfo?.token ? userInfo.token : "",),
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
      cacheTime: 10 * 60 * 1000, // Keep cached data for 10 minutes
      refetchOnWindowFocus: false, // Prevent refetching on window focus
      select: (data) => {
        console.log(data);
        // Safeguard to ensure valid data
        if (productId) {

          return data || null; // Return single product or null
        }
        return Array.isArray(data?.products) ? data.products : []; // Return an array of products or fallback to an empty array
      },
      enabled: Boolean(productId || vendorId || endpoint === "/product/all") // Ensure query runs only if valid parameters are provided
    });
  };

  // Update product
  const updateProduct = useMutation({
    mutationFn: ({ productId, updateData }) =>
      makeRequest(`/product/update/${productId}`, "PUT", updateData,{}, userInfo?.token ? userInfo.token : "",),
    onMutate: async ({ productId, updateData }) => {
      await queryClient.cancelQueries(["products", productId]);

      // Optimistic update
      const previousData = queryClient.getQueryData(["products", productId]);
      queryClient.setQueryData(["products", productId], (oldData) => ({
        ...oldData,
        ...updateData
      }));

      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["products", context.previousData.productId],
          context.previousData
        );
      }
      toast.error("Failed to update product. Please try again.");
    },
    onSuccess: () => {
      toast.success("Product updated successfully.");
      navigate(
        isLoggedIn ? (user?.role === "admin" ? "/admin" : "/user") : "/login"
      );
    },
    onSettled: (_, __, { productId }) => {
      queryClient.invalidateQueries(["products", productId]);
    }
  });

  return {
    useFetchProducts,
    updateProduct: updateProduct.mutate
  };
}

export default useProductCrud;
