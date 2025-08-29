import { generateSecretToken, verifyToken } from '../utils/secretToken.js';
import userModel from '../models/UserModel.js';
import LoginDetails from '../models/loginDetailsModel.js';
import { comparePassword, } from '../utils/helpers.js';
import nodemailer from 'nodemailer';
;

// Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Verify password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Generate JWT token
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };
        const token = generateSecretToken(payload);

        // Record login details
        await LoginDetails.create({
            UserId: user._id,
            name: user.name,
            email: user.email,
            lastLoginDate: new Date().toISOString().slice(0, 10),
            lastLoginTime: new Date().toLocaleTimeString(),
            role: user.role,
        });

        // Set secure cookie for the token
        res.cookie("token", token, {
            httpOnly: true,       // Prevents access via JavaScript
            secure: false,        // Should be true in production (HTTPS)
            sameSite: "lax",      // Prevents CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // Respond with success
        res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
// ForgotPassword function
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        }
        const token = generateSecretToken(payload);

        // Send email with reset password link
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            text: `Click the link to reset your password: http://localhost:5173/resetpassword/${user._id}/${token}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });
        res.cookie('resetpassword', token, {
            expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
            httpOnly: true, // Ensures the cookie is accessible only by the server
            secure: process.env.NODE_ENV === 'production', // Use 'secure' in production (cookies will only be sent over HTTPS)
            sameSite: 'Strict', // CSRF protection, ensures cookie is sent with requests from the same origin
        });
        res.status(200).json({ message: 'Password reset email sent' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ResetPassword function
const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const { resetpassword } = req.cookies;

        // Check if token is present
        if (!resetpassword) {
            return res.status(400).json({ message: 'Token missing' });
        }

        // Check if password is provided
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        // Verify and decode the token
        const decoded = verifyToken(resetpassword);
        if (!decoded || decoded.id !== id) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Hash the new password
        const hashedPassword = hashedPassword(password);

        // Find the user and update the password
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        // Remove the password field before sending the user data back
        user.password = undefined;

        res.status(200).json({ message: 'Password reset successfully', user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const logout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (err) {
        console.error("Error during logout:", err.message);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
};

export { login, forgotPassword, resetPassword, logout };
