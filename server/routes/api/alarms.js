import express from 'express';
import AlarmModel from '../../models/Alarm.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const alarms = await AlarmModel.find();
    res.json(alarms).status(200);
});

router.get('/:id', async (req, res) => {
    const alarm = await AlarmModel.find({ _id: req.params.id });
    if (!alarm) res.send('Not found').status(404);
    else res.json(alarm).status(200);
});

router.post('/', async (req, res) => {
    try {
        const alarms = req.body;
        const newAlarms = AlarmModel.insertMany(alarms)
        res.json(newAlarms).status(201);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding record');
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const alarm = await AlarmModel.findOneAndUpdate
            (query, req.body, { new: true });
        res.json(alarm).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating record');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const alarm = await AlarmModel.deleteOne(query);
        res.json(alarm).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting record');
    }
});

router.delete('/', async (req, res) => {
    try {
        const alarms = await AlarmModel.deleteMany({});
        res.json(alarms).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting record');
    }
})

export default router;