import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../services/apiServices";
import { useSelector } from "react-redux";

function More() {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  // Fetch product details using React Query
  const {
    data: product,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      makeRequest(
        `/product/one/${id}`,
        "GET",
        null,
        {},
        userInfo?.token ? userInfo.token : ""
      ), // Ensure makeRequest is passed as a function
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    select: (data) => data?.data // Safely select the `data` field
  });

  // Memoize the rendered item for performance
  const renderedItem = useMemo(() => {
    if (!product) return <p>No product details available.</p>; // Handle empty product case

    return (
      <div className="p-6 flex flex-col lg:flex-row gap-6" key={product._id}>
        {/* Menu Image */}
        <div className="lg:w-1/2">
          <img
            src={product.menuImage}
            alt="Menu"
            className="w-full max-h-dvh  object-center rounded-lg md:min-h-[700px]"
          />
        </div>

        {/* Shop Image and Details */}
        <div className="lg:w-1/2 flex flex-col">
          <img
            src={product.shopImage}
            alt="Shop"
            className="w-full object-cover max-h-lvh rounded-lg mb-4"
          />
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              {product.shopName}
            </h2>
            <div className="mt-2 text-gray-600 space-y-2 text-justify sm:text-start">
              <p>
                <span className="font-semibold">Shop Address:</span>
                <span>{product.address.location},</span>
                <span>{product.address.city},</span>
                <span>{product.address.state},</span>
                <span>{product.address.zip}.</span>
              </p>
              <p>
                <span className="font-semibold">Contact Us:</span>{" "}
                {product.phone}
              </p>
              <p>
                <span className="font-semibold">Start Time:</span>{" "}
                {product.startTime}
              </p>
              <p>
                <span className="font-semibold">Ending Time:</span>{" "}
                {product.endTime}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }, [product]);

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p>Error: {error?.message || "Failed to load product details."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="shadow-lg rounded-lg overflow-hidden max-w-4xl w-full mx-4 lg:mx-auto hover:shadow-2xl transition-shadow duration-300">
        {/* Product Details Card */}
        {renderedItem}
      </div>
    </div>
  );
}

export default More;
