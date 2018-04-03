//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(spotify);
console.log(twitter);