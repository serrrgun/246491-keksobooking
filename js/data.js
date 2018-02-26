'use strict';

(function () {

  var TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];


  var CHECKINS = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var CHECKOUT = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var PRICE_MIN = 100;
  var PRICE_MAX = 100000;

  var QUANTITY_ROOMS_MIN = 1;
  var QUANTITY_ROOMS_MAX = 5;

  var QUANTITY_GUESTS_MIN = 1;
  var QUANTITY_GUESTS_MAX = 50;

  var LOCATION_START_X = 300;
  var LOCATION_START_Y = 150;
  var LOCATION_END_X = 900;
  var LOCATION_END_Y = 500;

  window.data = {

    TYPES: {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },

    QUANTITY_ADS_CARD: 8,
    KEYCODE_ENTER: 13,
    KEYCODE_ESC: 27,

    /**
     * Создает массив объектов с характеристиками объявления
     * @return {Array} - массив с объявлениями
     */
    getGenerateDataArticle: function () {
      var articlesAdd = [];
      for (var i = 0; i < window.data.QUANTITY_ADS_CARD; i++) { // используется еще в pin.js
        var location = {
          x: getRandomNumber(LOCATION_START_X, LOCATION_END_X),
          y: getRandomNumber(LOCATION_START_Y, LOCATION_END_Y)
        };
        articlesAdd.push({
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'title': getRandomElement(TITLE),
            'address': location.x + ', ' + location.y,
            'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
            'type': Object.keys(window.data.TYPES)[getRandomNumber(0, Object.keys(window.data.TYPES).length - 1)],
            'rooms': getRandomNumber(QUANTITY_ROOMS_MIN, QUANTITY_ROOMS_MAX),
            'guests': getRandomNumber(QUANTITY_GUESTS_MIN, QUANTITY_GUESTS_MAX),
            'checkin': getRandomElement(CHECKINS),
            'checkout': getRandomElement(CHECKOUT),
            'features': FEATURES.slice(getRandomNumber(1, FEATURES.length - 1)),
            'description': '',
            'photos': getRandomElement(PHOTOS)
          },
          'location': location
        });
      }
      return articlesAdd;
    }
  };

  /**
   * Возвращает случайный элемент массива
   * @param {Array} array - массив.
   * @return {string} - случайный элемент массива.
   */
  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * (array.length))];
  };

  /**
   * Расчитывает случайное число в заданном диапазоне
   * @param {number} min - минимальное число диапазона
   * @param {number} max - максимальное число диапазона
   * @return {number} - случайное число диапазона
   */
  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };
})();
