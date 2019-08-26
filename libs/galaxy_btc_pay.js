const bitcoin = require('bitcoinjs-lib');



const send = options=>{
	return new Promise((resolve,reject)=>{
		if (options == null || typeof options !== 'object') throw "Options must be specified and must be an object.";
		if (options.from == null) throw "Must specify from address.";
		if (options.to == null) options.to=[];
		if (options.fee == null) options.fee=0;
		if (options.leftover == null) options.leftover=options.from[0].address;
		if (options.dryrun == null) options.dryrun = false;
		if (options.network == null) options.network = 'mainnet';
		if (options.dryrun == null) options.dryrun = false;
		
		var from = options.from;
		var to = options.to;
		var leftover=options.leftover;
		var feePerByte=options.fee;
		var network = options.network == "testnet" ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;
		var utxo=options.network == "testnet" ? getUtxos.testnet : getUtxos.mainnet;
		var pushtx=options.network == "testnet" ? pushHex.testnet : pushHex.mainnet;
		var unspents=[],amountIn=0, amountOut=0;
		var dryrun=options.dryrun;

		var promise=[];
		for(var k in from) promise.push(utxo(from[k].address));
		if(feePerByte==0) promise.push(getFee());

		Promise.all(promise).then(values=>{
			if(feePerByte==0) feePerByte=values[from.length];
			var tx = new bitcoin.TransactionBuilder(network);
			for(var k=0;k<from.length;k++) {
				var keyPair = bitcoin.ECPair.fromWIF(from[k].wif, network);
				
				// var redeem = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: network }) 
				// var p2sh = bitcoin.payments.p2sh({ redeem: redeem, network: network }) 

				if(from[k].unspents==null) {
					values[k].map(fv=>{
						fv.key=keyPair;
						// fv.p2sh=p2sh;
						amountIn+=fv.value;
						tx.addInput(fv.hash, fv.vout);
						unspents.push(fv);
					})
				}else{
					from[k].unspents.map(v=>{
						values[k].map(fv=>{
							if(fv.tx==v) {
								fv.key=keyPair;
								// fv.p2sh=p2sh;
								amountIn+=fv.value;
								tx.addInput(fv.hash, fv.vout);
								unspents.push(fv);
							}
						})
					})
				}
			}
			for(var k in to) {
				tx.addOutput(to[k].address, to[k].amount);
				amountOut+=to[k].amount;
			}
			var expectedBytes = unspents.length*180 + to.length*34 + 10 + unspents.length;
			var fee=expectedBytes*feePerByte;
			var remain = amountIn - amountOut - fee;
			if (remain<0) throw "BitCoin amount must be larger than the fee. (Ideally it should be MUCH larger)\r\namount=" + amountIn+", expected=" + (amountOut + fee);
			if(remain>2000+feePerByte*34) {
				fee+=feePerByte*34;
				tx.addOutput(leftover, amountIn - amountOut - fee);
			}
			for(var i=0;i<unspents.length;i++) {
				// tx.sign(i, unspents[i].key,unspents[i].p2sh.redeem.output, null, unspents[i].value);
				tx.sign(i, unspents[i].key);
			}
			var hex = tx.build().toHex();
			if(dryrun) {
				resolve(hex)
			}else{
				pushtx(hex).then(res=>{
					resolve(res)
				})
			}
		},reason=> reject(reason) )
	})
}

module.exports = {
	send:		send
}