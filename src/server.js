import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import Event from './models/event.js';

// Cargar variables 
dotenv.config();
connectDB(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`);
});

// Health 
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Test insert
app.post('/event', async (req,res) => {
    try {
    const newEvent = await Event.create(req.body); 
    res.status(201).json(newEvent);
    } 
    catch (error) {
    res.status(400).json({ 
        error: error.message 
    });
    }
});


// Server running
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

