import React, { useEffect, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../services/apiServices";
import { useSelector } from "react-redux";
import ProductCard from "../../components/cards/ProductCard";
import { toast } from "react-hot-toast";
import useProductCrud from "../../hooks/products/useProductCrud";
import { motion } from "framer-motion"; // Import Framer Motion

function Home() {
  const { useFetchProducts } = useProductCrud();
  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo?.user?.id;
  const queryClient = useQueryClient();

  // Fetch products
  const {
    data: products = [],
    isLoading,
    isError,
    error
  } = useFetchProducts({});

  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: (id) =>
      makeRequest(
        `/product/like/${id}`,
        "PUT",
        { userId },

        {},
        userInfo?.token ? userInfo.token : ""
      ),
    onMutate: async (id) => {
      await queryClient.cancelQueries(["products"]);

      // Optimistic update
      const previousProducts = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(["products"], (old) =>
        Array.isArray(old)
          ? old.map((product) =>
              product._id === id
                ? {
                    ...product,
                    usersLiked: product.usersLiked.includes(userId)
                      ? product.usersLiked.filter((user) => user !== userId)
                      : [...product.usersLiked, userId],
                    likes: product.usersLiked.includes(userId)
                      ? product.likes - 1
                      : product.likes + 1
                  }
                : product
            )
          : old
      );
      return { previousProducts };
    },
    onError: (_, __, context) => {
      toast.error("Failed to like the product.");
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    }
  });

  // Handle like button click
  const handleLike = (id) => {
    likeMutation.mutate(id, {
      onSuccess: () => toast.success("Product liked successfully.")
    });
  };

  // Rendered product cards
  const renderedItems = useMemo(
    () =>
      safeProducts.map((product) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 50 }} // Initial state for the animation
          animate={{ opacity: 1, y: 0 }} // Animation state when visible
          exit={{ opacity: 0, y: -50 }} // Exit animation when removed
          transition={{ duration: 0.5 }} // Duration of the animation
        >
          <ProductCard product={product} userId={userId} onLike={handleLike} />
        </motion.div>
      )),
    [safeProducts, userId]
  );

  // Loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8 overflow-hidden relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {renderedItems}
      </div>
    </div>
  );
}

export default Home;
