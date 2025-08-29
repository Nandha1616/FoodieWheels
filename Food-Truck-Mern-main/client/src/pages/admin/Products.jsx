import React, { useMemo } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import useDialog from "../../hooks/useDialog";
import useProductCrud from "../../hooks/products/useProductCrud";
import ProductTableCard from "../../components/cards/ProductTableCard";

const TABLE_HEAD = [
  "ShopImage",
  "MenuImage",
  "ProductName",
  "Phone",
  "Address",
  "Description",
  "Price",
  "StartTime",
  "EndTime",
  "Action",
];

export default function Products() {
  const navigate = useNavigate();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { useFetchProducts } = useProductCrud();
  const { data: products = [], isLoading, isError } = useFetchProducts({});

  const renderedTableRows = useMemo(() => {
    if (!products.length) {
      return (
        <tr>
          <td colSpan={10} className="text-center p-4">
            No products available.
          </td>
        </tr>
      );
    }
    return products.map((product) => (
      <ProductTableCard
        key={product._id}
        id={product._id}
        shopImage={product.shopImage}
        menuImage={product.menuImage}
        shopName={product.shopName}
        phone={product.phone}
        address={product.address}
        description={product.description}
        price={product.price}
        startTime={product.startTime}
        endTime={product.endTime}
        openDialog={openDialog}
        isOpen={isOpen}
        closeDialog={closeDialog}
      />
    ));
  }, [products, isOpen, openDialog, closeDialog]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError) return <div className="text-center mt-10">Failed to load products.</div>;

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-200"
          onClick={() => navigate("/vendor/products/sign-up")}
        >
          Add Product <span className="text-xl">+</span>
        </button>
      </div>
      <Card className="overflow-auto border-2 rounded-lg">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderedTableRows}</tbody>
        </table>
      </Card>
    </div>
  );
}
