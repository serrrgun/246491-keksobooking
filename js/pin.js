'use strict';

(function () {
  var PIN_HEIGHT = 40;
  var PIN_WIDTH = 70;
  var mapPinsArr = document.querySelector('.map__pins');
  /**
   * Создает пин на основе шаблона
   * @param {Object} pin
   */
  window.createMapPins = function (pin) {
    var mapPins = document.querySelector('.map__pins');
    var fragmentMapPins = document.createDocumentFragment();
    for (var i = 0; i < window.data.QUANTITY_ADS_CARD; i++) {
      var newMapPin = document.createElement('button');
      newMapPin.className = 'map__pin';
      newMapPin.style.left = (pin[i].location.x - PIN_WIDTH / 2) + 'px';
      newMapPin.style.top = (pin[i].location.y - PIN_HEIGHT) + 'px';
      newMapPin.innerHTML = '<img src="' + pin[i].author.avatar + '" width="40" height="40" draggable="false" pin-id="' + i + '">';
      newMapPin.setAttribute('offer-id', i);
      newMapPin.style.display = 'none';
      fragmentMapPins.appendChild(newMapPin);
    }
    mapPins.appendChild(fragmentMapPins);
  };

  var articles = window.data.getGenerateDataArticle();
  /**
   * Функция показывает соответствующее объявление нажатому пину
   * @param {*} evt
   */
  var mapPinClickHandler = function (evt) {
    var target = evt.target;
    if (target.getAttribute('pin-id')) {
      var offerId = target.getAttribute('pin-id');
      window.card.closeMapCard();
      window.card.createMapCard(articles[offerId]);
    }
  };

  /**
   * Функция показывает карточку объявления при нажатии на Enter
   * @param {*} evt
   */
  var mapPinPressEnter = function (evt) {
    if (evt.keyCode === window.data.KEYCODE_ENTER) {
      mapPinClickHandler(evt);
    }
  };

  mapPinsArr.addEventListener('click', mapPinClickHandler);
  mapPinsArr.addEventListener('keydown', mapPinPressEnter);
  window.createMapPins(window.data.getGenerateDataArticle());
})();
