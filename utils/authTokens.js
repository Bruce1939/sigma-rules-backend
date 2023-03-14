import jwt from "jsonwebtoken";
import { env } from "./../config/index.js";

const generateAuthTokens = (id, email) => {
    try {
        const tokenPayload = {
            id,
            email,
        };

        const token = jwt.sign(tokenPayload, env.JWT_TOKEN_SECRET, {
            expiresIn: "10m",
        });

        return token;
    } catch (error) {
        console.log(error);
    }
};

const verifyToken = (token) => {
    try {
        const returnedValue = jwt.verify(
            token,
            env.JWT_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return err;
                return decoded;
            }
        );
        return returnedValue;
    } catch (error) {
        console.log(error);
    }
};

export {
    generateAuthTokens,
    verifyToken,
};
