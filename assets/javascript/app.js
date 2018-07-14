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

  function displayTopics() {
    $('.buttons').html('');
    for (var i = 0; i < topics.length; i++) {
      var onebutton = $(
        "<button type='button' class='btn btn-success btn-category'>"
      ).text(topics[i]);
      $('.buttons').append(onebutton);
    }
  }

  displayTopics();

  $(document.body).on('click', '.btn-category', function() {
    var apikey = 'fZ5dIQx9aTA23h20a4GGZGZvc7bf7hyj';
    var searchTerm = $(this).text();

    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      searchTerm +
      '&api_key=' +
      apikey +
      '&limit=' +
      limit;

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      $('.images').text('');
      console.log(response);

      for (var i = 0; i < limit; i++) {
        var onegif = response.data[i].images.fixed_height.url;
        var onestill = response.data[i].images.fixed_height_still.url;
        var onerating = response.data[i].rating;

        var container = $("<div class='imgcontainer'>");

        var imagediv = $('<img>');
        imagediv.attr('src', onestill);
        imagediv.attr('data-still', onestill);
        imagediv.attr('data-animate', onegif);
        imagediv.attr('data-state', 'still');
        imagediv.attr('alt', searchTerm + ' image');

        var p = $('<p>').text('Rating: ' + onerating);

        container.append(p);
        container.append(imagediv);

        $('.images').append(container);
      }
    });
  });

  $('.submit').on('click', function() {
    topics.push($('#sport-input').val());
    displayTopics();
  });

  $(document.body).on('click', 'img', function() {
    var state = $(this).attr('data-state');

    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else if (state === 'animate') {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  });
});
