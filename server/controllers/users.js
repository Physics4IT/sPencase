import bcrypt from 'bcryptjs';
import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { username, email, password, phonenum } = req.body;

    try {
        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }, { phonenum }] });
        if (existingUser) {
            return res.status(409).send("User already exists");
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
        res.status(500).send("Error signing up");
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel
            .findOne({ username })
            .select("+password");

        if (!user) {
            return res.status(401).send("User not found");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).send("Invalid password");
        }

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: 86400 // 24 hours
        });
        res.cookie("x-access-token", token, {
            maxAge: 86400 * 1000, // 24 hours
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax"
        }).status(200).json({ message: "Login successful", user, token });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const decoded = jwt.decode(token);

        await Session.deleteOne({ user_id: decoded.id });
        res.status(200).send("Logout successful");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error logging out");
    }
}