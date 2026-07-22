const axios = require("axios");
const config = require("../config/settings");


async function authenticatePesapal() {

    try {

        const response = await axios.post(

            "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken",

            {
                consumer_key: config.pesapal.consumerKey,
                consumer_secret: config.pesapal.consumerSecret
            },

            {
                headers: {
                    "Content-Type": "application/json"
                }
            }

        );


        console.log("PesaPal Response:");
        console.log(response.data);


        return response.data.token;


    } catch(error) {


        console.log("PesaPal Error:");

        if(error.response){

            console.log(error.response.data);

            return null;

        }


        console.log(error.message);

        return null;

    }

}


module.exports = {
    authenticatePesapal
};
