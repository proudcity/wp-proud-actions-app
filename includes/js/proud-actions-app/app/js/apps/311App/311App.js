'use strict';


angular.module('311App', [
  'wordpressService',
  'seeClickFixService',
  'paymentService',
  'ui.router',
  'ngSanitize',
  'ngAnimate',
  'stripe.checkout',
  'ngTouch',
  'scrollTo'
])

.run(
  [          '$rootScope', '$state', '$stateParams', '$window', '$location', 
    function ($rootScope,   $state,   $stateParams,   $window,   $location) {

      // Api Options
      // ---------------------------
      $rootScope.apiUrl = _.get(Proud, 'settings.proud_actions_app.global.api_path') || 'https://west-carrollton-oh.proudcity.com/wp-json/wp/v2/';
      $rootScope.paymentUrl = _.get(Proud, 'settings.proud_actions_app.global.payment_url') || 'http://demo.helmcivic.com/invoice-example';//$rootScope.proudcityApi + 'invoice-example';
      $rootScope.trackUrl = _.get(Proud, 'settings.proud_actions_app.global.track_url') || 'http://markaspot.helmcivic.com/georeport/v2';
      $rootScope.seeclickfixUrl = _.get(Proud, 'settings.proud_actions_app.global.seeclickfixUrl') || "https://test.seeclickfix.com/api/v2/";

      $rootScope.issue = _.get(Proud, 'settings.proud_actions_app.global.issue') || 'http://markaspot.helmcivic.com/georeport/v2';
      $rootScope.payment = _.get(Proud, 'settings.proud_actions_app.global.payment') || 'http://markaspot.helmcivic.com/georeport/v2';

      // Global options
      // ---------------------------
      $rootScope.activeCity = _.get(Proud, 'settings.global.location.city') || 'Huntsville';
      $rootScope.activeState = _.get(Proud, 'settings.global.location.state') || 'Alabama';

      // Helper function returns boolean for if we're in "full page mode"
      $rootScope.displayExpanded = function(section) {
        return section == $rootScope.appPageDisplay;
      }
    }
  ]
)

.config(
  [          '$locationProvider', '$stateProvider', '$urlRouterProvider', 'StripeCheckoutProvider',
    function ($locationProvider,   $stateProvider,   $urlRouterProvider,   StripeCheckoutProvider) {
      // set location provider as regular urls
      // $locationProvider.html5Mode(true);

      StripeCheckoutProvider.defaults({
        key: _.get(Proud, 'settings.proud_actions_app.global.payment_key') || ""
      });
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