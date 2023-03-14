import jwt from "jsonwebtoken";
import { User } from "./../database/index.js";
import { env } from "./../config/index.js";
import { ApiError } from "./../utils/index.js";

const authorizeUser = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) throw new ApiError("Unauthorized user", 401);

            const value = jwt.verify(
                token,
                env.JWT_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) return err;
                    return decoded;
                }
            );
            console.log(value);

            const { id } = value;
            const user = await User.findById(id);
            const newuser = {
                _id: user._id,
                username: user.username,
                email: user.email,
            };
            req.user = newuser;
            next();
        } else {
            return res.json({
                data: null,
                message: "Unauthorized User",
                error: true,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            data: null,
            message: "Unauthorized User",
            error: true,
        });
    }
};

export default authorizeUser;
