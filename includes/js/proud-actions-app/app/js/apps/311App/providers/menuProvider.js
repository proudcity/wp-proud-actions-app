// Provides active menu
// in a provider so that config can be accessed
// in a .config() call

'use strict';

angular.module('311App')

  .provider('Menu311', function Menu311Provider () { 
    // Init drupal   
    var drupal = typeof Drupal !== 'undefined' ? Drupal : {},
        self = this,
        active311Items = _.get(drupal, 'settings.proud_311_app.active_tabs') || {
          'faq': true, 
          'payments': true, 
          'report': true, 
          'status': true
        };
    
    self.menu = [];
    // Push objects
    _.forEach(active311Items, function(item, key) {
      switch(key) {
        case 'faq':
          if(item) {
            self.menu.push({title: 'Get Answers', state: 'faq', icon: 'fa-question-circle'});
            if(!self.default311Url) {
              self.default311Url = '/city/answers';
            }
          }
          break;
        case 'payments':
          if(item) {
            self.menu.push({title: 'Make a Payment', state: 'payments', icon: 'fa-credit-card'});
            if(!self.default311Url) {
              self.default311Url = '/city/payments';
            }
          }
          break;
        case 'report':
          if(item) {
            self.menu.push({title: 'Report an Issue', state: 'report', icon: 'fa-exclamation-triangle'});
            if(!self.default311Url) {
              self.default311Url = '/city/report';
            }
          }
          break;
        case 'status':
          if(item) {
            self.menu.push({title: 'Check Status', state: 'status', icon: 'fa-wrench'});
            if(!self.default311Url) {
              self.default311Url = '/city/status';
            }
          }
          break;
      }
    });
    
    // Just return self
    self.$get = function() {
      return self;
    };

  });