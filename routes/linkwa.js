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

        const {
            amount,
            customer_name,
            email,
            phone,
            order_id
        } = req.body;

        const payment = await createPaymentLink({

            amount,

            name: `Nova Select Order #${order_id}`,

            description: `Payment for Order #${order_id}`,

            return_url: "https://nova-ai-fulfillment.onrender.com/linkwa/return",

            customer_name,

            email,

            phone

        });

        res.json(payment);

    } catch (err) {

        console.error(err);

        res.status(500).json(err);

    }

});

router.get("/demo-payment", async (req, res) => {

    try {

        const payment = await createPaymentLink({

            amount: 15,

            name: "Nova Select Demo Order",

            description: "Demo Payment",

            return_url: "https://nova-ai-fulfillment.onrender.com/linkwa/return",

            customer_name: "Abide Ncube",

            email: "isaacmapfumo4@gmail.com",

            phone: "263771234567"

        });

        res.json(payment);

    } catch (err) {

        console.error(err);

        res.status(500).json(err);

    }

});

router.post("/webhook", paymentWebhook);

router.get("/return", (req, res) => {

    res.send("Payment Complete 🎉");

});

module.exports = router;
