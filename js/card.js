'use strict';

(function () {
  var map = document.querySelector('.map');

  window.card = {

    /**
     * Функция удаления елементов
     * @param {obj} elem елемент для удаления
     */
    removeChildren: function (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    },

    /**
     * Создает объявление на основе данных из массива объектов и вставляет в DOM
     * @param {Object} variant - объект из созданного массива объявлений
     */
    createMapCard: function (variant) {
      var cardElement = document.querySelector('template').cloneNode(true).content.querySelector('.map__card');
      var mapFilters = document.querySelector('.map__filters-container');

      cardElement.querySelector('h3').textContent = variant.offer.title;
      cardElement.querySelector('small').textContent = variant.offer.address;
      cardElement.querySelector('.popup__price').textContent = variant.offer.price + ' \u20bd/ночь';
      cardElement.querySelector('h4').textContent = window.constants.TYPES[variant.offer.type];
      cardElement.querySelector('h4 + p').textContent = variant.offer.rooms + ' комнаты для ' + variant.offer.guests + ' гостей';
      cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + variant.offer.checkin + ', выезд до ' + variant.offer.checkout;
      cardElement.querySelector('p:last-of-type').textContent = variant.offer.description;
      cardElement.querySelector('.popup__avatar').src = variant.author.avatar;
      map.insertBefore(cardElement, mapFilters);

      window.card.removeChildren(document.querySelector('.popup__pictures'));
      for (var i = 0; i < variant.offer.photos.length; i++) {
        document.querySelector('.popup__pictures').innerHTML += '<li><img src="' + variant.offer.photos[i] + '" width="50" height="50"></li>';
      }

      window.card.removeChildren(document.querySelector('.popup__features'));
      for (i = 0; i < variant.offer.features.length; i++) {
        document.querySelector('.popup__features').innerHTML += '<li class="feature feature--' + variant.offer.features[i] + '"></li>';
      }

      var closePopup = document.querySelector('.popup__close');
      closePopup.addEventListener('click', window.card.closeMapCard);
      closePopup.addEventListener('keydown', popupPressEnterHandler);
      document.addEventListener('keydown', popupPressEscHandler);
    },

    /**
     * Функция закрывает карточку объявления
     */
    closeMapCard: function () {
      var mapCard = map.querySelector('.map__card');
      if (mapCard) {
        var closePopup = document.querySelector('.popup__close');
        closePopup.removeEventListener('click', window.card.closeMapCard);
        closePopup.removeEventListener('keydown', popupPressEnterHandler);
        document.removeEventListener('keydown', popupPressEscHandler);
        map.removeChild(mapCard);
      }
    }
  };

  /**
   * Функуия закрывает карточку объявления при нажатии на Enter
   * @param {*} evt
   */
  var popupPressEnterHandler = function (evt) {
    if (evt.keyCode === window.constants.KEYCODE_ENTER) {
      window.card.closeMapCard();
    }
  };

  /**
   * Функуия закрывает карточку объявления при нажатии на Esc
   * @param {*} evt
   */
  var popupPressEscHandler = function (evt) {
    if (evt.keyCode === window.constants.KEYCODE_ESC) {
      window.card.closeMapCard();
    }
  };
})();
