
(function($, Proud) {
  Proud.behaviors.proud_actions_app = {
    attach: function(context, settings) {
      var instances = _.get(settings, 'proud_actions_app.instances');
      // initialize instances
      if (instances) {

        // Got to have 1 ID... not really meant to have multiple
        // on page, but this works
        var useId;
        $.each(instances, function(id, appVals) {
          useId = id;
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
              case 'status':
                if(_.get(settings, 'proud_actions_app.global.render_in_overlay')) {
                  event.callback(true);
                }
                else {
                  event.callback(false, useId, 0, ['menu', 'search']);
                }
                window.location.hash = '/city/' + event['event'] + (event.hash || '');
                break;
            }
          });

          // Respond to menu done, and remove placeholder
          $(this).on('proud311Loaded', function(event, data) {
            data && data.id && $('#' + data.id + '-shadow').remove();
          });
        });
      }
    }
  };
})(jQuery, Proud);
