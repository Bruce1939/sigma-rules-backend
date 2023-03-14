import UserRepository from "./user.repository.js";

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async userProfile(id) {
        const userProfile = await this.repository.findUserProfile(id);
        return {
            data: userProfile,
            error: false,
            message: "User's profile fetched successfully",
        };
    }

    async followUser(id, user) {
        const followStats = await this.repository.followUser(id, user);
        return {
            data: followStats,
            error: false,
            message: "User followed successfully",
        };
    }

    async unfollowUser(id, user) {
        const followStats = await this.repository.unfollowUser(id, user);
        return {
            data: followStats,
            error: false,
            message: "User unfollowed successfully",
        };
    }
}

export default UserService;
