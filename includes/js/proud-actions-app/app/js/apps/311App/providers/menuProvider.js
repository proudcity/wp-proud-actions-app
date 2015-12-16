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
        active311Items = _.get(Proud, 'settings.proud_311_app.' + appId + '.active_tabs') || {
            'faq': true, 
            'payments': true, 
            'report': true, 
            'status': true
        };

        // Push objects
        _.forEach(active311Items, function(item, key) {
          switch(key) {
            case 'faq':
              if(item) {
                menu.push({title: 'Get Answers', state: 'faq', icon: 'fa-question-circle'});
                if(!default311Url) {
                  default311Url = '/city/answers';
                }
              }
              break;
            case 'payments':
              if(item) {
                menu.push({title: 'Make a Payment', state: 'payments', icon: 'fa-credit-card'});
                if(!default311Url) {
                  default311Url = '/city/payments';
                }
              }
              break;
            case 'report':
              if(item) {
                menu.push({title: 'Report an Issue', state: 'report', icon: 'fa-exclamation-triangle'});
                if(!default311Url) {
                  default311Url = '/city/report';
                }
              }
              break;
            case 'status':
              if(item) {
                menu.push({title: 'Check Status', state: 'status', icon: 'fa-wrench'});
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