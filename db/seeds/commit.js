var chance = require('chance').Chance();

//performs a function n times, and returns an array of the results
var doTimes = (n, fn) => {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

//create random hashes
var hashArray = doTimes(35, function (){
    return chance.hash();
})


var commitArray = [
    {date: Date.UTC(2016, 10, 6, 21, 30), message: 'edited second paragraph', previous_commit: ''},
    {date: Date.UTC(2016, 10, 6, 22, 28), message: 'removed run-on sentence', previous_commit: ''},
    {date: Date.UTC(2016, 10, 7, 7, 5), message: 'fixed capitalization', previous_commit: ''},
    {date: Date.UTC(2016, 10, 7, 11, 25), message: 'final draft', previous_commit: ''},
    {date: Date.UTC(2016, 10, 7, 14), message: 'edited intro', previous_commit: ''},
    {date: Date.UTC(2016, 10, 8, 16, 21), message: 'added conclusion', previous_commit: ''},
    {date: Date.UTC(2016, 10, 10, 10, 24), message: 'fixed grammar', previous_commit: ''},
    {date: Date.UTC(2016, 10, 13, 17, 11), message: 'first draft', previous_commit: ''},
    {date: Date.UTC(2016, 10, 14, 12, 14), message: 'first attempt', previous_commit: ''},
    {date: Date.UTC(2016, 10, 14, 14, 3), message: 'added additional explanation', previous_commit: ''},
    {date: Date.UTC(2016, 10, 14, 17, 8), message: 'expanded third paragraph', previous_commit: ''},
    {date: Date.UTC(2016, 10, 18, 10, 15), message: 'improved word choice', previous_commit: ''},
    {date: Date.UTC(2016, 10, 18, 13, 17), message: 'second attempt', previous_commit: ''},
    {date: Date.UTC(2016, 10, 19, 8, 12), message: 'edited third sentence', previous_commit: ''},
    {date: Date.UTC(2016, 10, 19, 10, 45), message: 'added example', previous_commit: ''},
    {date: Date.UTC(2016, 10, 19, 14, 42), message: 'removed fourth paragraph', previous_commit: ''},
    {date: Date.UTC(2016, 10, 20, 12, 33), message: 'added additional examples', previous_commit: ''},
    {date: Date.UTC(2016, 10, 21, 16, 39), message: 'second draft', previous_commit: ''},
    {date: Date.UTC(2016, 10, 22, 12, 53), message: 'fixed spelling ', previous_commit: ''},
    {date: Date.UTC(2016, 10, 22, 14, 57), message: 'added an oxford comma', previous_commit: ''},
    {date: Date.UTC(2016, 10, 22, 16, 51), message: 'minor edits', previous_commit: ''},
    {date: Date.UTC(2016, 10, 23, 10, 47), message: 'fixed punctuation', previous_commit: ''},
    {date: Date.UTC(2016, 10, 23, 15, 4), message: 'removed potentially objectionable content', previous_commit: ''},
    {date: Date.UTC(2016, 10, 24, 14, 11), message: 'switched from AP to MLA', previous_commit: ''},
    {date: Date.UTC(2016, 10, 25, 17, 2), message: 'removed redundancies', previous_commit: ''},
    {date: Date.UTC(2016, 10, 26, 9, 49), message: 'corrected dates', previous_commit: ''},
    {date: Date.UTC(2016, 10, 26, 12, 17), message: 'added file', previous_commit: ''},
    {date: Date.UTC(2016, 10, 26, 14, 4), message: 'added sources', previous_commit: ''},
    {date: Date.UTC(2016, 10, 27, 13, 27), message: 'removed second paragraph', previous_commit: ''},
    {date: Date.UTC(2016, 10, 28, 19, 46), message: 'rewrote first paragraph', previous_commit: ''},
    {date: Date.UTC(2016, 10, 29, 16, 41), message: 'edited conclusion', previous_commit: ''},
    {date: Date.UTC(2016, 10, 31, 20, 52), message: 'edited wording', previous_commit: ''},
    {date: Date.UTC(2016, 11, 2, 21, 26), message: 'expanded explanation', previous_commit: ''},
    {date: Date.UTC(2016, 11, 3, 18, 29), message: 'corrected tense in first paragraph', previous_commit: ''},
    {date: Date.UTC(2016, 11, 4, 13, 15), message: 'clarified confusing wording', previous_commit: ''},
]

let commits = commitArray.map((instance, i) => {
    var randomHash = chance.pick(hashArray)
    instance.hash = hashArray[i];
    instance.projectId = chance.integer({min: 1, max: 15});
    if (randomHash !== hashArray[i]) {
      if (Math.random() * 20 < 8) {
        instance.previous_commit = `${randomHash}, ${hashArray[i + 2]}`;
      } else {
        instance.previous_commit = randomHash;
      }
    } else {
      if (Math.random() * 20 < 8) {
        instance.previous_commit = `${hashArray[i + 1]}, ${hashArray[i + 5]}`;
      } else {
        instance.previous_commit = hashArray[i + 1];
      }
    }
    return instance;
})

module.exports = {
    commits,
    hashArray
}

