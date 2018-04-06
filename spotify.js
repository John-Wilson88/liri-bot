require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

spotify.search({
	type: 'track',
	query: 'The Final Thoughts of a Dying Man'
}, function(err, data) {
	if (err) {
		return console.log('Error occured: ' + err);
	} else {
		console.log(data);
		console.log(data.tracks.items);
	}
});