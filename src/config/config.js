import dotenv from 'dotenv';

dotenv.config()

export const config = {
    app : {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },
    mongoDB : {
        uri : process.env.MONGO_URI,
        password: process.env.DB_PASSWORD
    },
    services: {
        googleMaps: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            basePath : "https://maps.googleapis.com/maps/api/geocode/json"
        },
        openweather: {
            key: process.env.OPENWEATHER_API_KEY,
            basePath: "https://api.openweathermap.org/data/2.5/weather"
        },
        spotify: {
            key: process.env.SPOTIFY_CLIENT_SECRET,
            userId: process.env.SPOTIFY_CLIENT_ID,
            basePath: "https://accounts.spotify.com/api/token",
            searchPath : "https://api.spotify.com/v1/search"
        },
        stripe:{
            secretKey: process.env.STRIPE_SECRET_KEY,
            publicKey: process.env.STRIPE_PUBLIC_KEY
        }
        
    }
};
