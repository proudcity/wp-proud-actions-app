'use strict';


angular.module('311App')

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      $urlRouterProvider
        //.when('', '/answers');

      $stateProvider
  
        .state("city.search", {
          url: '/search',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Check Status'
          },
          templateUrl: 'views/apps/311App/search/search.html',
          controller: function($scope, $rootScope, $state, $window, Search){

            var instance = 'settings.proud_actions_app.instances.' + $rootScope.appId;
            $scope.googleSearchSite =  _.get(Proud, instance + '.search');
            $scope.term = '';
            $scope.results = false;
            $scope.loading = false;
            
            $scope.autocomplete = function() {
              $scope.loading = true;
              Search.query({
                term: $scope.term
              }).$promise.then(function(data) {
                console.log(data);
                $scope.results = data;
                $scope.loading = false;
              });
            }

            $scope.go = function(item, $e) {
              $e.preventDefault();
              if (item.action_attr != undefined && item.action_attr != '') {
                var hash = 'city/' + item.action_attr + item.action_hash;
                $window.location.hash = hash;
              }
              else {
                $window.open(item.url);
              }
            }

            $scope.googleSearch = function($e) {
              $e.preventDefault(); 
              var url = 'https://www.google.com/search?q=' + encodeURIComponent($scope.term + ' site:' + $scope.googleSearchSite)
              $window.open(url);
            }
          }
        })

        


    }
  ]
);
