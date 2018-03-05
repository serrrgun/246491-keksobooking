'use strict';

(function () {

  var mapPinsArr = document.querySelector('.map__pins');

  window.pin = {
    /**
     * Создает пин на основе шаблона
     * @param {Object} pins
     */
    generatePins: function (pins) {
      var fragmentMapPins = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        var newMapPin = document.createElement('button');
        var image = document.createElement('img');
        newMapPin.classList.add('map__pin');
        newMapPin.style.left = (pins[i].location.x - window.constants.PIN_WIDTH / 2) + 'px';
        newMapPin.style.top = (pins[i].location.y - window.constants.PIN_HEIGHT) + 'px';
        newMapPin.setAttribute('pin-id', i);
        image.src = pins[i].author.avatar;
        image.width = 40;
        image.height = 40;
        image.draggable = false;
        image.setAttribute('pin-id', i);
        newMapPin.appendChild(image);
        fragmentMapPins.appendChild(newMapPin);
      }
      mapPinsArr.appendChild(fragmentMapPins);
    },

    removePins: function () {
      var mapPinsElements = mapPinsArr.querySelectorAll('button[pin-id]');
      for (var i = 0; i < mapPinsElements.length; i++) {
        mapPinsArr.removeChild(mapPinsElements[i]);
      }
    }
  };

  var timeout;

  var debounce = function (fun) {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(fun, window.constants.INTERVAL_DEBOUNCE);
  };

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var checkboxFeatures = housingFeatures.querySelectorAll('input[type="checkbox"]');

  var filterByHouseType = function (variant) {
    return housingType.value === 'any' ? true : housingType.value === variant.offer.type;
  };

  var filterByRooms = function (variant) {
    return housingRooms.value === 'any' ? true : +housingRooms.value === variant.offer.rooms;
  };

  var filterByGuests = function (variant) {
    return housingGuests.value === 'any' ? true : +housingGuests.value === variant.offer.guests;
  };

  var filterByPrice = function (variant) {
    switch (housingPrice.value) {
      case 'low':
        return variant.offer.price < window.constants.PRICE_MIN;
      case 'middle':
        return (variant.offer.price >= window.constants.PRICE_MIN) && (variant.offer.price <= window.constants.PRICE_MAX);
      case 'high':
        return variant.offer.price > window.constants.PRICE_MAX;
      default:
        return true;
    }
  };

  var filterByFeatures = function (variant) {
    var checkedFeatures = [];
    for (var i = 0; i < checkboxFeatures.length; i++) {
      if (checkboxFeatures[i].checked) {
        checkedFeatures.push(checkboxFeatures[i].value);
      }
    }
    var itsFeature = checkedFeatures.every(function (num) {
      return variant.offer.features.indexOf(num) !== -1;
    });
    return itsFeature;
  };

  var allFilters = function (variant) {
    return filterByHouseType(variant) &&
           filterByRooms(variant) &&
           filterByGuests(variant) &&
           filterByPrice(variant) &&
           filterByFeatures(variant);
  };

  var filterPins = function () {
    window.pin.removePins();
    window.filteredOffers = window.data.filter(allFilters)
        .slice(0, window.constants.LENGTH_ARRAY);
    window.card.closeMapCard();
    debounce(window.pin.generatePins(window.filteredOffers));
  };

  housingType.addEventListener('change', filterPins);
  housingPrice.addEventListener('change', filterPins);
  housingRooms.addEventListener('change', filterPins);
  housingGuests.addEventListener('change', filterPins);
  housingFeatures.addEventListener('change', filterPins);

  /**
   * Функция показывает соответствующее объявление нажатому пину
   * @param {*} evt
   */
  var mapPinClickHandler = function (evt) {
    var target = evt.target;
    if (target.getAttribute('pin-id')) {
      var pinId = target.getAttribute('pin-id');
      window.card.closeMapCard();
      window.card.createMapCard(window.filteredOffers[pinId]);
    }
  };

  /**
   * Функция показывает карточку объявления при нажатии на Enter
   * @param {*} evt
   */
  var mapPinPressEnterHandler = function (evt) {
    if (evt.keyCode === window.constants.KEYCODE_ENTER) {
      mapPinClickHandler(evt);
    }
  };

  mapPinsArr.addEventListener('click', mapPinClickHandler);
  mapPinsArr.addEventListener('keydown', mapPinPressEnterHandler);
})();
