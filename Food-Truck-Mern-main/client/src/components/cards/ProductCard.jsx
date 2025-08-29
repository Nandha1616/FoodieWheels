import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  IconButton,
  Tooltip,
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography
} from "@material-tailwind/react";
import { motion } from "framer-motion";  // Import Framer Motion

function ProductCard({ product, userId, onLike }) {
  return (
    <>
      <motion.div
        key={product._id}
        initial={{ opacity: 0, y: 50 }}  // Fade-in with a slight upward motion
        animate={{ opacity: 1, y: 0 }}   // Animate to final position
        exit={{ opacity: 0, y: -50 }}    // Fade-out with upward motion
        transition={{ duration: 0.5 }}   // Set the duration of the entry and exit animations
      >
        <Card
          className="w-full max-w-sm mx-auto rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <CardHeader floated={false} className="relative">
            <motion.div
              className="group relative overflow-hidden rounded-t-lg"
              whileHover={{ scale: 1.05 }}  // Slight scaling on hover for the image
              transition={{ duration: 0.3 }} // Smooth transition duration
            >
              <img
                src={product.shopImage}
                alt={product.shopName}
                className="h-80 md:h-64 sm:h-80 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                whileHover={{ opacity: 1 }}  // Fade in the gradient overlay on hover
              />
            </motion.div>
          </CardHeader>

          <CardBody className="p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }} // Delayed fade-in for the text content
            >
              <Typography
                variant="h5"
                className="mb-2 font-bold text-gray-800 text-center"
              >
                {product.shopName}
              </Typography>
              <Typography color="gray" className="text-sm mb-4 text-justify">
                {product.description}
              </Typography>
            </motion.div>

            <div className="border-t border-gray-300 my-4" />

            <div className="flex items-center justify-between">
              <Tooltip content={`$${product.price}`}>
                <motion.span
                  className="cursor-pointer border border-gray-300 bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:bg-gray-200 transition"
                  whileHover={{ scale: 1.2 }}  // Scale up the profile image slightly on hover
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={product.shopImage}
                    alt={product.shopName}
                    className="rounded-full"
                    style={{ width: "40px", height: "40px" }}
                  />
                </motion.span>
              </Tooltip>

              <motion.div
                className="icon-liked relative"
                onClick={() => onLike(product._id)}
                whileHover={{ scale: 1.1 }}  // Scale up the like button on hover
                transition={{ duration: 0.2 }}
              >
                <IconButton
                  size="sm"
                  color={product?.usersLiked?.includes(userId) ? "red" : "white"}
                  variant="text"
                  className="rounded-full bg-slate-400 p-2 hover:bg-slate-500"
                  aria-label="Like this product"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`h-6 w-6 ${
                      product?.usersLiked?.includes(userId)
                        ? "text-red-500"
                        : "text-white"
                    }`}
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </IconButton>
                <div className="like-count absolute top-8 left-1/2 transform -translate-x-1/2 text-slate-800 text-xs">
                  <span>{product?.likes}</span>
                </div>
              </motion.div>

              <Tooltip content="View Details">
                <Link to={`/user/${product._id}`} className="inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}  // Slight scaling on hover for the button
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="gradient"
                      color="indigo"
                      size="sm"
                      className="flex items-center text-slate-500 gap-2 px-6 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition"
                    >
                      More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Button>
                  </motion.div>
                </Link>
              </Tooltip>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.any.isRequired,
  userId: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired
};

export default ProductCard;
