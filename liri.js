//First thing I need to do is declare variable to require all the data
//Then I need to use fs to read and write  to files
//Then I need to make functions to call when the user enters certain arguments
//Then I need to add process.argv[2] and process.argv[3] to take in user inputs

//Take variables for user inputs
var firstInput = process.argv[2];
var secondInput = process.argv[3];
//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys.js");
var request = require("request");

var getTweets = function(){
    let client = new Twitter(keys.twitter);
    let params = {screen_name: 'RealDonaldTrump'};//Twitter Handle
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets[0].text);
            for(var i=0; i < 20; i++){
                console.log(tweets[i].text);
            }
        }
    });
    console.log(response);
};

// Then run a request to the OMDB API with the movie specified
var getMovie = function(movieName){
    request("http://www.omdbapi.com/?t=" + movieName+ "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
      
        if (!error && response.statusCode === 200) {
            console.log(body);
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log(JSON.parse(body));
        }
    });
    
};




var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

// console.log(spotify);
// console.log(client);


//process.argv[2] then call get movie function
//Take the first input from the user as a command.
//Take the second input from the user as a filter on the command



if (firstInput === "my-tweets"){
    getTweets();
}else if(firstInput ==="movie-this"){
    if(!secondInput===""){
        getMovie(secondInput);
    }else{
        getMovie("Mr. Nobody");
    }
    
}else if(firstInput === "spotify-this-song"){
    // 
}