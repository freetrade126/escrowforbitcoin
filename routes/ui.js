const express = require('express');
const router = express.Router();

router.post('/depositbtc', (req, res, next)=>{
	res.send('Deposit');
});

router.get('/withdraw', (req, res, next)=>{
	// req.params: { "userId": "34", "bookId": "8989" }
	res.send('Withdraw');
});
router.get('/transactions', (req, res, next)=>{
	// req.params: { "userId": "34", "bookId": "8989" }
	res.send('transactions');
});
module.exports = router;
