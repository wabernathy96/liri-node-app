// Add Dotenv Node Module
require("dotenv").config();

// Load other Node Modules
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

// Load API keys from keys.js
var keys = require('./keys.js');
var twitterKeys = keys.twitter;
var spotifyKeys = keys.spotify;

// Store command line argument in var
var cmdArg = process.argv;

// Set 

