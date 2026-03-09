import { Router } from "express";
import { eventController } from "../controllers/event.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";
const router = Router();

router.post('/', authMiddleware, checkRole(['admin']), eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.get('/:id/weather', eventController.getEventWeather);
router.get('/:id/playlist', eventController.getEventPlaylist);
router.post('/:id/share', eventController.shareEvent);
router.patch('/:id', authMiddleware, checkRole(['admin']), eventController.updateEvent);
router.delete('/:id', authMiddleware, checkRole(['admin']), eventController.deleteEvent);


export default router;