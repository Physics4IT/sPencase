import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import connectDB from "./db/connection.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();
app.use(routes);

// Start the Express server and store the HTTP server instance
const server = app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    try {
        const response = await fetch('http://localhost:1880/process-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'Server started' }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        else {
            console.log('Server started message sent to Node-RED');
        }
    }
    catch (e) {
        console.error(e);
    }
});

// Handle SIGTERM for graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
    })
});