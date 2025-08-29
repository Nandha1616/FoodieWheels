import mongoose from "mongoose";
import productModel from "../models/productModel.js";


const validateProductId = async (req, res, next) => {
    const { id } = req.params;
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }
    try {
        // Check if product exists
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


export { validateProductId, }
