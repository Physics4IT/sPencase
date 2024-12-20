import express from 'express';
import { signup, login, logout, updateInfo } from '../../controllers/users.js';
import { verifyToken } from '../../middlewares/auth.js';
import UserModel from '../../models/User.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.patch('/update', verifyToken, updateInfo);
router.get('/logout', logout);
router.get('/me', verifyToken, async (req, res) => {
    const user = await UserModel.findById(req.userId, { password: 0, __v: 0 });
    res.status(200).json(user);
});

export default router;