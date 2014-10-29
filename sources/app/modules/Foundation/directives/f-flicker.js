/* eslint no-extra-boolean-cast: 0 */

var mod = angular.module('Foundation.directives');

mod.directive('fFlicker', function () {
  return {
    restrict: 'A',
    scope: {
      watch: '=fFlicker'
    },
    link: function (scope, element, attrs) {
      scope.$watch('watch', function () {
        element.hide();
        setTimeout(function() {
          element.show();
        });
      });
    }
  };
});
