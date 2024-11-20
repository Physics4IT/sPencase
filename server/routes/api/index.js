import express from 'express';
import exampleRoutes from './examples.js';

const router = express.Router();

router.use('/examples', exampleRoutes);

export default router;