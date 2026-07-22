const {
    createPayment
} = require("../pesapal/payment");


const {
    sendPaymentEmail
} = require("../email/paymentEmail");



async function handleOrderPayment(order) {


    console.log(
        "Starting payment process..."
    );


    const payment =
    await createPayment(order);



    if(!payment){

        return {
            success:false,
            message:
            "Payment creation failed"
        };

    }



    const paymentLink =
    payment.redirect_url ||
    "PesaPal link pending";



    const email =
    sendPaymentEmail(
        order.customer,
        paymentLink
    );



    return {

        success:true,

        payment,

        email

    };


}



module.exports = {

    handleOrderPayment

};
