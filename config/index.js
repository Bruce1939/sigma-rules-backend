import dotenv from "dotenv";
dotenv.config();

const env = {
    PORT: process.env.PORT,

    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,

    MONGO_URL: process.env.MONGO_URL,
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,

    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_SERVER: process.env.SMTP_SERVER,
    SMTP_PORT: process.env.SMTP_PORT,
};

export { env };
