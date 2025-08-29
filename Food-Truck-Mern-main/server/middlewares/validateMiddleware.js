import mongoose from "mongoose"
import userModel from "../models/UserModel.js"


const validateUserId = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' })
    }
    const user = await userModel.findById(id)
    if (!user) {
        return res.status(404).json({ message: 'Vendor not found' })
    }
    next()
}
export { validateUserId }