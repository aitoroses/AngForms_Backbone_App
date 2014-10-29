var app = angular.module('Foundation.directives');

app.directive('textarea', function($timeout, Debug) {

  /**
   * This variable is fully global so all textareas share it.
   * @type {boolean}
   */
  var triggeredOnce = false;
  Debug('textarea.js')("Triggered textarea flicker");

  return {
    restrict: 'E',
    link: function (scope, element, attrs) {

      // Do some flicker when clicked once.

      var disable = scope.$eval(attrs.textareaFlicker) === false;
      if (disable) {return;}

      element.click(function() {
        if (triggeredOnce == true) {return;}
        element.hide();
        setTimeout(function() {
          element.show();
          element.focus();
          triggeredOnce = true;
        });
      });


    }
  };
});
