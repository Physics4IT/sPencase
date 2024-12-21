import mongoose from "mongoose";
import chalk from "chalk";
import DataRecordModel from "../models/DataRecord.js";

const uri = process.env.ATLAS_URI || "";

async function connectDB() {
    await mongoose
        .connect(uri, {serverSelectionTimeoutMS: 5000})
        .then(() => {
            console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`);
        })
        .catch((err) => {
            console.error(chalk.red(`MongoDB connection error: ${err}`));
        });
}

async function updateDataRecord() {
    try {
        await fetch("http://127.0.0.1:1880/data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const newDataRecord = new DataRecordModel({
                    received_at: new Date(),
                    temperature: data.temperature,
                    humidity: data.humidity,
                    tilt: data.tilt,
                    uv: data.uv,
                    potentioValue: data.potentioValue,
                });
                newDataRecord.save();
            })
            .catch((err) => {
                console.error(err);
            });
    }
    catch (err) {
        console.error(err);
    }
}

export { connectDB, updateDataRecord };