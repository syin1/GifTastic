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

  var limit = 10;

  for (var i = 0; i < topics.length; i++) {
    var onebutton = $(
      "<button type='button', class='btn btn-success btn-category'>"
    ).text(topics[i]);
    $('.buttons').append(onebutton);
  }

  $('.btn-category').on('click', function() {
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

      $('.images').text('');

      for (var i = 0; i < limit; i++) {
        var oneimage = response.data[i].images.fixed_height.url;
        var onerating = response.data[i].rating;

        var container = $("<div class='imgcontainer'>");

        var imagediv = $('<img>');
        imagediv.attr('src', oneimage);
        imagediv.attr('alt', searchTerm + ' image');

        var p = $('<p>').text('Rating: ' + onerating);

        container.append(p);
        container.append(imagediv);

        $('.images').append(container);
      }
    });
  });
});
