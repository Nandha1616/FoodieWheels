import React, { useState, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";
import useDialog from "../../hooks/useDialog";
import Profile from "../dialog/Profile";
import { motion, AnimatePresence } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const NAVIGATION_LINKS = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo, isLoggedIn } = useSelector((state) => state.user);
  const { isOpen, closeDialog, openDialog } = useDialog();
  const logout = useLogout();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinks = useMemo(() => {
    return NAVIGATION_LINKS.map(({ name, href }) => ({
      name,
      href:
        isLoggedIn && name === "Home"
          ? userInfo.user.role === "admin"
            ? "/admin"
            : "/user"
          : href
    }));
  }, [isLoggedIn, userInfo]);

  return (
    <motion.header
      className="header relative z-50 flex flex-wrap lg:flex-nowrap w-full backdrop-blur-lg
 text-sm py-3"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-[85rem] w-full mx-auto px-4 lg:flex lg:items-center lg:justify-between relative">
        {/* Logo and Brand */}
        <div className="flex items-center justify-between">
          <a
            className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80"
            aria-label="Navigate to Home"
            onClick={() => navigate("/")}
          >
            <span className="inline-flex items-center gap-x-2 text-xl font-semibold">
              <img
                className="w-10 h-auto rounded-2xl"
                src="https://static.vecteezy.com/system/resources/thumbnails/010/071/582/small/food-truck-logo-restaurant-delivery-service-food-truck-logo-vector.jpg"
                alt="Logo"
              />
              FoodieWheels
            </span>
          </a>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <motion.div
              key={isMenuOpen ? "close" : "open"}
              initial={{ rotate: 0, scale: 1 }}
              animate={
                isMenuOpen
                  ? { rotate: 180, scale: 1.2 }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <HiX className="block w-6 h-6 text-white" />
              ) : (
                <HiMenuAlt3 className="block w-6 h-6 text-white" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Navigation Links */}
        <AnimatePresence>
          <motion.div
            id="navbar-menu"
            className={`hs-collapse ${
              isMenuOpen ? "block" : "hidden"
            } lg:flex lg:items-center`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col lg:flex-row lg:items-center gap-5 mt-5 lg:mt-0"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {navLinks.map(({ name, href }) => (
                <motion.div
                  key={name}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Link
                    to={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium px-3 py-2 rounded-lg ${
                      location.pathname === href
                        ? "text-white border-b-2 border-red-600 bg-gray-700"
                        : "text-gray-200 hover:text-white dark:text-white dark:hover:text-gray-500"
                    }`}
                  >
                    {name}
                  </Link>
                </motion.div>
              ))}

              {isLoggedIn ? (
                <motion.div
                  className="font-medium px-[3px] py-[2px] rounded-full bg-green-600 text-white hover:bg-green-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                  onClick={openDialog}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <AccountCircleIcon />
                </motion.div>
              ) : (
                <>
                  <motion.button
                    className="font-medium px-4 py-2 rounded-lg text-white shadow-lg hover:shadow-xl border-b-2 border-red-600 bg-gray-700 hover:bg-gray-600"
                    onClick={() => {
                      navigate("/sign-up");
                      setIsMenuOpen(false);
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 0px 15px rgba(220, 38, 38, 0.8)" // Red glow effect
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      duration: 0.5
                    }}
                  >
                    Sign Up
                  </motion.button>

                  <motion.button
                    className="font-medium px-4 py-2 rounded-lg text-white shadow-lg hover:shadow-xl border-b-2 border-red-600 bg-gray-700 hover:bg-gray-600"
                    onClick={() => {
                      navigate("/sign-in");
                      setIsMenuOpen(false);
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 0px 15px rgba(220, 38, 38, 0.8)" // Red glow effect
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      duration: 0.5
                    }}
                  >
                    Sign In
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </nav>
    
     {/* Profile Dialog */}
     <AnimatePresence>
        {isLoggedIn && isOpen && (
          <motion.div
            className=""
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Profile open={isOpen} close={closeDialog} logout={logout} />
          </motion.div>
        )}
      </AnimatePresence>
    
    </motion.header>
  );
};

export default Header;
