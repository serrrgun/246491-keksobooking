'use strict';

(function () {
  window.constants = {

    TOP_LIMIT: 150,
    BOTTOM_LIMIT: 500,
    KEYCODE_ENTER: 13,
    KEYCODE_ESC: 27,
    PIN_HEIGHT: 40,
    PIN_WIDTH: 70,
    MAIN_PIN_HEIGHT: 70,
    MAIN_PIN_WIDTH: 65,

    TYPES: {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    MIN_PRICES: {
      flat: 1000,
      bungalo: 0,
      house: 5000,
      palace: 10000
    },
    URL_GET: 'https://js.dump.academy/keksobooking/data',
    URL_UPLOAD: 'https://js.dump.academy/keksobooking',
    TIMEOUT: 10000,
    INTERVAL_DEBOUNCE: 500,
    SET_INTERVAL: 10000,
    WIDTH_PICTURE: 50,
    HEIGHT_PICTURE: 50,
    LENGTH_ARRAY: 5,
    PRICE_MIN: 10000,
    PRICE_MAX: 50000
  };
})();
