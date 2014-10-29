/* eslint no-console: 0 */
/* global console */
var mod = angular.module('Foundation.directives');

mod.directive('fTrain', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      title: '@'
    },
    controller: function () {
      this.count = 0;
      this.isIndexLast = function (index) {
        return index == this.count - 1;
      };
    },
    template: '<div class="f-train" ng-transclude=""></div>',
    link: function (scope, element, attrs) {
    }
  };
});

mod.directive('fTrainItem', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    require: '^fTrain',
    template: '<div class="f-train-item">' +
      '<div class="f-train-item-box">' +
      '<div class="f-train-item-box-content" ng-class="{\'active\': active}"></div>' +
      '<div class="f-train-item-box-line" ng-hide="{{isLast()}}"></div>' +
      '</div>' +
      '<div class="f-train-item-title" ng-transclude></div>' +
      '</div>',
    link: function (scope, element, attrs, trainCtrl) {
      scope.index = trainCtrl.count++;
      scope.isLast = function () {
        return trainCtrl.isIndexLast(scope.index);
      };
    }
  };
});
