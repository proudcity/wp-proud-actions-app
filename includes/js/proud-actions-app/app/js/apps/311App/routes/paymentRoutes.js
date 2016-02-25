'use strict';


angular.module('311App')


.config(
  [ '$stateProvider', '$urlRouterProvider', 'StripeCheckoutProvider',
    function ($stateProvider, $urlRouterProvider, StripeCheckoutProvider) {
      
      $stateProvider

        .state("city.payments", {
          templateUrl: 'views/apps/311App/payment/payment.html',
          data: { 
            doScroll: false,  // No scroll on route change
            undoMainToggle: true,   // Force "offcanvas" class off
            title: 'Payments'
          },
          url: "/payments",
          resolve: {
            posts: function($stateParams, Post) {
              return Post.query({postType: 'payments'}).$promise.then(function(data) {
                return data;
              });
            }
          },
          controller: function($scope, $rootScope, $state, posts){
            $scope.posts = posts;
          }
        })

        .state("city.payments.type", {
          templateUrl: 'views/apps/311App/payment/payment-type.html',
          url: "/:slug",
          resolve: {
            post: function($stateParams, $filter, posts) {
              return $filter('filter')(posts, { slug: $stateParams.slug })[0];
            },
            stripe: StripeCheckoutProvider.load
          },
          controller: function($scope, $rootScope, $state, post, Payment, StripeCheckout){
            console.log(post);
            $scope.post = post;
            $scope.demoInfo = false;
            $scope.payment = {
              number: '',
              amount: ''
            }
            $scope.numberClass = '';

            $scope.demoInfoToggle = function (e) {
              $scope.demoInfo = !$scope.demoInfo;
              console.log($scope.demoInfo);
              e.preventDefault();
            }

            // Talk to invoice API
            $scope.$watch('payment.number', function(){
              if ($scope.payment.number != '' && $scope.payment.number.length > 3) {
                $scope.numberClass = 'has-warning';
                Payment.get({
                  city: $scope.location != undefined ? $scope.location.city : null,
                  state: $scope.location != undefined ? $scope.location.state : null,
                  number: $scope.payment.number
                }, function(data) {
                  if (data.amount != undefined) {
                    $scope.payment.amount = data.amount;
                    $scope.payment.name = data.name;
                    $scope.numberClass = 'has-success';
                  }
                  else {
                    $scope.payment.amount = '';
                    $scope.numberClass = 'has-error';
                  }
                });
              }
              else {
                $scope.numberClass = '';
              }
            });

            // Initialize Stripe
            var handler = StripeCheckout.configure({
              name: post.title.rendered,
              token: function(token, args) {
                //$log.debug("Got stripe token: " + token.id);
              }
            });

            // Submit
            $scope.submit = function(payment) {
              if ($scope.post.field_payment_link != undefined) {
                window.location = $scope.post.field_payment_link.replace('[invoice]', payment.number).replace('[amount]', payment.amount);
              }
              else {
                // Stripe checkout 
                var options = {
                  description: 'Invice ' + payment.number,
                  amount: $scope.amount * 100
                };

                // The rejection callback doesn't work in IE6-7.
                handler.open(options)
                  .then(function(result) {
                    //alert("Got Stripe token: " + result[0].id);
                  },function() {
                    //alert("Stripe Checkout closed without making a sale :(");
                  });

                // @todo?: This linked to Drupal
                // window.location = $scope.post.url + '?edit[line_item_fields][field_payment_invoice_id][und][0][value]=' + $scope.payment.number + '&edit[line_item_fields][helm_payment_amount][und][0][value]=' + $scope.amount;
              }
            }

          }
        })



        .state("city.payments.success", {
          templateUrl: 'views/apps/311App/payment/payment-success.html',
          url: "/:nid/:token",
          resolve: {
            post: function($stateParams, $filter, posts) {
              return $filter('filter')(posts, { nid: $stateParams.nid })[0];
            },
          },
          controller: function($scope, $rootScope, $state, post, Payment){
            

          }
        })
        


    }
  ]
)


