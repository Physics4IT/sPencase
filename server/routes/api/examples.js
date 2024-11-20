import express from "express";
import ExampleModel from "../../models/Example.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    const examples = await ExampleModel.find();
    res.json(examples).status(200);
});

router.get("/:id", async (req, res) => {
    const example = await ExampleModel.find({ id: ObjectId(req.params.id) });
    if (!example) res.send("Not found").status(404);
    else res.json(example).status(200);
});

router.post("/", async (req, res) => {
    try {
        const newExample = new ExampleModel({
            id: req.body.id,
            user_id: req.body.user_id,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
        });
        const example = await newExample.save();
        res.json(example).status(201);
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
                user_id: req.body.user_id,
                created_at: req.body.created_at,
                updated_at: req.body.updated_at,
            },
        };

        const example = await ExampleModel.updateOne(query, updates);
        res.json(example).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: ObjectId(req.params.id) };
        const example = await Example
            .deleteOne(query);
        res.json(example).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

export default router;