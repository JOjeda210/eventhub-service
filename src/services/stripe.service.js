import { config } from "../config/config.js"
import Stripe from "stripe";

const stripe = new Stripe(config.services.stripe.secretKey)

export const stripeService = {
    createCheckoutSession: async (eventDetails) => {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel',
                line_items: [
                    {
                        price_data: {
                            currency: 'mxn',
                            product_data: {
                                name: eventDetails.name
                            },
                            unit_amount: eventDetails.amount * 100
                        },
                        quantity: 1
                    }
                ]
            })
            return session.url;
        } catch (error) {
            console.error(" Stripe Session Error:", error.message);
            throw error;
        }
    },
    verifyWeebhookEvent: async (rawBody, signature) => {
        try {
            const event = stripe.webhooks.constructEvent(
                rawBody,
                signature,
                config.services.stripe.webhookSecret
            )
            return event;
        } catch (error) {
            console.error(" Stripe Webhook verify Error:", error.message);
            throw error;
        }

    }
}


