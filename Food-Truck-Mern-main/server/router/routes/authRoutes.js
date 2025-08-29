import express from 'express';
import { login, forgotPassword, resetPassword, logout } from '../../controllers/AuthController.js';

const router = express.Router();

// Auth Routes
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);
router.post("/logout",logout)
export default router;
