import { Schema, model } from "mongoose";

const DataRecord = new Schema({
    received_at: Date,
    temperature: Number,
    humidity: Number,
    tilt: Number,
    uv: Number,
    potentioValue: Number
});

export default model('DataRecords', DataRecord);