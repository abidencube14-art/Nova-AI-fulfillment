const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.send("Nova AI Fulfillment is running 🚀");
});

// Shopify webhook receiver (we will connect Shopify here)
app.post("/shopify/order-created", (req, res) => {
  const order = req.body;

  console.log("New Shopify Order Received:");
  console.log(order);

  res.status(200).send({
    message: "Order received by Nova AI Fulfillment"
  });
});

// PesaPal payment notification receiver (IPN)
app.post("/pesapal/payment-status", (req, res) => {

  const payment = req.body;

  console.log("PesaPal Payment Update:");
  console.log(payment);

  res.status(200).send({
    message: "Payment notification received"
  });
});


app.listen(PORT, () => {
  console.log(`Nova AI Fulfillment running on port ${PORT}`);
});
