/* global console */
/* eslint no-console:0 */
var app = angular.module('Utils.services');

app.provider('Debug', function () {

  var env = "development";
  var stacking = false;
  var stack;

  var module = 'app';

  this.useEnvironment = function (environment) {
    env = environment;
  };

  this.useStacking = function() {
    stack = [];
    stacking = true;
  };

  this.$get = function () {
    return debug;
  };



  /**
   * A function that returns a logger
   * @param title
   * @returns {debuggingFn}
   */
  function debug(title) {

    // Return a debugging function
    function debuggingFn() {
      var text = "%c";
      var message = arguments[arguments.length - 1];
      if (typeof message === "object") message = JSON.stringify(message);
      if (arguments.length > 1) for (var i = 0; i < arguments.length - 1; i++) text += ':' + arguments[i];

      // Log message
      if (env == "development") {
        log('%c ' + module + ':' + title + text + ' --> %c' + message, 'background: whiteSmoke; color: #30c687', 'background: whiteSmoke; color: blue', 'color: black');
      }

      // Stack the logs
      if (stacking) {
        if (arguments.length > 1) {
          stack.push(text + ':' + message);
        }
        stack.push(message);
      }
    }

    return debuggingFn;
  }

  function log() {
    if (window.console && window.console.log && window.console.log.apply) {
      console.log.apply(console, arguments);
    } else if (window.console && window.console.log) {
      var message = arguments[0].split('%c').join('');
      console.log(message);
    }
      // If IE without devtools opened.
  }

  Object.defineProperty(debug, 'stack', {
    get: function() {
      return stack;
    }
  });
});
