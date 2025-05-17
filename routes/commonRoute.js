const express = require('express');
const router = express.Router();
const csrfProtection = require('../middleware/CSRF/csrfProtection');
const commonController = require('../controllers/commonController');
const rateLimit = require('../utils/RateLimiter/rateLimiter');
const checks = require('../utils/check/check');
router.post('/subscribe-to-newsletter',[checks.emailValidation('emailId')],rateLimit,csrfProtection,commonController.postSubscriptionToNewsLetter);
router.post('/raise-user-query',
    [checks.emailValidation('emailId'),checks.mobileNumberValidation('mobileNo'),checks.basicMessageValidation('message')],
    rateLimit,csrfProtection,commonController.postUserQueries
);

module.exports = router;
