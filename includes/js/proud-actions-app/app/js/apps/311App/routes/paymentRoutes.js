'use strict';


angular.module('311App')


.config(
  [ '$stateProvider', '$urlRouterProvider', 'StripeCheckoutProvider',
    function ($stateProvider, $urlRouterProvider, StripeCheckoutProvider) {
      
      $stateProvider

        .state("city.payments", {
          templateUrl: 'views/apps/311App/payment/payment.html',
          data: { 
            doScroll: false  // No scroll on route change
          },
          url: "/payments",
          resolve: {
            nodes: function($stateParams, Node) {
              return Node.query({type: 'payment'}).$promise.then(function(data) {
                return data.list;
              });
            }
          },
          controller: function($scope, $rootScope, $state, nodes){
            $scope.nodes = nodes;
          }
        })

        .state("city.payments.type", {
          templateUrl: 'views/apps/311App/payment/payment-type.html',
          url: "/:nid",
          resolve: {
            node: function($stateParams, $filter, nodes) {
              return $filter('filter')(nodes, { nid: $stateParams.nid })[0];
            },
            stripe: StripeCheckoutProvider.load
          },
          controller: function($scope, $rootScope, $state, node, Payment, StripeCheckout){
            $scope.node = node;
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
              name: node.title,
              token: function(token, args) {
                //$log.debug("Got stripe token: " + token.id);
              }
            });

            // Submit
            $scope.submit = function(payment) {
              if ($scope.node.field_payment_link != undefined) {
                window.location = $scope.node.field_payment_link.replace('[invoice]', payment.number).replace('[amount]', payment.amount);
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
                // window.location = $scope.node.url + '?edit[line_item_fields][field_payment_invoice_id][und][0][value]=' + $scope.payment.number + '&edit[line_item_fields][helm_payment_amount][und][0][value]=' + $scope.amount;
              }
            }

          }
        })



        .state("city.payments.success", {
          templateUrl: 'views/apps/311App/payment/payment-success.html',
          url: "/:nid/:token",
          resolve: {
            node: function($stateParams, $filter, nodes) {
              return $filter('filter')(nodes, { nid: $stateParams.nid })[0];
            },
          },
          controller: function($scope, $rootScope, $state, node, Payment){
            

          }
        })
        


    }
  ]
)


