import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import generateRoute from './routes/generate.js';

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
}));
app.use(express.json());

// Routes
app.use('/api/generate', generateRoute);

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'AI Interview Generator API is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

// Global error handler — ensures server never crashes
app.use((err, req, res, next) => {
    console.error('[Unhandled Error]', err.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});
