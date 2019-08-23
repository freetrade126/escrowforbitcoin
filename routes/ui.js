const express = 								require('express');
const router = 									express.Router();
const uiController = 							require('../controllers/ui');

router.post('/deposit', 						uiController.deposit);

router.get('/withdraw', 						uiController.withdraw);
router.get('/transactions', 					uiController.transactions);
router.get('/qrcode/:address/:amount', 			uiController.qrcode);

module.exports = router;
