/* global escape, unescape */
var app = angular.module('Utils.services');

app.factory('Utils', function (Debug, $q, $location) {
  //var debug = Debug('Utils');

  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  function str2ab(str) {
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return bufView;
  }

  var UTF8 = {
    encode: function (s) {
      return unescape(encodeURIComponent(s));
    },
    decode: function (s) {
      return decodeURIComponent(escape(s));
    },
    encodeJSON: function (json) {
      return JSON.parse(UTF8.encode(JSON.stringify(json)));
    }
  };

  // Helpers
  var helpers = {
    date: {}
  };

  // Define a property for getting the cookies
  Object.defineProperty(helpers, 'cookies', {
    get: function () {
      var cookies = {};           // The object we will return
      var all = document.cookie;  // Get all cookies in one big string
      if (all === "")             // If the property is the empty string
        return cookies;         // return an empty object
      var list = all.split("; "); // Split into individual name=value pairs
      for (var i = 0; i < list.length; i++) {  // For each cookie
        var cookie = list[i];
        var p = cookie.indexOf("=");        // Find the first = sign
        var name = cookie.substring(0, p);   // Get cookie name
        var value = cookie.substring(p + 1);  // Get cookie value
        value = decodeURIComponent(value);  // Decode the value
        cookies[name] = value;              // Store name and value in object
      }
      return cookies;
    }
  });

  // Date
  var date = helpers.date;

  date.new = function generateDate(date) {
    // Obtain a new date
    if (!date) {
      date = new Date();
    }

    function s(val) {
      return ('0' + val).slice(-2);
    }

    // Date generation
    var year, month, day, hour, minute, second;
    year = String(moment(date).year());
    month = s(moment(date).month() + 1);
    day = s(moment(date).date());
    hour = s(moment(date).hour());
    minute = s(moment(date).minute());
    second = s(moment(date).second());

    var format = _.template('${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}');

    var result = format({
      yyyy: year,
      MM: month,
      dd: day,
      hh: hour,
      mm: minute,
      ss: second
    });

    return result;
  };

  return {
    promisify: function (object) {
      //return $q.when(object)
      var deferred = $q.defer();
      setTimeout(function () {
        deferred.resolve(object);
      });

      // Return a promise
      var promise = deferred.promise;
      promise.success = promise.then;
      promise.error = promise.catch;
      return deferred.promise;
    },
    addToQuery: function (keyvalue) {
      if (typeof keyvalue != "object") {
        return;
      }
      for (var key in keyvalue) {
        $location.search(key, keyvalue[key]);
      }
    },
    unzip: function (base64) {
      /* Unzip a base64 + gzipped string */
      //debug('unzip', base64);

      var str = atob(base64);
      //debug('str', str);

      var uar = str2ab(str);
      //debug('uar', uar);

      var decr = pako.inflate(uar);
      //debug('decr', decr);

      var result = ab2str(decr);
      //debug('result', result);

      return  result;
    },

    zip: function (message) {
      var arraybufferEncoded = pako.deflate(str2ab(message));

      var enc = btoa(ab2str(arraybufferEncoded));
      return enc;
    },

    UTF8: UTF8,

    helpers: helpers
  };
});
