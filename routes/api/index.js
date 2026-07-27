const express = require("express");

const router = express.Router();

const linkwaRoutes = require("../linkwa");
const shopifyRoutes = require("../shopify");

router.use("/linkwa", linkwaRoutes);

router.use("/shopify", shopifyRoutes);

module.exports = router;
