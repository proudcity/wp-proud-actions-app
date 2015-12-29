'use strict';

angular.module('wordpressService', ['ngResource'])

  .factory('Post', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + ':postType/:id', 
      {
        'id': '@nid',
        'postType': '@postType'
      },
      {
        get: {
          method:'GET',
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/json';
          },
          cache: false
        },
        query: {
          method:'GET',
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/json';
          },
          cache: false,
          isArray: true
        }
      }
    );
  }])

  .factory('TaxonomyTerm', ['$resource', '$rootScope', function ($resource, $rootScope) {
    var params = {
      vocabulary: '@vocabulary'
    };
    if($rootScope.categorySection) {
      params['field_faq_section'] = $rootScope.categorySection;
    }
    return $resource($rootScope.apiUrl + 'terms/:vocabulary/:tid', 
      params,
      {
        get: {
          method:'GET',
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/json';
          },
          cache: true,
          isArray: false
        },
        query: {
          method:'GET',
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/json';
          },
          cache: true,
          isArray: true
        }
      }
    )
  }])

/*
  .factory('TaxonomyTermIndex', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + 'terms/:vocabulary', 
      {
        vocabulary: '@vocabulary',
      },
      {
        query: {
          method:'GET',
          transformRequest: function(data, headersGetter) {
            headersGetter()['Accept'] = 'application/json';
          },
          cache: true,
          isArray: false
        }
      }
    )
  }])
*/
  .factory('TaxonomyTermPosts', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/taxonomy_term_nodes', {tid: '@tid'}, {});
  }])

  .factory('User', ['$resource', '$rootScope', function ($resource, $rootScope) {
    return $resource($rootScope.apiUrl + '/user/:uid', {uid: '@uid'}, {});
  }])

  .factory('Comment', ['$resource', '$rootScope', function ($resource, $rootScope) {
      return $resource($rootScope.apiUrl + '/node/:nid/comments', {nid: '@nid'}, {
          'post': {
              method: 'POST',
              url: '/entity/comment'
          }
      });
  }])



  // Helper functions for views
  .factory('viewsFactory', ['View', function(View) {
    var service = {};

    // For infinite scroll pager
    service.pageLoad = function($scope, params) {
      if (!$scope.loadingPage && $scope.items != undefined && $scope.items.length > 0) {
        $scope.currentPage++;
        var newData = View.query(params, function() {
          if (newData.length > 0) {
            Array.prototype.push.apply($scope.items, newData);
            $scope.loadingPage = false;
          }
        });
      }
      $scope.loadingPage = true;
    }

    return service;
  }])
  

  .directive('openReveal', function factory() {
    return {
      restrict: 'A',
      scope: {
        'openReveal': '@'
      },
      link: function($scope, $element, $attrs) {
        // listen for a click
        $element.on('click', function() {
          jQuery('#' + $scope.openReveal).foundation('reveal', 'open');
        });
      }
    }
  });


