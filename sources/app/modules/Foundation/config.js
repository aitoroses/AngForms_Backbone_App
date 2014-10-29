// Create module submodules
var directives = angular.module('Foundation.directives', []),
  controllers = angular.module('Foundation.controllers', []),
  services = angular.module('Foundation.services', []),
  filters = angular.module('Foundation.filters', []),

// Create the module and setup it's dependencies
  Foundation = angular.module('Foundation', [
    'Foundation.directives',
    'Foundation.controllers',
    'Foundation.services',
    'Foundation.filters',
    'ngRoute',
    'ngProgress'
  ]);

// Config
Foundation.config(function ($routeProvider) {
  $routeProvider
    .when('/foundation/progress', {
      template: '<p>ProgressService. will appear when resolves.</p>',
      resolve: {
        'arbitraryPromise': function ($timeout, ProgressService) {

          // Get a promise from ProgressService
          // it's ngProgress wrapped promise
          var deferred = ProgressService.$new();

          // When it resolves it will finish
          $timeout(function () {
            /*eslint no-constant-condition:0*/
            if (false) {
              deferred.resolve();
            }
            else {
              deferred.reject("Resolving arbitraryPromise has failed");
            }
          }, 2000);

          return deferred.promise;
        }
      }
    })
    /* Test for multiple checkboxes */
    .when('/foundation/multipleCheckbox', {
      templateUrl: 'views/test/f-multiple-checkbox.html',
      controller: function($scope) {
        $scope.value = "third|2";
        $scope.checkboxList = [{text: 'value 1', value: '1'}, {text: 'value 2', value: '2'}, {text: 'value 3', value: 'third'}];
      }
    })
    .when('/foundation/radioButton', {
      templateUrl: 'views/test/radio-button-field.html',
      controller: function($scope) {
        //$scope.result = "radio 2";
        $scope.values = ["radio 1", "radio 2", "radio 3"];
      }
    })
    .when('/EEE', {
      templateUrl: 'views/EEE/main.html'
    });
});
