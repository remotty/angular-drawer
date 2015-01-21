/**!
 * AngularJS Drawer directive
 * @author Chungsub Kim <subicura@subicura.com>
 */

(function () {
  'use strict';

  angular.module('angular-drawer', [])
    .provider('drawer', function() {
      var opts = {
      };

      return {
        setOption: function (newOpts) {
          angular.extend(opts, newOpts);
        },
        $get: function () {
          return opts;
        }
      };
    })
    .directive('drawer', ['$window', '$rootScope', function ($window, $rootScope) {
      var isInit = false;

      var bgEl, leftDrawerEl, rightDrawerEl;
      var bodyEl = angular.element(document.body);
      var DRAWER_MODE = {
        ALL: 0,
        LEFT: 1,
        RIGHT: 2
      };

      function onResize() {
        var height = angular.element($window)[0].innerHeight + 'px';
        bgEl.css('height', height);
        if(leftDrawerEl) {
          leftDrawerEl.css('height', height);
        }
        if(rightDrawerEl) {
          rightDrawerEl.css('height', height);
        }
      }

      function init() {
        bgEl = angular.element(document.createElement('div'));
        bgEl.addClass('ng-drawer-bg');
        bgEl.bind('click', function() { closeDrawer(DRAWER_MODE.ALL); });
        angular.element(document.body).append(bgEl);

        onResize();
        angular.element($window).bind('resize', onResize);

        $rootScope.openRightDrawer = function() {
          openDrawer(DRAWER_MODE.RIGHT);
        };

        $rootScope.openLeftDrawer = function() {
          openDrawer(DRAWER_MODE.LEFT);
        };

        $rootScope.openDrawer = function() {
          openDrawer(DRAWER_MODE.ALL);
        };

        $rootScope.closeRightDrawer = function() {
          closeDrawer(DRAWER_MODE.RIGHT);
        };

        $rootScope.closeLeftDrawer = function() {
          closeDrawer(DRAWER_MODE.LEFT);
        };

        $rootScope.closeDrawer = function() {
          closeDrawer(DRAWER_MODE.ALL);
        };
      }

      function openDrawer(mode) {
        bgEl.addClass('active');
        bodyEl.addClass('ng-drawer-no-scroll');

        if(leftDrawerEl && 
          (mode == DRAWER_MODE.LEFT || mode == DRAWER_MODE.ALL)) {
          leftDrawerEl.addClass('active');
        }
        if(rightDrawerEl && 
          (mode == DRAWER_MODE.RIGHT || mode == DRAWER_MODE.ALL)) {
          rightDrawerEl.addClass('active');
        }
      }

      function closeDrawer(mode) {
        bgEl.removeClass('active');
        bodyEl.removeClass('ng-drawer-no-scroll');

        if(leftDrawerEl && 
          (mode == DRAWER_MODE.LEFT || mode == DRAWER_MODE.ALL)) {
          leftDrawerEl.removeClass('active');
        }
        if(rightDrawerEl && 
          (mode == DRAWER_MODE.RIGHT || mode == DRAWER_MODE.ALL)) {
          rightDrawerEl.removeClass('active');
        }
      }

      return {
        restrict: 'AE',
        link: function (scope, element, attrs) {
          if(!isInit) {
            init();
          }

          element.addClass('ng-drawer');
          element.css('height', angular.element($window)[0].innerHeight + 'px');

          if(attrs.drawer == 'right') {
            element.addClass('ng-drawer-right');
            rightDrawerEl = element;
          } else {
            element.addClass('ng-drawer-left');
            leftDrawerEl = element;
          }          
        }
      };
    }]);
})();
