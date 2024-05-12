// Handle the addition of a song to the playlist
function handleAddToPlaylist(button) {
    // Parse the song information from the dataset of the clicked button
    let song = JSON.parse(button.dataset.song);
    
    // Get the playlist table
    let playlistTable = document.getElementById('playlist_table');
    
    // Append a new row to the playlist table with the song information
    playlistTable.innerHTML += createPlaylistRow(song);
}

// Handle the removal of a song from the playlist
function handleRemoveFromPlaylist(button) {
    // Find the closest table row (tr) to the clicked button and remove it
    let row = button.closest('tr');
    row.remove();
}

// Handle moving a song up in the playlist
function handleMoveUp(button) {
    // Find the closest table row (tr) to the clicked button
    let row = button.closest('tr');
    
    // Find the previous row in the table
    let prevRow = row.previousElementSibling;
    
    // If there is a previous row, move the current row above it
    if (prevRow) {
        row.parentNode.insertBefore(row, prevRow);
    }
}

// Handle moving a song down in the playlist
function handleMoveDown(button) {
    // Find the closest table row (tr) to the clicked button
    let row = button.closest('tr');
    
    // Find the next row in the table
    let nextRow = row.nextElementSibling;
    
    // If there is a next row, move the current row below it
    if (nextRow) {
        row.parentNode.insertBefore(nextRow, row);
    }
}
