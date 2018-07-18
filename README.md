# GifTastic

This is a sports-themed gif app!

Upon initialization, the app will first take the topics in the starter array and dynamically create buttons in our HTML.

When the user clicks on a button, the page will grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

When the user clicks one of the still GIPHY images, the gif will animate. If the user clicks the gif again, it will stop playing.

Above every gif, its metadata (title, rating, uploade date/time) is displayed.

On the left panel, users can add new topics of their interest.

Users can request 10 additional gifs to be added to the page by clicking on the "Load More Images" button.

Users can also download gifs by clicking the download icon above each image.

Users can add their favorite gifs to the "My Favorites" section, these gifs will persist even when the page is reloaded (via local storage).
