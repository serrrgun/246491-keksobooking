'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var addressInput = document.querySelector('#address');
  var isDataLoad = false;

  var limits = {
    RIGHT: map.offsetWidth,
    LEFT: mainPin.offsetWidth,
    TOP: map.offsetTop + window.constants.TOP_LIMIT,
    BOTTOM: map.offsetTop + window.constants.BOTTOM_LIMIT
  };

  var getPositionPin = function () {
    var PinX = mainPin.offsetLeft + window.constants.MAIN_PIN_HEIGHT;
    var PinY = mainPin.offsetTop + Math.floor(window.constants.MAIN_PIN_WIDTH / 2);
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
    if (isDataLoad === false) {
      window.backend.load(function (variant) {
        window.data = variant;
        window.generatePins(window.data);
      }, window.backend.errorHandler);
    } else {
      window.generatePins(window.data);
    }
    isDataLoad = true;
  };

  var mainPinMouseDownHandler = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var mainPinMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var pinY = mainPin.offsetTop + window.constants.MAIN_PIN_HEIGHT;
      var pinX = mainPin.offsetLeft + Math.floor(window.constants.MAIN_PIN_WIDTH / 2);
      addressInput.value = pinX + ', ' + pinY;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((pinX - shift.x <= limits.RIGHT) && (pinX - shift.x >= limits.LEFT)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      if ((pinY - shift.y <= limits.BOTTOM) && (pinY - shift.y >= limits.TOP)) {
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
