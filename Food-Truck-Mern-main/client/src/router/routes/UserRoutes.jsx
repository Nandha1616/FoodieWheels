import Home from "../../pages/user/Home";
import More from "../../pages/user/More";
import ProtectedRoute from "../ProtectedRoute";

function UserRoutes() {
  return [
    {
      index: true,
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      )
    },
    {
      path: ":id",
      element: (
        <ProtectedRoute>
          <More />
        </ProtectedRoute>
      )
    }
  ];
}

export default UserRoutes;
