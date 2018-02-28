'use strict';

(function () {


  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var accommodationType = document.querySelector('#type');
  var accommodationPrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var noticeForm = document.querySelector('.notice__form');
  var formAddress = document.querySelector('#address');

  var pinCenterX = mapPinMain.offsetTop + window.constants.MAIN_PIN_WIDTH / 2;
  var pinCenterY = mapPinMain.offsetLeft + window.constants.MAIN_PIN_HEIGHT / 2;

  /**
   *  обработчик соотношения мин цены
   */
  accommodationType.addEventListener('change', function (evt) {
    var target = evt.target;
    accommodationPrice.min = window.constants.MIN_PRICES[target.value];
  });
  /**
   * обработчик выбора времени
   */
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  /**
   * Обработчик выбора времени
   */
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  /**
   * Функция синхронизации гостей и комнат
   * @param {obj} value значение количества гостей
   */
  var syncRoomsGuests = function (value) {
    if (+value !== 100) {
      roomCapacity.value = value;
      for (var i = 0; i < roomCapacity.options.length; i++) {
        if (+value >= +roomCapacity.options[i].value && +roomCapacity.options[i].value !== 0) {
          roomCapacity.options[i].disabled = false;
        } else {
          roomCapacity.options[i].disabled = true;
        }
      }
    } else {
      roomCapacity.value = '0';
      for (i = 0; i < roomCapacity.options.length; i++) {
        if (+roomCapacity.options[i].value > 0) {
          roomCapacity.options[i].disabled = true;
        }
      }
    }
  };

  syncRoomsGuests(roomNumber.value);

  roomNumber.addEventListener('change', function (evt) {
    var target = evt.target;
    syncRoomsGuests(target.value);
  });
  /**
   * Обработчик отправки формы
   */
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(noticeForm), function () {
      noticeForm.reset();
      syncRoomsGuests(roomNumber.value);
      map.classList.add('map--faded');
      noticeForm.classList.add('notice__form--disabled');
      noticeForm.elements.disabled = true;
      var mapPinsElements = mapPins.children;

      for (var i = mapPinsElements.length - 1; i >= 0; i--) {
        if (mapPinsElements[i].hasAttribute('pin-id')) {
          mapPins.removeChild(mapPinsElements[i]);
        }
      }

      mapPinMain.style.display = 'block';
      mapPinMain.style.left = '50%';
      mapPinMain.style.top = '50%';

      formAddress.value = pinCenterX + ', ' + pinCenterY;
      window.card.closeMapCard();

    }, window.backend.errorHandler);
  });
})();
