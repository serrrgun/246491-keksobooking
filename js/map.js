'use strict';

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
    var locationX = getRandomNumber(300, 500);
    var locationY = getRandomNumber(150, 500);

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

// Активируем курту
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

mapPins.appendChild(fragmentMapPins);

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


createMapCard(articles[0]);

