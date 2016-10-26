'use strict';

angular.module('311App')

.directive('pcMap', function factory($rootScope, $state, Post, NgMap) {
  return {
    restrict: 'E',
    scope: {
      center: '@',
      zoomToIncludeMarkers: '@',
      zoom: '=',
      layer: '=',
      showHome: '=',
      legend: '@',
      legendTitle: '@',
      titleSuffix: '@'
    },
    templateUrl: 'views/apps/311App/map/map-wrapper.html',
    link: function($scope, $element, $attrs) {
      var icon = {
        path: MAP_PIN,
        fillColor: '#00CCBB',
        fillOpacity: 1,
        strokeColor: '',
        strokeWeight: 0
      }
      var instance = 'settings.proud_actions_app.instances.' + $rootScope.appId;

      $scope.zoom = $attrs.zoom ? $attrs.zoom : 12;
      $attrs.showHome = $attrs.showHome != undefined && $attrs.showHome != null ? true : false;

      // Grab the center, first from saved location (if we're showing the home marker, then from attrs, lastly from sitewide lat/lng.
      $scope.center = $attrs.showHome && $rootScope.chosenPlace ? $rootScope.chosenPlace.geometry.location :
        $scope.center ? $scope.center : 
        $rootScope.location;

      


      console.log('chosen plage', $rootScope.chosenPlace);
      console.log('attrs', $attrs);

      $scope.layers = _.get(Proud, instance + '.map_layers');
      console.log('layers', $scope.layers);

      if ($attrs.layer == undefined || $attrs.layer == null) {
        $scope.layer = $scope.layers[0];
      }
      else if ($attrs.layer == 'random') {
        $scope.layer = $scope.layers[Math.floor( Math.random() * $scope.layers.length )];
      }
      else {
        $scope.layer = $attrs.layer;
      }

      $scope.layer = $scope.layers[0];
      var pcMap;
      var pcLayers = {};

      NgMap.getMap().then(function(map) {
        pcMap = map;

        // Add home marker
        if ($attrs.showHome && $rootScope.chosenPlace) {
          var chosenPlace = $rootScope.chosenPlace.geometry.location;          console.log('@@@@',chosenPlace);

          $scope.home = new Marker({
            map: pcMap,
            position: new google.maps.LatLng(chosenPlace.lat, chosenPlace.lng),
            icon: icon,
            map_icon_label: '<span class="fa pc-map-marker fa-fw fa-3x fa-home"></span>'
          });
        }

        // Add active layer markers
        addMarkers();

      }, 1000);

      function addMarkers() {
      
        switch ($scope.layer.type) {
          case 'wordpress':
            Post.query({
              postType: 'locations',
              'filter[location-taxonomy]': $scope.layer.slug
            }).$promise.then(function(data) {
              var icon, marker, latlng;
              var markers = [];
              for (var i in data) {
                marker = data[i];
                icon = $scope.layer.icon;

                if (marker.meta != undefined && marker.meta.lat != undefined) {
                  markers[i] = new Marker({
                    map: pcMap,
                    position: new google.maps.LatLng(marker.meta.lat, marker.meta.lng),
                    icon: icon,
                    map_icon_label: '<span class="fa pc-map-marker fa-fw fa-3x '+ icon +'"></span>'
                  });
                }
                
              } // for

              $scope.markers = markers;

            });
            break;
          case 'bicycle':
            pcLayers.bikeLayer = new google.maps.BicyclingLayer();
            pcLayers.bikeLayer.setMap(pcMap);
            break;
          case 'traffic':
            pcLayers.trafficLayer = new google.maps.TrafficLayer();
            pcLayers.trafficLayer.setMap(pcMap);
            break;
          case 'transit':
            pcLayers.transitLayer = new google.maps.TransitLayer();
            pcLayers.transitLayer.setMap(pcMap);
            break;

        } // switch
      }


      function clearMarkers() {
        if ($scope.markers != undefined) {
          for (var i = 0; i < $scope.markers.length; i++ ) {
            $scope.markers[i].setMap(null);
          }
        }
        for (var i in pcLayers) {
          pcLayers[i].setMap(null);
        }
        pcLayers = {};
      }

      $scope.changeLayer = function(layer) {
        clearMarkers();
        $scope.layer = layer;
        addMarkers();
      }    

     
    }
  }
})