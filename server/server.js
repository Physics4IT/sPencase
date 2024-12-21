import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { connectDB, updateDataRecord} from "./db/connection.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Route
app.use(cookieParser());
app.use((req, res, next) => {
    const token = req.cookies['x-access-token'];

    if (token) {
        res.cookie("x-access-token", token, {
            maxAge: 3600 * 1000, // 1 hours
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict"
        });
    }
    next();
});
app.use(routes);

// Auto fetch data from Node-RED
setInterval(() => {
    updateDataRecord();
}, 5000);

setInterval(async () => {
    await fetch('http://localhost:1880/receiveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            topic: 'sub/sevenSegment',
            payload: new Date().getHours() * 100 + new Date().getMinutes(),
        }),
    });
}, 30000);

// Start the Express server and store the HTTP server instance
const server = app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
});

// Handle SIGTERM for graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
    })
});