var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var assert = require('assert');
var url = 'mongodb://localhost:27017/test'
var app = express();
var router = express.Router();
var resultData = [];


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.get("/",function(request,response){
	console.log(__dirname);
});

/*
router.post("/insert",function(request,response,next){
	var employeeData = {
			name : request.body.name,
			skill : request.body.skill
				};
});*/
mongo.connect(url,function(err,db){
	assert.equal(null,err);
	console.log("connected");
	var employeeData = {
			name : "renuka",
			skill : "ohhhh"
				};
	/*db.collection('test1').insertOne(employeeData,function(err,result){
		console.log("data inserted");
		db.close();
	});*/
});
app.get("/get",function(request,response,next){
	resultData.pop();
	mongo.connect(url,function(err,db){
		var cursor = db.collection('test1').find();
		cursor.each(function(err,doc){
			resultData.push(doc);
			console.log(resultData);
		});

		response.render('home',{data:resultData});
		response.end();
	});
});
app.get("*",function(request,response){
	response.send("Sorry ! This page does not exist");
});
router.post("/delete",function(request,response,next){

});
router.post("/update",function(request,response,next){

});
app.listen(3000,function(){
	console.log("started!");
})
