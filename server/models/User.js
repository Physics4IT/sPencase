import { Schema, Model } from "mongoose";

const User = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phonenum: {
        type: String,
        unique: true
    }
});

const UserModel = Model('Users', User);

export default UserModel;