const express = require("express");
const testRoutes =
require("./routes/testRoutes");
const orderRoutes = require("./routes/orderRoutes");
const demoOrder =
require("./routes/demoOrder");
const getIpn = require("./routes/getIpn");
const apiRoutes = require("./routes/api");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const {
    helmet,
    cors,
    limiter
} = require("./middleware/security");
const validateConfig = require("./config/validateConfig");

require("dotenv").config();

const app = express();
validateConfig();
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


app.use(express.json());
app.use(requestLogger);
app.use("/test", testRoutes);
app.use("/orders", orderRoutes);
app.use("/demo-payment",demoOrder);
app.use("/ipn-list", getIpn);
app.use("/api/v1", apiRoutes);


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
