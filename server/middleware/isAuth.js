import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token){
            return res.status(400).json({ message: "Token is not found" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifyToken.userId;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
export default isAuth;