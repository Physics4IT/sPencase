import jwt from 'jsonwebtoken';
import SessionModel from '../models/Session.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: 'No token provided!'
        });
    }

    const session = SessionModel.findOne({ token: token });
    if (!session) {
        return res.status(403).send({
            message: 'Unauthorized!'
        });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!'
            });
        }
        req.userId = decoded.id;
        next();
    });
};