'use strict';


angular.module('311App')


.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        // FAQ depth 0
        .state("city.faq", {
          url: "/answers",
          templateUrl: 'views/apps/311App/faq/faq.html',
          data: { 
            title: 'FAQ',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords,
            doScroll: false                 // no scroll on route change

          },
          resolve: {
            terms: function($stateParams, $rootScope, TaxonomyTerm) {
              return TaxonomyTerm.query({
                vocabulary: 'faq-topic',
                sort: 'weight',
                direction: 'ASC'
              }).$promise.then(function(data) {
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, terms){
            $scope.terms = terms;
            $scope.active = null;
            $scope.childOpen = false;

            $scope.open = function(item) {
              $scope.active = item;
            }

            $scope.openChildren = function() {
              $scope.childOpen = true;
            }

            // var slug = $state.params.slug,
            //     nid = $state.params.nid ? $state.params.nid : 'list';

            // if(slug) {
            //   $state.go('city.faq.child.answers', {slug: slug, nid: nid});
            // }
          }

        })

        // FAQ depth 1
        .state("city.faq.child", {
          url: "/:slug",
          templateUrl: 'views/apps/311App/faq/faq-child.html',
          data: { 
            title: 'FAQ',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords
          },
          controller: function($scope, $rootScope, $state, $filter, terms, Post){
            $scope.activeTerm = $filter('termBySlug')(terms, $state.params.slug);
            $scope.activeParent = $filter('termById')(terms, $scope.activeTerm.parent);
            $state.go('city.faq.child.answers', {nid: 'list'});
          }
        })

        // FAQ depth 2
        .state("city.faq.child.answers", {
          url: "/:postSlug",
          templateUrl: 'views/apps/311App/faq/faq-child-answers.html',
          data: { 
            title: 'FAQ',                 // Sets meta title
            description: 'About the about', // Sets different meta description
            keywords: 'About, this, page',  // Sets different meta keywords
          },
          controller: function($scope, $rootScope, $state, $filter, Post){
            $scope.activeSlug = $state.params.postSlug != 'list' ? $state.params.postSlug : null;
            // @todo: put this in resolve
            Post.query({
              postType: 'questions',
              'filter[faq-topic]': $state.params.slug,
              sort: 'title',
              direction: 'ASC'
            }).$promise.then(function(data) {
              $scope.nodes = data;
            });
          }
        })
    }
  ]
)