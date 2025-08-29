import Index from "../../pages/admin/Index";
import Products from "../../pages/admin/Products";
import Users from "../../pages/admin/Users";
import Vendors from "../../pages/admin/Vendors";
import ProductSignUp from "../../pages/auth/sign-up/ProductSignUp";

function AdminRoutes() {
  return [
    {
      index: true,
      element: <Index />
    },
    {
      path: "users",
      element: <Users />
    },
    {
      path: "vendors",
      element: <Vendors />
    }
    ,
    {
      path: "products",
      element: <Products />
    }
    ,
    {
      path: "products/sign-up",
      element: <ProductSignUp />
    }
  ];
}

export default AdminRoutes;
