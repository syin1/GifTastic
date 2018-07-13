$(document).ready(function() {
  var topics = [
    'tennis',
    'basketball',
    'hockey',
    'table tennis',
    'golf',
    'soccer',
    'baseball',
    'bowling',
    'fencing',
    'boxing'
  ];

  var limit = 5;

  for (var i = 0; i < topics.length; i++) {
    var onebutton = $("<button type='button', class='btn btn-success'>").text(
      topics[i]
    );
    $('.buttons').append(onebutton);
  }

  $('button').on('click', function() {
    var apikey = 'fZ5dIQx9aTA23h20a4GGZGZvc7bf7hyj';
    var searchTerm = $(this).text();

    var queryURL =
      'http://api.giphy.com/v1/gifs/search?q=' +
      searchTerm +
      '&api_key=' +
      apikey +
      '&limit=' +
      limit;

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      console.log(response);

      for (var i = 0; i < limit; i++) {
        oneimage = response.data[i].images.fixed_height.url;
        imagediv = $('<img>');
        imagediv.attr('src', oneimage);
        imagediv.attr('alt', searchTerm + ' image');
        $('.images').append(imagediv);
      }
    });
  });
});
