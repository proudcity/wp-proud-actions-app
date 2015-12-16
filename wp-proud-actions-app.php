<?php
/*
Plugin Name:        Proud 311 App
Plugin URI:         http://getproudcity.com
Description:        ProudCity distribution
Version:            1.0.0
Author:             ProudCity
Author URI:         http://getproudcity.com

License:            MIT License
License URI:        http://opensource.org/licenses/MIT
*/

namespace Proud\ActionsApp;


// Init rendered var for actions overlay
$GLOBALS['proud_actions_app_rendered'] = false;

if ( ! function_exists( 'proud_actions_init_widget' ) ) {
  // Init on plugins loaded
  function proud_actions_init_widget() {
    require_once plugin_dir_path(__FILE__) . '/lib/proud-actions-widget.class.php';
  }
}

add_action('plugins_loaded', __NAMESPACE__ . '\\proud_actions_init_widget');



// Respond to navbar footer hook
// Print widget if has not been rendered elsewhere
// -----------------------------
if ( ! function_exists( 'proud_actions_print_311 ' ) ) {
  // Init on plugins loaded
  function proud_actions_print_311() {
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
add_action('proud_navbar_overlay_311', __NAMESPACE__ . '\\proud_actions_print_311');
