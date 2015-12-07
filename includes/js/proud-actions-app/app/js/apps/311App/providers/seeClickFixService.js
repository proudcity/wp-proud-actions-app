'use strict';

angular.module('seeClickFixService', ['ngResource'])

  .factory('TrackService', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.seeclickfixUrl + 'issues/new?address',
      { 'address': '@address' },
      {
        query: {
          isArray: false
        }
      }
    );
  }])

  .factory('TrackFields', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.seeclickfixUrl + 'request_types/:type',
      { 'type': '@type' }
    );
  }])


  

  .factory('TrackIssue', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.seeclickfixUrl + 'issues/:code', 
      { 'code': '@code' },
      {
        get: {
          isArray: false
        },
        save: {
          headers:{'Authorization': 'Basic jeff@albatrossdigital.com:test123'} 
        }
      }
    );
  }])