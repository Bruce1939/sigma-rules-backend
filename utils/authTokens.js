import jwt from "jsonwebtoken";
import { env } from "./../config/index.js";

const generateAuthTokens = (id, email) => {
    try {
        const accessTokenPayload = {
            id,
            email,
        };

        const refreshTokenPayload = {
            id,
            email,
        };

        const accessToken = generateAccessToken(accessTokenPayload);
        const refreshToken = generateRefreshToken(refreshTokenPayload);

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
    }
};

const generateRefreshToken = (refreshTokenPayload) =>
    jwt.sign(refreshTokenPayload, env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: "10m",
    });

const generateAccessToken = (accessTokenPayload) =>
    jwt.sign(accessTokenPayload, env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: "2m",
    });

const setCookieConfig = (name, value, maxAge) => {
    const cookie = {
        cookieName: name,
        value,
        config: {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge,
        },
    };

    return cookie;
};

const verifyToken = (token) => {
    try {
        const returnedValue = jwt.verify(
            token,
            env.JWT_REFRESH_TOKEN_SECRET,
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
    generateAccessToken,
    setCookieConfig,
    verifyToken,
};
