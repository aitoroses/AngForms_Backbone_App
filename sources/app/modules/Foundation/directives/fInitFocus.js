var mod = angular.module('Foundation.directives');

mod.directive('fInitialFocus', function ($timeout) {
  return {
    restrict: 'A',
    priority: -99999,
    link: function (scope, element, attrs) {
      $timeout(function () {
        $(element).focus();
      });
    }
  };
});
