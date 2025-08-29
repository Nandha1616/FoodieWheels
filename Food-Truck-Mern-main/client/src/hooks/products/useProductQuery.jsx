import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { makeRequest } from '../../services/apiServices';

function useProductQuery(path) {
  return  useQuery({
    queryKey: ["products"],
    queryFn: () => makeRequest("/product/all", "GET", null, {
      headers: {
        Authorization: userInfo?.user?.token ? `Bearer ${userInfo.user.token}` : "",
      },
    }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    select: (data) => data.data
  });
}

export default useProductQuery