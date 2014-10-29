var app = angular.module('Foundation.filters');

app.filter('booleanToAdverb', function () {

  return function (value, options) {

    if (options.negate == true) {
      return value == 0 ? "no" : "yes";
    }
    else {
      return value == 1 ? "yes" : "no";
    }
  };
});
