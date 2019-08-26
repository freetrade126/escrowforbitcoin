

exports.deposit = (req, res)=>{
	res.render('pages/deposit');
}

exports.withdraw = (req, res)=>{
	let balance=500000;
	let fee=20000;
	let available=1000000;

	res.render('pages/withdraw',{
		balance: balance,
		fee: fee,
		available: available
	});
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