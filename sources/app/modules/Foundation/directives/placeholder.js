

angular.module('Foundation.directives').directive('ngPlaceholder', function () {
  'use strict';

  return {
    restrict: 'A',
    require: 'ngModel',
    priority: 99999,
    link: function (scope, elem, attrs, ngModel) {

      scope.$watch(function () {
        return attrs.placeholder;
      }, function (val) {
          text = val;
          elem.val(val);
          scope.placeholder = val;
      });

      var origVal = elem.val() || '', isPwd = attrs.type === 'password', text = attrs.placeholder, emptyClassName = 'empty', domElem = elem[0], clone;
      if (!text) {
        return;
      }
      if (isPwd) {
        setupPasswordPlaceholder();
      }
      setValue(origVal);
      ngModel.$setViewValue(origVal);
      elem.bind('focus', function () {
        if (elem.hasClass(emptyClassName)) {
          elem.val('');
          elem.removeClass(emptyClassName);
          elem.removeClass('error');
        }
      });
      elem.bind('blur', function () {
        var val = elem.val();
        scope.$apply(function () {
          setValue(val);
          ngModel.$setViewValue(val);
        });
      });

      ngModel.$render = function () {
        setValue(ngModel.$viewValue);
      };

      function setValue(val) {
        if (!val) {
          elem.addClass(emptyClassName);
          if (isPwd) {
            showPasswordPlaceholder();
          }
          else {
            elem.val(text);
          }
        }
        else {
          elem.removeClass(emptyClassName);
          elem.val(val);
        }
      }

      function setupPasswordPlaceholder() {
        clone = angular.element('<input/>').attr(angular.extend(extractAttributes(domElem), {
          'type': 'text',
          'value': text,
          'placeholder': '',
          'id': '',
          'name': ''
        })).addClass(emptyClassName).addClass('ng-hide').bind('focus', hidePasswordPlaceholder);
        domElem.parentNode.insertBefore(clone[0], domElem);
      }

      function showPasswordPlaceholder() {
        elem.addClass('ng-hide');
        clone.removeClass('ng-hide');
      }

      function hidePasswordPlaceholder() {
        clone.addClass('ng-hide');
        elem.removeClass('ng-hide');
        domElem.focus();
      }

      function extractAttributes(element) {
        var attr = element.attributes, copy = {}, skip = /^jQuery\d+/;
        for (var i = 0; i < attr.length; i++) {
          if (attr[i].specified && !skip.test(attr[i].name)) {
            copy[attr[i].name] = attr[i].value;
          }
        }
        return copy;
      }
    }
  };
});
