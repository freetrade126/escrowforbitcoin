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
				tx: '',
				confirmations:0,
				uid: 0,
				user: '',
				balance: 0,
				status: 0,
				created: 0,
				updated: 0,
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
		dbo.collection("address").insert(data, (err, res)=>{
			if (err) throw err;  
			console.log("Number of records inserted: " + res.insertedCount);
		});
	});
}

getAddresses("d:\\address_testnet.txt").then(
	res=>insertData(res)
)

