const wallet = require('../models/wallet');

const uid=100;

const send=(res,status,data)=>{
	let result={status:status,data: data};
	res.header("Content-Type", "application/json");
	res.send(JSON.stringify(result));
};

exports.getAddress = async (req, res)=>{
	let result=await wallet.findOne({uid:uid,balance:0});
	if(result) {
		send(res,'ok',result.address)
		return;
	}
	result=await wallet.findOne({uid:0,balance:0});
	if(result) {
		result.uid=uid;
		wallet.update({_id: result._id}, result);
		send(res,'ok',result.address)
		return;
	}
	send(res,'fail','No availible address')
}

exports.getTransaction = (req, res)=>{ 
	var address='';
	var result={
		'status': 'ok',
		'data'	: {
			'address' : address
		}
	};
	req.header("Content-Type", "application/json");
	res.send(JSON.stringify(result));
}

/** fdsfsdfds
 * mppt 设置


这个输出恒压改 57v

逆变器充电设置
------
这个均充56v

浮充 55.2
这样设置吧。麻烦你这个一定告诉正南。用这个方法看看有没有问题。
加入不行 马上告诉我。
逆变器的电压可以稍微高一下，但不要超过mppt的电压。
 */