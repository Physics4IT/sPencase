import express from 'express';
import exampleRoutes from './examples.js';
import userRoutes from './users.js';
import dataRecordRoutes from './dataRecords.js';

const router = express.Router();

router.use('/examples', exampleRoutes);
router.use('/users', userRoutes);
router.use('/dataRecords', dataRecordRoutes);

export default router;