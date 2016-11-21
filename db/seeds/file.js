// Load and instantiate Chance
var chance = require('chance').Chance();

var File = require('../models/file');


//setting number of instances for each model
var numFiles = 50;

//performs a function n times, and returns an array of the results
var doTimes = (n, fn) => {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

var generateFiles = function(){
  return doTimes(numFiles, function (){
    return File.create({
      file_name: chance.word(),
      file_contents: chance.paragraph(),
      blobId: chance.integer({min: 1, max: 50})
    })
  })
}

var fileSeed = () => {
  return generateFiles();
}


module.exports = fileSeed;