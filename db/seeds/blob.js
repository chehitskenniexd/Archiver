var users = require('./user');
var Blob = require('../models/blob'); 
var hashArray = require('./commit').hashArray;

// Load and instantiate Chance
var chance = require('chance').Chance();

//setting number of instances for each model
var numBlobs = 50;

//performs a function n times, and returns an array of the results
var doTimes = (n, fn) => {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

var generateBlobs = function(){
  return doTimes(numBlobs, function (){
    var author = chance.pick(users);
    var committer = chance.pick(users);
    return Blob.create({
      author: author.first_name + " " + author.last_name,
      committer: committer.first_name + " " + committer.last_name,
      hash: chance.pick(hashArray),
      commitId: chance.integer({min: 1, max: 35})
    })
  })
}

var blobSeed = () => {
  return generateBlobs();
}



module.exports = blobSeed;
