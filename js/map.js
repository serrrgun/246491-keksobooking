'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var addressInput = document.querySelector('#address');
  var form = document.querySelector('.notice__form');
  var isDataLoad = false;

  var limits = {
    RIGHT: map.offsetWidth,
    LEFT: mainPin.offsetWidth,
    TOP: map.offsetTop + window.constants.TOP_LIMIT,
    BOTTOM: map.offsetTop + window.constants.BOTTOM_LIMIT
  };

  var getPositionPin = function () {
    var pinX = mainPin.offsetLeft + Math.floor(window.constants.MAIN_PIN_WIDTH / 2);
    var pinY = mainPin.offsetTop + window.constants.MAIN_PIN_HEIGHT;
    addressInput.value = pinX + ', ' + pinY;
  };

  for (var i = 0; i < form.elements.length; i++) {
    form.elements[i].disabled = true;
  }

  /**
   * Функция активирует форму, карту, пины на карте при нажатии на главный пин
   *  + сортировка объявлений
   */
  var mainPinUpHandler = function () {
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    for (i = 0; i < form.elements.length; i++) {
      form.elements[i].disabled = false;
    }
    getPositionPin();
    if (isDataLoad === false) {
      window.backend.load(function (variant) {
        window.data = variant;
        window.filteredOffers = window.data.slice(0, window.constants.LENGTH_ARRAY);
        window.pin.generatePins(window.filteredOffers);
      }, window.backend.errorHandler);
    } else {
      window.pin.removePins();
      window.filteredOffers = window.data.slice(0, window.constants.LENGTH_ARRAY);
      window.pin.generatePins(window.filteredOffers);
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

      var pinX = mainPin.offsetLeft + Math.floor(window.constants.MAIN_PIN_WIDTH / 2);
      var pinY = mainPin.offsetTop + window.constants.MAIN_PIN_HEIGHT;
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
