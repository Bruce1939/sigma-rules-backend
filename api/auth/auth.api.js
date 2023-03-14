import AuthService from "./auth.service.js";
import { authorizeUser } from "../../middlewares/index.js";
import { ApiError, errorHandler, validateSignup } from "../../utils/index.js";

const authApi = (app) => {
    const service = new AuthService();

    app.post(
        "/api/auth/signup",
        errorHandler(async (req, res, next) => {
            const { username, email, password } = req.body;
            const { validationErrors, validatedInput } = validateSignup(
                username,
                email,
                password
            );

            if (validationErrors.length > 0)
                throw new ApiError(validationErrors, 403);

            const data = await service.signup(validatedInput);
            return res.json(data);
        })
    );

    app.post(
        "/api/auth/login",
        errorHandler(async (req, res, next) => {
            const { email, password } = req.body;
            const result = await service.login(email, password);
            const { accessToken, cookie } = result.data;
            const { cookieName, value, config } = cookie;
            res.cookie(cookieName, value, config);
            return res.json({
                data: accessToken,
                error: false,
                message: "Login successful",
            });
        })
    );

    app.put(
        "/api/auth/:id/verify/:token",
        errorHandler(async (req, res, next) => {
            const { id, token } = req.params;
            const data = await service.verifyEmail(id, token);
            return res.json(data);
        })
    );

    app.get(
        "/api/auth/refresh",
        errorHandler(async (req, res, next) => {
            const cookie = req.cookies;
            if (!cookie?.jwt) throw new ApiError("Missing credentials", 404);
            const refreshToken = cookie.jwt;
            const data = await service.refresh(refreshToken);
            return res.json(data);
        })
    );

    app.get(
        "/api/auth/test",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            return res.json("hello");
        })
    );
};

export default authApi;
