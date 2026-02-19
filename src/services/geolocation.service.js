import axios from "axios";
import { config } from "../config/config.js"


export const geolocationService = {
    // This method returns the complete location includes lat, lng and address
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
    },
    getAddress : async(lat,lng) =>{
        if(!lat || !lng){
            throw new Error('Cordinate or Coordinates are empty');
        }

        try{
            const addressReq = await axios.get(`${config.services.googleMaps.basePath}?latlng=${lat},${lng}&key=${config.services.googleMaps.key}`);
            if (addressReq.data.status === 'ZERO_RESULTS') {
                throw new Error(`Coordinates not found : ${lat},${lng}`);
            };

            const address = addressReq.data.results[0].formatted_address; 
            return address;
        }catch(error){
            console.error("Geolocation Error:", error.message);
            throw error;
        }


    }
}