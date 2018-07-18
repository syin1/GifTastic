$(document).ready(function() {
  var topics = [
    'tennis',
    'basketball',
    'hockey',
    'table tennis',
    'skiing',
    'soccer',
    'bowling',
    'skating',
    'boxing',
    'swimming',
    'archery',
    'cycling',
    'diving'
  ];

  var apikey = 'fZ5dIQx9aTA23h20a4GGZGZvc7bf7hyj';
  var limit = 10;
  var currentTerm = '';

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

  function displayImages(response, searchTerm) {
    for (var i = 0; i < limit; i++) {
      var onegif = response.data[i].images.fixed_height.url;
      var onestill = response.data[i].images.fixed_height_still.url;
      var onerating = response.data[i].rating;
      var datetime = response.data[i].import_datetime;
      var favoriteimg = response.data[i].images.fixed_width.url;

      var download = $(
        "<a href='" +
          onegif +
          "' download><i class='fas fa-cloud-download-alt'></i> Download</a>"
      );

      var favorite = $(
        '<button type="button" class="btn btn-primary btn-sm addfavorite"><i class="fas fa-star"></i>  Add to Favorite</button>'
      );
      favorite.attr('data-attr', favoriteimg);

      var onetitle = response.data[i].title + '   ';

      var container = $("<div class='imgcontainer'>");

      var imagediv = $('<img>');
      imagediv.attr('src', onestill);
      imagediv.attr('data-still', onestill);
      imagediv.attr('data-animate', onegif);
      imagediv.attr('data-state', 'still');
      imagediv.attr('alt', searchTerm + ' image');

      var p = $("<p class='metadata'>").text('Rating: ' + onerating + '  ');
      var title = $("<p class='metadata'>").text('Title: ' + onetitle);
      var datetime = $("<p class='metadata'>").text(
        'Upload Date/Time: ' + datetime
      );

      title.append(download);
      p.append(favorite);
      container.append(title);
      container.append(p);
      container.append(datetime);
      container.append(imagediv);

      $('.images').prepend(container);
    }
  }

  $(document.body).on('click', '.btn-category', function() {
    limit = 10;
    var searchTerm = $(this).text();
    currentTerm = searchTerm;

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
      console.log(response);
      $('.images').text('');
      displayImages(response, searchTerm);
    });
  });

  $('.submit').on('click', function() {
    var addTerm = $('#sport-input').val();

    if (addTerm !== '') {
      topics.push(addTerm);
      displayTopics();
    }
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

  $('.loadmore').on('click', function() {
    limit += 10;

    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      currentTerm +
      '&api_key=' +
      apikey +
      '&limit=' +
      limit;

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      $('.images').text('');
      displayImages(response, currentTerm);
    });
  });

  $(document.body).on('click', '.addfavorite', function() {
    favimg = $('<img>')
      .attr('src', $(this).attr('data-attr'))
      .addClass('favorites');
    $('#myfavorites').append(favimg);
  });
});
