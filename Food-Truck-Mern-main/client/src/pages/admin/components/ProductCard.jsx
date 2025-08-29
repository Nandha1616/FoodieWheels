import React from "react";

function ProductCard({}) {
  return (
    <td className="p-4 border-b border-blue-gray-50">
      <Typography variant="small" color="blue-gray" className="font-normal">
        {product.endtime}
      </Typography>
    </td>
  );
}

export default ProductCard;
