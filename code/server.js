// Import required modules
const express = require('express');
const http = require('http');

// Create an Express application
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Define routes for various URLs and serve the main HTML file
app.get(['/mytunes.html', '/mytunes', '/index.html', '/'], (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

// Handle requests to the '/songs' endpoint
app.get('/songs', (request, response) => {
  // Extract the song title from the query parameters
  let songTitle = request.query.title;

  // Check if the song title is missing
  if (!songTitle) {
    response.json({ message: 'Please enter Song Title' });
    return;
  }

  // Replace spaces in the title with plus signs for the iTunes API query
  let titleWithPlusSigns = songTitle.trim().replace(/\s/g, '+');

  // Configure options for the iTunes API request
  const options = {
    method: 'GET',
    hostname: 'itunes.apple.com',
    port: null,
    path: `/search?term=${titleWithPlusSigns}&entity=musicTrack&limit=20`,
    headers: {
      useQueryString: true
    }
  };

  // Make a request to the iTunes API
  http.request(options, function (apiResponse) {
    // Accumulate data as it is received
    let songData = '';
    apiResponse.on('data', function (chunk) {
      songData += chunk;
    });

    // Process the accumulated data when the response ends
    apiResponse.on('end', function () {
      // Set the response content type to JSON and send the parsed song data
      response.contentType('application/json').json(JSON.parse(songData));
    });
  }).end();
});

// Start the server and listen on the specified port
app.listen(PORT, (err) => {
  // Log an error if one occurs, otherwise log the server information and test URLs
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${PORT}`);
    console.log(`To Test:`);
    console.log(`http://localhost:3000/mytunes.html`);
    console.log(`http://localhost:3000/mytunes`);
    console.log(`http://localhost:3000/index.html`);
    console.log(`http://localhost:3000/`);
    console.log(`http://localhost:3000`);
  }
});
