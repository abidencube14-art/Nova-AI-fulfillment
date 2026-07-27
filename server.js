const express = require("express");
const cors = require("cors");
const testRoutes =
require("./routes/testRoutes");
const orderRoutes = require("./routes/orderRoutes");
const demoOrder =
require("./routes/demoOrder");
const getIpn = require("./routes/getIpn");
const linkwaRoutes = require("./routes/linkwa");
const shopifyRoutes = require("./routes/shopify");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const {
    helmet,
    cors,
    limiter
} = require("./middleware/security");

require("dotenv").config();

const app = express();
app.use(helmet());

app.use(cors({
    origin: true
}));

app.use(limiter);
app.disable("x-powered-by");

const shopifyWebhook =
require("./shopify/webhookHandler");

const paymentRoutes =
require("./routes/paymentRoutes");


app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/test", testRoutes);
app.use("/orders", orderRoutes);
app.use("/demo-payment",demoOrder);
app.use("/ipn-list", getIpn);
app.use("/linkwa", linkwaRoutes);
app.use("/shopify", shopifyRoutes);


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

app.use(errorHandler);

app.listen(PORT, () => {

    console.log(
        `Nova AI running on port ${PORT}`
    );

});
