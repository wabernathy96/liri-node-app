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

if(liriCmd === ''){
    throw `Command needed i.e. my-tweets,
    spotify-this-son, movie-this, do-what-it-says`
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

    if (liriCmd === "spotify-this-song"){
        var songArg = cmdArg[3];

        var spotParams = {
            type: 'track',
            query: songArg,
        };

        if (songArg != ''){
            sClient.search(spotParams, function(err, data){
                if(!err){
                    console.log(data);
                }else{
                    throw err
                }
            })

        }else{
            //default
        }
        
    }
    // Logic for movie-this command

    // Logic for do-what-it-says command
};
