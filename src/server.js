import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Event from './models/event.js';
import { config } from './config/config.js';
import { errorHandler } from './middlewares/error.handler.js';
import { geolocationService } from './services/geolocation.service.js';
import { weatherService } from './services/weather.service.js';
import { spotifyService } from './services/spotify.service.js';
// Cargar variables 
// dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.send(`Server running on port ${config.app.port}`);
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
app.post('/event', async (req, res) => {
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

/// TESTS

// Address -> coordenates
app.post('/coordinates', async (req, res) => {
    const { address } = req.body;
    const response = await geolocationService.getCoordinates(address);

    return res.status(200).json(response);
})

// Coordnates -> Adresss
app.post('/address', async (req, res) => {
    const { lat, lng } = req.body;
    const response = await geolocationService.getAddress(lat, lng)

    return res.status(200).json(response);
})

app.get('/test-weather', async (req, res) => {
    try {
        const lat = 21.16;
        const lon = -86.85; 
        
        const result = await weatherService.getWeather(lat, lon);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// RUTA DE PRUEBA SPOTIFY (Borrar luego)
app.get('/test-spotify', async (req, res) => {
    try {
        const busqueda = "Bohemian Rhapsody"; // Pon la canción que quieras
        const resultados = await spotifyService.searchTracks(busqueda);
        res.json(resultados);
    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error al buscar en Spotify", 
            error: error.message 
        });
    }
});

app.use(errorHandler)

// Server running
app.listen(config.app.port, () => {
    console.log(`Server running on http://localhost:${config.app.port}`);
});

