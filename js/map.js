'use strict';

(function () {

  var MAIN_PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 65;
  var TOP_LIMIT = 200;
  var BOTTOM_LIMIT = 700;

  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var addressInput = document.querySelector('#address');

  var LIMITS = {
    RIGHT: map.offsetWidth,
    LEFT: mainPin.offsetWidth,
    TOP: map.offsetTop + TOP_LIMIT,
    BOTTOM: map.offsetTop + BOTTOM_LIMIT
  };

  var getPositionPin = function () {
    var PinX = mainPin.offsetLeft + MAIN_PIN_HEIGHT;
    var PinY = mainPin.offsetTop + Math.floor(MAIN_PIN_WIDTH / 2);
    addressInput.value = PinX + ', ' + PinY;
  };

  /**
   * Функция активирует форму, карту, пины на карте при нажатии на главный пин
   */
  var mainPinUpHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    document.querySelector('.notice__form').elements.disabled = false;
    getPositionPin();
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].style.display = 'block';
    }
  };

  var mainPinMouseDownHandler = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var mainPinMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var pinY = mainPin.offsetTop + MAIN_PIN_HEIGHT;
      var pinX = mainPin.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2);
      addressInput.value = pinX + ', ' + pinY;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((pinX - shift.x <= LIMITS.RIGHT) && (pinX - shift.x >= LIMITS.LEFT)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      if ((pinY - shift.y <= LIMITS.BOTTOM) && (pinY - shift.y >= LIMITS.TOP)) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
    };

    var mainPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      getPositionPin();
      document.removeEventListener('mousemove', mainPinMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  };

  mainPin.addEventListener('mouseup', mainPinUpHandler);
  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
})();
