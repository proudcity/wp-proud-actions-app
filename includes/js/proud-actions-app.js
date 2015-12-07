
(function($, Proud) {
  Proud.behaviors.proud_actions_app = {
    attach: function(context, settings) {
      settings.proud_actions_app = settings.proud_actions_app || {app_id: 'proud-actions-app'};
      if (settings.proud_actions_app != undefined) {
        var app = $('#' + settings.proud_actions_app.app_id);
        if(!app.hasClass('ng-scope')) {
          angular.bootstrap(app, ['311AppParent']);
        }

        $('body').on('proudNavClick', function(event) {
          switch(event['event']) {
            case 'answers':
            case 'payments':
            case 'report':
              if(settings.proud_actions_app.render_in_overlay) {
                event.callback(true);
              }
              else {
                event.callback(false, settings.proud_actions_app.app_id, 0, ['menu', 'search']);
              }
              window.location.hash = '/city/' + event['event'] + (event.hash || '') 
              break;
          }
        });
      }
    }
  };
})(jQuery, Proud);
