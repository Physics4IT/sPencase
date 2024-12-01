import { Schema, model } from "mongoose";

const sessionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model("Session", sessionSchema);