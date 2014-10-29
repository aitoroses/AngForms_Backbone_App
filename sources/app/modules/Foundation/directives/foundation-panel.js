var mod = angular.module('Foundation.directives');

// Container
mod.directive('uiPanel', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div class="panel panel-default" ng-transclude></div>'
  };
});

// Header
mod.directive('uiPanelHeader', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      title: '@',
      type: '@'
    },
    template: '<div class="panel-heading"><div ng-transclude></div>' +
      '<h3 class="panel-title clearfix" ng-class="type">{{title}}</h3>' +
      '</div>'
  };
});

mod.directive('uiNumberedPanelHeader', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      title: '@',
      type: '@',
      number: '@'
    },
    template: '<div class="panel-heading" style="padding: 5px 10px 5px 10px !important;"><div ng-transclude></div>' +
      '<h3 class="panel-title clearfix" ng-class="type">' +
      '<span class="fa-stack" style="color: #999">' +
      '   <i class="fa fa-circle-thin fa-stack-2x"></i>' +
      '   <i class="fa fa-stack-1x" style="font-weight: bold">{{number}}</i> ' +
      ' </span>' +
      '&nbsp;&nbsp;{{title}}</h3>' +
      '</div>'
  };
});

// Body
mod.directive('uiPanelBody', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div class="panel-body" ng-transclude></div>'
  };
});
