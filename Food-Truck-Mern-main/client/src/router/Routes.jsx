import { RootLayout } from "../components/layout/RootLayout";
import UserRootLayout from "../components/layout/UserRootLayout";
import VendorRootLayout from "../components/layout/VendorRootLayout";
import AdminRootLayout from "../components/layout/AdminRootLayout";
import Index from "../pages/Index";
import UserRoutes from "./routes/UserRoutes";
import VendorRoutes from "./routes/VendorRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import SignUp from "../pages/auth/sign-up/SignUp";
import SignIn from "../pages/auth/sign-in/SignIn";
import AboutUs from "../pages/About";
import ContactUs from "../pages/Contact";
import NotFound from "../pages/NotFound"; // Import a 404 page
import Home from "../pages/user/Home";
import { useSelector } from "react-redux";
import AdminIndex from "../pages/admin/Index";
import ProductSignUp from "../pages/auth/sign-up/ProductSignUp";
import UpdateSignUp from "../pages/update/UpdateSignUp";
import ProtectedRoute from "./ProtectedRoute";
import UpdateProductSignUp from "../pages/update/UpdateProductSignUp";
function Routes() {
  const {
    isLoggedIn,
    userInfo
  } = useSelector((state) => state.user);

  return [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true, // Only define the index route here
          element: isLoggedIn ? (
            userInfo.user.role === "user" ? (
              <Home />
            ) : userInfo.user.role === "admin" ? (
              <AdminRootLayout />
            ) : null
          ) : (
            <Index />
          )
        },
        {
          path: "user",
          element: <UserRootLayout />,
          children: UserRoutes()
        },
        {
          path: "vendor",
          element: <VendorRootLayout />,
          children: VendorRoutes()
        },

        {
          path: "sign-up",
          element: <SignUp />
        },
        {
          path: "products/sign-up",
          element: <ProductSignUp />
        },
        {
          path: "sign-in",
          element: <SignIn />
        },
        {
          path: "user/update/:id",
          element: (
            <ProtectedRoute>
              <UpdateSignUp />
            </ProtectedRoute>
          )
        },
        {
          path: "product/update/:id",
          element: (
            <ProtectedRoute>
              <UpdateProductSignUp />
            </ProtectedRoute>
          )
        },
        {
          path: "about",
          element: <AboutUs />
        },
        {
          path: "contact",
          element: <ContactUs />
        },

        {
          path: "*", // Catch-all route for 404
          element: <NotFound />
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminRootLayout />,
      children: AdminRoutes()
    }
  ];
}

export default Routes;
