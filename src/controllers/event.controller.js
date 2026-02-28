import { eventService } from "../services/event.service.js"
import { successRes, errorRes } from "../utils/response.helper.js"

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
    }
}