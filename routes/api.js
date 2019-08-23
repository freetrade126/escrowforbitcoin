const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

/* Get new address in admin wallet (pre generated addresses) */
router.get('/address/get', 				apiController.getAddress);

/* Check transactions */
router.get('/address/check/:address', 	apiController.checkAddress);

/* create escrow */
router.get('/escrow/create', 			apiController.createEscrow);

/* create escrow */
router.get('/escrow/release', 			apiController.releaseEscrow);

/* request withdrawal */
router.get('/withdraw/request', 		apiController.requestWithdrawal);

/* accept withdrawal */
router.get('/withdraw/accept', 			apiController.acceptWithdrawal);

module.exports = router;