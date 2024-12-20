import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import connectDB from "./db/connection.js";
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
app.use(cookieParser());
app.use(routes);

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