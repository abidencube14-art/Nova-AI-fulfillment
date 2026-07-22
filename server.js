const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

const shopifyWebhook =
require("./shopify/webhookHandler");

const paymentRoutes =
require("./routes/paymentRoutes");


app.use(cors());
app.use(express.json());


// Payment routes
app.use("/payments", paymentRoutes);


// Home test route
app.get("/", (req, res) => {

    res.send(
        "Nova AI Fulfillment is online 🚀"
    );

});


// Shopify webhook receiver
app.post(
    "/shopify/order-created",
    shopifyWebhook.handleOrderCreated
);


// PesaPal payment notification receiver
app.post(
    "/pesapal/payment-status",
    (req, res) => {

        console.log(
            "PesaPal update received:"
        );

        console.log(req.body);


        res.json({
            received: true
        });

    }
);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        `Nova AI running on port ${PORT}`
    );

});
