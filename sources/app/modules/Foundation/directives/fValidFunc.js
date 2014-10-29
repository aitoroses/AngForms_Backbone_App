var app = angular.module('Foundation.directives');

app.directive('fValidFunc', function() {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        if (attrs.ngValidFunc && scope[attrs.ngValidFunc] && scope[attrs.ngValidFunc](viewValue, scope, elm, attrs, ctrl)) {
          ctrl.$setValidity('custom', true);
        }
        else {
          ctrl.$setValidity('custom', false);
        }
        return elm.val();
      });
    }
  };
});
