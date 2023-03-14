import { Schema, model } from "mongoose";

const ruleModel = new Schema(
    {
        rule: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                unique: true,
            },
        ],
        comments: [
            {
                text: String,
                postedBy: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Rule = model("Rule", ruleModel);

export default Rule;
