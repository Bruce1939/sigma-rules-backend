import RuleService from "./rule.service.js";
import { authorizeUser } from "../../middlewares/index.js";
import { errorHandler } from "../../utils/index.js";

const ruleApi = (app) => {
    const service = new RuleService();

    app.post(
        "/api/rule/addrule",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            const { user } = req;
            const { rule, image } = req.body;
            const data = await service.addRule(user, rule, image);
            return res.json(data);
        })
    );

    app.get(
        "/api/rule/getuserrules",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            const { user } = req;
            const data = await service.getUserRules(user);
            return res.json(data);
        })
    );

    app.get(
        "/api/rule/getallrules",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            const data = await service.getAllRules();
            return res.json(data);
        })
    );

    app.get(
        "/api/rule/getsubrules",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            const { user } = req;
            const data = await service.getSubRules(user);
            return res.json(data);
        })
    );

    app.delete(
        "/api/rule/deleterule/:id",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            const { id } = req.params;
            const { user } = req;

            const data = await service.deleteRule(id, user);
            return res.json(data);
        })
    );

    app.put(
        "/api/rule/like/:id",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            const { id } = req.params;
            const { user } = req;

            const data = await service.likeRule(id, user);
            return res.json(data);
        })
    );

    app.put(
        "/api/rule/unlike/:id",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            const { id } = req.params;
            const { user } = req;

            const data = await service.unlikeRule(id, user);
            return res.json(data);
        })
    );

    app.put(
        "/api/rule/comment/:id",
        authorizeUser,
        errorHandler(async (req, res, next) => {
            const { text } = req.body;
            const { id } = req.params;
            const { user } = req;

            const data = await service.comment(text, id, user);
            return res.json(data);
        })
    );
};

export default ruleApi;
