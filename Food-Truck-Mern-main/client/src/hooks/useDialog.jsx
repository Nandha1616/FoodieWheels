import { useCallback, useState } from "react";

function useDialog(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const openDialog = useCallback(() => setIsOpen(true), []);
  const closeDialog = useCallback(() => setIsOpen(false), []);
  const toggleDialog = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, setIsOpen, openDialog, closeDialog, toggleDialog };
}

export default useDialog;
