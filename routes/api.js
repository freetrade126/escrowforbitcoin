const express = require('express');
const router = express.Router();



/** API Format
 * {
 * 		status: 'ok|fail', 
 * 		data: { ... } 
 * }
 */

/**
 * Get new address in admin wallet (pre generated addresses) 
 */
router.get('/get/address', (req, res, next)=>{
	/*
	address_testnet
	 */

	
	

	var address='';
	var result={
		'status': 'ok',
		'data'	: {
			'address' : address
		}
	};
	req.header("Content-Type", "application/json");
	res.send(JSON.stringify(result));
});

/**
 * Check transaction & returns its transaction id. 
 */
router.get('/get/tx/:address', (req, res, next)=>{
	// req.params: { "userId": "34", "bookId": "8989" }
	res.send('tx');
});

module.exports = router;