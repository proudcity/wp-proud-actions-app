<?php
/**
 * @author ProudCity
 */

use Proud\Core;

class ActionsBox extends Core\ProudWidget {

  function __construct() {
    parent::__construct(
      'proud_actions_app', // Base ID
      __( 'Service Center', 'wp-proud-actions-app' ), // Name
      array( 'description' => __( 'Get Answers, Make Payments, Report Issues, Voting Information and more', 'wp-proud-actions-app' ), ) // Args
    );
  }

  function initialize() {
    $this->settings = Proud\ActionsApp\ActionsApp::get_settings();
  }

  public function registerLibraries() {
    global $proudcore;
    $proudcore::$libraries->addMaps();
    $proudcore::$libraries->addAngular(true, true, true);
    // If proud issue exits, add ifame resizer
    if ( class_exists( '\Proud\Issue\ProudIssue' ) ) {
      $proudcore::$libraries->addBundleToLoad( 'iframe-resizer' );
    }
  }

  public function enqueueFrontend() {
    $local_path = plugins_url('../includes/js', __FILE__);
    $path = Proud\ActionsApp\ActionsApp::get_app_path();

    wp_enqueue_script('google-maps-api', '//maps.googleapis.com/maps/api/js?key=' . get_option( 'google_api_key', '' ) . '&libraries=places');
    // Running script
    wp_enqueue_script('proud-actions-app', $local_path . '/proud-actions-app.js', array('lodash','angular'), false, true);
    // Angular resources
    wp_enqueue_script('proud-actions-app-libraries', $path . 'js/libraries.min.js', array('angular'), false, true);
    $deps = array('proud-actions-app-libraries');
    // If proud issue exits, add ifame resizer
    if ( class_exists( '\Proud\Issue\ProudIssue' ) ) {
      $deps[] = 'iframe-resizer';
    }
    wp_enqueue_script('proud-actions-app-app', $path . 'js/app.min.js', $deps, false, true);
    wp_enqueue_script('proud-actions-app-templates', $path . 'views/app.templates.js', array('proud-actions-app-app'), false, true);
    
    // @todo: make this work (file isn't getting included with this call, so I just added it to app.min.js)
    //if ($this->settings['active_tabs']['#options']['vote']) {
    //  wp_enqueue_script('proud-actions-app-vote', $path . 'js/vote.min.js', array('proud-actions-app-app'), false, true);
    //}

  }

  /**
   * Front-end display of widget.
   *
   * @see WP_Widget::widget()
   *
   * @param array $args     Widget arguments.
   * @param array $instance Saved values from database.
   */
  public function printWidget( $args, $instance ) {
    // We are rendering
    $GLOBALS['proud_actions_app_rendered'] = true;

    // Compile html into a url encoded string
    $lazy_html = rawurlencode(
      '<div class="parent" ui-view></div>'
    );

    ?>
    <div id="<?php print $this->id; ?>" class="col-sm-12">
      <div ng-init="$root.appId = '<?php print $this->id; ?>'" class="container spacing" in-view="faqCompile = faqCompile || '<?php print $lazy_html; ?>'" lazy-compile="faqCompile" lazy-decode="true"></div>
    </div>
    <?php
  }
}

// register Foo_Widget widget
// -----------------------------
function register_actions_feed_widget() {
  register_widget( 'ActionsBox' );
}
add_action( 'widgets_init', 'register_actions_feed_widget' );