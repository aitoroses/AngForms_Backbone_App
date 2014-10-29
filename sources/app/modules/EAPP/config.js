// Create EEE modules
var directives = angular.module('EAPP.directives', []),
  controllers = angular.module('EAPP.controllers', []),
  services = angular.module('EAPP.services', []),
  filters = angular.module('EAPP.filters', []),
  EAPP = angular.module('EAPP', [
    'EAPP.directives',
    'EAPP.controllers',
    'EAPP.services',
    'EAPP.filters',
    'ui.router'
  ]);

var dir = {
  directives: 'modules/EAPP/directives/',
  views: 'views/EAPP/'
};
EAPP.value('eappDir', dir);

EAPP.config(function ($stateProvider, $urlRouterProvider, DebugProvider, $datepickerProvider) {

  $urlRouterProvider.otherwise("/404");

  $stateProvider
  
    .state('exampleState', {
      url: '/example',
      templateUrl: dir.views + 'example.html'
    })
      
    
    .state('notFound', {
      url: '/404',
      template: '<h1 style="color: black; font-size: 20px;">404 Page Not Found On ' + window.location.host + '</h1>' +
        '<p style="padding: 5px;;font-size: 16px;"">Unfortunately, the page you were trying to retrieve does not exist on ' +
        window.location.host + '.</p>'
    });

  DebugProvider.useEnvironment("development");

  // Date format configuration
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'dd-MMM-yyyy'
  });

});
