const api = require('../libs/galaxy_btc_api');

const modelAddress = require('../models/address');
const modelWallet = require('../models/wallet');
const modelTransactions = require('../models/transactions');
const modelEscrow = require('../models/escrow');

const MIN_CONFIRMATIONs = 3;
const uid=100;
const user='galaxy126@protonmail.com';

const network = 'testnet'; /* testnet, mainnet */

const send=(res,status,data)=>{
	let result={status:status,data: data};
	res.header("Content-Type", "application/json");
	res.send(JSON.stringify(result));
};

const address=async ()=>{
	let result=await modelAddress.findOne({uid:uid,status:0});
	if(result==null) {
		result=await modelAddress.findOne({uid:0});
		if(result) {
			result.uid=uid;
			result.user=user;
			result.created=(+new Date(new Date().toUTCString()))/1000;
			modelAddress.update({_id: result._id}, result);
		}
	}
	return result;
}

exports.getAddress = async (req, res)=>{
	let result=await address();
	send(res, 'ok', {
		address: result.address,
		tx: result.tx,
		status: result.status,
		amount: result.balance,
		confirmations: result.confirmations
	})
}

exports.checkAddress = async (req, res)=>{
	let result=await address();
	if(result.tx=='') {
		let resApi=await api.getAddress[network](result.address);
		if(resApi) {
			if(resApi.txs.length) {
				result.tx=resApi.txs[resApi.txs.length-1];
				result.balance=resApi.balance+resApi.unconfirmed_balance;
			}
		}
	}
	if(result.tx) {
		let resApi=await api.getTx[network](result.tx);
		if(resApi) {
			result.confirmations=resApi.confirmations;
			if(result.confirmations>=MIN_CONFIRMATIONs) {
				result.status=100;
				let row = null;
				row=await modelWallet.findOne({uid:uid});
				if(row) {
					row.btc+=result.balance;
					modelAddress.update({_id: row._id}, row);
				}else{
					row={
						uid: uid,
						user: user,
						btc: result.balance,
						btclocked: 0
					};
					modelWallet.insertOne(row);
				}
				modelTransactions.insertOne({
					uid: uid,
					user: user,
					btc: result.balance,
					note: 'Deposit from '+result.address
				});
			}
			
		}
	}
	result.updated=(+new Date(new Date().toUTCString()))/1000;
	modelAddress.update({_id: result._id}, result);
	send(res, 'ok', {
		address: result.address,
		tx: result.tx,
		status: result.status,
		amount: result.balance,
		confirmations: result.confirmations
	})
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
