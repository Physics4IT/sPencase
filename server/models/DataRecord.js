import { Schema, model } from "mongoose";

const DataRecord = new Schema({
    received_at: {
        type: Date,
        default: Date.now,
        required: true,
        expired: 18000
    },
    temperature: Number,
    humidity: Number,
    tilt: Number,
    uv: Number,
    potentioValue: Number
});

export default model('DataRecords', DataRecord);