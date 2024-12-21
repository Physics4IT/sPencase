import bcrypt from 'bcryptjs';
import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';
import SessionModel from '../models/Session.js';

export const signup = async (req, res) => {
    const { username, email, password, phonenum } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new UserModel({
            username,
            email,
            password: hashedPassword,
            phonenum
        });

        await user.save();
        res.status(200).json({ message: "Signup successful", user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json("Error signing up");
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel
            .findOne({ username })
            .select("+password");

        if (!user) {
            return res.status(401).json("User not found");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json("Invalid password");
        }

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: 3600 // 1 hours
        });
        res.cookie("x-access-token", token, {
            maxAge: 3600 * 1000, // 1 hours
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict"
        }).status(200).json({ message: "Login successful", user, token });

        const session = new SessionModel({
            user_id: user._id,
            token
        });
        await session.save();
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
}

export const updateInfo = async(req, res) => {
    const { username, email, phonenum } = req.body;
    const token = req.cookies["x-access-token"];
    const decoded = jwt.decode(token);

    try {
        await UserModel.findByIdAndUpdate(decoded.id, { username, email, phonenum });
        res.status(200).json("User info updated");
    }
    catch (err) {
        console.error(err);
        res.status(500).json("Error updating user info");
    }
}

export const changeDeviceOption = async(req, res) => {
    const { rgb, neopixel, lcd, alarm, autoOnC, vibration } = req.body;
    const token = req.cookies["x-access-token"];
    const decoded = jwt.decode(token);

    try {
        await UserModel.findByIdAndUpdate(decoded.id, { deviceOption: { rgb, neopixel, lcd, alarm, autoOnC, vibration } });
        res.status(200).json("Device option updated");
    }
    catch (err) {
        console.error(err);
        res.status(500).json("Error updating device option");
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies["x-access-token"];
        const decoded = jwt.decode(token);

        await SessionModel.deleteOne({ user_id: decoded.id });
        res.status(200).json("Logout successful");
    }
    catch (err) {
        console.error(err);
        res.status(500).json("Error logging out");
    }
}

export const deleteUser = async (req, res) => {
    const token = req.cookies["x-access-token"];
    const decoded = jwt.decode(token);

    try {
        await UserModel.findByIdAndDelete(decoded.id);
        await SessionModel.deleteOne({ user_id: decoded.id });
        res.status(200).json("User deleted");
    }
    catch (err) {
        console.error(err);
        res.status(500).json("Error deleting user");
    }
}