import { Schema, model } from "mongoose";

const Example = new Schema({
    updated_at: Date,
    user_id: Number,
    created_at: Date
});

const ExampleModel = model('Examples', Example);

export default ExampleModel;