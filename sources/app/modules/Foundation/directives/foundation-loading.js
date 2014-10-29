var mod = angular.module('Foundation.directives');

// Container
mod.directive('fLoading', function ($rootScope, ProgressService) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {},
    template: '<div class="f-loading"><div class="f-loading-message" ng-if="isLoading()">' +
      '<i class="fa fa-spinner fa-spin icon-lg"></i> please wait while the form is loaded</div>' +
      '<div class="f-loading-error" ng-if="error">Error: {{message}}</div>',
    link: function (scope, element) {
      var $el = $(element);

      scope.isLoading = ProgressService.isLoading;

      // When there is an error on changing the route
      $rootScope.$on('fLoading:errorMessage', function ($targetScope, errorMessage) {
        scope.error = true;
        scope.message = errorMessage;

        // Set overlay height to document height
        setTimeout(function () {
          this.height($(document.documentElement).height());
        }.bind(this), 500);

      }.bind($el));
    }
  };
});
