//First thing I need to do is install npm packages and LOOK at documentation
//Then I need to add process.argv[2] and process.argv[3] to take in user inputs
//First thing I need to do is declare variable to require all the data
//Then I need to use fs to read and write  to files
//Then I need to make functions to call when the user enters certain arguments

//Take the first input from the user as a command.
//Take the second input from the user as a filter on the command
var firstInput = process.argv[2];                                           //Take variables for user inputs
var secondInput = process.argv[3];

                                               
require("dotenv").config();                                                 //Get the data to process user inputs and install all packages to .json-package
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");


//Testing adding the songname for the query as an argument.
// REMEBER this came from the documentation on how to set this up
//Spotify requires keys which I am calling from another file in the root directory
//The the example search gives use back spotify data if there is no error
// var getSpotifySong = function(songName){  
    var getSpotifySong = function(){ 
    let spotify = new Spotify(keys.spotify);                                      //Create Functions for each command
    spotify.search({ type: 'track', query: "Thriller" }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       for(let i =0; i<5; i++){
           for(let j =0; j<data.tracks.items[i].album.artists.length; j++)
           console.log(data.tracks.items[i].album.artists[j].href);             //Logging out the link to the artist
     
       }
    //   console.log(data.tracks.items); 
      });
};

//Testing adding the twitter handle as a user input
//Twitter Requires that I use api keys which I am calling using a require from another file just like spotify
//There is a parameter that needs a twitter handle argument so I am going to take that at user input and if no provided i will supply a default just like for movies
var getTweets = function(twitterHandle){                                                 
    let client = new Twitter(keys.twitter);
    let params = {screen_name: twitterHandle}; //Twitter Handle
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



//Handle the user inputs with if else statements

if (firstInput === "my-tweets"){
    getTweets();
}else if(firstInput ==="movie-this"){
    if(!secondInput===""){
        getMovie(secondInput);
    }else{
        getMovie("Mr. Nobody");
    }   
}else if(firstInput === "spotify-this-song"){
    getSpotifySong(secondInput); 
}