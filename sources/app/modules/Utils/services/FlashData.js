var mod = angular.module('Utils.services');

mod.service('FlashData', function($q) {

  /*
     USE CASES

     var flash = $injector.get('FlashData');

     console.log('------- Now testing post-set -------');

     var prom1 = flash.get('MyValue1');

     // When the value it's ready... log the value
     prom1.then(function(value) {console.log(value)});

     // It will console.logs the value now
     flash.set('MyValue1', {hello: "MyValue1"});

     console.log('------- Now testing pre-set-------');

     // Preseted value
     flash.set('MyValue2', {hello: "MyValue2"});

     // Get now the value
     var prom2 = flash.get('MyValue2');

     prom2.then(function(value){console.log(value)});
   */

  var store = {};
  var deferreds = {};

  function registerValue(key, value) {
    store[key] = value;
  }

  function defer(key) {
    deferreds[key] = $q.defer();
    return deferreds[key];
  }

  function flushValue(key) {
    delete store[key];
    delete deferreds[key];
  }

  function _get(key) {
    // If value still doesn't exist
    // we must return a deferred.promise
    if (!store[key]) {
      return defer(key).promise;

    // Else value was found so
    // return a promise and delete it from store
    } else {
      var promise = $q.when(store[key]);
      flushValue(key);
      return promise;
    }
  }

 function _set(key, value) {
   // If none asked for the value
   // then we store it waiting for someone asking for it
   if (!deferreds[key]) {
     registerValue(key, value);
   // Resolve the promises
   } else {
     deferreds[key].resolve(value);
     flushValue(key);
   }

  }

  function getKeys() {
    return Object.keys(store);
  }


  this.set = _set;
  this.get = _get;
  this.getKeys = getKeys;

});
