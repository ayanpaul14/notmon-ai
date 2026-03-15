import UserModel from "../models/usermodel.js";

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User is not found" });
        }
        return res.status(200).json({ userId, user });

    } catch (error) {
        return res.status(500).json({ message: `getCurrentUser error: ${error}` });
    }
}

