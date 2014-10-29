var mod = angular.module('Foundation.directives');

mod.directive('ngShow', function ($compile, $animate) {
  return  {
    priority: 1000,
    link: function (scope, element, attrs) {

      if (element.hasClass('fa-spinner')) {
        $animate.enabled(false, element);

        scope.$watch(function () {
          $animate.enabled(false, element);
        });
      }
    }
  };
});
