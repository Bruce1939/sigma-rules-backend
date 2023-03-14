import { Schema, model } from "mongoose";

const codeModel = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Code = model("Code", codeModel);

export default Code;
