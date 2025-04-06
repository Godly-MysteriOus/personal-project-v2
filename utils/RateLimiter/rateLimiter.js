const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 20, // Allow only 10 requests per IP
    standardHeaders: true, // Add RateLimit headers in the response
    legacyHeaders: false, // Disable X-RateLimit-* headers
    handler: (req, res) => {
        res.status(429).json({
        success: false,
        error: "Max operations reached",
        });
    },
});

module.exports = limiter;
