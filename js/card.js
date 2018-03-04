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
      cardElement.querySelector('.popup__features').textContent = '';
      cardElement.querySelector('.popup__pictures').appendChild(window.card.renderPictures(variant.offer.photos));
      cardElement.querySelector('.popup__features').appendChild(window.card.renderFeatures(variant.offer.features));
      map.insertBefore(cardElement, mapFilters);

      var closePopup = document.querySelector('.popup__close');
      closePopup.addEventListener('click', window.card.closeMapCard);
      closePopup.addEventListener('keydown', popupPressEnterHandler);
      document.addEventListener('keydown', popupPressEscHandler);
    },

    renderFeatures: function (features) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < features.length; i++) {
        var newElement = document.createElement('li');
        newElement.className = 'feature feature--' + features[i];
        fragment.appendChild(newElement);
      }
      return fragment;
    },

    renderPictures: function (photos) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photos.length; i++) {
        var similarElement = document.querySelector('template').content.querySelector('.popup__pictures li').cloneNode(true);
        similarElement.querySelector('img').setAttribute('src', photos[i]);
        similarElement.querySelector('img').setAttribute('height', window.constants.HEIGHT_PICTURE);
        similarElement.querySelector('img').setAttribute('width', window.constants.WIDTH_PICTURE);
        fragment.appendChild(similarElement);
      }
      return fragment;
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
