var app = angular.module('Foundation.controllers');

app.controller('fMultiplePipedSelectionCtrl', function ($scope) {
  
  $scope.ngModel = $scope.ngModel || "";

  function split() {
    if ($scope.ngModel === undefined) return;
    return $scope.ngModel.split('|').map(function (c) {
      return c.trim();
    });
  }

  function join(arr) {
    $scope.ngModel = arr.map(function (c) {
      return c;
    }).join('|').trim();
    return $scope.ngModel;
  }

  this.$scope = $scope;

  $scope.getSelected = function () {
    return split();
  };

  $scope.isValueActive = function (value) {
    if (!$scope.ngModel) return;
    return split().indexOf(value) != -1;
  };

  $scope.addSelected = function (newVal) {
    var values = split();
    if (values.indexOf(newVal) != -1) return;
    if (values.length === 0 || values[0] === "") {
      values[0] = newVal;
    }
    else {
      values.push(newVal);
    }
    $scope.ngModel = values.join('|');
    return newVal;
  };

  $scope.removeSelected = function (newVal) {
    var values = split();
    var idx = values.indexOf(newVal.trim());
    if (idx == -1) {
      return;
    }
    else {
      values.splice(idx, 1);
      return join(values);
    }
  };

  /*
   * Helpers and data
   */

  $scope.getModel = function () {
    return $scope.ngModel;
  };
});
