var createError = require('http-errors');
var express = require('express');
// const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

require('mongodb').MongoClient.connect("mongodb://localhost:27017/", (err, con)=>{
	db = con.db("escrow");
	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');

	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/',			require('./routes/index'));
	app.use('/api/v1', 		require('./routes/api'));
	app.use('/ui', 			require('./routes/ui'));
	
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		next(createError(404));
	});
	
	// error handler
	app.use(function(err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
	
		// render the error page
		res.status(err.status || 500);
		res.render('pages/error');
	});

	// we're connected!
});


module.exports = app;
