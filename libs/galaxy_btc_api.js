const request = require('superagent');

const getFee = ()=>{
	return new Promise((resolve,reject)=>{
		request.get('https://bitcoinfees.earn.com/api/v1/fees/recommended').send().then(res=> resolve(res.body['fastestFee']))
	});
};
const getAddress = {
	mainnet: addr=>{
		return new Promise((resolve,reject)=>{
			request.get('https://api.blockcypher.com/v1/btc/main/addrs/'+addr).send().then(res=>{
				let result={
					balance: res.body.balance,
					unconfirmed_balance: res.body.unconfirmed_balance,
					txs: []
				}
				if(res.body.txrefs) res.body.txrefs.map(tx=>result.txs.push(tx.tx_hash))
				resolve(result)
			})
		},reason=>{
			reject(reason)
		})
	},
	testnet: addr=>{
		return new Promise((resolve,reject)=>{
			request.get('https://api.blockcypher.com/v1/btc/test3/addrs/'+addr).send().then(res=>{
				let result={
					balance: res.body.balance,
					unconfirmed_balance: res.body.unconfirmed_balance,
					txs: []
				}
				if(res.body.txrefs) res.body.txrefs.map(tx=>result.txs.push(tx.tx_hash))
				resolve(result)
			})
		},reason=>{
			reject(reason)
		})
	}
};
const getTx = {
	mainnet: hash=>{
		return new Promise((resolve,reject)=>{
			request.get('https://api.blockcypher.com/v1/btc/main/txs/'+hash).send().then(res=>{
				let result={
					value: res.body.total,
					fee: res.body.fees,
					confirmations:res.body.confirmations
				}
				resolve(result)
			})
		},reason=>{
			reject(reason)
		})
	},
	testnet: hash=>{
		return new Promise((resolve,reject)=>{
			request.get('https://api.blockcypher.com/v1/btc/test3/txs/'+hash).send().then(res=>{
				let result={
					value: res.body.total,
					fee: res.body.fees,
					confirmations:res.body.confirmations
				}
				resolve(result)
			})
		},reason=>{
			reject(reason)
		})
	}
};
const getUtxos = {
	mainnet: addr=>{
		return new Promise((resolve,reject)=>{
			request.get('https://api.blockcypher.com/v1/btc/main/addrs/'+addr+'?unspentOnly=true').send().then(res=>{
				resolve(res.body.txrefs.map(e=>{
					return {
						hash: e.tx_hash,
						vout: e.tx_output_n,
						value: e.value,
						confirmations: e.confirmations
					};
				}))
			},reason=>{
				reject(reason)
			})
		})
	},
	testnet: async addr=>{
		return new Promise((resolve,reject)=>{
			request.get('https://api.blockcypher.com/v1/btc/test3/addrs/'+addr+'?unspentOnly=true').send().then(res=>{
				resolve(res.body.txrefs.map(e=>{
					return {
						hash: e.tx_hash,
						vout: e.tx_output_n,
						value: e.value,
						confirmations: e.confirmations
					};
				}))
			},reason=>{
				reject(reason)
			})
		})
	}
};
const pushHex = {
	mainnet: hexTrans=>{
		return new Promise((resolve,reject)=>{
			request.post('https://api.blockcypher.com/v1/btc/main/txs/push').send(JSON.stringify({tx:hexTrans})).then(res=>{
				resolve({
					tx: res.body.tx.hash
				})
			},reason=>{
				reject(reason)
			})
		})
	},
	testnet: hexTrans=>{
		return new Promise((resolve,reject)=>{
			request.post('https://api.blockcypher.com/v1/btc/test3/txs/push').send(JSON.stringify({tx:hexTrans})).then(res=>{
				resolve({
					tx: res.body.tx.hash
				})
			},reason=>{
				reject(reason)
			})
		})
	}
}


module.exports = {
	getFee:		getFee,
	getAddress:	getAddress,
	getTx:		getTx,
	getUtxos:	getUtxos,
	pushHex:	pushHex,
}