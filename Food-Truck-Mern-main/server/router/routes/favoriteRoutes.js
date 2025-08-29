import express from 'express';
import { addFavorites, getFavorite, removeFavorite } from '../../controllers/favoriteController.js';
import { authenticate, roleAuthentication } from '../../middlewares/AuthMiddleware.js';

const router = express.Router();

// Route to get the favorites
router.get("/", authenticate, roleAuthentication(["admin", "user", "vendor"]), getFavorite);

// Route to remove a product from favorites (using DELETE instead of POST)
router.post("/remove", authenticate, roleAuthentication(["admin", "user", "vendor"]), removeFavorite);

// Route to add a product to favorites (with authentication and authorization middleware)
router.post("/add", authenticate, roleAuthentication(["admin", "user", "vendor"]), addFavorites);

export default router;
