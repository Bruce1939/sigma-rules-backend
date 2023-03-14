import express from "express";
import { databaseConnection } from "./database/index.js";
import expressApp from "./express-app.js";
import { env } from "./config/index.js";

const startServer = async () => {
    const app = express();

    await databaseConnection();

    await expressApp(app);

    app.listen(env.PORT, console.log(`server started on port ${env.PORT}`));
};

startServer();
