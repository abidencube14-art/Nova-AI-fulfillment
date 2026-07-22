function sendPaymentEmail(customer, paymentLink) {


    console.log("Sending Nova Select payment email");


    const email = {

        subject: "Complete your Nova Select payment",

        message: `
        Thank you for shopping with Nova Select!

        Your order has been reserved.

        Complete your secure payment through PesaPal:

        ${paymentLink}

        🔒 Protected by PesaPal

        Your order will be processed immediately after payment.
        `

    };


    console.log(email);


    return email;

}


module.exports = {
    sendPaymentEmail
};
