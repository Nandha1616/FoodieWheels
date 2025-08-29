import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "../navBar/Header";
import Footer from "../footer/Footer";

export function RootLayout({ title }) {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    // Update the page title dynamically
    document.title = title || "Default Title";
  }, [title]);

  return (
    <div className="flex flex-col min-h-screen  z-0">
      {/* Header */}
     <div className="">
     <Header />
     </div>

      {/* Main Content */}
      <div className="relative flex flex-col flex-1 overflow-y-auto z-10">
        <Outlet /> {/* Render dynamic route content here */}
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-red-200">
        <Footer />
      </footer>
    </div>
  );
}

      {/* Sidebar and Header components can be included if needed */}
      {/* <Sidebar /> */}
      {/* <Header /> */}