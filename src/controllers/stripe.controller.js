import { stripeService } from "../services/stripe.service.js";

export const stripeController = {
    stripeWebhook: async (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = await stripeService.verifyWeebhookEvent(req.body, sig)
            if (event.type === 'checkout.session.completed') {
                const paymentIntent = event.data.object;
            }
            res.json({ received: true });
        } catch (error) {
            res.status(500).send(`Webhook error ${error.message}`)
        }
    }
}