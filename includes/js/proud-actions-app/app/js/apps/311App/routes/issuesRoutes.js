'use strict';


angular.module('311App')

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      $urlRouterProvider
        //.when('', '/answers');

      $stateProvider
  
        .state("city.status", {
          url: '/status',
          data: { 
            doScroll: false  // No scroll on route change
          },
          templateUrl: 'views/apps/311App/issues/issue-status.html',
          controller: function($scope, $rootScope, $state){
            //$scope.code = 'd2a6-1'; // @todo: default value, remove

          }
        })

        .state("city.status.item", {
          url: '/:code',
          templateUrl: 'views/apps/311App/issues/issue-status-result.html',
          controller: function($scope, $rootScope, $state, TrackIssue){
            $scope.code = $state.params.code;

            TrackIssue.get({code: $state.params.code}).$promise.then(function(data) {
              if (data != undefined) {
                $scope.item = data;
              }
              else {
                $scope.error = true;
              }
              console.log($scope.item);
            });
          }
        })

        .state("city.report", {
          url: '/report',
          data: { 
            doScroll: false  // No scroll on route change
          },
          templateUrl: 'views/apps/311App/issues/issue-create-categories.html',
          resolve: {
            services: function($stateParams, TrackService, $rootScope) {
              return TrackService.query({address: $rootScope.activeCity +', '+ $rootScope.activeState}).$promise.then(function(data) {
                return data['request_types'] != undefined ? data['request_types'] : null;
              });
            }
          },
          controller: function($scope, $rootScope, $state, services){
            var mapping = [
              { term: 'animal', icon: 'paw'},
              { term: 'building', icon: 'building'},
              { term: 'cemetary', icon: undefined},
              { term: 'weed', icon: 'pagelines'},
              { term: 'graffiti', icon: 'paint-brush'},
              { term: 'sidewalk', icon: 'road'},
              { term: 'light', icon: 'lightbulb-o'},
              { term: 'sign', icon: 'map-signs'}, // @todo: added in fa 4.4
              { term: 'tree', icon: 'tree'},
              { term: 'street', icon: 'road'},
              { term: 'garbage', icon: 'trash-o'},
              { term: 'sewer', icon: undefined},
              { term: 'pothole', icon: 'car'},
              { term: 'parking', icon: 'car'},
              { term: 'car', icon: 'car'},
              { term: 'park', icon: 'leaf'},
              { term: 'litter', icon: 'trash-o'},
              { term: 'recycl', icon: 'recycle'},
            ];
            var colors = ['#BC2D07', '#14A88E', '#A4506C', '#094558', '#F68D38', '#67412C'];
            for (var i=0; i<services.length; i++) {
              services[i].field_icon = {
                'color': colors[Math.floor(Math.random()*colors.length)]
              }              
              var title = services[i].title.toLowerCase();
              for (var j=0; j<mapping.length; j++) {
                if (title.indexOf(mapping[j].term) != -1) {
                  services[i].field_icon.icon = mapping[j].icon;
                }
              }
              services[i].field_icon.icon = services[i].field_icon.icon == undefined ? 'file-text-o' : services[i].field_icon.icon;
            }
            console.log(services);
            $scope.types = services;

            $scope.typeUrl = function(url) {
              var type = url.replace($rootScope.seeclickfixUrl + 'request_types/', '');
              return "city.report.map({type:'"+type+"'})";
            }
          }
        })


        .state("city.report.map", {
          url: '/:type',
          templateUrl: 'views/apps/311App/issues/issue-create-map.html',         
          controller: function($scope, $rootScope, $state, $http){
            $scope.type = $state.params.type;
            $scope.config = undefined;
            $http.get('//workhorse.albatrossdigital.com/proudcity-api.php?state='+ $rootScope.activeState +'&city='+ $rootScope.activeCity).success(function(data){
              $scope.config = data;
            });

            $scope.next = function() {
              console.log();
              if ($scope.marker == undefined) {
                alert('Please enter an address, or click the Locate button to use your current location.')
              }
              else {
                var latlng = $scope.marker.getLatLng();
                $state.go('city.report.map.details', {
                  lat: latlng.lat,
                  lng: latlng.lng
                });
              }
            }

            $scope.$watch('config', function(value){
              if ($scope.config != undefined) {
                L.mapbox.accessToken = $rootScope.mapboxAccessToken;

                var map = new L.mapbox.Map('issue-map', $rootScope.mapboxMap, {
                    center: new L.LatLng($scope.config.lat, $scope.config.lng),
                    zoom: 15,
                    scrollWheelZoom: false
                });

                $scope.marker = null;

                var addMarker = function(self) {
                  var latlng = self.latlng != undefined ? self.latlng : new L.LatLng(self.feature.center[1], self.feature.center[0]);
                  $scope.marker = L.marker(latlng, {
                    icon: L.mapbox.marker.icon({
                        'marker-color': 'ff8888'
                    }),
                    draggable: true
                  }).addTo(map);
                  $scope.$apply();
                }

                // Add marker when the map is clicked (if it hasn't already been added)
                map.on('click', function(self) {
                  if ($scope.marker === null) {
                    addMarker(self);
                  }
                });

                // Add geocode control, add marker when selected
                map.addControl(L.mapbox.geocoderControl('mapbox.places', {
                    keepOpen: true,
                    autocomplete: true
                }).on('select', addMarker).on('autoselect', addMarker));
                
                // Add locate control, add marker when located
                L.control.locate({
                  drawCircle: true
                }).addTo(map);
                map.on('locationfound', addMarker);
              }
              
            });

          }
        })


        .state("city.report.map.details", {
          url: '/details?lat&lng',
          templateUrl: 'views/apps/311App/issues/issue-create-details.html',
          resolve: {
            data: function($stateParams, $rootScope, TrackFields) {
              return TrackFields.get({type: $stateParams.type}).$promise.then(function(data) {
                console.log(data);
                return {
                  categoryTitle: data.title,
                  fields: data.questions
                };
              });
            }
          },
          controller: function($scope, $rootScope, $state, data, $http){
            $scope.type = $state.params.type;
            $scope.form = {
              'request_type_id': $scope.type,
              'lat': $state.params.lat,
              'lng': $state.params.lng,
              'answers': {}
            }
            $scope.fields = data.fields;
            $scope.form.category = data.categoryTitle;

            $scope.submit = function(data) {

              /*var issue = new TrackIssue(data);
              issue.$save(function(data, putResponseHeaders) {
                console.log(data);
                //u => saved user object
                //putResponseHeaders => $http header getter
              });*/

              console.log(JSON.stringify(data));

              $http.post($rootScope.seeclickfixUrl + 'issues', data).
                then(function(response) {
                  console.log(response);
                }, function(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                });
              }

            }

        })



    }
  ]
);
