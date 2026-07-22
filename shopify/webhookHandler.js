const orderService = require("../services/orderService");

function handleOrderCreated(req, res) {

    const order = req.body;

    console.log("Shopify order received:");
    console.log(order);

    const result = orderService.processNewOrder(order);

    res.status(200).json({
        success: true,
        message: "Order processed by Nova AI",
        result
    });

}

module.exports = {
    handleOrderCreated
};
