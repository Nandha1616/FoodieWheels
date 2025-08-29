import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback } from "react";
import useDeleteMutation from "../hooks/delete/useDeleteMutation";

export default function Delete({
  userId,
  children,
  event,
  open,
  entity = "product",
  queryKey = "products"
}) {
  // Initialize delete mutation
  const deleteMutation = useDeleteMutation(userId, entity, queryKey);

  // Memoized delete handler
  const handleDelete = useCallback(() => {
    deleteMutation.mutate();
    event();
  }, [deleteMutation]);

  // Early return if dialog is not open
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-400 bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 animate-scaleIn">
        {/* Icon */}
        <div className="flex justify-center mb-4 text-red-600 animate-pulseSlow">
          <DeleteIcon className="text-4xl" />
        </div>

        {/* Message */}
        <div className="text-center text-gray-700 mb-6">{children}</div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={event}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Close
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
