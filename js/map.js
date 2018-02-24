'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 65;

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

  mainPin.addEventListener('mouseup', mainPinUpHandler);
})();
