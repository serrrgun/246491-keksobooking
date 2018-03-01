'use strict';

(function () {

  var mapPinsArr = document.querySelector('.map__pins');
  /**
   * Создает пин на основе шаблона
   * @param {Object} pin
   */
  window.generatePins = function (pin) {
    var fragmentMapPins = document.createDocumentFragment();
    for (var i = 0; i < pin.length; i++) {
      var newMapPin = document.createElement('button');
      newMapPin.className = 'map__pin';
      newMapPin.style.left = (pin[i].location.x - window.constants.PIN_WIDTH / 2) + 'px';
      newMapPin.style.top = (pin[i].location.y - window.constants.PIN_HEIGHT) + 'px';
      newMapPin.innerHTML = '<img src="' + pin[i].author.avatar + '" width="40" height="40" draggable="false" pin-id="' + i + '">';
      newMapPin.setAttribute('pin-id', i);
      fragmentMapPins.appendChild(newMapPin);
    }
    mapPinsArr.appendChild(fragmentMapPins);
  };

  /**
   * Функция показывает соответствующее объявление нажатому пину
   * @param {*} evt
   */
  var mapPinClickHandler = function (evt) {
    var target = evt.target;
    if (target.getAttribute('pin-id')) {
      var pinId = target.getAttribute('pin-id');
      window.card.closeMapCard();
      window.card.createMapCard(window.data[pinId]);
    }
  };

  /**
   * Функция показывает карточку объявления при нажатии на Enter
   * @param {*} evt
   */
  var mapPinPressEnter = function (evt) {
    if (evt.keyCode === window.constants.KEYCODE_ENTER) {
      mapPinClickHandler(evt);
    }
  };

  mapPinsArr.addEventListener('click', mapPinClickHandler);
  mapPinsArr.addEventListener('keydown', mapPinPressEnter);
})();
