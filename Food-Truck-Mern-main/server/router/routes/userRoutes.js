import { Router } from "express";
import { createUser, updateUser, deleteUser, getUser } from "../../controllers/userController.js";
import { validateUserId } from "../../middlewares/validateMiddleware.js";
import { authenticate, roleAuthentication } from '../../middlewares/AuthMiddleware.js';

const router = Router();

// Route to get a specific user by ID
router.get("/:id", authenticate, roleAuthentication(["admin", "user", "vendor"]), validateUserId, getUser);

// Route to get all users (admin can access this)
// router.get("/", authenticate, roleAuthentication(["admin", "user", "vendor"]), getAllUser);

// Route to create a new user (admin can access this)
router.post("/", createUser);

// Route to update a specific user by ID
router.put("/update/:id", authenticate, roleAuthentication(["admin", "user", "vendor"]), validateUserId, updateUser);

// Route to delete a specific user by ID
router.delete("/delete/:id", authenticate, roleAuthentication(["admin", "user", "vendor"]), validateUserId, deleteUser);

export default router;
