const modelWallet = require('../models/wallet');
const modelWithdrawal = require('../models/withdrawal');
const uid=100;
const WITHDRAWAL_FEE = 20000;
const WITHDRAWAL_MIN = 10000;

const user='galaxy126@protonmail.com';


exports.deposit = (req, res)=>{
	res.render('pages/deposit');
}

exports.withdraw =async (req, res)=>{
	let result=await modelWallet.findOne({uid:uid});
	let balance=result.btc;
	let fee=WITHDRAWAL_FEE;
	let available=balance-fee;
	if(available<WITHDRAWAL_MIN) available=0;

	res.render('pages/withdraw',{
		balance: (balance/100000000).toFixed(8),
		fee: (fee/100000000).toFixed(8),
		available: (available/100000000).toFixed(8)
	});
}

exports.submitWithdraw = async(req,res)=>{
	backURL=req.header('Referer') || '/';

	const params = req.body;
	let address=params.address;
	let amount=params.amount;
	let result=await modelWallet.findOne({uid:uid});
	let balance=result.btc;
	let fee=WITHDRAWAL_FEE;
	let available=balance-fee;
	if(amount>available) {
		backURL+="?error=invalid";
	}
	res.redirect(backURL);
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