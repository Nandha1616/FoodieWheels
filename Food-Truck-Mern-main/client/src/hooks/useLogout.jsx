import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { logout } from "../app/slices/user/userSlice";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../services/apiServices";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => await makeRequest("/auth/logout", "POST"),
    onSuccess: () => {
      dispatch(logout());
      navigate("/");
    }
  });

  return mutate;
};

export default useLogout;
