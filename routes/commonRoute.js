const express = require('express');
const router = express.Router();
const path = require('path');
const csrfProtectionV2 = require(path.join('..','middleware','CSRF','csrfProtection'));
const commonControllerV2 = require(path.join('..','controllers','commonController'));
router.post('/subscribe-to-newsletter',csrfProtectionV2,commonControllerV2.postSubscriptionToNewsLetter);


module.exports = router;