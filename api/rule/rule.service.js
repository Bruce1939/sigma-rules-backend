import RuleRepository from "./rule.repository.js";

class RuleService {
    constructor() {
        this.repository = new RuleRepository();
    }

    async getUserRules(user) {
        const userRules = await this.repository.findUserRules(user);
        return {
            data: userRules,
            error: false,
            message: "User's rules fetched successfully",
        };
    }

    async getAllRules() {
        const allRules = await this.repository.findAllRules();
        return {
            data: allRules,
            error: false,
            message: "All rules fetched successfully",
        };
    }

    async getSubRules(user) {
        const subRules = await this.repository.findSubRules(user);
        return {
            data: subRules,
            error: false,
            message: "Sub rules fetched successfully",
        };
    }

    async addRule(user, rule, image) {
        const ruleDoc = {
            rule,
            image,
            postedBy: user,
        };
        const newRule = await this.repository.createRule(ruleDoc);
        return {
            data: newRule,
            error: false,
            message: "Rule added successfully",
        };
    }

    async likeRule(id, user) {
        const likedRule = await this.repository.likeRule(id, user);
        return {
            data: likedRule,
            error: false,
            message: "Rule liked",
        };
    }

    async unlikeRule(id, user) {
        const unlikedRule = await this.repository.unlikeRule(id, user);
        return {
            data: unlikedRule,
            error: false,
            message: "Rule unliked",
        };
    }

    async comment(text, id, user) {
        const comment = { text, postedBy: user._id };
        const newComment = await this.repository.comment(id, comment);
        return {
            data: newComment,
            error: false,
            message: "Comment added successfully",
        };
    }
}

export default RuleService;
