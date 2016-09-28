'use strict';


angular.module('311App')


.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      $stateProvider

        .state("city.custom", {
          template: '<div ng-bind-html="content"></div>',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true//,   // Force "offcanvas" class off
            //title: 'Tab'
          },
          url: "/tab",
          controller: function($scope, $rootScope, $state){
            $scope.content = _.get(Proud, 'settings.proud_actions_app.instances.' + $rootScope.appId + '.custom_content') || ''
          }
        })

    }
  ]
)


