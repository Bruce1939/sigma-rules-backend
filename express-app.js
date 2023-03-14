import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authApi, ruleApi, userApi } from "./api/index.js";
import { expressErrorHandler } from "./middlewares/index.js";

const expressApp = async (app) => {
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    app.use(cors());
    app.use(cookieParser());

    // Api
    authApi(app);
    ruleApi(app);
    userApi(app);

    // error-handler
    app.use(expressErrorHandler);
};

export default expressApp;
