import mongoose from "mongoose";

// Define the Product Schema
const productSchema = new mongoose.Schema({
    shopName: { type: String, required: true }, // Name of the shop (required for validation)
    phone: { type: Number, required: true },   // Phone number for contact
    address: {
        location: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true }
    }, // Address of the shop
    startTime: { type: String, required: true }, // Opening time (stored as string, e.g., '9:00 AM')
    endTime: { type: String, required: true },   // Closing time
    price: { type: Number, required: true },    // Price of product or service
    shopImage: { type: String },               // Image URL or path for the shop
    menuImage: { type: String },               // Image URL or path for the menu
    role: { type: String, enum: ['admin', 'vendor'], default: 'vendor' }, // Role associated with the product
    description: { type: String },             // Description of the product or service
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }, // Reference to the user who created the product
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }], // Array of comment references
    likes: {
        type: Number,
        default: 0 // Default like count is 0
    },
    usersLiked: { type: [String], default: [] }, // Stores user IDs who liked the product
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// Create the Product Model
const productModel = mongoose.model("Products", productSchema);

export default productModel;
