import React, { useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../services/apiServices";
import { toast } from "react-hot-toast";
import { Card, Typography } from "@material-tailwind/react";
import useDialog from "../../hooks/useDialog";
import Delete from "../../components/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import CreateIcon from "@mui/icons-material/Create";
import { useSelector } from "react-redux";

export default function Users() {
  const navigate = useNavigate();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { userInfo } = useSelector((state) => state.user);
  const {
    data: users = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      makeRequest(
        "/admin/all/users",
        "GET",
        null,
        {},
        userInfo?.token ? userInfo.token : ""
      ),
    onSuccess: () => toast.success("Users fetched successfully."),
    onError: (error) => toast.error(error.message || "Error fetching users."),
    select: (data) => data.users.filter((user) => user.role.includes("user"))
  });

  const handleNavigate = useCallback(
    (id) => navigate(`/user/update/${id}`),
    [navigate]
  );

  const TABLE_HEAD = useMemo(() => ["Name", "Phone", "Email", "Action"], []);

  const renderedTableRows = useMemo(() => {
    if (!users.length) {
      return (
        <tr>
          <td colSpan={4} className="text-center p-4">
            No users available.
          </td>
        </tr>
      );
    }

    return users.map(({ name, email, phone, _id }) => (
      <tr key={_id}>
        <td className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {name}
          </Typography>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {phone}
          </Typography>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {email}
          </Typography>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex gap-2">
            <button
              className="text-green-800 border border-green-800 p-2 rounded hover:bg-green-800 hover:text-white transition duration-200"
              onClick={() => navigate(`/user/update/${_id}`)}
            >
              <CreateIcon />
            </button>
            <button
              className="text-rose-500 border border-rose-500 p-2 rounded hover:bg-rose-500 hover:text-white transition duration-200"
              onClick={openDialog}
            >
              <RestoreFromTrashIcon />
            </button>
            {isOpen && (
              <Delete userId={_id} event={closeDialog} open={isOpen}>
                <p>Are you sure you want to delete this user?</p>
              </Delete>
            )}
          </div>
        </td>
      </tr>
    ));
  }, [users, handleNavigate, openDialog, isOpen, closeDialog]);

  return (
    <div className="p-4">
      {isLoading && <div className="text-center mt-10">Loading...</div>}
      {isError && (
        <div className="text-center mt-10">Failed to load users.</div>
      )}
      {!isLoading && !isError && (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-200"
              onClick={() => navigate("/sign-up")}
            >
              Add User <span className="text-xl">+</span>
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
        </>
      )}
    </div>
  );
}
