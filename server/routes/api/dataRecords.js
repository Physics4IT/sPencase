import express from "express";
import DataRecordModel from "../../models/DataRecord.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const dataRecords = await DataRecordModel.find();
    res.json(dataRecords).status(200);
});

router.get("/:id", async (req, res) => {
    const dataRecord = await DataRecordModel.find({ id: ObjectId(req.params.id) });
    if (!dataRecord) res.send("Not found").status(404);
    else res.json(dataRecord).status(200);
});

router.post("/", async (req, res) => {
    try {
        const newDataRecord = new DataRecordModel({
            received_at: req.body.received_at,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            tilt: req.body.tilt,
            uv_intensity: req.body.uv_intensity,
            light_intensity: req.body.light_intensity
        });
        const dataRecord = await newDataRecord.save();
        res.json(dataRecord).status(201);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId(req.params.id) };
        const updates = {
            $set: {
                received_at: req.body.received_at,
                temperature: req.body.temperature,
                humidity: req.body.humidity,
                tilt: req.body.tilt,
                uv_intensity: req.body.uv_intensity,
                light_intensity: req.body.light_intensity
            },
        };

        const dataRecord = await DataRecordModel.updateOne(query, updates);
        res.json(dataRecord).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId(req.params.id) };
        const dataRecord = await DataRecordModel.deleteOne(query);
        res.json(dataRecord).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

export default router;