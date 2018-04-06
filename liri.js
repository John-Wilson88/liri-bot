//requiring the dotenv to access the twitter and spotify api keys.
require("dotenv").config();

// loading the keys.js file.
var keys = require("./keys.js");

// loading the inquirer node module.
var mainPrompt = require('inquirer');

mainPrompt.prompt({
	type: "list",
	message: "Hello, how can i help you?",
	choices: ["Show me tweets", "Spotify this", "Movie this", "do what it says"],
	name: "main"
}).then(function(mainInquirerResponse){

	if(mainInquirerResponse.main == "Show me tweets") {

		var Twitter = require('twitter');
		var tweetInquirer = require('inquirer');
		var client = new Twitter(keys.twitter);

		tweetInquirer.prompt([

			{
				type: "input",
				message: "Please input yout Twitter user name.",
				name: "nameInput"
			}

			]).then(function(tweetInquireResponse) {

				var userName = tweetInquireResponse.nameInput;
				 
				var params = {screen_name: userName};

					client.get('statuses/user_timeline', params, function(error, tweets, response) {
					  if (!error) {
					  	for(var recent = 0; recent < 20; recent++) {
					    	console.log(tweets[recent]["text"]);
						}
					  } else{
					  	console.log("there was an error...");
					  }
					});
		});
	}

	if (mainInquirerResponse.main == "Spotify this") {

		var Spotify = require('node-spotify-api');
		var spotifyInquire = require('inquirer');
		var spotify = new Spotify(keys.spotify);

		spotifyInquire.prompt([

		{
			type: "input",
			message: "What song are you looking for?",
			name: "songInput"
		}

			]).then(function(spotifyInquireResponse){
				spotify.search({
					type: 'track',
					query: spotifyInquireResponse.songInput
				}, function(err, data) {
					if (err) {
						return console.log('Error occured: ' + err);
					} else {
						//console.log(data);
						console.log("Artist: " + data.tracks.items[0].artists[0].name);
						console.log("Album: " +data.tracks.items[0].album.name);
						console.log("Song Name: " +data.tracks.items[0].name);
						console.log("Link: " +data.tracks.items[0].external_urls.spotify);

					}
				});
			});
	}

	if (mainInquirerResponse.main == "Movie this") {

		var movieRequest = require('request');
		var movieInquire = require('inquirer');

		movieInquire.prompt([

		{
			type: "input",
			message: "What movie would you like to know about?",
			name: "movieInput"
		}

			]).then(function(movieInquireResponse){
				var movie = movieInquireResponse.movieInput;
				var movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

				movieRequest(movieURL, function(error, response, body){
					if(!error && response.statusCode == 200){
						console.log(JSON.parse(body).Title);
						console.log(JSON.parse(body).Year);
						console.log(JSON.parse(body).imdbRating);
						console.log(JSON.parse(body).Ratings[1].Value);
						console.log(JSON.parse(body).Country);
						console.log(JSON.parse(body).Language);
						console.log(JSON.parse(body).Plot);
						console.log(JSON.parse(body).Actors);
					}
				});

			});
	}

	if (mainInquirerResponse.main == "do what it says") {
		var Spotify = require('node-spotify-api');
		var spotify = new Spotify(keys.spotify);
		var fs = require('fs');

		fs.readFile('random.txt', 'UTF8', function(err, text){
			if(err) {
				return console.log(err);
			} else {

				spotify.search({
					type: 'track',
					query: text
				}, function(err, data) {
					if (err) {
						return console.log('Error occured: ' + err);
					} else {
						//console.log(data);
						console.log("Artist: " + data.tracks.items[0].artists[0].name);
						console.log("Album: " +data.tracks.items[0].album.name);
						console.log("Song Name: " +data.tracks.items[0].name);
						console.log("Link: " +data.tracks.items[0].external_urls.spotify);
					}
				});
			}
		});


	}

});