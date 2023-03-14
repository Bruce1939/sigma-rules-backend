import UserService from "./user.service.js";
import { authorizeUser } from "../../middlewares/index.js";
import { errorHandler } from "../../utils/index.js";

const userApi = (app) => {
    const service = new UserService();

    app.get(
        "/api/user/:id",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            const { id } = req.params;
            const data = await service.userProfile(id);
            return res.json(data);
        })
    );

    app.put(
        "/api/user/follow/:id",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            const { user } = req;
            const { id } = req.params;
            const data = await service.followUser(id, user);
            return res.json(data);
        })
    );

    app.put(
        "/api/user/unfollow/:id",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            const { user } = req;
            const { id } = req.params;
            const data = await service.unfollowUser(id, user);
            return res.json(data);
        })
    );
};

export default userApi;
