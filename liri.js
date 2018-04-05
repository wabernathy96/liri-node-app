// Add Dotenv Node Module
require("dotenv").config();

// Load other Node Modules
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var request = require('request');
var fs = require('fs');

// Load API keys from keys.js
var keys = require('./keys.js');
var twitterKeys = keys.twitter;
var spotifyKeys = keys.spotify;
var omdbKeys = keys.omdb;

// Store command line argument in var
var cmdArg = process.argv;

// Set command line input for liri always equal to the second argument
var liriCmd = cmdArg[2];


if(liriCmd == undefined){
    throw `Command needed i.e. my-tweets,
    spotify-this-son, movie-this, do-what-it-says`;
}else{
    
    // Logic for my-tweets command
    var tClient = new Twitter(twitterKeys);

    var twitParams = {
        screen_name: '_McShaznasty_'
    };

    if(liriCmd === 'my-tweets'){
        tClient.get('statuses/user_timeline', twitParams, function(error, tweets, response) {
            if (!error) {
                for(i=0; i<tweets.length; i++){
                    var allTweets = tweets[i];

                    var tweetText = allTweets.text;
                    var tweetTime = allTweets.created_at;

                    console.log(tweetText);
                    console.log(tweetTime);
                };
            } else {
                throw error
            }
        });
    };

    // Logic for spotify-this-song command
    var sClient = new Spotify(spotifyKeys);

    if (liriCmd === 'spotify-this-song'){
        
        cmdArg.shift(); // Shift past node.js in node array
        cmdArg.shift(); // Shift past file path in node array
        cmdArg.shift(); // Shift past spotify command in node array

        var songArg = cmdArg.join('-'); // Join all other words from [3] on 

        var spotParams = {
            type: 'track',
            query: songArg,
            limit: 1
        };

        if (songArg != ''){
            sClient.search(spotParams, function(err, data){
                if(!err){
                    for(j=0; j<data.tracks.items.length;j++){
                        var topSong = data.tracks.items[j];
                        
                        var name = topSong.name;
                        console.log(name);
                        var artist = topSong.artists[0].name;
                        console.log(artist);
                        var album = topSong.album.name;
                        console.log(album);
                        var link = topSong.external_urls.spotify;
                        console.log(link);
                    };
                }else{
                    throw err
                }
            });
        }else{
            sClient.search({type: 'track', query: 'Cannibalistic Dissection', limit: 1}, function(err, data){
                if(!err){
                    for(j=0; j<data.tracks.items.length;j++){
                        var topSong = data.tracks.items[j];
                        
                        var name = topSong.name;
                        console.log(name);
                        var artist = topSong.artists[0].name;
                        console.log(artist);
                        var album = topSong.album.name;
                        console.log(album);
                        var link = topSong.external_urls.spotify;
                        console.log(link);
                    };
                }else{
                    throw err
                }
            });
        }; 
    };
    // Logic for movie-this command
    if (liriCmd === 'movie-this'){

        cmdArg.shift(); // Shift past node.js in node array
        cmdArg.shift(); // Shift past file path in node array
        cmdArg.shift(); // Shift past movie-this command in node array

        var movieQ = cmdArg.join('-'); // Join all other words from [3] on 

        var queryUrl = 'http://www.omdbapi.com/?t=' + movieQ + '&y=&plot=short&type=movie&r=json&apikey=trilogy';
        var defaultUrl ='http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&type=movie&r=json&apikey=trilogy';

        if (movieQ != ''){
            request(queryUrl, function(err, res, body){
                if(!err){
                    var parse = JSON.parse(body);

                    var movieInfo = {
                        Title: parse.Title,
                        Release_Year: parse.Year,
                        Country_of_Origin: parse.Country,
                        Language_of_Origin: parse.Language,
                        IMDb_Rating: parse.Ratings[0].Value,
                        Rotten_Rating: parse.Ratings[1].Value,
                        Actors: parse.Actors,
                        Summary: parse.Plot,
                    }

                    console.log(movieInfo);
                }else{
                    throw err
                };
            });
        }else{
            request(defaultUrl, function(err, res, body){
                if(!err){
                    var parse = JSON.parse(body);

                    var defaultMovie = {
                        Title: parse.Title,
                        Release_Year: parse.Year,
                        Country_of_Origin: parse.Country,
                        Language_of_Origin: parse.Language,
                        IMDb_Rating: parse.Ratings[0].Value,
                        Rotten_Rating: parse.Ratings[1].Value,
                        Actors: parse.Actors,
                        Summary: parse.Plot,
                    }

                    console.log(defaultMovie);
                }else{
                    throw err
                };
            });
        }
    };

    // Logic for do-what-it-says command
};
