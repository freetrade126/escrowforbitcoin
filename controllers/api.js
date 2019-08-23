const api = require('../libs/galaxy_btc_api');

const modelAddress = require('../models/address');
const modelWallet = require('../models/wallet');
const modelTransactions = require('../models/transactions');
const modelEscrow = require('../models/escrow');

const uid=100;
const user='galaxy126@protonmail.com';

const network = 'testnet'; /* testnet, mainnet */

const send=(res,status,data)=>{
	let result={status:status,data: data};
	res.header("Content-Type", "application/json");
	res.send(JSON.stringify(result));
};

exports.getAddress = async (req, res)=>{
	let result=await modelAddress.findOne({uid:uid,balance:0});
	let address='';
	if(result) {
		address=result.address;
	}else{
		result=await modelAddress.findOne({uid:0,balance:0});
		if(result) {
			result.uid=uid;
			result.user=user;
			result.created=+new Date(new Date().toUTCString());
			modelAddress.update({_id: result._id}, result);
			address=result.address;
		}
	}
	if(address) send(res,'ok',address)
	else send(res,'fail','No availible address')
}

exports.checkAddress = async (req, res)=>{
	let address=req.params.address;
	result=await modelAddress.findOne({uid:uid,address:address});
	if(result) {
		let result=await api.getAddress[network](address);
		if(result) {
			// result.updated=+new Date(new Date().toUTCString());
			// modelAddress.update({_id: result._id}, result);
			if(result.txs.length) {
	
			}
			send(res, 'ok', result)
		}else{
			send(res, 'fail','')
		}

		
	}
	
}
/* 
exports.getTransaction = async (req, res)=>{
	let hash=req.params.hash;
	let result=await api.getTx[network](hash);
	if(result) {
		send(res, 'ok', result)
	}else{
		send(res, 'fail','')
	}
} */

exports.createEscrow = async (req, res)=>{
}
exports.releaseEscrow = async (req, res)=>{
}
exports.requestWithdrawal = async (req, res)=>{
}
exports.acceptWithdrawal = async (req, res)=>{
}
