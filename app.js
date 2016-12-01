var express = require('express');
var app = express();
app.set('view engine', 'ejs');

app.get("/",function(request,response){
	response.render('home',{
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
app.listen(3000,function(){
	console.log("started!");
})
