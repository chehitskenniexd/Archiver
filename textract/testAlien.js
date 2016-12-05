
  var textract = require('textract');
  const db = require('../db');
  var File = require('../db/models/file.js');
  const blobFiles = require('../db/seeds/blob_file.js');

  textract.fromFileWithPath(__dirname + '/Alien2.docx', {preserveLineBreaks: true}, function( error, text ) {
    if (error) {
      console.log("There was an error textracting.", error);
    }
    let buffer = new Buffer(text);
    let one = [{
      file_name: 'Alien',
      file_contents: 'First Alien',
      buffer: buffer
    }]

    let seedOneFile = () => db.Promise.each(one, one => db.model('file').create(one));
    seedOneFile();
    console.log("Completed buffer seed 1")
  });

  textract.fromFileWithPath(__dirname + '/Alien3.docx', {preserveLineBreaks: true}, function( error, text ) {
    if (error) {
      console.log("There was an error textracting.", error);
    }
    let buffer = new Buffer(text);
    let one = [{
      file_name: 'Alien',
      file_contents: 'Second Alien, with deleted stuff',
      buffer: buffer
    }]

    let seedOneFile = () => db.Promise.each(one, one => db.model('file').create(one));
    seedOneFile();
    console.log("Completed buffer seed 2")
  });

  textract.fromFileWithPath(__dirname + '/Alien4.docx', {preserveLineBreaks: true}, function( error, text ) {
    if (error) {
      console.log("There was an error textracting.", error);
    }
    let buffer = new Buffer(text);
    let one = [{
      file_name: 'Alien',
      file_contents: 'Third Alien, even more deleted yo',
      buffer: buffer
    }]

    let seedOneFile = () => db.Promise.each(one, one => db.model('file').create(one));
    seedOneFile();
    console.log("Completed buffer seed 3")
  });

  // textract.fromFileWithPath(__dirname + '/Alien4.docx', {preserveLineBreaks: true}, function( error, text ) {
  //   if (error) {
  //     console.log("There was an error textracting.", error);
  //   }
  //   let buffer = new Buffer(text);
  //   let one = [{
  //     file_name: 'Alien',
  //     file_contents: 'Third Alien, even more deleted yo',
  //     buffer: buffer
  //   }]

  //   let seedOneFile = () => db.Promise.each(one, one => db.model('file').create(one));
  //   seedOneFile();
  //   console.log("Completed buffer seed 3")
  // });

  // textract.fromFileWithPath(__dirname + '/Alien4.docx', {preserveLineBreaks: true}, function( error, text ) {
  //   if (error) {
  //     console.log("There was an error textracting.", error);
  //   }
  //   let buffer = new Buffer(text);
  //   let one = [{
  //     file_name: 'Alien',
  //     file_contents: 'Third Alien, even more deleted yo',
  //     buffer: buffer
  //   }]

  //   let seedOneFile = () => db.Promise.each(one, one => db.model('file').create(one));
  //   seedOneFile();
  //   console.log("Completed buffer seed 3")
  // });

  // textract.fromFileWithPath(__dirname + '/Alien4.docx', {preserveLineBreaks: true}, function( error, text ) {
  //   if (error) {
  //     console.log("There was an error textracting.", error);
  //   }
  //   let buffer = new Buffer(text);
  //   let one = [{
  //     file_name: 'Alien',
  //     file_contents: 'Third Alien, even more deleted yo',
  //     buffer: buffer
  //   }]

  //   let seedOneFile = () => db.Promise.each(one, one => db.model('file').create(one));
  //   seedOneFile();
  //   console.log("Completed buffer seed 3")
  // });

  // textract.fromFileWithPath(__dirname + '/Alien4.docx', {preserveLineBreaks: true}, function( error, text ) {
  //   if (error) {
  //     console.log("There was an error textracting.", error);
  //   }
  //   let buffer = new Buffer(text);
  //   let one = [{
  //     file_name: 'Alien',
  //     file_contents: 'Third Alien, even more deleted yo',
  //     buffer: buffer
  //   }]

  //   let seedOneFile = () => db.Promise.each(one, one => db.model('file').create(one));
  //   seedOneFile();
  //   console.log("Completed buffer seed 3")
  // });

  // textract.fromFileWithPath(__dirname + '/Alien4.docx', {preserveLineBreaks: true}, function( error, text ) {
  //   if (error) {
  //     console.log("There was an error textracting.", error);
  //   }
  //   let buffer = new Buffer(text);
  //   let one = [{
  //     file_name: 'Alien',
  //     file_contents: 'Third Alien, even more deleted yo',
  //     buffer: buffer
  //   }]

  //   let seedOneFile = () => db.Promise.each(one, one => db.model('file').create(one));
  //   seedOneFile();
  //   console.log("Completed buffer seed 3")
  // });

  // textract.fromFileWithPath(__dirname + '/Alien4.docx', {preserveLineBreaks: true}, function( error, text ) {
  //   if (error) {
  //     console.log("There was an error textracting.", error);
  //   }
  //   let buffer = new Buffer(text);
  //   let one = [{
  //     file_name: 'Alien',
  //     file_contents: 'Third Alien, even more deleted yo',
  //     buffer: buffer
  //   }]

  //   let seedOneFile = () => db.Promise.each(one, one => db.model('file').create(one));
  //   seedOneFile();
  //   console.log("Completed buffer seed 3")
  // });


  const seedBlobFile = () => db.Promise.each(blobFiles, blobFile => db.model('blobFile').create(blobFile));
    seedBlobFile();
    console.log("Completed last seed blob file")

  // textract.fromFileWithPath(__dirname + '/Alien.htm', {preserveLineBreak: true}, function( error, text ) {
  //   if (error) {
  //     console.log("There was an error textracting.", error);
  //   }
  // });




