const express = require("express");
const router = express.Router();

const {
    createPaymentLink
} = require("../services/linkwa/payments");

const {
    paymentWebhook
} = require("../services/linkwa/webhook");

router.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Linkwa routes are working 🚀"
    });

});

router.post("/create-payment", async (req, res) => {

    try {

        const payment = await createPaymentLink({
            amount: 10,
            name: "Nova Select Order",
            description: "Test Order",
            return_url: "https://nova-ai-fulfillment.onrender.com/linkwa/return",
            customer_name: "Test Customer",
            email: "test@example.com",
            phone: "263771234567"
        });

        res.json(payment);

    } catch (err) {

        res.status(500).json(err);

    }

});

router.post("/webhook", paymentWebhook);

router.get("/return", (req, res) => {

    res.send("Payment Complete 🎉");

});

module.exports = router;
