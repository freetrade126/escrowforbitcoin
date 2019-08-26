const ObjectId = require('mongodb').ObjectID

const modelWallet = require('../models/wallet');
const modelWithdrawal = require('../models/withdrawal');
const modelTransactions = require('../models/transactions');
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

exports.requestWithdraw = async(req,res,next)=>{
	backURL=req.header('Referer') || '/';

	const params = req.body;
	let address=params.address;
	let amount=params.amount*100000000;
	let result=await modelWallet.findOne({uid:uid});
	let balance=result.btc;
	let fee=WITHDRAWAL_FEE;
	let available=balance-fee;
	if(amount>available) {
		backURL+="?error=invalid";
		res.redirect(backURL);
		return;
	}
	let now=(+new Date(new Date().toUTCString()))/1000;
	result.btc-=amount+fee;
	result.btclocked+=amount;
	result.updated=now;
	modelWallet.update({_id: result._id}, result);
	modelWithdrawal.insertOne({
		uid: uid,
		user:user,
		address: address,
		amount: amount,
		fee: fee,
		tx: '',
		status: 0,
		updated: now,
		created: now
	}).then(row=>{
		res.redirect('/ui/withdraw/confirm/'+row.insertedId);
	})

	
}
exports.confirmWithdraw=async(req,res)=>{
	let id=req.params.ticket;
	let result=await modelWithdrawal.findOne({_id:ObjectId(id)});
	if(result) {
		res.render('pages/confirmwithdraw',{
			address: result.address,
			amount: (result.amount/100000000).toFixed(8),
			tx: result.tx,
			fee: (result.fee/100000000).toFixed(8),
			status: result.status,
			created: result.created
		});
	}
	
	
}
exports.transactions = async (req, res)=>{
	modelTransactions.find({uid:uid}).toArray(function (err, result) {
        console.log(result)
		res.render('pages/transactions',{
			rows: result
		});
    });
	
}
exports.qrcode = (req, res)=>{
	let address=req.params.address;
	let amount=req.params.amount;
	console.log(address)
	console.log(amount)
	res.send(address + ' - ' + amount)
}