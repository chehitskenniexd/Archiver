var textract = require('textract');
const db = require('../db');
var File = require('../db/models/file.js');

textract.fromFileWithPath(__dirname + '/Alien2.docx', {preserveLineBreaks: true}, function( error, text ) {
  if (error) {
    console.log("There was an error textracting.", error);
  }
  let buffer = new Buffer(text);
  let one = [{
    file_name: 'Alien',
    file_contents: 'Hope this works',
    buffer: buffer
  }]

  const seedOneFile = () => db.Promise.each(one, one => db.model('file').create(one));
  seedOneFile();
  console.log("Completed buffer seed")
});

// textract.fromFileWithPath(__dirname + '/Alien.htm', {preserveLineBreak: true}, function( error, text ) {
//   if (error) {
//     console.log("There was an error textracting.", error);
//   }
// });

