'use strict';

var LOCATION_START_X = 300;
var LOCATION_START_Y = 150;
var LOCATION_END_X_Y = 500;

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

var TYPES = [
  'flat',
  'house',
  'bungalo'
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

/**
 * Создает массив объектов с характеристиками объявления
 * @param {number} quantity - количество объектов
 * @return {Array} articles - массив объектов
 */
var getGenerateDataArticle = function (quantity) {
  var articles = [];
  for (var i = 0; i < quantity; i++) {
    var locationX = getRandomNumber(LOCATION_START_X, LOCATION_END_X_Y);
    var locationY = getRandomNumber(LOCATION_START_Y, LOCATION_END_X_Y);

    articles.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': getRandomElement(TITLE),
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(100, 100000),
        'type': getRandomElement(TYPES),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 50),
        'checkin': getRandomElement(CHECKINS),
        'checkout': getRandomElement(CHECKOUT),
        'features': FEATURES.slice(getRandomNumber(1, FEATURES.length - 1)),
        'description': '',
        'photos': getRandomElement(PHOTOS)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }
  return articles;
};
// Генерируем нужное количество объявлений
var articles = getGenerateDataArticle(8);

// Нходим карту
var map = document.querySelector('.map');

// Находим шаблон пина
var temlateMapPin = document.querySelector('template').content.querySelector('.map__pin');
// находим пин в разметке
var mapPins = document.querySelector('.map__pins');

/**
 * Создает пин на основе шаблона
 * @param {Object} pin
 * @return {Node}
 */
var createMapPins = function (pin) {
  var newMapPins = temlateMapPin.cloneNode(true);

  newMapPins.querySelector('img').src = pin.author.avatar;
  newMapPins.style.left = (pin.location.x + 'px');
  newMapPins.style.top = (pin.location.y + 'px');

  return newMapPins;
};

var fragmentMapPins = document.createDocumentFragment();

for (var i = 0; i < articles.length; i++) {
  fragmentMapPins.appendChild(createMapPins(articles[i]));
}

var templateMapCard = document.querySelector('template').content.querySelector('.map__card');
var cardElement = templateMapCard.cloneNode(true);

/**
 * Создает объявление на основе данных из массива объектов и вставляет в DOM
 * @param {Object} variant - объект из созданного массива
 */
var createMapCard = function (variant) {
  cardElement.querySelector('.popup__avatar').src = variant.author.avatar;
  cardElement.querySelector('h3').textContent = variant.offer.title;
  cardElement.querySelector('small').textContent = variant.offer.address;
  cardElement.querySelector('.popup__price').textContent = variant.offer.price + ' P/ночь';
  cardElement.querySelector('h4').textContent = TYPES[variant.offer.type];
  cardElement.querySelector('h4 + p').textContent = variant.offer.rooms + ' комнаты для ' + variant.offer.guests + ' гостей';
  cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + variant.offer.checkin + ', выезд до ' + variant.offer.checkout;
  cardElement.querySelector('.popup__pictures img').src = variant.offer.photos;
  cardElement.querySelector('.popup__pictures img').style.width = '70px';

  document.querySelector('.map').insertBefore(cardElement, document.querySelector('.map__filters-container'));
};

var noticeForm = document.querySelector('.notice__form');
var mainPin = document.querySelector('.map__pin--main');

/**
 * Функция добавляет элементам формы атрибут disabled
 */
var getDisabledFieldset = function () {
  var noticeFormFieldset = document.querySelectorAll('form__element');
  for (var k = 0; k < noticeFormFieldset.length; k++) {
    noticeFormFieldset[k].setAttribute('disabled', '');
  }
};

getDisabledFieldset();

/**
 * Функция удаляет атрибут disabled делая элементы формы активными
 */
var getEnebledFieldset = function () {
  var noticeFormFieldset = document.querySelectorAll('.form__element');
  for (var j = 0; j < noticeFormFieldset.length; j++) {
    noticeFormFieldset[j].removeAttribute('disabled', '');
  }
};

/**
 * Функция отрисовки пина и соответствующего объявления
 */
var getMapCard = function () {
  var pinList = document.querySelectorAll('.map__pin');
  var pinArr = Array.prototype.slice.call(pinList);
  pinArr.splice(0, 1);
  pinArr[0].addEventListener('click', function () {
    createMapCard(articles[0]);
  });
  pinArr[1].addEventListener('click', function () {
    createMapCard(articles[1]);
  });
  pinArr[2].addEventListener('click', function () {
    createMapCard(articles[2]);
  });
  pinArr[3].addEventListener('click', function () {
    createMapCard(articles[3]);
  });
  pinArr[4].addEventListener('click', function () {
    createMapCard(articles[4]);
  });
  pinArr[5].addEventListener('click', function () {
    createMapCard(articles[5]);
  });
  pinArr[6].addEventListener('click', function () {
    createMapCard(articles[6]);
  });
  pinArr[7].addEventListener('click', function () {
    createMapCard(articles[7]);
  });
};

var MAIN_PIN_WIDTH = 65 / 2;
var MAIN_PIN_HEIGHT = 75;

/**
 * Функция определения координат пина создания объявления
 * @return {string}
 */
var getMainPinPosition = function () {
  var mainPinPosX = mainPin.offsetTop + MAIN_PIN_HEIGHT;
  var mainPinPosY = mainPin.offsetLeft + MAIN_PIN_WIDTH;

  return 'x: ' + mainPinPosX + ', ' + 'y: ' + mainPinPosY;
};

var addressInput = document.querySelector('#address');
addressInput.value = getMainPinPosition();


mainPin.addEventListener('mouseup', function () {
  noticeForm.classList.remove('notice__form--disabled');
  getEnebledFieldset();
  mapPins.appendChild(fragmentMapPins);
  map.classList.remove('map--faded');
  getMapCard();
});
