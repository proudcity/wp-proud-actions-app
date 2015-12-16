
(function($, Proud) {
  Proud.behaviors.proud_actions_app = {
    attach: function(context, settings) {
      var instances = _.get(settings, 'proud_actions_app.instances');
      // initialize instances
      if (instances) {
        $.each(instances, function(id, appVals) {
          var $app = $('#' + id);
          if(!$app.hasClass('ng-scope')) {
            angular.bootstrap($app, ['311AppParent']);
          }
        });
        // Respond to navbar click
        $('body').once('proud_actions_app', function() {
          $(this).on('proudNavClick', function(event) {
            switch(event['event']) {
              case 'answers':
              case 'payments':
              case 'report':
                if(_.get(settings, 'proud_actions_app.global.render_in_overlay')) {
                  event.callback(true);
                }
                else {
                  event.callback(false, id, 0, ['menu', 'search']);
                }
                window.location.hash = '/city/' + event['event'] + (event.hash || '') 
                break;
            }
          });
        });
      }
    }
  };
})(jQuery, Proud);
