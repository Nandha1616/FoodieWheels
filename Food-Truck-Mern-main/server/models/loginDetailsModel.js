import mongoose from "mongoose";

// Schema definition
const loginDetailsSchema = new mongoose.Schema({
    UserId: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
    lastLoginDate: { type: Date, required: true },  // Changed to Date type
    lastLoginTime: { type: String, required: true },  // Keep lastLoginTime as string if time formatting is needed
});

// Model definition
const LoginDetails = mongoose.model("LoginDetails", loginDetailsSchema);

// Exporting the model
export default LoginDetails;
