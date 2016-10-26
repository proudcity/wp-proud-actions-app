'use strict';


angular.module('311App')


.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state("city.local", {
          url: "/local",
          template: '<div ui-view></div>',
          data: { 
            title: 'Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $window){
            // We just need to determine if we redirect to city.local.address or city.local.location
            var redir = function() {
              if (!$rootScope.chosenPlace) {
                var chosenPlace = localStorage.getItem('chosenPlace');
                $rootScope.chosenPlace = chosenPlace ? JSON.parse(chosenPlace) : null;
              }
              if ($rootScope.chosenPlace) {
                $state.go('city.local.location', {
                  latlng: $rootScope.chosenPlace.geometry.location.lat +','+ $rootScope.chosenPlace.geometry.location.lng
                });
              }
              else {
                $state.go('city.local.address');
              }
            }

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
              if(toState.name == 'city.local') {
                redir();
              }
            });

            if ($state.current.name == 'city.local') {
              redir();
            }

          }
        })

    

        .state("city.local.address", {
          url: "/address",
          templateUrl: 'views/apps/311App/local/local-address.html',
          data: { 
            title: 'Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $window){
            $scope.place = null;
            $scope.chosenPlace = $rootScope.chosenPlace;

            var instance = 'settings.proud_actions_app.instances.' + $rootScope.appId;
            var bgImage = _.get(Proud, instance + '.background');

            //$scope.bgStyle = bgImage ? 'background: url('+ bgImage +');background-size: 100%;min-height: 400px;' : '';

            $scope.locate = function() {
              if (navigator.geolocation) {
                $rootScope.chosenPlace = null;
                $state.go('city.local.location', {
                  latlng: position.coords.latitude +','+ position.coords.longitude
                });
              } else {
                alert("Geolocation is not supported by this browser.");
              }
            }

            $scope.chosenUpdate = function() {
              if ($rootScope.chosenPlace != null) {
                $scope.chosenPlace = $rootScope.chosenPlace;
                $state.go('city.local.location', {
                  latlng: $rootScope.chosenPlace.geometry.location.lat() +','+ $rootScope.chosenPlace.geometry.location.lng()
                });
              }
            }
          }
        })


        .state("city.local.location", {
          url: "/location/:latlng",
          templateUrl: 'views/apps/311App/local/local-location.html',
          data: { 
            title: 'Local',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          resolve: {
            data: function($stateParams, $rootScope, GoogleCivicInfo) {
              var item;
              $rootScope.chosenPlace = null;
              if ($rootScope.chosenPlace) {
                return $rootScope.chosenPlace;
              }
              else {

                var latlng = $stateParams.latlng.split(',');
                latlng = {lat: parseFloat(latlng[0]), lng: parseFloat(latlng[1])};
                var deferred = $.Deferred();
                var geocoder = new google.maps.Geocoder;

                geocoder.geocode({'location' : latlng}, function(results, status) {    
                  if (status === 'OK') {                   
                    $rootScope.chosenPlace = results[0];
                    if (localStorage.getItem('chosenPlace')) {
                      localStorage.setItem('chosenPlace', JSON.stringify($rootScope.chosenPlace));
                    }
                    deferred.resolve($rootScope.chosenPlace);
                  } else {
                    deferred.reject(status);
                  }          
                });             

                return deferred.promise();

              }
            }
          },
          controller: function($scope, $rootScope, $state, $window, data){

            // Structure the address data
            data.address_assoc = {};
            for (var i in data.address_components) {
              data.address_assoc[data.address_components[i].types[0]] = data.address_components[i].long_name;
            }
            data.address_assoc.administrative_area_level_2 = data.address_assoc.administrative_area_level_2.replace('County', '');
            data.name = data.name != undefined ? data.name : data.formatted_address;
            $scope.place = data;
            console.log(data)


            // @todo: this is placeholder
            $scope.services = {
              garbage: 'Wednesday',
              streetSweeping: 'First and third Wednesday each month',
              fire: 'Fire District 4',
              police: 'Beat 2'
            }

            // Save address button. Default address is set in 311app.js
            $scope.saveAddress = localStorage.getItem('chosenPlace') ? true : false;
            $scope.toggleSaveAddress = function() {
              if ($scope.saveAddress) {
                localStorage.setItem('chosenPlace', JSON.stringify($rootScope.chosenPlace));
              }
              else {
                localStorage.removeItem('chosenPlace');
              }
            }

            // Toggle save address help info
            $scope.showSaveInfo = false;
            $scope.toggleSaveInfo = function($e) {
              $e.preventDefault();
              $scope.showSaveInfo = !$scope.showSaveInfo;
            }

          }
        })

      
    }
  ]
)