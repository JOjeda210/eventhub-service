import express from 'express';
import { errorHandler } from './middlewares/error.handler.js';
import { geolocationService } from './services/geolocation.service.js';
import { weatherService } from './services/weather.service.js';
import { spotifyService } from './services/spotify.service.js';
import { stripeService } from './services/stripe.service.js';
import { config } from './config/config.js';
import Event from './models/event.js';
import routes from './routes/index.routes.js'

import Stripe from 'stripe';

const app = express();
// TODO: Distribuir endpoint en arquitectura
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = await stripeService.verifyWeebhookEvent(req.body, sig)
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const paymentIntent = event.data.object;
    }

    res.json({ received: true });
});

// Middleware
app.use(express.json());

app.use('/api',routes); 

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

/// TESTS

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

app.get('/test-stripe', async (req, res) => {
    try {
        // Simulamos los datos que en el futuro sacaremos de MongoDB
        const mockEvent = {
            name: "Pase VIP EventHub",
            amount: 1250 // $1,250 MXN
        };

        const checkoutUrl = await stripeService.createCheckoutSession(mockEvent);

        res.redirect(checkoutUrl);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use(errorHandler)

export default app;