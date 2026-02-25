import { Router } from "express";
import { eventController } from "../controllers/event.controller.js";
const router = Router(); 

router.post('/', eventController.createEvent)

export default router;