/* global alert */
/* eslint no-alert: 0 */
var app = angular.module('Utils.services');

app.factory('PopupUtils', function () {

  function findPopupByClass() {
    var document;
    try {
      document = parent.document;
    } catch (e) {
      alert(e.message);
      return;
    }
    var el = $('.popup', document);
    return new Popup(el[0]);
  }

  function Popup(id) {
    this.$el = id;
  }

  Popup.prototype = {
    constructor: Popup,

    /*get closeBtn() {
      var popup = $(this.$el);
      var closeBtn = popup.find('[id*="close"]')[0];
      return closeBtn;
    },*/

    get closeBtn() {
      var popup = $(this.$el);
      var closeBtn = popup.find('.popup-close-icon')[0];
      return closeBtn;
    },

    close: function () {
      var btn = this.closeBtn;
      if (btn) {
        btn.click();
      }
      else {
        alert('Popup with id ' + this.id + ' was not found. So close it manually.');
      }
    }
  };

  var Obj = {
    findPopupByClass: findPopupByClass,
    getCreationPopup: function () {
      return findPopupByClass();
    },
    getPrivilegedCreationPopup: function () {
      return findPopupByClass();
    }
  };

  return Obj;

});
