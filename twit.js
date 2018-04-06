require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');
var inquirer = require('inquirer');
 
var client = new Twitter(keys.twitter);

inquirer.prompt([

	{
		type: "input",
		message: "Please input yout Twiiter user name.",
		name: "nameInput"
	}

	]).then(function(inquireResponse) {

		var userName = inquireResponse.nameInput;
		 
		var params = {screen_name: userName};

			client.get('statuses/user_timeline', params, function(error, tweets, response) {
			  if (!error) {
			  	for(var recent = 0; recent < 10; recent++) {
			    	console.log(tweets[recent]["text"]);
				}
			  } else{
			  	console.log("there was an error...");
			  }
			});
});