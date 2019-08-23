const wallet = require('../models/wallet');

exports.getAddress = (req, res)=>{
    let address='';
    let result={status:'ok',data: {}};
    result.data.address=address;
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(result));
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

