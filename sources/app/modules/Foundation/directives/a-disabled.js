/* eslint no-extra-boolean-cast: 0 */

var mod = angular.module('Foundation.directives');

mod.directive('aDisabled', function () {
  return {
    restrict: 'A',
    priority: -99999,
    link: function (scope, element, attrs) {
      scope.$watch(attrs.aDisabled, function (val, oldval) {
        if (!!val) {
          element.unbind('click');
        }
        else if (oldval) {
          element.bind('click', function () {
            scope.$apply(attrs.ngClick);
          });
        }
      });
    }
  };
});
