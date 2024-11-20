import mongoose from "mongoose";
import chalk from "chalk";

const uri = process.env.ATLAS_URI || "";

async function connect() {
    await mongoose
        .connect(uri, {serverSelectionTimeoutMS: 5000})
        .then(() => {
            console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`);
        })
        .catch((err) => {
            console.error(chalk.red(`MongoDB connection error: ${err}`));
        });
}

export default connect;