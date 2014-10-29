angular.module('Utils').factory('$qMock', function(){

    function PromiseMock(initial) {
         var _res =  initial;
         var _then = [];
         var _catch = [];
         this.promise = promise = {
             then: function (fn) {
                 if (arguments.length == 2) {
                     var errFn = arguments [1];
                     _catch.push(errFn)
                 }
                 _then.push(fn);
                 return this;
             },
             catch: function (fn) {
                 _catch.push(fn);
                 return this;
             }
         }

        PromiseMock.prototype.resolve = function(obj){
            _res = obj;
            try {
                _then.forEach(function(fn) {
                    _res = fn(_res);
                });
            } catch (e) {
                _catch.forEach(function(fn) {
                    _res = fn(e);
                });
            }
        };
        PromiseMock.prototype.reject = function(obj){
            _res = obj;
            try {
                _catch.forEach(function(fn) {
                    _res = fn(_res);
                });
            } catch (e) {
                _catch.forEach(function(fn) {
                    _res = fn(e);
                });
            }
        };

    };

    return {
        defer: function() {
            return new PromiseMock();
        },
        when: function(obj) {
            return new PromiseMock(obj).promise
        }
    };
});