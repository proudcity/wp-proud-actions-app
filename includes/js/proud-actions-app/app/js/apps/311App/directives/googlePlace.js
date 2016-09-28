angular.module('311App')

.directive('googleplace', function($rootScope) {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '@',
            place: "@"
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {country: 'us'}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                $rootScope.chosenPlace = scope.gPlace.getPlace();
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});

