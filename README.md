# Bitcoin Escrow  for **Reco D.**
Escrow for bitcoin
backend: node express, ejs
frontend: vanillajs

## How to create project?

### creating project & setting up libraries.
```
npm install express-generator -g
npm install nodemon -g
```

> setting up git
```
git init
git pull https://github.com/freetrade126/escrowforbitcoin.git master
express --view=ejs .
npm install
npm install bitcoinjs-lib --save
npm install superagent --save
npm install mongoose --save
npm install --save express body-parser mongoose
npm install express-session --save
```

> add this in your .gitignore file

> git push as initial.
```
git add .
git commit -m "initial"
git remote add origin https://github.com/freetrade126/escrowforbitcoin.git
git push -u origin master
```

### test web
```
nodemon start
```
[http://localhost:3000](http://localhost:3000)
:+1:

> We can start from here.
### Project structure
Node JS Express MVC

> /controllers: **Controllers**
> /models: **Database Models**
> /views: **Frontend Views**
> /routes: **Web request routes**
> /public: **Web request static contents**
> /libs: **local libraries for backend**

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
```
It assigns new a address  to guest.
If the guest has already assigned address, api returns one.


2. check transactions of specified bitcoin address (deposit).
```
/api/v1/address/check/**{address}**
```
Once upon detecting transactions in the bitcoin address, it updates appropriate database address collection document and counting on confirmations of bitcoin network.
An incoming transaction needs to receive 3 Bitcoin network confirmations to appear in your wallet.
Confirmations have done, It create or update new document in wallet database. 

3. create escrow bitcoins.
```
/api/v1/escrow/create/:amount *(as satoshi)*
```

