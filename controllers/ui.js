

exports.deposit = (req, res)=>{
	res.render('pages/deposit');
}

exports.withdraw = (req, res)=>{
	res.render('pages/withdraw');
}

exports.transactions = (req, res)=>{
	res.render('pages/transactions');
}
exports.qrcode = (req, res)=>{
	let address=req.params.address;
	let amount=req.params.amount;
	console.log(address)
	console.log(amount)
	res.send(address + ' - ' + amount)
}