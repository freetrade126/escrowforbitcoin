

exports.deposit = (req, res)=>{
	res.render('deposit');
}

exports.withdraw = (req, res)=>{
	res.render('withdraw');
}

exports.transactions = (req, res)=>{
	res.render('transactions');
}
exports.qrcode = (req, res)=>{
	res.send('')
}

