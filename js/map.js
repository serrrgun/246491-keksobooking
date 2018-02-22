'use strict';

var LOCATION_START_X = 300;
var LOCATION_START_Y = 150;
var LOCATION_END_X = 900;
var LOCATION_END_Y = 500;

var MAIN_PIN_HEIGHT = 75;
var MAIN_PIN_WIDTH = 65;

var QUANTITY_ADS_CARD = 8;

var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27;

var PRICE_MIN = 100;
var PRICE_MAX = 100000;

var QUANTITY_ROOMS_MIN = 1;
var QUANTITY_ROOMS_MAX = 5;

var QUANTITY_GUESTS_MIN = 1;
var QUANTITY_GUESTS_MAX = 50;

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

var TYPES = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};


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


var TYPE_PROPERTIES = {
  'bungalo': {
    'name': 'Бунгало',
    'minPrice': 0
  },
  'flat': {
    'name': 'Квартира',
    'minPrice': 1000
  },
  'house': {
    'name': 'Дом',
    'minPrice': 5000
  },
  'palace': {
    'name': 'Дворец',
    'minPrice': 10000
  }
};
/**
 * Создает массив объектов с характеристиками объявления
 * @return {Array} - массив с объявлениями
 */
var getGenerateDataArticle = function () {
  var articlesAdd = [];
  for (var i = 0; i < QUANTITY_ADS_CARD; i++) {
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
        'type': Object.keys(TYPES)[getRandomNumber(0, Object.keys(TYPES).length - 1)],
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
};

// переменная массива случайных объявлений
var articles = getGenerateDataArticle();

/**
 * Создает пин на основе шаблона
 * @param {Object} pin
 */
var createMapPins = function (pin) {
  var mapPins = document.querySelector('.map__pins');
  var fragmentMapPins = document.createDocumentFragment();
  for (var i = 0; i < QUANTITY_ADS_CARD; i++) {
    var newMapPin = document.createElement('button');
    newMapPin.className = 'map__pin';
    newMapPin.style.left = (pin[i].location.x + 'px');
    newMapPin.style.top = (pin[i].location.y + 'px');
    newMapPin.innerHTML = '<img src="' + pin[i].author.avatar + '" width="40" height="40" draggable="false" pin-id="' + i + '">';
    newMapPin.setAttribute('offer-id', i);
    newMapPin.style.display = 'none';
    fragmentMapPins.appendChild(newMapPin);
  }
  mapPins.appendChild(fragmentMapPins);
};

// переменная главной карты
var map = document.querySelector('.map');

/**
 * Создает объявление на основе данных из массива объектов и вставляет в DOM
 * @param {Object} variant - объект из созданного массива объявлений
 */
var createMapCard = function (variant) {
  var cardElement = document.querySelector('template').cloneNode(true).content.querySelector('.map__card');
  var mapFilters = document.querySelector('.map__filters-container');

  cardElement.querySelector('h3').textContent = variant.offer.title;
  cardElement.querySelector('small').textContent = variant.offer.address;
  cardElement.querySelector('.popup__price').textContent = variant.offer.price + ' \u20bd/ночь';
  cardElement.querySelector('h4').textContent = TYPES[variant.offer.type];
  cardElement.querySelector('h4 + p').textContent = variant.offer.rooms + ' комнаты для ' + variant.offer.guests + ' гостей';
  cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + variant.offer.checkin + ', выезд до ' + variant.offer.checkout;
  cardElement.querySelector('.popup__avatar').src = variant.author.avatar;
  cardElement.querySelector('.popup__pictures img').src = variant.offer.photos;
  cardElement.querySelector('.popup__pictures img').style.width = '70px';
  map.insertBefore(cardElement, mapFilters);

  var closePopup = document.querySelector('.popup__close');

  closePopup.addEventListener('click', closeMapCard);
  closePopup.addEventListener('keydown', popupPressEnterHandler);
  document.addEventListener('keydown', popupPressEscHandler);
};

/**
 * Функуия закрывает карточку объявления про нажатии на Enter
 * @param {*} evt
 */
var popupPressEnterHandler = function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    closeMapCard();
  }
};

/**
 * Функуия закрывает карточку объявления про нажатии на Esc
 * @param {*} evt
 */
var popupPressEscHandler = function (evt) {
  if (evt.keyCode === KEYCODE_ESC) {
    closeMapCard();
  }
};
/**
 * Функция показывает карточку объявления при нажатии на Enter
 * @param {*} evt
 */
var mapPinPressEnter = function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    mapPinClickHandler(evt);
  }
};

/**
 * Функция закрывает карточку объявления
 */
var closeMapCard = function () {
  var mapCard = map.querySelector('.map__card');
  if (mapCard) {
    var closePopup = document.querySelector('.popup__close');
    closePopup.removeEventListener('click', closeMapCard);
    closePopup.removeEventListener('keydown', popupPressEnterHandler);
    document.removeEventListener('keydown', popupPressEscHandler);
    map.removeChild(mapCard);
  }
};

// запускает функцию отрисовки пинов
createMapPins(articles);

// переменная главного пина
var mainPin = document.querySelector('.map__pin--main');

/**
 * Функция активирует форму, карту, пины на карте при нажатии на главный пин
 */
var mainPinUpHandler = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.notice__form').classList.remove('notice__form--disabled');
  document.querySelector('.notice__form').elements.disabled = false;
  var PinPosX = mainPin.offsetTop + MAIN_PIN_HEIGHT;
  var PinPosY = mainPin.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2);
  addressInput.value = PinPosX + ', ' + PinPosY;
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].style.display = 'block';
  }
};

var mainPinPosX = mainPin.offsetTop + MAIN_PIN_HEIGHT;
var mainPinPosY = mainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
var addressInput = document.querySelector('#address');
addressInput.value = 'x: ' + mainPinPosX + ', ' + 'y: ' + mainPinPosY;

// переменная массива пинов
var mapPinsArr = document.querySelector('.map__pins');

/**
 * Функция показывает соответствующее объявление нажатому пину
 * @param {*} evt
 */
var mapPinClickHandler = function (evt) {
  var target = evt.target;
  if (target.getAttribute('pin-id')) {
    var offerId = target.getAttribute('pin-id');
    closeMapCard();
    createMapCard(articles[offerId]);
  }
};

mainPin.addEventListener('mouseup', mainPinUpHandler);
mapPinsArr.addEventListener('click', mapPinClickHandler);
mapPinsArr.addEventListener('keydown', mapPinPressEnter);


// ВАЛИДАЦИЯ ФОРМЫ
var noticeForm = document.querySelector('.notice__form');

var noticeTitle = noticeForm.querySelector('input[name="title"]');
var noticeType = noticeForm.querySelector('select[name="type"]');
var noticePrice = noticeForm.querySelector('input[name="price"]');

var noticeTimeIn = noticeForm.querySelector('select[name="timein"]');
var noticeTimeOut = noticeForm.querySelector('select[name="timeout"]');

var noticeRoomNumber = noticeForm.querySelector('#room_number');
var noticeRoomCapacity = noticeForm.querySelector('#capacity');

var buttonSubmit = noticeForm.querySelector('.form__submit');

/**
 * Функция синхронизирует вркмя выезда и время заезда
 * @param {obj} changeTime - поле на котором будет происходить смаена времени
 * @param {obj} evtChange - событие которое приходит от обработчика
 * @return {obj} selectedTime - блок с изменненным элементом
 */
var syncTimesArrival = function (changeTime, evtChange) {
  var selectedTime = changeTime.querySelectorAll('option');
  for (var i = 0; i < selectedTime.length; i++) {
    selectedTime[i].selected = false;
    if (selectedTime[i].value === evtChange.target.value) {
      selectedTime[i].selected = true;
    }
  }
  return selectedTime;
};

/**
 * @param {obj} evtChange - параметр обработчика события
 */
var changeTimeHandler = function (evtChange) {
  if (evtChange.target.id === 'timein') {
    syncTimesArrival(noticeTimeOut, evtChange);
  }
  if (evtChange.target.id === 'timeout') {
    syncTimesArrival(noticeTimeIn, evtChange);
  }
};
/**
 * Функция стилей сообщения об ошибке
 * @param {string} message - сообщение об ошибке
 * @param {obj} inputField - поле формы
 * @return {obj} inputField - поле формы с добавлением стилей ошибки
 */
var errorStyle = function (message, inputField) {
  inputField.setCustomValidity(message);
  inputField.style.border = '3px solid red';
  return inputField;
};
/**
 * Функция удаления сообщения об ошибке
 * @param {obj} inputField - поле формы
 * @return {obj} inputField - поле формы с удаленной ошибкой
 */
var removeErrorStyle = function (inputField) {
  inputField.setCustomValidity('');
  inputField.style.border = '';
  return inputField;
};

var titleInvalidHandler = function () {
  if (noticeTitle.validity.valueMissing) {
    errorStyle('', noticeTitle);
  } else if (noticeTitle.validity.tooShort) {
    errorStyle('Минимальная длина названия - ' + noticeTitle.minLength, noticeTitle);
  } else if (noticeTitle.validity.tooLong) {
    errorStyle('Максимальная длина названия - ' + noticeTitle.maxLength, noticeTitle);
  } else {
    removeErrorStyle(noticeTitle);
  }
};

var noticeTypeAppartHandler = function () {
  var priceValue = TYPE_PROPERTIES[noticeType.querySelector('option:checked').value];
  noticePrice.min = priceValue.minPrice;
  noticePrice.placeholder = priceValue.minPrice;
  noticePriceInvalidHandler();
  return noticePrice;
};

var noticePriceInvalidHandler = function () {
  if (noticePrice.validity.valueMissing) {
    errorStyle('', noticePrice);
  } else if (noticePrice.validity.rangeOverflow) {
    errorStyle('Цена не может быть больше ' + noticePrice.max, noticePrice);
  } else if (noticePrice.validity.rangeUnderflow) {
    errorStyle('Цена не может быть меньше ' + noticePrice.min, noticePrice);
  } else {
    removeErrorStyle(noticePrice);
  }
};

var inputRoomsAndGuestsHandler = function () {
  if (noticeRoomNumber.value === '100' && noticeRoomCapacity.value !== '0') {
    errorStyle('Не соответствие количества комнат количеству гостей', noticeRoomNumber);
    errorStyle('Не соответствие количества комнат количеству гостей', noticeRoomCapacity);
  } else if (noticeRoomCapacity.value === '0' && noticeRoomNumber.value !== '100') {
    errorStyle('Не соответствие количества комнат количеству гостей', noticeRoomNumber);
    errorStyle('Не соответствие количества комнат количеетву гостей', noticeRoomCapacity);
  } else if (noticeRoomNumber.value < noticeRoomCapacity.value) {
    errorStyle('Не соответствие количества комнат количеству гостей', noticeRoomNumber);
    errorStyle('Не соответствие количества комнат количеству гостей', noticeRoomCapacity);
  } else {
    removeErrorStyle(noticeRoomNumber);
    removeErrorStyle(noticeRoomCapacity);
  }
};

noticeTitle.addEventListener('focus', titleInvalidHandler);
noticeTitle.addEventListener('input', titleInvalidHandler);

noticeType.addEventListener('change', noticeTypeAppartHandler);

noticePrice.addEventListener('focus', noticePriceInvalidHandler);
noticePrice.addEventListener('input', noticePriceInvalidHandler);

noticeTimeIn.addEventListener('change', changeTimeHandler);
noticeTimeOut.addEventListener('change', changeTimeHandler);

noticeRoomNumber.addEventListener('change', inputRoomsAndGuestsHandler);
noticeRoomCapacity.addEventListener('change', inputRoomsAndGuestsHandler);

var submitButtonClickHandler = function () {
  noticeTitle.addEventListener('invalid', titleInvalidHandler);
  noticePrice.addEventListener('invalid', noticePriceInvalidHandler);
  noticeRoomNumber.addEventListener('invalid', inputRoomsAndGuestsHandler);
  noticeRoomCapacity.addEventListener('invalid', inputRoomsAndGuestsHandler);

  inputRoomsAndGuestsHandler();
  inputRoomsAndGuestsHandler();
};

buttonSubmit.addEventListener('click', submitButtonClickHandler);
