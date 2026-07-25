async function paymentWebhook(req, res) {

    console.log("Webhook Received");

    console.log(req.body);

    res.status(200).json({
        success: true
    });

}

module.exports = {
    paymentWebhook
};
