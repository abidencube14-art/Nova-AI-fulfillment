const express = require("express");
const router = express.Router();

const { createPaymentLink } = require("../services/linkwa/payments");

router.post("/order-created", async (req, res) => {

    try {

        const order = req.body;

        const payment = await createPaymentLink({

            amount: order.total_price,

            name: `Nova Select Order #${order.order_number}`,

            description: `Payment for Shopify Order #${order.order_number}`,

            return_url: "https://nova-ai-fulfillment.onrender.com/linkwa/return",

            customer_name: `${order.customer.first_name} ${order.customer.last_name}`,

            email: order.customer.email,

            phone: order.customer.phone

        });

        console.log("Payment Link Created");

        console.log(payment.product.checkout_url);

        res.json(payment);

    } catch (error) {

        console.error(error);

        res.status(500).json(error);

    }

});

module.exports = router;
