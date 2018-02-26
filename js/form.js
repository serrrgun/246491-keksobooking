'use strict';

(function () {
  var TYPE_PROPERTIES = {
    'bungalo': {
      'name': 'Бунгало',
      'minPrice': 0
    },
    'flat': {
      'name': 'Квартира',
      'minPrice': 1000
    },
    'house': {
      'name': 'Дом',
      'minPrice': 5000
    },
    'palace': {
      'name': 'Дворец',
      'minPrice': 10000
    }
  };

  var noticeForm = document.querySelector('.notice__form');

  var noticeTitle = noticeForm.querySelector('input[name="title"]');
  var noticeType = noticeForm.querySelector('select[name="type"]');
  var noticePrice = noticeForm.querySelector('input[name="price"]');

  var noticeTimeIn = noticeForm.querySelector('select[name="timein"]');
  var noticeTimeOut = noticeForm.querySelector('select[name="timeout"]');

  var noticeRoomNumber = noticeForm.querySelector('#room_number');
  var noticeRoomCapacity = noticeForm.querySelector('#capacity');

  var buttonSubmit = noticeForm.querySelector('.form__submit');

  /**
   * Функция синхронизирует вркмя выезда и время заезда
   * @param {obj} changeTime - поле на котором будет происходить смаена времени
   * @param {obj} evtChange - событие которое приходит от обработчика
   * @return {obj} selectedTime - блок с изменненным элементом
   */
  var syncTimesArrival = function (changeTime, evtChange) {
    var selectedTime = changeTime.querySelectorAll('option');
    for (var i = 0; i < selectedTime.length; i++) {
      selectedTime[i].selected = false;
      if (selectedTime[i].value === evtChange.target.value) {
        selectedTime[i].selected = true;
      }
    }
    return selectedTime;
  };

  /**
   * @param {obj} evtChange - параметр обработчика события
   */
  var changeTimeHandler = function (evtChange) {
    if (evtChange.target.id === 'timein') {
      syncTimesArrival(noticeTimeOut, evtChange);
    }
    if (evtChange.target.id === 'timeout') {
      syncTimesArrival(noticeTimeIn, evtChange);
    }
  };

  /**
   * Функция стилей сообщения об ошибке
   * @param {string} message - сообщение об ошибке
   * @param {obj} inputField - поле формы
   * @return {obj} inputField - поле формы с добавлением стилей ошибки
   */
  var errorStyle = function (message, inputField) {
    inputField.setCustomValidity(message);
    inputField.style.border = '3px solid red';
    return inputField;
  };

  /**
   * Функция удаления сообщения об ошибке
   * @param {obj} inputField - поле формы
   * @return {obj} inputField - поле формы с удаленной ошибкой
   */
  var removeErrorStyle = function (inputField) {
    inputField.setCustomValidity('');
    inputField.style.border = '';
    return inputField;
  };

  /**
   *  Обработчик ошибки ввода заголовка
   */
  var titleInvalidHandler = function () {
    if (noticeTitle.validity.valueMissing) {
      errorStyle('', noticeTitle);
    } else if (noticeTitle.validity.tooShort) {
      errorStyle('Минимальная длина названия - ' + noticeTitle.minLength, noticeTitle);
    } else if (noticeTitle.validity.tooLong) {
      errorStyle('Максимальная длина названия - ' + noticeTitle.maxLength, noticeTitle);
    } else {
      removeErrorStyle(noticeTitle);
    }
  };

  /**
   * Обработчик проверки типа и стоимости
   * @return {obj} noticePrice - min стоисмость
   */
  var noticeTypeAppartHandler = function () {
    var priceValue = TYPE_PROPERTIES[noticeType.querySelector('option:checked').value];
    noticePrice.min = priceValue.minPrice;
    noticePrice.placeholder = priceValue.minPrice;
    noticePriceInvalidHandler();
    return noticePrice;
  };

  /**
   * Обработчик ошибки ввода цены
   */
  var noticePriceInvalidHandler = function () {
    if (noticePrice.validity.valueMissing) {
      errorStyle('', noticePrice);
    } else if (noticePrice.validity.rangeOverflow) {
      errorStyle('Цена не может быть больше ' + noticePrice.max, noticePrice);
    } else if (noticePrice.validity.rangeUnderflow) {
      errorStyle('Цена не может быть меньше ' + noticePrice.min, noticePrice);
    } else {
      removeErrorStyle(noticePrice);
    }
  };

  /**
   * Обработчик соответствия количества комнат количеству гостей
   */
  var inputRoomsAndGuestsHandler = function () {
    if (noticeRoomNumber.value === '100' && noticeRoomCapacity.value !== '0') {
      errorStyle('Не соответствие количества комнат количеству гостей', noticeRoomNumber);
      errorStyle('Не соответствие количества комнат количеству гостей', noticeRoomCapacity);
    } else if (noticeRoomCapacity.value === '0' && noticeRoomNumber.value !== '100') {
      errorStyle('Не соответствие количества комнат количеству гостей', noticeRoomNumber);
      errorStyle('Не соответствие количества комнат количеетву гостей', noticeRoomCapacity);
    } else if (noticeRoomNumber.value < noticeRoomCapacity.value) {
      errorStyle('Не соответствие количества комнат количеству гостей', noticeRoomNumber);
      errorStyle('Не соответствие количества комнат количеству гостей', noticeRoomCapacity);
    } else {
      removeErrorStyle(noticeRoomNumber);
      removeErrorStyle(noticeRoomCapacity);
    }
  };

  noticeTitle.addEventListener('focus', titleInvalidHandler);
  noticeTitle.addEventListener('input', titleInvalidHandler);

  noticeType.addEventListener('change', noticeTypeAppartHandler);

  noticePrice.addEventListener('focus', noticePriceInvalidHandler);
  noticePrice.addEventListener('input', noticePriceInvalidHandler);

  noticeTimeIn.addEventListener('change', changeTimeHandler);
  noticeTimeOut.addEventListener('change', changeTimeHandler);

  noticeRoomNumber.addEventListener('change', inputRoomsAndGuestsHandler);
  noticeRoomCapacity.addEventListener('change', inputRoomsAndGuestsHandler);

  var submitButtonClickHandler = function () {
    noticeTitle.addEventListener('invalid', titleInvalidHandler);
    noticePrice.addEventListener('invalid', noticePriceInvalidHandler);
    noticeRoomNumber.addEventListener('invalid', inputRoomsAndGuestsHandler);
    noticeRoomCapacity.addEventListener('invalid', inputRoomsAndGuestsHandler);

    inputRoomsAndGuestsHandler();
    inputRoomsAndGuestsHandler();
  };

  buttonSubmit.addEventListener('click', submitButtonClickHandler);

})();
