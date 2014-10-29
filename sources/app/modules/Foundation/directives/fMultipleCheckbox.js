var app = angular.module('Foundation.directives');

app.directive('fMultipleCheckbox', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      ngModel: '='
    },
    controller: 'fMultiplePipedSelectionCtrl',
    template: '<div class="checkboxes" ng-transclude></div>'
  };
});

app.directive('fCheckbox', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      checkbox: '=data',
      ngDisabled: '='
    },
    require: '^fMultipleCheckbox',
    template: '<div class="checkbox">' +
      '<label>' +
      '<input type="checkbox" value="{{checkbox.value}}" ng-model="model" ng-checked="isChecked()" ng-click="click()" ng-disabled="ngDisabled">' +
      '{{checkbox.text}}' +
      '</label>' +
      '</div>',
    link: function (scope, element, attrs, parent) {

      scope.parent = parent;

      // initial state
      scope.isChecked = function () {
        scope.model = parent.$scope.isValueActive(scope.checkbox.value);
        return scope.model;
      };

      scope.click = function () {
        var c = scope.checkbox;
        if (!scope.model) {
          parent.$scope.addSelected(c.value);
        }
        else {
          parent.$scope.removeSelected(c.value);
        }
      };
    }

  };
});
