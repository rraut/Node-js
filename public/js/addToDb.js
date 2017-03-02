

var employeeskill = {};

var addToDb = function(){

}
var addSkill = function(skills,employeeName){
		for(var index in skills) {
			if(employeeskill[skills[index]]) {
				employeeskill[skills[index]].push(employeeName);
			} else {
				employeeskill[skills[index]] = [employeeName];
			}
		}
		var data = JSON.stringify(employeeskill);
		console.log(data);
		$.ajax({
		  type: "POST",
		  url: "/data",
		  data: data,
		  success: function(data){console.log("data"+data)},
		  dataType: "json"
		});
}

var searchSkill = function(skill){
			var employeeWithSkill = employeeskill[skill];
			for(var index=0;index<(employeeWithSkill.length);index++){
			console.log("employeeWithSkill[index]"+employeeWithSkill[index]);
			}
}
var getEmployeeData = function(){
        var employeeName = document.getElementById("employeeName").value;
        var skill = document.getElementById("skills").value;
        var skills = skill.split(',');
        addSkill(skills,employeeName);
}

var clearForm = function(){
		var form = document.getElementById("addEmployee");
		form.reset();
}
$(document).ready(function() {
	$( "#submit" ).click(function() {
			getEmployeeData();
			clearForm();
				});
	$("#search").click(function(){
		var searchkey = document.getElementById("search-skill").value;
		searchSkill(searchkey);	
	});
});