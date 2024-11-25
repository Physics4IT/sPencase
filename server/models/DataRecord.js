import { Schema, model } from "mongoose";

const DataRecord = new Schema({
    received_at: Date,
    temperature: Number,
    humidity: Number,
    tilt: Number,
    uv_intensity: Number,
    light_intensity: Number
});

const DataRecordModel = model('DataRecords', DataRecord);

export default DataRecordModel;