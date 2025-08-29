import mongoose from "mongoose";
import favoriteModel from "../models/favoriteModel.js";
import { verifyToken } from "../utils/secretToken.js";

const addFavorites = async (req, res) => {
    const { token } = req.cookies; // Assuming token is in cookies
    const { shopName, productId } = req.body;

    try {
      

        // Validate the product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        // Validate the token
        if (!token) {
            return res.status(401).json({ message: 'Token missing or invalid' });
        }

        // Validate the shop name
        if (!shopName) {
            return res.status(400).json({ message: 'Shop name is required' });
        }
        const decode = verifyToken(token)

        // Find the user in the favorite collection
        let user = await favoriteModel.findOne({ userId: decode.id });

        if (!user) {
            // Create a new favorite entry if no user is found
            user = new favoriteModel({
                userId: decode.id,
                items: [{ productId, shopName }]
            });
            await user.save(); // Save the new favorite
            return res.status(200).json({ message: 'Product added to favorites successfully' });
        }

        // Check if the product already exists in the user's favorites
        const existingItem = user.items.find((item) => item.productId === productId);
        if (existingItem) {
            return res.status(400).json({ message: 'Product already added to favorites' });
        }

        // Add the new product to the favorites
        user.items.push({ productId, shopName }); // Ensure both productId and shopName are included
        await user.save(); // Save the updated favorite

        res.status(200).json({ message: 'Product added to favorites successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const getFavorite = async (req, res) => {
    const { token } = req.cookies; // Assuming token is in cookies
    try {
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }

        const decode = verifyToken(token)
        const favorite = await favoriteModel.findOne({ userId: decode.id });
        if (!favorite) {
            return res.status(404).json({ message: 'No favorites found' });
        }

        res.status(200).json({ message: "Favorites retrieved successfully", favorite });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFavorite = async (req, res) => {
    const { token } = req.cookies; // Assuming token is in cookies
    const { productId } = req.body;

    try {
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }
        const decode = verifyToken(token)
        const favorite = await favoriteModel.findOne({ userId: decode.id });
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        // Remove the item from the favorites
        favorite.items = favorite.items.filter(item => item.productId !== productId);
        await favorite.save(); // Save the updated favorite

        res.status(200).json({ message: 'Product removed from favorites successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addFavorites, getFavorite, removeFavorite }; // Export the removeFavorite function
