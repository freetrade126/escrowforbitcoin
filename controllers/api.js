const wallet = require('../models/wallet');
const api = require('../libs/galaxy_btc_api');
const uid=100;
const network = 'testnet'; /* testnet, mainnet */

const send=(res,status,data)=>{
	let result={status:status,data: data};
	res.header("Content-Type", "application/json");
	res.send(JSON.stringify(result));
};

exports.getAddress = async (req, res)=>{
	let result=await wallet.findOne({uid:uid,balance:0});
	let address='';
	if(result) {
		address=result.address;
	}else{
		result=await wallet.findOne({uid:0,balance:0});
		if(result) {
			result.uid=uid;
			wallet.update({_id: result._id}, result);
			address=result.address;
		}
	}
	if(address) send(res,'ok',address)
	else send(res,'fail','No availible address')
}

exports.checkAddress = async (req, res)=>{
	let address=req.params.address;
	let result=await api.getAddress[network](address);
	if(result) {
		if(result.txs.length) {
			
		}
		send(res, 'ok', result)
	}else{
		send(res, 'fail','')
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
