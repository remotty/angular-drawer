/**!
 * AngularJS Drawer directive
 * @author Chungsub Kim <subicura@subicura.com>
 */

(function () {
  'use strict';

  angular.module('angular-drawer', [])
    .provider('drawer', function () {
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
    .directive('drawer', ['drawer', function (drawerOption) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          
        }
      };
    }]);
})();
