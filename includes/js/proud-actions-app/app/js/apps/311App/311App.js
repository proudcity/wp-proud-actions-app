'use strict';


angular.module('311App', [
  'wordpressService',
  'issueService',
  'paymentService',
  'ui.router',
  'ngSanitize',
  'ngAnimate',
  'ngTouch',
  'scrollTo',
  // vote
  'googleCivicInfoService',
])

.run(
  [          '$rootScope', '$state', '$stateParams', '$window', '$location', 
    function ($rootScope,   $state,   $stateParams,   $window,   $location) {

      // Api Options
      // ---------------------------
      $rootScope.apiUrl = _.get(Proud, 'settings.proud_actions_app.global.api_path') || 'https://example.proudcity.com/wp-json/wp/v2/';
      $rootScope.proudcityApiUrl = _.get(Proud, 'settings.global.proudcity_api') || 'http://localhost:4000';
      $rootScope.proudcitySiteId = _.get(Proud, 'settings.global.proudcity_site_id') || 'san-rafael-ca.proudcity.com';
      $rootScope.paymentUrl = _.get(Proud, 'settings.proud_actions_app.global.payment_url') || 'https://demo-api.proudcity.com/api/proudcity/invoice-example';//$rootScope.proudcityApi + 'invoice-example';
      $rootScope.trackUrl = _.get(Proud, 'settings.proud_actions_app.global.track_url') || 'http://markaspot.helmcivic.com/georeport/v2';
      $rootScope.googleKey = _.get(Proud, 'settings.proud_actions_app.global.google_key') || '';
      $rootScope.googleElectionId = _.get(Proud, 'settings.proud_actions_app.global.google_election_id') || '2000';

      // Global options
      // ---------------------------
      $rootScope.activeCity = _.get(Proud, 'settings.global.location.city') || 'Huntsville';
      $rootScope.activeState = _.get(Proud, 'settings.global.location.state') || 'Alabama';
      $rootScope.location = _.get(Proud, 'settings.global.location') || {lat: 0, lng: 0};
      // $rootScope.mapboxAccessToken = _.get(Proud, 'settings.global.mapbox.token') || 'pk.eyJ1IjoicHJvdWRjaXR5IiwiYSI6ImNpa2JsN2h4eTBtM3N2NGt1ZWltdmRwM3gifQ.yMFhYzprJEYIecChP-rJAg';
      // $rootScope.mapboxMap = _.get(Proud, 'settings.global.mapbox.map') || 'https://api.mapbox.com/v3/mapbox.streets.json';
      $rootScope.mapboxAccessToken = 'pk.eyJ1IjoiYWxiYXRyb3NzZGlnaXRhbCIsImEiOiI1cVUxbUxVIn0.SqKOVeohLfY0vfShalVDUw';
      $rootScope.mapboxMap = 'albatrossdigital.lpkdpcjb';

      // Helper function returns boolean for if we're in "full page mode"
      $rootScope.displayExpanded = function(section) {
        return section == $rootScope.appPageDisplay;
      }

      // Function allows for manipulating the offcanvase slide
      $rootScope.toggleMain = function(toggleClass, toggleType, select) {
        select = select || '';
        switch(toggleType) {
          case 'remove':
            jQuery('#main-311' + select).removeClass(toggleClass);
            break;

          case 'add':
            jQuery('#main-311' + select).addClass(toggleClass);
            break;

          default:
            jQuery('#main-311' + select).toggleClass(toggleClass);
        }
      }
    }
  ]
)

.config(
  [          '$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider,   $stateProvider,   $urlRouterProvider) {
      // set location provider as regular urls
      // $locationProvider.html5Mode(true);

 
    }
  ]
)

.directive('app311Wrap', function($window, $rootScope) {
  return {
    restrict: 'AC',
    templateUrl: 'views/apps/311App/app-311-wrap.html',
    transclude: true,
    link: function($scope, $element, $attrs) {
      // Display options
      // ---------------------------
      // Expand categories?
      $rootScope.appPageDisplay = _.get(Proud, 'settings.proud_actions_app.instances.' + $rootScope.appId + '.expand_section') || false;
      // Restrict to visitor, resident, ect ?
      var categories = _.get(Proud, 'settings.proud_actions_app.instances.' + $rootScope.appId + '.category_section') || false;
      if(categories) {  
        categories = _.transform(_.values(categories), function(res, v, k) {
          if(v && v !== "0") {
            res.push(v);
          }
        });
      }
      $rootScope.categories = categories;
    }
  }
})