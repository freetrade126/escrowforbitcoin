# Bitcoin Escrow  for **Reco D.**
backend: node express, ejs<br>
frontend: vanillajs<br>

## How to create project?

### creating project & setting up libraries.
```
npm install express-generator -g
npm install nodemon -g
git init
git pull https://github.com/freetrade126/escrowforbitcoin.git master
express --view=ejs .
npm install
npm install bitcoinjs-lib --save
npm install superagent --save
npm install mongoose --save
npm install --save express body-parser mongoose
npm install express-session --save
npm install --save qrcode
npm install socket.io --save

```

> add this in your .gitignore file

> git push as initial.
```
git add .
git commit -m "initial"
git remote add origin https://github.com/freetrade126/escrowforbitcoin.git
git push -u origin master
```

### Test web
```
nodemon start
```
[http://localhost:3000](http://localhost:3000)
:+1:

> We can start from here.
### Project structure
Node JS Express MVC

> /controllers: **Controllers** <br>
> /models: **Database Models** <br>
> /views: **Frontend Views** <br>
> /routes: **Web request routes** <br>
> /public: **Web request static contents** <br>
> /libs: **local libraries for backend** <br>

### Escrow subsystem database structure
```
> address collection
{
    "_id": ObjectId("5d601a7daa45443d74fd3c44"), 
    "address": "2N12i7j9PxennaUGsDPCkMpQwN1njvTMF3D",
    "privkey": "cMkNoRGXyqWkHm7tQjwBo1H5CNZvWpMUnyC8FzypUpeWmMGTgotM\r",
    "uid": NumberInt("0"),
    "user": "",
    "balance": NumberInt("0"),
    "status": NumberInt("0"),
    "created": NumberInt("0"),
    "updated": NumberInt("0")
}
```
> wallet collection
```

```

> transactions collection
```
```

> escrow collection
```
```


### Escrow subsystem consist of two parts as API, UI.

#### API

> API general response format
```
{
	status: 'ok|fail', 
	data: { ... }
}
```

1. get new address from admin wallet (Pre-Generated bitcoin addresses)
```
/api/v1/address/get

{
	status: 'ok', 
	data: '15QG2HWLvPhiRNQuwwPuTTbfcPxiTWtVLT'
}
```
It assigns new a address  to guest.<br>
If the guest has already assigned address, api returns one.<br>

2. check transactions of specified bitcoin address (deposit).
```
/api/v1/address/check/{address}

{
	status: 'ok', 
    data: {
        tx: e331aea1c2253d711cecbf76899b87d2ddefc6e141af57f86954f93949c7da55',
        status: 0|100,
        amount: 860
    }
	
}
```

Once upon detecting transactions in the bitcoin address, it updates **address** collection document and counting on confirmations of bitcoin network.<br>
An incoming transaction needs to receive 3 Bitcoin network confirmations to appear in your wallet.<br>
Confirmations have done, It create or update new document in **wallet** collection.<br>

3. create escrow bitcoins.
```
/api/v1/escrow/create/:amount (as satoshi)
```

4. release escrow bitcoins.
```
/api/v1/escrow/release/:escrowid
```

5. release escrow bitcoins.
```
/api/v1/withdraw/request/:address/:amount (as satoshi)
```

6. release escrow bitcoins.
```
/api/v1/withdraw/accept/:requestid (as satoshi)
```

## user interface
1. Deposit
> /ui/deposit

2. Withdrawal
> /ui/withdraw
 
3. Transactions 
> /ui/Transactions