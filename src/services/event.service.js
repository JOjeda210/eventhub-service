import Event from "../models/event.js";
import { geolocationService } from "./geolocation.service.js";
import { weatherService } from "./weather.service.js"
import { spotifyService } from "./spotify.service.js";


export const eventService = {
    buildAndSaveEvent: async (eventPayload) => {
        const { location } = eventPayload;
        const address = await geolocationService.getCoordinates(location)
        const { lat, lng } = address;
        const weatherData = await weatherService.getWeather(lat, lng)
        const { eventType } = eventPayload;
        const tracks = await spotifyService.searchTracks(eventType)
        const eventData = {
            ...eventPayload,
            location: address,
            weather: weatherData,
            spotify: tracks
        }
        const savedEvent = await Event.create(eventData)
        return savedEvent;
    },
    fetchEvents: async () => {
        const events = await Event.find().limit(10);
        return events;
    },
    findEvent: async (id) => {
        const event = await Event.findById(id)
        if (!event) {
            throw new Error('Event not found');
        }
        return event;
    },
    getUpdatedWeather: async (id) => {
        const event = await eventService.findEvent(id);
        const { lat, lng } = event.location;

        const currentWeather = await weatherService.getWeather(lat, lng);
        return currentWeather;
    },
    getEventPlaylist: async (id) => {
        const event = await eventService.findEvent(id);
        const eventType  = event.eventType;

        const newSounds = await spotifyService.searchTracks(eventType); 
        return newSounds; 
    }


}