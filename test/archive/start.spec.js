// A simple test to verify a visible window is opened with a title
var Application = require('spectron').Application
var assert = require('assert')

// console.log("DIRNAME", __dirname)
var app = new Application({
  path: '/Users/sia/Fullstack/Semester_Senior/Week-9/archiver/app/index.js'
});

app.start().then(function () {
  console.log("HELLO?")
  // Check if the window is visible
  return app.browserWindow.isVisible()
})
  .then(function (isVisible) {
  // Verify the window is visible
  assert.equal(isVisible, true)
})
  .then(function () {
  // Get the window's title
  return app.client.getTitle()
})
  .then(function (title) {
  // Verify the window's title
  console.log("TITLE?", title)
  assert.equal(title, 'archiver')
})
  .then(function () {
  // Stop the application
  return app.stop()
})
  .catch(function (error) {
  // Log any failures
  console.error('Test failed', error.message)
});
