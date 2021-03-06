var nextPage = 'https://swapi.co/api/people/?page=1';
var previousPage = null;
var totalPages = 0;
var currentPage = 1;

$(function () {
  createHeroContainer();
  createHeroList(nextPage);
  $('.js_next').on('click', function () {
    $('.js_hero-container').html("");
    currentPage++;
    createHeroList(nextPage);
  });
  $('.js_previous').on('click', function () {
    $('.js_hero-container').html("");
    currentPage--;
    createHeroList(previousPage);
  });
});

function createHeroContainer() {
  var body = $('.js_body');
  body.append('<div class="js_hero-container hero-container clearfix hide"></div>');
  body.append('' +
      '<div class="js_navigation navigation clearfix hide">' +
        '<button class="js_next next" type="button">Next</button>' +
        '<span class="js_pages pages"></span>' +
        '<button class="js_previous previous" type="button">Previuos</button>' +
      '</div>' +
      '');
}

function createHeroItem(hero) {
  var like = hero.name.split(' ').join('-') + '_liked';
  var selectorForLike= '#'+like;
  $('.js_hero-container').append(
      '<div class="js_hero-item hero-item clearfix">' +
        '<img class="js_hero-img hero-img">' +
        '<div class="js_hero-info hero-info">' +
          '<input class="js_hero-like hero-like" type="checkbox" name="thing" value="valuable" id="' + like + '" liked="false"/><label for="' + like + '"></label>' +
          '<p class="js_hero-name hero-name"><span>Name: </span> ' + hero.name + '</p>' +
          '<p class="js_hero-gender hero-gender"><span>Gender: </span> ' + hero.gender + '</p>' +
          '<p class="js_hero-height hero-height"><span>Height: </span> ' + hero.height + '</p>' +
          '<p class="js_hero-mass hero-mass"><span>Mass: </span> ' + hero.mass + '</p>' +
          '<p class="js_hero-birth hero-birth"><span>Birth year: </span> ' + hero.birth_year + '</p>' +
        '</div>' +
      '</div>'
  );
  $('.js_hero-item').fadeIn(2000);
  $(selectorForLike).addClass('js-not-liked');

  $(selectorForLike).on('change', function () {
    if($(this).hasClass('js-not-liked')) {
      $(this).removeClass('js-not-liked');
      $(this).addClass('js-liked');
      localStorage.setItem(selectorForLike, true);
    } else {
      $(this).addClass('js-not-liked');
      $(this).removeClass('js-liked');
      localStorage.setItem(selectorForLike, false);
    }
  });
  if(localStorage.getItem(selectorForLike) == 'true') {
    $(selectorForLike).removeClass('js-not-liked');
    $(selectorForLike).addClass('js-liked');
  }
}

function createHeroList(url) {
  loadingPage();
  getNumberOfHeroes(function(output) {
    totalPages = Math.ceil(output.count/10);
    $('.js_pages').text(currentPage + ' / ' + Math.ceil(output.count/10));
    var heroes = output.results;
    if(output.next === null) {
      $('.js_next').addClass('disabled');
    }else {
      $('.js_next').removeClass('disabled');
      nextPage = output.next;
    }
    if(output.previous === null) {
      $('.js_previous').addClass('disabled');
    }else {
      $('.js_previous').removeClass('disabled');
      previousPage = output.previous;
    }
    $.each(heroes, function (index) {
      createHeroItem(heroes[index]);
    });
  }, url);
}

function loadingPage() {
  $('.js_body').addClass('body--full-screen');
  $('.js_navigation').addClass('hide');
  $('.js_hero-container').addClass('hide');
  $('.js_loading').removeClass('hide');
}

function loadingData() {
  $('.js_body').removeClass('body--full-screen');
  $('.js_navigation').removeClass('hide');
  $('.js_hero-container').removeClass('hide');
  $('.js_loading').addClass('hide');
  $('.js_failure').addClass('hide');
  $('.js_failure-text').addClass('hide');
}

function getNumberOfHeroes(handler, linkApi) {
  $.ajax({
    type : 'GET',
    url : linkApi,
    timeout : 5000,
    success : function (data) {
      loadingData();
      handler(data);
    },
    error : function (XMLHttpRequest) {
      if(XMLHttpRequest.readyState == 0) {
        $('.body').append('<div class="js_failure-text failure-text">We are out of speed!</div>');
      }else if(XMLHttpRequest.readyState == 4) {
        $('.body').append('<div class="js_failure-text failure-text">We are under attack of 404 stormtroopers</div>').fadeIn(4000);
      } else {
        $('.body').append('<div class="js_failure-text failure-text">Error because of ' + XMLHttpRequest.statusText + '</div>');
      }
      $('.body').append('<div class="js_failure failure"></div>');
      $('.js_failure-text').fadeIn(1500);
      $('.js_failure').fadeIn(1500);
    }
  });
}