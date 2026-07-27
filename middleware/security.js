const helmet = require("helmet");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false
});

module.exports = {
    helmet,
    cors,
    limiter
};
