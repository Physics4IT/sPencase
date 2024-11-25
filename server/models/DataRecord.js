import { Schema, Model } from "mongoose";

const DataRecord = new Schema({
    received_at: Date,
    temperature: Number,
    humidity: Number,
    tilt: Number,
    uv_intensity: Number,
    light_intensity: Number
});

const DataRecordModel = Model('DataRecords', DataRecord);

export default DataRecordModel;