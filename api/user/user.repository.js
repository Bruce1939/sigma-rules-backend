import { User, Rule } from "./../../database/index.js";

class UserRepository {
    async findUserProfile(id) {
        try {
            const user = await User.findOne({ _id: id }).select("-password");
            const rules = await Rule.find({ postedBy: id })
                .populate("postedBy", "_id username")
                .populate("comments.postedBy", "_id username");
            return { user, rules };
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async followUser(id, user) {
        try {
            const followedUser = await User.findByIdAndUpdate(
                id,
                {
                    $push: { followers: user._id },
                },
                {
                    new: true,
                }
            )
                .select("-password")
                .select("-email");

            const followerUser = await User.findByIdAndUpdate(
                user._id,
                {
                    $push: { following: id },
                },
                {
                    new: true,
                }
            )
                .select("-password")
                .select("-email");
            return { followedUser, followerUser };
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async unfollowUser(id, user) {
        try {
            const unfollowedUser = await User.findByIdAndUpdate(
                id,
                {
                    $pull: { followers: user._id },
                },
                {
                    new: true,
                }
            );
            const unfollowerUser = await User.findByIdAndUpdate(
                user._id,
                {
                    $pull: { following: id },
                },
                {
                    new: true,
                }
            );
            return { unfollowedUser, unfollowerUser };
        } catch (error) {
            console.log(error);
            return;
        }
    }
}

export default UserRepository;
