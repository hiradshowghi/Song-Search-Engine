// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
  // Attach an event listener to the submit button, triggering the getSong function on click
  document.getElementById('submit_button').addEventListener('click', getSong);

  // Attach a general click event listener to the document
  document.addEventListener('click', function (event) {
      // Check if the clicked element has the 'add-button' class
      if (event.target.classList.contains('add-button')) {
          // If true, handle the addition of the clicked item to the playlist
          handleAddToPlaylist(event.target);
      } 
      // Check if the clicked element has the 'remove-button' class
      else if (event.target.classList.contains('remove-button')) {
          // If true, handle the removal of the clicked item from the playlist
          handleRemoveFromPlaylist(event.target);
      } 
      // Check if the clicked element has the 'up-button' class
      else if (event.target.classList.contains('up-button')) {
          // If true, handle moving the clicked item up in the playlist
          handleMoveUp(event.target);
      } 
      // Check if the clicked element has the 'down-button' class
      else if (event.target.classList.contains('down-button')) {
          // If true, handle moving the clicked item down in the playlist
          handleMoveDown(event.target);
      }
  });
});
