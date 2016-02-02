// Provides active menu
// in a provider so that config can be accessed
// in a .config() call

'use strict';

angular.module('311App')

  .provider('Menu311', function Menu311Provider () { 
    // Init Proud   
    var self = this,
        active311Items = null,
        default311Url = null,
        menu = [];

    var initMenu = function(appId) {
      // Only run once
      if(!active311Items) {
        active311Items = _.get(Proud, 'settings.proud_actions_app.instances.' + appId + '.active_tabs') || {
            'faq': true, 
            'payments': true, 
            'report': 0, 
            'status': 0
        };

        // Push objects
        _.forEach(active311Items, function(item, key) {
          switch(key) {
            case 'faq':
              if(item && item !== '0') {
                menu.push({title: 'Get Answers', state: 'faq', icon: 'fa-question-circle'});
                if(!default311Url) {
                  default311Url = '/city/answers';
                }
              }
              break;
            case 'payments':
              if(item && item !== '0') {
                menu.push({title: 'Make a Payment', state: 'payments', icon: 'fa-credit-card'});
                if(!default311Url) {
                  default311Url = '/city/payments';
                }
              }
              break;
            case 'report':
              if(item && item !== '0') {
                var item = {title: 'Report an Issue', icon: 'fa-exclamation-triangle'};
                if ($rootScope.issue.service == 'link') {
                  item.url = $rootScope.issue.link_report;
                }
                else {
                  item.state = 'report';
                }
                menu.push(item);
                if(!default311Url) {
                  default311Url = '/city/report';
                }
              }
              break;
            case 'status':
              if(item && item !== '0') {
                var item = {title: 'Check Status', icon: 'fa-wrench'};
                if ($rootScope.issue.service == 'link') {
                  item.url = $rootScope.issue.link_report;
                }
                else {
                  item.state = 'report';
                }
                menu.push(item);
                if(!default311Url) {
                  default311Url = '/city/status';
                }
              }
              break;
          }
        });
      }
    }


    self.getDefaultUrl = function(appId)  {
      initMenu(appId);
      return default311Url;
    }

    self.getMenu = function(appId) {
      initMenu(appId);
      return menu;
    }
    
    // Just return self
    self.$get = function() {
      return self;
    };

  });