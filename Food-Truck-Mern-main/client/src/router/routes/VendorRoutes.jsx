import ProductSignUp from "../../pages/auth/sign-up/ProductSignUp";
import Index from "../../pages/vendor/Index";

function VendorRoutes() {
  return [
    {
      index: true,
      element: <Index />
    },
    {
      path: "products/sign-up",
      element: <ProductSignUp />
    }
  ];
}

export default VendorRoutes;
