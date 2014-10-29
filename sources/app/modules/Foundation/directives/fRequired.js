var app = angular.module('Foundation.directives');

app.directive('fRequired', function($timeout) {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {

      var condition = scope.$eval(attrs.fRequired);

      function validation(val) {
        if (condition === true) {
          return val != "" && val != null;
        } else {
          return true;
        }
      }

      $timeout(function() {
        if (validation(ctrl.$viewValue)) {
          ctrl.$setValidity('fRequired', true);
        }
        else {
          ctrl.$setValidity('fRequired', false);
        }
        return elm.val();
      });

      ctrl.$parsers.unshift(function (viewValue) {
        if (validation(viewValue, scope, elm, attrs, ctrl)) {
          ctrl.$setValidity('fRequired', true);
        }
        else {
          ctrl.$setValidity('fRequired', false);
        }
        return viewValue;
      });
    }
  };
});
