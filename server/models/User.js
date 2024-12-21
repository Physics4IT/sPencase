import { Schema, model } from "mongoose";
import { type } from "os";

const DeviceOption = new Schema({
    rgb: {
        type: Boolean,
        default: false
    },
    neopixel: {
        type: Boolean,
        default: false
    },
    lcd: {
        type: Boolean,
        default: false
    },
    alarm: {
        type: Boolean,
        default: false
    },
    autoOnC: {
        type: Boolean,
        default: false
    },
    vibration: {
        type: Boolean,
        default: false
    },
    buzzer: {
        type: Number,
        default: 0
    }
});

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
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
    },
    deviceOption: {
        type: DeviceOption,
        default: {
            rgb: false,
            neopixel: false,
            lcd: false,
            alarm: false,
            autoOnC: false,
            vibration: false
        }
    }
});

export default model('Users', User);