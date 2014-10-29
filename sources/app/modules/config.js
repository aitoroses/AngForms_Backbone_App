// Create Main module
var app = angular.module('main', [
  'ngAnimate',
  'mgcrea.ngStrap',
  'ngGrid',
  'Utils',
  'Foundation',
  'ngStorage',
  'EAPP'
]);

// Store a Global configuration object
app.factory('Global', function () {
  var DEFAULT_CONFIG = {
    env: 'development',
    Server: 'http://soa-server:7003',
    defaultInstallId: 1
  };
  return _.extend(DEFAULT_CONFIG, window.__config || {});
});

// Module configuration
app.config(function ($httpProvider) {

  // Prepare for CORS
  $httpProvider.defaults.headers.common.Accept = 'application/json';
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

});


// Bootstrap application
angular.element(document).ready(function () {
  /* Export AngForms injector to the window and the parent window */
  window.$injector = angular.bootstrap(document, ['main']);

  /* Export variables to the iframes parent for debugging */
  try {
    var ang = window.AngForms = {};
    ang.$injector = $injector;
    ang.$ = $;
    ang.window = window;
    ang.document = document;
    ang.location = location;

    window.parent.window.AngForms = ang;
  } catch (e) {}
});
