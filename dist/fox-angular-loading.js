(function (angular) {
  'use strict';
  angular.module('fox.loading', []).directive('foxLoading', [
    '$timeout',
    function ($timeout) {
      return {
        restrict: 'E',
        template: '<div class="loading" ng-transclude></div>',
        replace: true,
        transclude: true,
        link: function (scope, el, attrs) {
          var clearHeight = false;
          function hideShow(check) {
            if (check) {
              el.css({ display: 'none' });
              if (clearHeight) {
                el.parent().css({ height: '' });
              }
            } else {
              if (!el.parent()[0].offsetHeight) {
                clearHeight = true;
                el.parent().css({ height: '100px' });
              }
              el.css({ display: '' });
            }
          }
          scope.$watch(attrs.until, function loading(newValue) {
            hideShow(newValue);
          });
          hideShow(attrs.until);
          if (attrs.timeout) {
            $timeout(function () {
              hideShow(true);
            }, attrs.timeout * 1000);
          }
        }
      };
    }
  ]);
}(window.angular));