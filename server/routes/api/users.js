import express from 'express';
import { signup, login, logout } from '../../controllers/users.js';
import { verifyToken } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', verifyToken, (req, res) => {
    res.send(req.user);
});

export default router;