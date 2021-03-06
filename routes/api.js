const express = 								require('express');
const router = 									express.Router();
const apiController = 							require('../controllers/api');

/* Get new address in admin wallet (pre generated addresses)*/
router.get('/address/get', 						apiController.getAddress);

/* Check transactions */
router.get('/address/check', 					apiController.checkAddress);

/* create escrow */
router.get('/escrow/create/:amount', 			apiController.createEscrow);

/* create escrow */
router.get('/escrow/release/:escrowid', 		apiController.releaseEscrow);

/* request withdrawal */
router.get('/withdraw/request/:address/:amount',apiController.requestWithdrawal);

/* accept withdrawal */
router.get('/withdraw/accept/:requestid', 		apiController.acceptWithdrawal);

module.exports = router;