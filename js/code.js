var nextPage = 'https://swapi.co/api/people/?page=1';
var previousPage = null;

$(function () {
  createHeroContainer();
  createHeroList(nextPage);
  $('.js_next').on('click', function () {
    $('.js_hero-container').html("");
    createHeroList(nextPage);
  });
  $('.js_previous').on('click', function () {
    $('.js_hero-container').html("");
    createHeroList(previousPage);
  });
});

function createHeroContainer() {
  var body = $('.js_body');
  body.append('<div class="js_loading loading"></div>');
  body.append('<div class="js_hero-container hero-container hide"></div>');
  body.append('' +
      '<div class="js_navigation navigation clearfix hide">' +
        '<button class="js_next next" type="button">Next</button>' +
        '<button class="js_previous previous" type="button">Previuos</button>' +
      '</div>' +
      '');
}

function createHeroItem(hero) {
  $('.js_hero-container').append(
      '<div class="js_hero-item hero-item clearfix">' +
        '<img class="js_hero-img hero-img">' +
        '<div class="js_hero-info hero-info">' +
          '<p class="js_hero-name hero-name"><span>Name: </span> ' + hero.name + '</p>' +
          '<p class="js_hero-gender hero-gender"><span>Gender: </span> ' + hero.gender + '</p>' +
          '<p class="js_hero-height hero-height"><span>Height: </span> ' + hero.height + '</p>' +
          '<p class="js_hero-mass hero-mass"><span>Mass: </span> ' + hero.mass + '</p>' +
          '<p class="js_hero-birth hero-birth"><span>Birth year: </span> ' + hero.birth_year + '</p>' +
        '</div>' +
      '</div>'
  );
}

function createHeroList(url) {
  loadingPage();
  getNumberOfHeroes(function(output) {
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
}

function getNumberOfHeroes(handler, linkApi) {
  $.ajax({
    type : 'GET',
    url : linkApi,
    success : function (data) {
      loadingData();
      handler(data);
    },
    error : function () {
      console.log("error");
    }
  });
}