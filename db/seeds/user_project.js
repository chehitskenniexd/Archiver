// Load and instantiate Chance
var chance = require('chance').Chance();

var user_project = require('../models/user_project');


//setting number of instances for each model
var numUserProjects = 50;

// roles array
var roles = ["collaborator", "author", "pending"];

//performs a function n times, and returns an array of the results
var doTimes = (n, fn) => {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

const fs = require('fs');

var generateUserProjects = function () {
  return doTimes(numUserProjects, function () {
    const upObject = {
      role: chance.pick(roles),
      userId: chance.integer({ min: 1, max: 20 }),
      projectId: chance.integer({ min: 1, max: 15 }),
    }
    fs.appendFileSync('./UPObjects.text', JSON.stringify(upObject) + '\n', 'utf-8');
    return user_project.create(upObject)
  })
}

var userProjectsSeed = () => {
  return generateUserProjects();
}


module.exports = userProjectsSeed;
