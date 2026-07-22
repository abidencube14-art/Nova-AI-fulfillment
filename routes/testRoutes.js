const express = require("express");
const router = express.Router();

const {
    authenticatePesapal
} = require("../pesapal/auth");


router.get("/pesapal", async (req, res) => {

    const token = await authenticatePesapal();


    if(token){

        res.json({
            success: true,
            message: "PesaPal authentication successful 🚀"
        });

    } else {

        res.json({
            success: false,
            message: "PesaPal authentication failed"
        });

    }

});


module.exports = router;
