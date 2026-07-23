const axios = require("axios");

const {
    authenticatePesapal
} = require("../pesapal/auth");

const {
    buildPaymentRequest
} = require("../utils/buildPaymentRequest");


async function submitOrder(order){

    const token =
    await authenticatePesapal();

    if(!token){
        throw new Error("Authentication failed");
    }

    const payment =
    buildPaymentRequest(order);

    const response =
    await axios.post(

        "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest",

        payment,

        {

            headers:{

                Authorization:`Bearer ${token}`,

                "Content-Type":"application/json"

            }

        }

    );

    return response.data;

}

module.exports={
    submitOrder
};
