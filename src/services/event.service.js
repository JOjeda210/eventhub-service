import Event from "../models/event.js";
import { geolocationService } from "./geolocation.service.js";
import {weatherService} from "./weather.service.js"
import { spotifyService } from "./spotify.service.js";


export const eventService = {
    buildAndSaveEvent: async (eventPayload) => {
        const { location } = eventPayload;
        const address = await geolocationService.getCoordinates(location)
        const {lat, lng} = address; 
        const weatherData = await weatherService.getWeather(lat,lng)
        const {eventType} = eventPayload;
        const tracks = await spotifyService.searchTracks(eventType)
        const eventData = {
            ...eventPayload,
            location: address,
            weather : weatherData,
            spotify : tracks
        }
        const savedEvent = await Event.create(eventData)
        return savedEvent;
    }

}