const orderService =
require("../services/orderService");


const {
handleOrderPayment
}
=
require("../services/paymentService");



async function handleOrderCreated(req,res){


    const order =
    req.body;



    console.log(
        "New Shopify order received:"
    );


    console.log(order);



    const orderResult =
    orderService.processNewOrder(order);



    const paymentResult =
    await handleOrderPayment(order);



    res.status(200).json({

        success:true,

        order:
        orderResult,


        payment:
        paymentResult

    });


}



module.exports = {

    handleOrderCreated

};
