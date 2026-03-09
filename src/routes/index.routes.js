import { Router } from "express";
import eventRoutes from "./events.routes.js";
import authRoutes from "./auth.routes.js";
const router = Router();

router.use('/events', eventRoutes);
router.use('/auth',authRoutes);
export default router;