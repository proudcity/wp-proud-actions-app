'use strict';

//***************************************

// Main Application

//***************************************

angular.module('311AppParent', [
  '311App',
  'angular-inview',
  'angular-lazycompile'
])

.run(
  [          '$rootScope', '$state', '$stateParams', '$window', '$location', 
    function ($rootScope,   $state,   $stateParams,   $window,   $location) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.currentSection = '';
      $rootScope.currentRoute = '';


      $rootScope.mapboxAccessToken = _.get(Proud, 'settings.proud_311_app.mapbox_access_token') || 'pk.eyJ1IjoiYWxiYXRyb3NzZGlnaXRhbCIsImEiOiI1cVUxbUxVIn0.SqKOVeohLfY0vfShalVDUw';
      $rootScope.mapboxMap = _.get(Proud, 'settings.proud_311_app.mapbox_map') || 'albatrossdigital.lpkdpcjb';

      $rootScope.proudShowcaseKey = '325jk154hl3y8r2J34NRAasdfasdf';
      $rootScope.showcaseApiUrl='http://ui.dev.getproudcity.com/';  //@todo: switch to my.getproudcity.com

      // $rootScope.proudcityApi='http://localhost:32790/api/proudcity/';
      $rootScope.proudcityApi='http://my.getproudcity.com/api/proudcity/';
      //$rootScope.proudcityApi='http://localhost:32804/api/proudcity/';
      $rootScope.proxyUrl = $rootScope.proudcityApi + 'proxy';
      $rootScope.paymentUrl = $rootScope.proudcityApi + 'invoice-example';
    
      // Apply meta data if available
      $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){
          //console.log('sjsjs');
        }
      );

      $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){

          // send tracking
          if ($window.ga){
            $window.ga('send', 'pageview', { 
              page: $location.path(),
              title: toState.data && toState.data.title ? toState.data.title : 'FILLME!'
            });
          }

          // first time, and are we changing the main / secondary route
          if(  fromState.name && fromState.name.length
            && (!toState.data  || !(toState.data && toState.data.skipScroll))) {

            //$rootScope.scrollTo('main');
          }
        }
      );

      // Helper function detects the correct sub route to go to (for templating)
      $rootScope.goSubRoute = function(baseRoute, subRoute, baseName) {
        baseName = baseName == undefined ? 'base' : baseName;
        var stateName = baseRoute+'.'+subRoute;
        try {
          var state = $state.get(stateName);
          if (state == undefined || state == null) {
            throw "myException";
          }
        }
        catch(e) {
          stateName = baseRoute+'.'+baseName;
        }
        $state.go(stateName);
      }
		
		}
	]
)
.directive('parent', function($rootScope, Menu311, $location) {
  return {
    restrict: 'C',
    link: function($scope, $element, $attrs) {
      if(!$location.$$path) {
        $location.path(Menu311.getDefaultUrl($rootScope.appId));
      }
      
    }
  }
});