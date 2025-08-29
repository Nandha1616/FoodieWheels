import mongoose from "mongoose";
import userModel from "../models/UserModel.js";
import { hashPassword } from "../utils/helpers.js"




const createUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Validate required fields
        const missingField = ["name", "email", "phone", "password"].find(field => !req.body[field]);
        if (missingField) {
            return res.status(400).json({ message: `${missingField} is required`, success: false });
        }

        // Check if a user already exists with the same email or phone
        const existingUser = await userModel.findOne({ $or: [{ email }, { phone }] }).lean();
        if (existingUser) {
            console.log(existingUser + "user")
            const duplicateField = existingUser.email === email ? "email" : "phone";
            return res.status(400).json({ message: `User with this ${duplicateField} already exists`, success: false });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password); // Ensure `hashPassword` is asynchronous

        // Create and save the new user
        const newUser = await userModel.create({
            name,
            email,
            phone,
            password: hashedPassword
        });
        console.log(name);
        

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: { id: newUser._id, name: newUser.name, email: newUser.email, phone: newUser.phone }
        });
    } catch (err) {
        // Check for duplicate key errors
        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyValue)[0];
            return res.status(400).json({ message: `Duplicate ${duplicateField}: ${err.keyValue[duplicateField]}`, success: false });
        }

        console.error(err);
        return res.status(500).json({ message: "Internal server error", success: false, error: err.message });
    }
};

// get OneUser
const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        if (user) res.json(user);
        else res.status(404).json({ message: 'User not found' });
    } catch (err) {
        return  res.status(500).json({ message: err.message });
    }
}


const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
  
    // Check if updates are provided
    if (!name && !email && !phone) {
      return res.status(400).json({ message: 'No data to update' });
    }
  
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
  
    try {
      // Construct update object dynamically
      const updateFields = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;
      if (phone) updateFields.phone = phone;
  
      // Update the user and return the updated document
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true, runValidators: true } // Return the updated document and validate inputs
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (err) {
      console.error(`Error updating user: ${err.message}`);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
  
  
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {

        const user = await userModel.findByIdAndDelete(id);
        // res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
        return res.json({ message: 'Delete Successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export { createUser, updateUser, deleteUser, getUser } 