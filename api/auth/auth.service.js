import AuthRepository from "./auth.repository.js";
import {
    ApiError,
    comparePasswords,
    generateHashedPassword,
    generateAuthTokens,
    setCookieConfig,
    verifyToken,
    generateAccessToken,
    sendEmail,
    generateVerificationTokenString,
} from "../../utils/index.js";

class AuthService {
    constructor() {
        this.repository = new AuthRepository();
    }

    async signup(userInput) {
        const { username, email, password } = userInput;

        const userExists = await this.repository.findEmail(email);
        if (userExists)
            throw new ApiError("User with this email already exists", 409);

        const hashedPassword = await generateHashedPassword(password);

        const newUser = await this.repository.createUser({
            username,
            email,
            password: hashedPassword,
        });

        const tokenString = generateVerificationTokenString();

        const token = await this.repository.createVerificationCode(
            newUser._id,
            tokenString
        );
        console.log("token", token);

        const url = `http://localhost:8000/auth/${newUser.id}/verify/${token.code}`;
        await sendEmail(email, "Verify Email", url);

        return {
            data: newUser,
            message:
                "User registered successfully. Please verify your email to activate your account",
            error: false,
        };
    }

    async login(email, password) {
        const userExists = await this.repository.findEmail(email);
        if (!userExists)
            throw new ApiError(
                "User with this email doesn't exist. Please provide a valid email",
                404
            );

        if (!userExists.isActive)
            throw new ApiError(
                "Email provided is not verified. Please Verify your email",
                403
            );

        const passwordMatched = await comparePasswords(
            password,
            userExists.password
        );

        if (!passwordMatched)
            throw new ApiError(
                "Invalid Credentials. Please Provide valid credentials",
                401
            );

        const { accessToken, refreshToken } = generateAuthTokens(
            userExists._id,
            userExists.email
        );
        const cookieMaxAge = 10 * 60 * 1000;
        const cookie = setCookieConfig("jwt", refreshToken, cookieMaxAge);

        return {
            data: { accessToken, cookie },
            message: "User logged in successfully",
            error: false,
        };
    }

    async verifyEmail(id, token) {
        const user = await this.repository.findUser(id);
        if (!user) throw new ApiError("Invalid email verification link", 401);

        const newtoken = await this.repository.findToken(user._id, token);
        if (!newtoken)
            throw new ApiError("Invalid email verification link", 401);

        const result = await this.repository.updateUserAccountStatus(user._id);
        if (!result.acknowledged || result.modifiedCount === 0)
            throw new ApiError("Account activation failed", 500);

        await this.repository.removeVerifiedToken(newtoken);

        const userDetails = {
            _id: user._id,
            username: user.username,
            email: user.email,
            status: true,
        };

        return {
            data: userDetails,
            error: false,
            message: "Signup successful",
        };
    }

    async refresh(refreshToken) {
        const verifiedToken = verifyToken(refreshToken);
        if (!verifiedToken.id) throw new ApiError("Invalid refresh token", 401);

        const { id } = verifiedToken;
        const user = await this.repository.findUser(id);

        if (!user) throw new ApiError("User doesn't exists", 404);

        const accessTokenPayload = {
            id: user._id,
            email: user.email,
        };

        const accessToken = generateAccessToken(accessTokenPayload);

        return {
            data: accessToken,
            error: false,
            message: "Auth token refreshed successfully",
        };
    }
}

export default AuthService;
