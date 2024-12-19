import express from 'express';
import exampleRoutes from './examples.js';
import userRoutes from './users.js';
import dataRecordRoutes from './dataRecords.js';
import alarmRoute from './alarms.js'

const router = express.Router();

router.use('/examples', exampleRoutes);
router.use('/users', userRoutes);
router.use('/dataRecords', dataRecordRoutes);
router.use('/alarms', alarmRoute);

export default router;