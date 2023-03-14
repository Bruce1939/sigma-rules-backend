import { Rule } from "./../../database/index.js";

class RuleRepository {
    async findUserRules(user) {
        try {
            const userRules = await Rule.find({ postedBy: user._id })
                .populate("postedBy", "id username")
                .populate("comments.postedBy", "_id username");
            return userRules;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async findAllRules() {
        try {
            const allRules = await Rule.find()
                .populate("postedBy", "id username")
                .populate("comments.postedBy", "_id username");
            return allRules;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async findSubRules(user) {
        try {
            const subRules = await Rule.find({
                postedBy: { $in: user.following },
            })
                .populate("postedBy", "id username")
                .populate("comments.postedBy", "_id username");
            return subRules;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async createRule(rule) {
        try {
            const newRule = await Rule.create(rule);
            return newRule;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async likeRule(id, user) {
        try {
            const likedRule = await Rule.findByIdAndUpdate(
                id,
                {
                    $push: { likes: user._id },
                },
                {
                    new: true,
                }
            )
                .populate("postedBy", "id username")
                .populate("comments.postedBy", "_id username");
            return likedRule;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async unlikeRule(id, user) {
        try {
            const unlikedRule = await Rule.findByIdAndUpdate(
                id,
                {
                    $pull: { likes: user._id },
                },
                {
                    new: true,
                }
            )
                .populate("postedBy", "id username")
                .populate("comments.postedBy", "_id username");
            return unlikedRule;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async comment(id, comment) {
        try {
            const commentedRule = await Rule.findByIdAndUpdate(
                id,
                {
                    $push: { comments: comment },
                },
                {
                    new: true,
                }
            )
                .populate("comments.postedBy", "id username")
                .populate("postedBy", "id username");
            return commentedRule;
        } catch (error) {
            console.log(error);
            return;
        }
    }
}

export default RuleRepository;
