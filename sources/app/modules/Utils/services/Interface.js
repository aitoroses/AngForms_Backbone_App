var Interface = function(name, methods) {
  this.name = name;
  this.methods = [];

  if (methods.constructor == Array)
    this.methods = methods;
  else if (methods.constructor == String)
    this.methods[0] = methods;
  else
    throw new Error("Interface must define methods as a String or an Array of Strings");
};

var InterfaceHelper  = {
  ensureImplements : function(obj, interfaces) {
    // If interfaces is not an array, assume it's a function pointer
    var toImplement = interfaces.constructor == Array ? interfaces : [interfaces];
    var interface;

    // For every interface that obj must implement:
    for (var i = 0, len = toImplement.length; i < len; i++) {
      interface = toImplement[i];

      // Make sure it indeed is an interface
      if (interface.constructor != Interface)
        throw new Error("Object trying to implement a non-interface. "
          + interface.name + " is not an Interface.");

      // Make sure obj has all of the methods described in the interface
      for (var j = 0, interfaceLen = interface.methods.length; j < interfaceLen; j++)
        if (!obj[interface.methods[j]])
          throw new Error("Interface method not implemented. "
            + interface.name + " defines method " + interface.methods[j]);
    }

    return true;
  }
};

/*var Drawable = new Interface("Drawable", ["onDraw"]);

var Surface = function() {
  this.implements = ["Drawable"];

  this.onDraw = function() {
    console.log("Surface Drawing");
  };
};*/

var mod = angular.module('Utils');

mod.factory('Interface', function() {return Interface});
mod.factory('InterfaceHelper', function() {return InterfaceHelper});
