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
// npm install mongodb --save
npm install --save express body-parser mongoose
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


### Escrow subsystem consist of two parts as API, UI.

#### API

> API Format
```
{
    status: 'ok|fail', 
    data: { ... }
}
```

1. get new address from admin wallet (Pre-Generated bitcoin addresses)
```
/api/v1/get/address
```
2. check transaction and returns the result.