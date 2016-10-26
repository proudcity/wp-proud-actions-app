'use strict';

angular.module('311App')

.directive('search', function factory($rootScope, $state) {
  return {
    restrict: 'E',
    templateUrl: 'views/apps/311App/search.html',
    link: function($scope, $element, $attrs) {

      var instance = 'settings.proud_actions_app.instances.' + $rootScope.appId;
      $scope.search = _.get(Proud, instance + '.search');

      $scope.doSearch = function($e) {
        $state.go('city.search')
      }
    }
  }
})
