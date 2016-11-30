var express = require('express');
var app = express();

app.get("/",function(request,response){
	response.send("It's been 5 years!");
	response.end();
});
app.get("/colors/:favoritecolor?",function(request,response){
	var favoritecolor = request.params.favoritecolor;
	response.send("your favorite color is " + favoritecolor);
});


app.listen(3000,function(){
	console.log("started!");
})