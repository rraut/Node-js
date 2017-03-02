var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var assert = require('assert');
var url = 'mongodb://localhost:27017/test'
var app = express();
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get("/",function(request,response){
	console.log(__dirname);
	response.render('index');
});

app.post("/data",function(request,response){
	console.log(request.body);
	mongo.connect(url,function(err,db){
	assert.equal(null,err);
	console.log("connected");
	db.collection('testEmp').insertOne(request.body,function(err,result){
			console.log("data inserted Renuka");
			db.close();
		});
	});
});

app.listen(3000,function(){
	console.log("will finish it today!");
});
