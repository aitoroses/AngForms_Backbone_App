/* eslint no-extra-boolean-cast: 0, dot-notation: 0 */

var mod = angular.module('Foundation.directives');

mod.directive('fCollapsable', function ($timeout) {
    return {
        restrict: 'A',
        priority: -99999,
        scope: {
            collapsed: '=fCollapsable',
            selector: '@fCollapsableSelector'
        },
        link: function (scope, element, attrs) {

            var pristine = true;

            // initial state
            if (!scope.collapsed) {
                scope.collapsed = false;
            }

            // Attributes
            var durationAttr = scope.$eval(attrs['fCollapsableDuration']);
            var startClosed = scope.$eval(attrs['fCollapsableClosed']);
            var selectorAttr = scope.selector;

            // cached height
            var height;

            // Duration defined
            var duration = 'fast';
            if (durationAttr) {
                duration = durationAttr;
            }

            // Animations
            var animate = {
                show: function() {
                    var sel = $(element).find(selectorAttr);
                    sel.velocity({height: height == 0 ? 184 : height},{
                        complete: function() {
                            sel.css({'height': 'auto', display: 'block', overflow: 'visible'}); // display is a patch
                        },
                        duration: duration // can specify ms
                    });
                },
                collapse: function(instant) {
                  $timeout(function() {
                    var sel = $(element).find(selectorAttr);
                    height = sel.height();
                    sel.css({overflow: 'hidden'});
                    if (instant) {
                      sel.height(0);
                    }
                    else {
                      sel.velocity({height: 0}, {
                        duration: duration
                      });
                    }
                  });
                }
            };

            // Watchers
            scope.$watch('collapsed', function() {
                if (pristine) {
                    pristine = false;
                    return;
                }
                if (scope.collapsed == false ){
                    animate.show();
                } else {
                    animate.collapse();
                }
            });

            // make it initially closed
            if (startClosed) animate.collapse(true);
        }
    };
});
