const axios = require("axios");
const { getHeaders } = require("./linkwaAuth");

const BASE_URL = process.env.LINKWA_BASE_URL;

async function createPaymentLink(order) {
    try {

        const response = await axios.post(
            `${BASE_URL}/payment-links`,
            {
                amount: order.amount,
                currency_code: "USD",
                payment_link_name: order.name,
                description: order.description,
                return_url: order.return_url,

                autofill_contact_details: {
                    full_name: order.customer_name,
                    email: order.email,
                    phone_number: order.phone
                }
            },
            {
                headers: getHeaders()
            }
        );

        return response.data;

    } catch (error) {

        if (error.response) {
            console.log(error.response.data);
            throw error.response.data;
        }

        throw error;
    }
}

module.exports = {
    createPaymentLink
};
