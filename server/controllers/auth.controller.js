import UserModel from "../models/usermodel.js";
import { getToken } from "../utils/token.js";

export const googleAuth = async (req, res) => {
    try {
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const { name, email } = req.body;

        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({ name, email });
        }

        const token = await getToken(user._id);

       res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

        return res.status(200).json({ user, token });

    } catch (error) {
        console.log("Google Auth Error:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};