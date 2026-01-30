import http from 'http';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { handleRoute } from "./routes/routes.js";

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 5000;

// basic request handler
const server = http.createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    await handleRoute(req, res);
});

const startServer = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });

    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

startServer();
