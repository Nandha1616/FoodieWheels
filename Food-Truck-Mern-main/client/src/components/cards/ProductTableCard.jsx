import React from "react";
import PropsTypes from "prop-types";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import Delete from "../Delete";
export default function ProductTableCard({
  id,
  shopImage,
  menuImage,
  shopName,
  phone,
  address,
  description,
  price,
  startTime,
  endTime,
  openDialog,
  isOpen,
  closeDialog
}) {
  const navigate = useNavigate();

  return (
    <>
      <tr key={id}>
        <td className="p-4 border-b border-blue-gray-50">
          <img
            src={shopImage}
            alt="Shop"
            className="w-[100px] h-[100px] rounded"
            loading="lazy"
          />
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <img
            src={menuImage}
            alt="Menu"
            className="w-[100px] h-[100px] rounded"
            loading="lazy"
          />
        </td>
        <td className="p-4 border-b border-blue-gray-50">{shopName}</td>
        <td className="p-4 border-b border-blue-gray-50">{phone}</td>
        <td className="p-4 border-b border-blue-gray-50 break-all max-w-64 ">
          <span>{address.location},</span>
          <span>{address.city}</span>
          <span>{address.state}</span>
          {address.zip}
          <span></span>
        </td>
        <td className="p-4 border-b border-blue-gray-50 max-w-64 ">
          {description}
        </td>
        <td className="p-4 border-b border-blue-gray-50">{price}</td>
        <td className="p-4 border-b border-blue-gray-50">{startTime}</td>
        <td className="p-4 border-b border-blue-gray-50">{endTime}</td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex gap-2">
            <button
              className="text-green-800 border border-green-800 p-2 rounded hover:bg-green-800 hover:text-white transition duration-200"
              onClick={() => navigate(`/product/update/${id}`)}
            >
              <CreateIcon />
            </button>
            <button
              className="text-rose-500 border border-rose-500 p-2 rounded hover:bg-rose-500 hover:text-white transition duration-200"
              onClick={openDialog}
            >
              <RestoreFromTrashIcon />
            </button>
          </div>
        </td>
      </tr>

      {isOpen && (
        <Delete userId={id} event={closeDialog} open={isOpen}>
          <p>Are you sure you want to delete this user?</p>
        </Delete>
      )}
    </>
  );
}

ProductTableCard.propTypes = {
  id: PropsTypes.string.isRequired,
  shopImage: PropsTypes.string.isRequired,
  menuImage: PropsTypes.string.isRequired,
  shopName: PropsTypes.string.isRequired,
  phone: PropsTypes.number.isRequired,
  address: PropsTypes.object,
  description: PropsTypes.string.isRequired,
  price: PropsTypes.number.isRequired,
  startTime: PropsTypes.string.isRequired,
  endTime: PropsTypes.string.isRequired,
  event: PropsTypes.func
};
