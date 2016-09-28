'use strict';

angular.module('googleCivicInfoService', ['ngResource'])

  .factory('GoogleCivicInfo', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource('https://www.googleapis.com/civicinfo/v2/voterinfo', 
      { 
        'key': $rootScope.googleKey,
        'electionId': $rootScope.googleElectionId
      },
      {
        query: {
          isArray: false
        }
      }
    );
  }]);