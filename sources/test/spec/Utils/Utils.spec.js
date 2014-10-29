"use strict";

describe("Utils module", function(){
    var Utils, encoded, original, promiseMock;

    // Mock of a promise
    promiseMock = {
        _res: null,
        resolve: function(obj){promiseMock._res = obj},
        reject: function(obj) {promiseMock._res = obj},
        promise: {then: function(fn){fn(promiseMock._res)}, catch: function(fn){fn(promiseMock._res)}}
    }

    beforeEach(module("Utils"));

    beforeEach(inject(function(_Utils_, $q){
        Utils = _Utils_;
        original = "hello";
        encoded = "eJzLSM3JyQcABiwCFQ==";
    }));

    it("should compress a string", function() {
        var decoded = Utils.zip(original);
        expect(decoded).toEqual(encoded);
    });

    it("should decompress a base64 string", function() {
        var decoded = Utils.unzip(encoded);
        expect(decoded).toEqual(original);
    });

    it("should convert an object to a resolving promise", inject(function($q) {

        // Mock the $q module
        spyOn($q, 'defer').and.returnValue(promiseMock);

        var obj = {message: "hello"}
        promiseMock.resolve(obj);

        var promise = Utils.promisify(obj);
        promise.then(function(res){
            expect(res).toEqual(obj);
        });
    }));

    it("should add to query new params", inject(function($location){
        // Mock window.location.search
        var search = "?";

        // Add a spy to location
        spyOn($location, 'search').and.callFake(function(){
            search += arguments[0] + '=' + arguments[1];
            return search;
        });

        Utils.addToQuery({"hello": "world"});

        expect($location.search).toHaveBeenCalledWith("hello", "world");
        expect(search).toEqual("?hello=world");
    }));

});