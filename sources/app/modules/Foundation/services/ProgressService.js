var app = angular.module('Foundation.services');

app.factory('ProgressService', function (Debug, ngProgress, $q, $location, $rootScope) {

  var progress = angular.copy(ngProgress);

  // Change the color
  progress.color('rgb(0,168,255');

  // initial value
  var _loading = false;

  /**
   * Returns if the state is loading
   * @returns {boolean}
   */
  progress.isLoading = function () {
    return _loading;
  };

  /**
   * This function wraps a promise
   * into ngProgress and set's global state on $rootScope
   * @returns {Deferred}
   */
  progress.$new = function () {

    var deferred = $q.defer();

    deferred.promise
      .then(function () {
        progress.complete();
        _loading = false;
      })
      .catch(function (errorMessage) {
        progress.complete();
        _loading = false;
        //$location.path('/404');
        $rootScope.$broadcast('fLoading:errorMessage', errorMessage);
      });

    // Start the loading
    progress.start();
    _loading = true;

    return deferred;
  };

  /**
   * Show an error message
   * @param errorMessage
   */
  progress.$error = function (errorMessage) {
    $rootScope.$broadcast('fLoading:errorMessage', errorMessage);
  };

  // ProgressService it's just a wrapper
  return progress;

});
