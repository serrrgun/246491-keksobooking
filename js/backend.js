'use strict';

(function () {
  /**
   * Закрузка данных с сервера
   * @param {string} onLoad название функциии callback, которая вызовется при успешной загрузке данных
   * @param {string} onError название функции callback, которая вызовется при возникновении ошибки
   * @return {XMLHttpRequest}
   */
  var setupXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = window.constants.TIMEOUT;
    return xhr;
  };

  window.backend = {
    /**
     * Орправка данных с сервера
     * @param  {obj} data данные в формате FormData
     * @param {string} onLoad функция callback, которая вызовется при успешной отправке данных
     * @param {string} onError функция callback, которая вызовется при возникновении ошибки
     */
    upload: function (data, onLoad, onError) {
      var xhr = setupXhr(onLoad, onError);
      xhr.open('POST', window.constants.URL_UPLOAD);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = setupXhr(onLoad, onError);
      xhr.open('GET', window.constants.URL_GET);
      xhr.send();
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; border: 2px solid red; padding: 40px;';
      node.style.position = 'fixed';
      node.style.width = '30vw';
      node.style.left = '32%';
      node.style.top = '17vw';
      node.style.fontSize = '30px';
      node.style.borderRadius = '5px';
      node.style.transform = 'translate(-50%; -50%)';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
      setInterval(function () {
        node.remove();
      }, window.constants.SET_INTERVAL);
    }
  };
})();
