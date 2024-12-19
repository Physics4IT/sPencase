import { Schema, model } from "mongoose";

const Alarm = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hour: {
        type: Number,
        required: true
    },
    minute: {
        type: Number,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    }
});

export default model('Alarms', Alarm);