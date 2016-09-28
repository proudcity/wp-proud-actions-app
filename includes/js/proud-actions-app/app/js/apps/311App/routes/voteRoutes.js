'use strict';


angular.module('311App')


.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state("city.vote", {
          url: "/vote",
          template: '<div ui-view></div>',
          data: { 
            title: 'Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $window){
            $state.go('city.vote.address')
          }
        })

        .state("city.vote.embed", {
          url: "/embed",
          templateUrl: 'views/apps/311App/vote/vote-embed.html',
          data: { 
            title: 'Embed',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          }
        })

        .state("city.vote.address", {
          url: "/address",
          templateUrl: 'views/apps/311App/vote/vote-address.html',
          data: { 
            title: 'Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $window){
            $scope.place = null;
            $scope.chosenPlace = null;
            $rootScope.chosenPlace = null;

            $scope.chosenUpdate = function() {
              if ($rootScope.chosenPlace != null) {
                $scope.chosenPlace = $rootScope.chosenPlace;
                $state.go('city.vote.location', {
                  latlng: $rootScope.chosenPlace.geometry.location.lat() +','+ $rootScope.chosenPlace.geometry.location.lng(),
                  address: $rootScope.chosenPlace.formatted_address
                });
              }
            }
          }

        })

        .state("city.vote.location", {
          url: "/:latlng/:address",
          templateUrl: 'views/apps/311App/vote/vote-wrapper.html',
          data: { 
            title: 'Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          resolve: {
            data: function($stateParams, $rootScope, GoogleCivicInfo) {
              return GoogleCivicInfo.query({
                address: $stateParams.address
              }).$promise.then(function(data) {
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, $window, data){
            $state.go('city.vote.location.how');
          }
        })

      .state("city.vote.location.how", {
          url: "/how",
          templateUrl: 'views/apps/311App/vote/vote-how.html',
          data: { 
            title: 'How to Vote',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $window, data){
            var home = $state.params.latlng.split(',');
            home = new google.maps.LatLng(parseFloat(home[0]), parseFloat(home[1]));

            var geocoder = new google.maps.Geocoder();
            var bounds = new google.maps.LatLngBounds();

            // Add map
            var myOptions = {
              zoom: 14,
              center: home,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById('google-map'), myOptions);
            
            // Add home pin
            // Custom icons from https://sites.google.com/site/gmapsdevelopment/
            new google.maps.Marker({
                map: map,
                position: home,
                title: 'Your address'.toUpperCase(),
                icon: '//maps.google.com/mapfiles/kml/pal3/icon31.png',
                shadow: '//maps.google.com/mapfiles/kml/pal3/icon31s.png' //@todo
            });
            bounds.extend(home);

            // Helper function
            var marker;
            $scope.addMarker = function(address, label){
              geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == 'OK') {
                  marker = new google.maps.Marker({
                      map: map,
                      position: results[0].geometry.location,
                      title: label.toUpperCase(label),
                      icon: '//maps.google.com/mapfiles/ms/micons/blue-pushpin.png',
                      shadow: '//maps.google.com/mapfiles/ms/micons/pushpin_shadow.png' //@todo
                  });
                  bounds.extend(marker.getPosition());
                  map.fitBounds(bounds);
                }
              });
            }

            // Add polling place pins
            if (data.pollingLocations != undefined) {
              var addr;
              var address;
              for (var i in data.pollingLocations) {
                addr = data.pollingLocations[i].address;
                address = addr.line1 + ', ' + 
                  (addr.line2 != undefined ? addr.line2 + ', ' : '') + 
                  addr.city + ', ' + addr.state + ' ' + addr.zip;
                $scope.addMarker(address, 'Polling place: ' + addr.locationName);
              }

              $scope.directionsLink = '//maps.google.com/maps/dir/' + encodeURIComponent($state.params.latlng) + '/' + encodeURIComponent(address);
              $scope.address = data.pollingLocations[0].address;
              $scope.hours = data.pollingLocations[0].pollingHours;
              $scope.sources = data.pollingLocations[0].sources;
            }

            $scope.links = data.state[0].electionAdministrationBody;

            $scope.disclaimer = false;
            $scope.toggleDisclaimer = function() {
              $scope.disclaimer = !$scope.disclaimer;
            }
          }

        })



        .state("city.vote.location.issues", {
          url: "/issues",
          templateUrl: 'views/apps/311App/vote/vote-issues.html',
          data: { 
            title: 'Issues',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $filter, data){
            $scope.contests = $filter('filter')(data.contests, {type: 'Referendum'});
          }

        })


        .state("city.vote.location.candidates", {
          url: "/candidates",
          templateUrl: 'views/apps/311App/vote/vote-candidates.html',
          data: { 
            title: 'Candidates',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false,                // no scroll on route change
            undoMainToggle: true            // Force "offcanvas" class off
          },
          controller: function($scope, $rootScope, $state, $filter, data){
            $scope.contests = $filter('filter')(data.contests, {type: 'General'}).slice().reverse();
          }

        })
      
    }
  ]
)