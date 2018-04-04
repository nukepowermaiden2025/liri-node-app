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
var getSpotifySong = function(songName){ 
    let spotify = new Spotify(keys.spotify);                                      //Create Functions for each command
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       for(let i =0; i<5; i++){
           for(let j =0; j<data.tracks.items[i].album.artists.length; j++)
           console.log(data.tracks.items[i].album.artists[j].href);             //Logging out the link to the artist
        //    Artist(s)
            for(let k =0; k<data.tracks.items[i].album.artists.length; k++)
            console.log(data.tracks.items[i].album.artists[k].external_urls.spotify); 
        

        //    The song's name
           
        //    A preview link of the song from Spotify
           
        //    The album that the song is from
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
        if (!error && response.statusCode === 200) {

            if (!error) {
                console.log(tweets[0].text);
                for(var i=0; i < 20; i++){
                    console.log(tweets[i].text);
                }
            }
        }
    });
    // console.log(response);
};

// Then run a request to the OMDB API with the movie specified
var getMovie = function(movieName){
    request("http://www.omdbapi.com/?t=" + movieName+ "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
      
        if (!error && response.statusCode === 200) {
            
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Countrys Released: "+ JSON.parse(body).Country);
            console.log("Language: "+ JSON.parse(body).Language);
            console.log("Plot: "+ JSON.parse(body).Plot);
            console.log("Actors: "+ JSON.parse(body).Actors);
     
            // console.log(JSON.parse(body));
        }else{
            console.log(error)
            // console.log("You did not enter a valid movie name");
        }
    });
    
};

var getRandomText = function(txtFile){   
    if (!error && response.statusCode === 200) {

    }
    
};



//Handle the user inputs with if else statements

if (firstInput === "my-tweets"){
   
    if(!secondInput===""){
        getTweets(secondInput);
    }else{
        getTweets("RealDonaldTrump");
    } 
}
else if(firstInput ==="movie-this"){//TODO add if the movie is multiple words
    if(!secondInput===""){
        getMovie(secondInput);
    }else{
        getMovie("Mr. Nobody");
    } 
}
else if(firstInput === "spotify-this-song"){//TODO add is the song is multiple words
    if(!secondInput===""){
        getSpotifySong(secondInput);
    }else{
        getSpotifySong("I Want it That Way");
    }    
}
// else if(firstInput ==="do-what-it-says"){
//     getRandomText();
// }
else{
    console.log("Please enter a valid command");
}