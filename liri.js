//First thing I need to do is install npm packages and LOOK at documentation
//Then I need to add process.argv[2] and process.argv[3] to take in user inputs
//First thing I need to do is declare variable to require all the data
//Then I need to use fs to read and write  to files
//Then I need to make functions to call when the user enters certain arguments

//Take the first input from the user as a command.
//Take the second user input to take multiple words
// var argv = process.argv.slice(2);
var firstInput = process.argv[2];                                           
var secondInput = process.argv[3];


/////Get the data to process user inputs and install all packages to .json-package/////
                                               
require("dotenv").config();                                                 
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");

//Take in multi-word inputs from the user
// function secondInput(){                                                     
//     let arr= [];
//     let nArr;
//     for (var i=1; i< argv.length; i++){
//         arr.push(argv[i]);
//         nArr = arr.join(" ");
//         return(nArr);    
//     }
// }
// console.log(firstInput);
// console.log(secondInput());


///////Create Functions for each command//////



//Testing adding the songname for the query as an argument.
// REMEBER this came from the documentation on how to set this up
//Spotify requires keys which I am calling from another file in the root directory
//The the example search gives use back spotify data if there is no error
function getSpotifySong(songName){  
    let spotify = new Spotify(keys.spotify);                                      
    spotify.search({ type: 'track', query: songName }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
        for(let i =0; i<1; i++){
                console.log("Artist: "+ data.tracks.items[i].artists[i].name);
                console.log("Song Name: "+ data.tracks.items[i].name);  
                console.log("Song Preview: "+ data.tracks.items[i].preview_url);
                console.log("Album Name: "+ data.tracks.items[i].album.name);
            } 
        });
};

//Testing adding the twitter handle as a user input
//Twitter Requires that I use api keys which I am calling using a require from another file just like spotify
//There is a parameter that needs a twitter handle argument so I am going to take that at user input and if no provided i will supply a default just like for movies
function getTweets(twitterHandle){                                                 
    let client = new Twitter(keys.twitter);
    let params = {screen_name: twitterHandle}; //Twitter Handle
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode === 200) {
            for(var i=0; i < 20; i++){
                console.log(tweets[i].text);
            }   
        }
    });
    // console.log(response);
};

// Then run a request to the OMDB API with the movie specified
function getMovie(movieName){
    request("http://www.omdbapi.com/?t=" + movieName+ "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Countrys Released: "+ JSON.parse(body).Country);
            console.log("Language: "+ JSON.parse(body).Language);
            console.log("Plot: "+ JSON.parse(body).Plot);
            console.log("Actors: "+ JSON.parse(body).Actors);
        }else{
            console.log(error)
            // console.log("You did not enter a valid movie name");
        }
    });
    
};

// function getRandomText(txtFile){   
//     if (!error && response.statusCode === 200) {
//     //TODO
//     }
    
// }; 

/////Handle the user inputs with if else statements//////

if (firstInput === "my-tweets"){
    // if(!secondInput===""){
        getTweets(secondInput);
    // }
    // else{
    //     console.log("You did not enter a twitter handle so here's some POTUS\n")
    //     getTweets("RealDonaldTrump");
    // } 
}
else if(firstInput ==="movie-this"){//TODO add if the movie is multiple words
    // if(!secondInput===""){
        getMovie(secondInput);
    }
    // else{
    //     getMovie("Mr. Nobody");
    // } 
// }
else if(firstInput === "spotify-this-song"){//TODO add is the song is multiple words
    // if(!secondInput===""){
        getSpotifySong(secondInput);
    }
    // else{
        // getSpotifySong("I Want it That Way");
    // }    
// }
else if(firstInput ==="do-what-it-says"){
    getRandomText();
}
else{
    console.log("Please enter a valid command");
}