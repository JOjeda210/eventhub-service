import axios from "axios";
import { config } from "../config/config.js"

export const weatherService = {
    getWeather: async (lat, lon) => {
        if(!lat || !lon){
            throw new Error('Lat and lon are required'); 
        };

        try{
            const response = await axios.get(`${config.services.openweather.basePath}?lat=${lat}&lon=${lon}&appid=${config.services.openweather.key}&units=metric&lang=es`);
            const weatherData = {
                temperature: response.data.main.temp, 
                feels: response.data.main.feels_like, 
                description: response.data.weather[0].description,
                icon : response.data.weather[0].icon

            }
            return weatherData; 
        }catch(error){
            console.error("Weather Error:", error.message);
            throw error;
        }
    }
}
