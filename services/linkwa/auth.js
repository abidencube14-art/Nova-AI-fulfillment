const axios = require("axios");

function getHeaders() {
    return {
        Authorization: `Bearer ${process.env.LINKWA_API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json"
    };
}

module.exports = {
    getHeaders
};
