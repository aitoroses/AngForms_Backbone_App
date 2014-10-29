var mod = angular.module('Foundation.directives');

mod.directive('fShowPanel', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      title: '@',
      onShow: '&'
    },
    template: '<div class="f-show-panel panel panel-default">' +
      '<div class="f-show-panel-title panel-heading" ng-click="disclose = !disclose">' +
      '<div class="panel-title"><i class="fa fa-chevron-circle-right" ng-show="disclose"></i>' +
      '<i class="fa fa-chevron-circle-down" ng-hide="disclose"></i>' +
      ' <h2 style="display: inline">{{title}}</h2></div>' +
      '</div>' +
      '<div class="f-show-panel-content panel-body" ng-hide="disclose" ng-transclude></div>' +
      '</div>',
    link: function (scope, element, attrs) {
      // initial state
      scope.disclose = scope.$eval(attrs.disclosed) == true;
      scope.bold = scope.$eval(attrs.bold) == true;

      // Bind click event to icon
      element.find('i').click(function () {
        scope.$apply(function () {
          scope.disclose = !scope.disclose;
          if (!scope.disclose && !angular.isUndefined(scope.onShow)) {
            var fn = scope.onShow();
            fn();
          }
        });
      });
    }
  };
});
