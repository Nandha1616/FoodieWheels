import mongoose from "mongoose";
import productModel from "../models/productModel.js";
import userModel from "../models/UserModel.js";


// Get all products for a specific vendor
const getOneVendorProducts = async (req, res) => {
    const { id } = req.params;

    try {
        // Filter by user (vendor) ID instead of _id
        const products = await productModel.find({ user: id }).populate("user");

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found for this vendor" });
        }
        return res.status(200).json({ message: "Vendor's products retrieved successfully", products });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ message: err.message });
    }
};

// Get a single product by ID
const getOneProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id);
        if (product) {
            return res.status(200).json({ message: "Product found", data: product });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const { id } = req.params; // Extract user ID from route parameters

    // Destructure and validate request body fields
    const {
        shopName,
        phone,
        address, // Ensure `address` exists
        startTime,
        endTime,
        price,

        description
    } = req.body;



    try {
        const images = {
            shopImage: req.files['shopImage'] ? req.files['shopImage'][0].path : null,
            menuImage: req.files['menuImage'] ? req.files['menuImage'][0].path : null
        }
        // Create and save the product
        const product = await productModel.create({
            shopName,
            phone,
            address: JSON.parse(address),
            startTime,
            endTime,
            price,
            shopImage: images.shopImage,
            menuImage: images.menuImage,
            description,
            user: id, // Associate the product with the user ID
        });

        // Return success response
        return res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (err) {
        // Return error response
        return res.status(400).json({ message: `Error creating product: ${err.message}` });
    }
};

const productsLiked = async (req, res) => {
    const { id } = req.params; // Product ID
    const { userId } = req.body; // User ID


    try {
        // Validate user ID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if product exists
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Toggle like/unlike logic
        if (product.usersLiked.includes(userId)) {
            // Unlike the product
            product.likes--;
            product.usersLiked = product.usersLiked.filter(uid => uid !== userId);
            await product.save();
            return res.json({ message: "Product unLiked successfully", product });
        } else {
            // Like the product
            product.likes++;
            product.usersLiked.push(userId);
            await product.save();
            return res.json({ message: "Product liked successfully", product });
        }
    } catch (err) {
        res.status(500).json({ message: `Error toggling like: ${err.message}` });
    }
};


// Update an existing product
const updateProduct = async (req, res) => {
    const { id } = req.params; // Extract product ID from route parameters
    const requiredFields = [
        "shopName",
        "phone",
        "address",
        "startTime",
        "endTime",
        "price",
        "description",
    ];

    try {
        // Check for missing required fields (excluding images since they are optional)
        const missingFields = requiredFields.filter((field) => !req.body[field]);
        if (missingFields.length) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }

        // Find the product by ID
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Prepare fields to update, including optional image paths
        const updatedFields = {
            ...req.body,
            address: JSON.parse(req.body.address) || product.address,


            shopImage: req.files?.shopImage?.[0]?.path || product.shopImage,
            menuImage: req.files?.menuImage?.[0]?.path || product.menuImage,
        };
        console.log(updatedFields);
        // Update the product by ID
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true, runValidators: true } // Return the updated document
        );

        // Respond with success
        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({
            message: `Error updating product: ${error.message}`,
        });
    }
};



// Delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct
        });
    } catch (err) {
        return res.status(500).json({
            message: "An error occurred while deleting the product",
            error: err.message
        });
    }
};


export { getOneProduct, createProduct, updateProduct, productsLiked, deleteProduct, getOneVendorProducts };
