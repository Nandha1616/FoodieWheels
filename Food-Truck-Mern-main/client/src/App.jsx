import React, { Suspense, lazy } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import "./css/style.css";
import "./charts/ChartjsConfig";
import Routes from "./router/Routes";
import 'antd/dist/reset.css'; // Import Ant Design styles
import { Toaster } from "react-hot-toast";

// Lazy load pages
//admin routes
// const Dashboard = lazy(() => import("./pages/admin/Index"));
// const Home = lazy(() => import("./pages/Home"));
// const Message = lazy(() => import("./pages/Message"));

//auth routes
// const SignIn = lazy(() => import("./pages/auth/sign-in/SignIn"));
// const SignUp = lazy(() => import("./pages/auth/sign-up/SignUp"));
// const NotFound = lazy(() => import("./pages/NotFound"));
// other routes
// const Index = lazy(() => import("./pages/Index"));
// Layouts
// import { RootLayout } from "./components/layout/RootLayout";
// import AuthLayout from "./components/layout/AuthLayout";
// import UserHome from "./pages/UserHome";
// import { Userdata } from "./services/apiServices";
// import AdminRootLayout from "./components/layout/AdminRootLayout";
// import Index from "./pages/Index";

function App() {
  // Define routes using createBrowserRouter
  const router = createBrowserRouter(Routes());
  // createRoutesFromElements(
  //   <>
  //     {/* Main Application Routes */}
  //     <Route path="/" element={<RootLayout />}>
  //       <Route index element={<Index />} />
  //       <Route path="admin" element={<AdminRootLayout />}>
  //         <Route index element={<Dashboard />} />
  //         {/* <Route path="messages" element={<Message />} /> */}
  //         {/* <Route path="e-commerce/customers" element={<Home />} /> */}
  //       </Route>

  //       {/* <Route path="user" loader={Userdata} element={<UserHome />} /> */}

  //       <Route path="sign-in" element={<SignIn />} />
  //       <Route path="sign-up" element={<SignUp />} />
  //     </Route>

  //     <Route path="*" element={<NotFound />} />
  //   </>
  // )
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />

      <Toaster position="top-right"/>
    </Suspense>
  );
}

export default App;
