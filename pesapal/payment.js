const axios = require("axios");

const {
    authenticatePesapal
} = require("./auth");


async function createPayment(order) {


    const token = await authenticatePesapal();


    if(!token){

        return {
            success:false,
            message:"Could not authenticate with PesaPal"
        };

    }



    const paymentData = {


        id: "NS-" + Date.now(),

        currency: "USD",

        amount: order.amount,

        description:
        "Nova Select Order Payment",


        callback_url:
        "https://YOUR-NOVA-AI-URL.com/pesapal/payment-status",


        billing_address: {

            email_address:
            order.email,


            phone_number:
            order.phone,


            first_name:
            order.firstName,


            last_name:
            order.lastName

        }

    };



    try {


        const response = await axios.post(

        "https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest",

        paymentData,

        {

            headers:{

                Authorization:
                `Bearer ${token}`,

                "Content-Type":
                "application/json"

            }

        });



        return response.data;



    } catch(error){


        console.log(
            "PesaPal payment error"
        );


        console.log(error.message);


        return null;

    }


}


module.exports = {
    createPayment
};
