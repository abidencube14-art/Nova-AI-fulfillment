const required = [
    "LINKWA_API_KEY",
    "LINKWA_BASE_URL"
];

function validateConfig() {

    const missing = required.filter(
        key => !process.env[key]
    );

    if (missing.length > 0) {

        throw new Error(
            `Missing environment variables: ${missing.join(", ")}`
        );

    }

    console.log("Configuration validated.");

}

module.exports = validateConfig;
