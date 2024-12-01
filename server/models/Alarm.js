import { Schema, model } from "mongoose";

const Alarm = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    alarm_time: {
        type: Date,
        required: true
    },
    alarm_type: {
        type: String,
        required: true
    },
    alarm_message: {
        type: String,
        required: true
    }
});

export default model('Alarms', Alarm);