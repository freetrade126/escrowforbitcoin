const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

/* Get new address in admin wallet (pre generated addresses) */
router.get('/get/address', apiController.getAddress);

/* Check transaction & returns its transaction id. */
router.get('/get/tx/:address', apiController.getTransaction);

module.exports = router;