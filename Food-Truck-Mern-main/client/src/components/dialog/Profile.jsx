import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../buttons/Button";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import CreateIcon from "@mui/icons-material/Create";
import useUserCrud from "../../hooks/update/useUserCrud";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Page Transition Variants
const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.5 } }
};

// Profile Fade-in Animation
const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

// Scroll Fade-in Animation
const scrollVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Profile Component
function Profile({ open = false, close = () => {}, logout = () => {} }) {
  if (!open) return null;

  const { userInfo, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { useFetchUsers } = useUserCrud();
  const { data: userData = {} } = useFetchUsers({ userId: userInfo?.user?.id || null });

  const name = userData?.name || "Default Name";
  const email = userData?.email || "default@example.com";
  const phone = userData?.phone || "000-000-0000";

  const handleDelete = () => {
    if (userData?._id) {
      deleteUser(userData._id);
    }
  };

  return (
    <motion.div
      className="z-60 fixed right-1 top-14 sm:right-8 md:right-16 lg:right-2 xl:right-2 min-h-56"
      initial="hidden"
      animate="visible"
      variants={modalVariants}
    >
      <div className="user-profile-container">
        <div className="users-profile grid grid-cols-1 gap-4 p-4">
          <div className="user-profile bg-white shadow-md rounded-lg p-4 relative min-w-60 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            {/* Profile Name */}
            <motion.div
              className="user-profile-name flex items-center justify-center rounded-full h-16 w-16 mx-auto mb-4 bg-green-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="user-first-letter text-white text-xl font-bold">
                {name[0]}
              </div>
            </motion.div>

            {/* Profile Details */}
            <motion.ul
              className="user-profile-details text-center space-y-1"
              initial="hidden"
              animate="visible"
              variants={scrollVariants}
            >
              <li className="font-medium text-lg">{name}</li>
              <li className="text-sm text-gray-600">{email}</li>
              <li className="text-sm text-gray-600">{phone}</li>
            </motion.ul>

            {/* Action Buttons */}
            <div className="btns flex justify-between mt-4">
              <Button
                className="text-green-800 border border-green-800 p-2 rounded hover:bg-green-800 hover:text-white transition duration-200"
                onClick={() => navigate(`/user/update/${userData?._id}`)}
                icon={<CreateIcon className="inline-block mr-1" />}
                aria-label="Edit User"
              />
              <Button
                className="text-rose-500 border border-rose-500 p-2 rounded hover:bg-rose-500 hover:text-white transition duration-200"
                onClick={handleDelete}
                icon={<RestoreFromTrashIcon className="inline-block mr-1" />}
                aria-label="Delete User"
              />
            </div>

            {/* Close Button */}
            <Button
              className="absolute top-2 right-2 text-gray-700 p-2 rounded-md hover:bg-gray-400 transition"
              onClick={close}
              icon={<CloseIcon className="inline-block" />}
              aria-label="Close Profile"
            />

            {/* Logout Button */}
            <div className="logout mt-6 text-center">
              <motion.button
                className="font-medium px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
                onClick={logout}
                aria-label="Logout"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

Profile.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

Profile.defaultProps = {
  open: false,
  close: () => {},
  logout: () => {}
};

export default Profile;
