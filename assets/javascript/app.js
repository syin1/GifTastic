$(document).ready(function() {
  var apikey = 'fZ5dIQx9aTA23h20a4GGZGZvc7bf7hyj';
  var searchTerm = 'ryan+gosling';

  var queryURL =
    'http://api.giphy.com/v1/gifs/search?q=' +
    searchTerm +
    '&api_key=' +
    apikey +
    '&limit=5';

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(response);
  });
});
