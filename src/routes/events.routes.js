import { Router } from "express";
import { eventController } from "../controllers/event.controller.js";
const router = Router(); 

router.post('/', eventController.createEvent)
router.get('/', eventController.getEvents)
router.get('/:id', eventController.getEventById)
router.get('/:id/weather', eventController.getEventWeather)
router.get('/:id/playlist', eventController.getEventPlaylist)

export default router;