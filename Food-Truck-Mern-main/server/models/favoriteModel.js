import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Corrected "String" and "true"
    items: [
        {
            productId: { type: String, required: true },
            shopName: { type: String, required: true },
        },
    ],
});

const favoriteModel = mongoose.model("Favorite", favoriteSchema);

export default favoriteModel;
