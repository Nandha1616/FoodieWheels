import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Import routes
import userRoutes from "./router/routes/userRoutes.js";
import productRoutes from "./router/routes/productRoutes.js";
import authRoutes from "./router/routes/authRoutes.js";
import favoriteRoutes from "./router/routes/favoriteRoutes.js";
import adminRoutes from "./router/routes/adminRoutes.js";

dotenv.config();


const app = express();

// Environment variables    
const { MONGO_URL, PORT } = process.env;

// CORS configuration for local development and production
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://effortless-hamster-fd2008.netlify.app",
];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static("Assets"));

app.use((req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    console.log("Request Type:", req.method);
    console.log("Request IP:", req.url);
    next();
});

// Basic route
app.get("/", (req, res) => {

    res.send("Hello World!");
});

// Route handlers
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/auth", authRoutes);
app.use("/favorite", favoriteRoutes);
app.use("/admin", adminRoutes);

// MongoDB connection
mongoose
    .connect(MONGO_URL,)
    .then(() => {
        console.log(`Connected to MongoDB ${MONGO_URL}`);
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process on connection failure
    });

// Start server
app.listen(PORT || 5000, () => {
    console.log(`Server is running on port ${PORT || 5000}`);
});


// Graceful shutdown for server
process.on("SIGINT", async () => {
    console.log("Gracefully shutting down...");
    await mongoose.connection.close();
    process.exit(0);
});
