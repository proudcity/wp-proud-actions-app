<?php
/*
Plugin Name:        Proud 311 Actions App
Plugin URI:         http://proudcity.com
Description:        ProudCity distribution
Version:            1.0.0
Author:             ProudCity
Author URI:         http://proudcity.com

License:            MIT License
License URI:        http://opensource.org/licenses/MIT
*/

namespace Proud\ActionsApp;


// Init rendered var for actions overlay
$GLOBALS['proud_actions_app_rendered'] = false;

// Load Extendible
// -----------------------
if ( ! class_exists( 'ProudPlugin' ) ) {
  require_once( plugin_dir_path(__FILE__) . '../wp-proud-core/proud-plugin.class.php' );
}

class ActionsApp extends \ProudPlugin {

  /**
   * Constructor
   */
  public function __construct() {

    parent::__construct( array(
      'textdomain'     => 'wp-proud-actions-app',
      'plugin_path'    => __FILE__,
    ) );

    $this->hook( 'plugins_loaded', 'proud_actions_init_widgets' );
    $this->hook( 'proud_navbar_overlay_311', 'proud_actions_print_311');
  }

  // Init on plugins loaded
  public function proud_actions_init_widgets() {
    require_once plugin_dir_path(__FILE__) . '/lib/proud-actions-widget.class.php';
    require_once plugin_dir_path(__FILE__) . '/lib/proud-action-menu-widget.class.php';
  }
  
  // Respond to navbar footer hook
  // Print widget if has not been rendered elsewhere
  public function proud_actions_print_311() {
    global $proudcore;
    // Add rendered variable to JS
    $proudcore->addJsSettings([
      'proud_actions_app' => [
        'global' => [
          'render_in_overlay' => !$GLOBALS['proud_actions_app_rendered']
        ]
      ]
    ]);
    // if not rendered on page yet, render in overlay
    if(!$GLOBALS['proud_actions_app_rendered']) {
      the_widget('ActionsBox');
    }
  }
}


new ActionsApp;
