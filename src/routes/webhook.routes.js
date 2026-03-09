import { Router} from "express";
import express from "express"
import { stripeController } from "../controllers/stripe.controller.js";

const router = Router(); 

router.post('/',express.raw({ type: 'application/json' }), stripeController.stripeWebhook);


export default router; 