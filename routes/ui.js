const express = 								require('express');
const router = 									express.Router();
const uiController = 							require('../controllers/ui');

router.get('/deposit', 							uiController.deposit);

router.get('/withdraw', 						uiController.withdraw);

router.get('/transactions', 					uiController.transactions);

module.exports = router;
