var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var assert = require('assert');
var url = 'mongodb://localhost:27017/resource'
var app = express();
var router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.get("/",function(request,response){
	console.log(__dirname);
	response.render('index',{
		title : "first pagssse",
		pages : ["home","about"]
	});
});
app.get("/colors/:favoritecolor?",function(request,response){
	var favoritecolor = request.params.favoritecolor;
	response.send("your favorite color is " + favoritecolor);
});

app.get("*",function(request,response){
	response.send("Sorry ! This page does not exist");
});
router.get("/get-data",function(request,response,next){
	mongo.connct(url,function(){});
});
router.poast("/insert",function(request,response,next){
	var employeeData = {
			name : request.body.name,
			skill : request.body.skill
				};
});
mongo.connect(url,function(err,db){
	assert.equal(null,err);
	db.collection('employee').insertOne(employeeData,function(err,result){
		assert.equal(null,'error');
		console.log("data inserted");
		db.close();
	});
});
router.post("/delete",function(request,response,next){

});
router.post("/update",function(request,response,next){

});
app.listen(3000,function(){
	console.log("started!");
})
