var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var assert = require('assert');
var url = 'mongodb://localhost:27017/test'
var app = express();
var router = express.Router();
var resultData = [];

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.get("/",function(request,response){
	console.log(__dirname);
	response.render('index');
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
	mongo.connect(url,function(err,db){
		var cursor = db.collection('test1').find();
		cursor.each(function(err,doc){
			resultData.push(doc);
		});
		response.render('home',{data:resultData});
		response.end();
		db.close();
	});
});
app.get("*",function(request,response){
	response.send("Sorry ! This page does not exist");
});
router.post("/delete",function(request,response,next){

});
router.post("/update",function(request,response,next){

});
var insertDocument = function(db, callback) {
   db.collection('restaurants').insertOne( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findRestaurants(db, function() {
      db.close();
  });
});
/*$(document).ready(function() {
$( "#submit" ).click(function() {
		getEmployeeData();
	});
 });
var getEmployeeData = function(){
        var employeeName = document.getElementById("employeeName").value;
        var skill = document.getElementById("skills").value;
        
}
*/
app.listen(3000,function(){
	console.log("started!");
});