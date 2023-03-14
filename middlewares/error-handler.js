import { ApiError } from "../utils/index.js";

const expressErrorHandler = (error, req, res, next) => {
    console.log(error);

    if (error instanceof ApiError) {
        return res.json({
            error: true,
            data: null,
            message: error.message,
        });
    }
    return res.json({
        error: true,
        data: null,
        message: "Internal server error",
    });
};

export default expressErrorHandler;
