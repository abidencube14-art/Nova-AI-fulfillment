function errorHandler(err, req, res, next) {

    console.error("========== ERROR ==========");
    console.error(err);
    console.error("===========================");

    if (err.response && err.response.data) {
        return res.status(500).json({
            success: false,
            source: "Linkwa",
            error: err.response.data
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

}

module.exports = errorHandler;
