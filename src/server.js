import express from 'express';
import dotenv from 'dotenv';

// Cargar variables 
dotenv.config();

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

