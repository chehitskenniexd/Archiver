// Load and instantiate Chance
var chance = require('chance').Chance();

var user_project = require('../models/user_project');


//setting number of instances for each model
var numUserProjects = 50;

// roles array
var roles = ["collaborator", "author"];

//performs a function n times, and returns an array of the results
var doTimes = (n, fn) => {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}


var generateUserProjects = function(){
  return doTimes(numUserProjects, function (){
    return user_project.create({
      role: chance.pick(roles),
      userId: chance.integer({min: 1, max: 20}),
      projectId: chance.integer({min: 1, max: 15})
    })
  })
}

var userProjectsSeed = () => {
  return generateUserProjects();
}


module.exports = userProjectsSeed;