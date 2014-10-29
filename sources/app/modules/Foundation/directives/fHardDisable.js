/* eslint no-extra-boolean-cast: 0 */

var mod = angular.module('Foundation.directives');

mod.directive('fHardDisable', function () {
  return {
    restrict: 'A',
    priority: -99999,
    scope: {
      disabled: '=fHardDisable'
    },
    link: function (scope, element, attrs) {
      if (scope.disabled == true) {
        // Disable events
        $(element).unbind('click');
        $(element).unbind('focus');
        $(element).focus(function () {
          this.blur();
        });
      }
    }
  };
});
