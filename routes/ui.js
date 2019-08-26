const express = 								require('express');
const router = 									express.Router();
const uiController = 							require('../controllers/ui');

router.get('/deposit', 							uiController.deposit);

router.get('/withdraw', 						uiController.withdraw);
router.post('/withdraw/request', 				uiController.requestWithdraw);
router.get('/withdraw/confirm/:ticket', 		uiController.confirmWithdraw);

router.get('/transactions', 					uiController.transactions);

module.exports = router;
