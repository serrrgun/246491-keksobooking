'use strict';

(function () {
  window.constants = {

    TOP_LIMIT: 200,
    BOTTOM_LIMIT: 700,
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
    TIMEOUT: 10000
  };
})();
