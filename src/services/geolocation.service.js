import axios from "axios";
import { config } from "../config/config.js"


export const geolocationService = {
    getCoordinates: async (address) => {
        if (!address) {
            throw new Error('Address is empty');
        }

        try {
            const coordinatesReq = await axios.get(`${config.services.googleMaps.basePath}?address=${encodeURIComponent(address)}&key=${config.services.googleMaps.key}`);
            if (coordinatesReq.data.status === 'ZERO_RESULTS') {
                throw new Error(`Address not found ${address}`);
            }
            const coordinatesFormatted = {
                lat: coordinatesReq.data.results[0].geometry.location.lat,
                lng: coordinatesReq.data.results[0].geometry.location.lng,
                address: coordinatesReq.data.results[0].formatted_address


            }

            return coordinatesFormatted;
        }
        catch (error) {
            console.error("Geolocation Error:", error.message);
            throw error;
        }

    }
}