/* global alert */
/* eslint no-alert: 0 */
var app = angular.module('Utils.services');

app.factory('IframeUtils', function IframeUtils() {

  function findMatchingElement(id) {
    var document;
    try {
      document = parent.document;
    } catch (e) {
      alert(e.message);
      return;
    }
    var el = $('[id*=\'' + id + '\']', document);
    return new Element(id, el[0]);
  }

  function Element(id, element) {
    this.id = id;
    this.$el = element;
  }

  Element.prototype = {
    constructor: Element,

    click: function () {
      if (this.$el) {
        this.$el.click();
      }
      else {
        if (window.close) {
          setTimeout(function() {
            return window.close();
          },800);
        } else {
          alert('The execution has finished - please close this window.');
        }
      }
    }
  };

  var workspace = {
    getRefreshTaskListButton: function () {
      return findMatchingElement('refreshTaskListButton');
    }
  };

  return {
    findMatchingElement: findMatchingElement,
    workspace: workspace
  };

});
