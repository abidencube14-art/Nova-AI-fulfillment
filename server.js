const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/payments", paymentRoutes);

require("dotenv").config();

const app = express();

const shopifyWebhook =
require("./shopify/webhookHandler");


app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;



app.get("/", (req,res)=>{

    res.send(
        "Nova AI Fulfillment is online 🚀"
    );

});



app.post(
"/shopify/order-created",
shopifyWebhook.handleOrderCreated
);



app.post(
"/pesapal/payment-status",
(req,res)=>{

    console.log(
        "PesaPal update received:"
    );

    console.log(req.body);


    res.json({
        received:true
    });

});



app.listen(PORT,()=>{

    console.log(
        `Nova AI running on port ${PORT}`
    );

});
