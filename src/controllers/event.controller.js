import { eventService } from "../services/event.service.js"
import { successRes, errorRes } from "../utils/response.helper.js"
import { socialService } from "../services/social.service.js";


export const eventController = {
    createEvent: async (req, res) => {
        try {
            const newEvent = await eventService.buildAndSaveEvent(req.body);
            return successRes(req, res, { "data": newEvent }, 201)
        } catch (error) {
            return errorRes(req, res, { "error": error.message }, 500);
        }
    },
    getEvents: async (req, res) => {
        try {
            const events = await eventService.fetchEvents();
            return successRes(req, res, { "data": events }, 200)
        } catch (error) {
            return errorRes(req, res, { "error": error.message }, 500);
        }
    },
    getEventById: async (req, res) => {
        try {
            const id = req.params.id;
            const event = await eventService.findEvent(id)
            return successRes(req, res, { "data": event }, 200);
        } catch (error) {
            if (error.message === 'Event not found') {
                return errorRes(req, res, { "error": error.message }, 404);
            }
            return errorRes(req, res, { "error": error.message }, 500);
        }
    },
    getEventWeather: async (req, res) => {
        try {
            const id = req.params.id;
            const weather = await eventService.getUpdatedWeather(id);
            return successRes(req, res, { "data": weather }, 200);
        } catch (error) {
            if (error.message === 'Event not found') {
                return errorRes(req, res, { "error": error.message }, 404);
            }
            return errorRes(req, res, { "error": error.message }, 500);
        }
    },
    getEventPlaylist: async (req, res) => {
        try {
            const id = req.params.id;
            const tracks = await eventService.getEventPlaylist(id)
            return successRes(req, res, { "data": tracks }, 200);
        } catch (error) {
            if (error.message === 'Event not found') {
                return errorRes(req, res, { "error": error.message }, 404);
            }
            return errorRes(req, res, { "error": error.message }, 500);
        }
    },
    shareEvent: async (req, res) => {
        try {
            const id = req.params.id;
            const event = await eventService.findEvent(id);
            const { platform } = req.body;
            // TODO: Replace hardcoded URL with dynamic URL from request/env
            const eventUrl = `http://localhost:5173/events/${id}`;

            const shareLink = socialService.generateShareUrl(platform, { title: event.title, eventUrl })
            return successRes(req, res, { data: shareLink }, 200)
        } catch (error) {
            if (error.message === 'Event not found') {
                return errorRes(req, res, { "error": error.message }, 404);
            }
            return errorRes(req, res, { "error": error.message }, 400);
        }
    },
    updateEvent: async (req, res) => {
        const id = req.params.id
        const updateData = req.body
        try {
            const updateEvent = await eventService.updateEvent(id, updateData);
            return successRes(req, res, { data: updateEvent }, 200)
        } catch (error) {
            if (error.message === "Event not found") {
                return errorRes(req, res, { error: error.message }, 404)
            }
            return errorRes(req, res, { "error": error.message }, 400);
        }
    },
    deleteEvent: async (req, res) => {
        const id = req.params.id
        try {
            const eventDeleted = await eventService.deleteEvent(id);
            return successRes(req, res, { data: eventDeleted }, 200)
        } catch (error) {
            if (error.message === "Event not found") {
                return errorRes(req, res, { error: error.message }, 404)
            }
            return errorRes(req, res, { "error": error.message }, 400);
        }
    }
}