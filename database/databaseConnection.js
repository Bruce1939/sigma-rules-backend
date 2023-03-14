import mongoose from "mongoose";
import { env } from "./../config/index.js";

const databaseConnection = async () => {
    try {
        await mongoose.connect(env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to mongodb");
    } catch (error) {
        console.log(error);
    }
};

export default databaseConnection;
