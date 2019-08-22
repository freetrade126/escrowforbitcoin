const lineByLine = require('n-readlines');


const getAddresses=file=>{
    return new Promise(resolve=>{
        var data=[];
        const liner = new lineByLine(file);
        let line;
        while (line = liner.next()) {
            var x=line.toString('ascii').split("\t");
            data.push({
                address: x[0],
                privkey: x[1],
                uid: 0,
                balance: 0,
                last_checked: 0, 
            })
        }
        resolve(data)
    })
};

const insertData=data => {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost:27017/", (err, db)=>{
        if (err) throw err;
        var dbo = db.db("escrow");
        dbo.collection("wallet").insert(data, (err, res)=>{
            if (err) throw err;  
            console.log("Number of records inserted: " + res.insertedCount);  
            dbo.close();  
        });
    });
}

/* getAddresses("d:\\address_testnet.txt").then(
    res=>insertData(res)
) */;

const getAddress=address=>{
    return new Promise(resolve=>{
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
    
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("escrow");
            dbo.collection("wallet").findOne({address:address}, function(err, result) {
                if (err) throw err;
                resolve(result)
                db.close();
            });
        });
    })
}
getAddress('2Mw824AMbsKYSUotdUGFXzu7mTUX4wiFn1b')
