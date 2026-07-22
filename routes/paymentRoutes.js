const express = require("express");

const router = express.Router();

const {
createPayment
}
=
require("../pesapal/payment");



router.post(
"/create-payment",
async(req,res)=>{


    const order = req.body;


    const payment =
    await createPayment(order);



    res.json(payment);


});


module.exports = router;
