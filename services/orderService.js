function processNewOrder(order) {

    console.log("Processing Nova Select order...");

    return {
        status: "received",
        orderId: order.id
    };

}

module.exports = {
    processNewOrder
};
