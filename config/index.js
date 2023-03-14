import dotenv from "dotenv";
dotenv.config();

const env = {
    PORT: process.env.PORT,

    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_LIFETIME: process.env.JWT_REFRESH_TOKEN_LIFETIME,
    JWT_ACCESS_TOKEN_LIFETIME: process.env.JWT_ACCESS_TOKEN_LIFETIME,

    AUTH_COOKIE_LIFETIME: process.env.AUTH_COOKIE_LIFETIME,

    MONGO_URL: process.env.MONGO_URL,
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,

    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_SERVER: process.env.SMTP_SERVER,
    SMTP_PORT: process.env.SMTP_PORT,
};

export { env };
