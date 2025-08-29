import LoginDetails from "../models/loginDetailsModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/UserModel.js";
import { handleError } from "../utils/errorHandler.js";
const getAllUser = async (req, res) => {
    try {
        const users = await userModel
            .find()
            .select("name email phone role _id")
            .lean();

        res.status(200).json({
            message: "Users retrieved successfully",
            users,
        });
    } catch (err) {
        handleError(res, "Failed to retrieve users", err);
    }
};


const getUserLoginDetails = async (req, res) => {
    try {
        const loginDetails = await LoginDetails.find();
        res.status(200).json({ message: "Login details retrieved successfully", loginDetails });
    } catch (err) {
        handleError(res, "Failed to retrieve login details", err);
    }
};

const deleteAllUsers = async (req, res) => {
    try {
        const deleteResult = await userModel.deleteMany({ role: "user" });
        res.status(200).json({ message: `${deleteResult.deletedCount} users deleted successfully` });
    } catch (err) {
        handleError(res, "Failed to delete all users", err);
    }
};

const deleteAllVendor = async (req, res) => {
    try {
        const deleteResult = await userModel.deleteMany({ role: "vendor" });
        res.status(200).json({ message: `${deleteResult.deletedCount} vendors deleted successfully` });
    } catch (err) {
        handleError(res, "Failed to delete all vendors", err);
    }
};

const deleteVendor = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        if (user.role !== "vendor") {
            return res.status(400).json({ message: "This user is not a vendor" });
        }

        // Delete vendor and associated products
        const vendor = await userModel.findByIdAndDelete(id);
        const productDeleteResult = await productModel.deleteMany({ user: id });
        res.status(200).json({
            message: `Vendor and ${productDeleteResult.deletedCount} products deleted successfully`,
        });
    } catch (err) {
        handleError(res, "Failed to delete vendor", err);
    }
};

const deleteVendorAllProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const productDeleteResult = await productModel.deleteMany({ user: id });
        res.status(200).json({ message: `${productDeleteResult.deletedCount} products deleted successfully` });
    } catch (err) {
        handleError(res, "Failed to delete vendor's products", err);
    }
};

const getAllProducts = async (req, res) => {
    try {
        // Use lean() for better performance when no additional methods are needed on the query result
        const products = await productModel.find().lean();

        // Log product count instead of full data to avoid cluttering the logs
        //   console.log(`Number of products retrieved: ${products.length}`);

        // Send the response with a success message and products
        res.status(200).json({
            status: "success",
            message: "Products retrieved successfully",
          products,
        });
    } catch (err) {
        console.error("Error retrieving products:", err.message);

        // Send a detailed error response
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve products",
            error: err.message,
        });
    }
};


export {
    getAllUser,
    getUserLoginDetails,
    deleteAllUsers,
    deleteAllVendor,
    deleteVendor,
    deleteVendorAllProduct,
    getAllProducts,
};
