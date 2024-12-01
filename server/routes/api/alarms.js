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
        const newAlarm = new AlarmModel({
            user_id: req.body.user_id,
            alarm_time: req.body.alarm_time,
            alarm_type: req.body.alarm_type,
            alarm_message: req.body.alarm_message,
        });

        await newAlarm.save();
        res.json(newAlarm).status(201);
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