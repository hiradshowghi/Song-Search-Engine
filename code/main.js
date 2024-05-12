// Function to retrieve a song based on user input
function getSong() {
    // Get the entered song title from the input field and trim any leading or trailing whitespace
    let songTitle = document.getElementById('songTitleTextField').value.trim();
    console.log('songTitle: ' + songTitle);

    // Check if the song title is empty
    if (songTitle === '') {
        // Display an alert if the song title is empty
        return alert('Please enter a Song Title');
    }

    // Clear the search results area
    let songsDiv = document.getElementById('search_results_area');
    songsDiv.innerHTML = '';

    // Create a new XMLHttpRequest to fetch song data from the server
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        // Check if the request is complete and successful
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Parse the response as JSON and display the search results
            let response = JSON.parse(xhr.responseText);
            displaySearchResults(response);
        }
    };

    // Open a GET request to the server endpoint with the provided song title
    xhr.open('GET', `/songs?title=${songTitle}`, true);
    xhr.send();
}

// Function to display search results in the search results area
function displaySearchResults(data) {
    let songsDiv = document.getElementById('search_results_area');
    let heading = document.getElementById('search_results_heading');

    // Set the heading to display the searched song title
    heading.textContent = `Songs matching: ${document.getElementById('songTitleTextField').value}`;

    // Create a table to display search results and append it to the search results area
    let resultsTable = document.createElement('table');
    resultsTable.innerHTML = `
        <tr>
            <th>Action</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Artwork</th>
        </tr>
        ${data.results.map(song => createSearchResultsRow(song)).join('')}
    `;
    songsDiv.appendChild(resultsTable);
}

// Function to create a row for a song in the search results table
function createSearchResultsRow(song) {
    return `
        <tr>
            <td><button class="add-button" data-song='${JSON.stringify(song)}'>+</button></td>
            <td>${song.trackName}</td>
            <td>${song.artistName}</td>
            <td><img src="${song.artworkUrl100}" alt="Artwork"></td>
        </tr>
    `;
}

// Function to create a row for a song in the playlist table
function createPlaylistRow(song) {
    return `
        <tr>
            <td>
                <button class="remove-button">-</button>
                <button class="up-button">🔼</button>
                <button class="down-button">🔽</button>
            </td>
            <td>${song.trackName}</td>
            <td>${song.artistName}</td>
            <td><img src="${song.artworkUrl100}" alt="Artwork"></td>
        </tr>
    `;
}
