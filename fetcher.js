const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const path = process.argv[3];

if (path === "" || path === undefined) {
  console.log("Invalid path");
  return;
}

request(url, (error, response, body) => {
  if(error) {
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('error:', error); // Print the error if one occurred
    return;
  }
  console.log('statusCode:', response && response.statusCode);
  // console.log(response); 
  
  // Write the HTML for example.edu homepage in the file
  fs.writeFile(path, body, (err) => {
    if (err) throw err;
    console.log(`Downloaded and saved ${body.length} to ${path}`);
  })
});


// 1. What should happen if the local file path given already exists? => fs.writeFile asynchronously writes data to a file, replacing the file if it already exists (by default from documentation).
// 2. What should happen if the local file path given is invalid? => inform the user
// 3. What should happen if the given URL results in an error or non-200 result? => terminate the app explaining to the user what went wrong, and not write the response body to the file