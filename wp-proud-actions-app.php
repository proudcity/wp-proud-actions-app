<?php
/*
Plugin Name:        Proud 311 Actions App
Plugin URI:         http://proudcity.com
Description:        ProudCity distribution
Version:            1.0.0
Author:             ProudCity
Author URI:         http://proudcity.com

License:            Affero GPL v3
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
          'render_in_overlay' => !$GLOBALS['proud_actions_app_rendered'],
          'issue' => array(
            'service' => get_option('311_service', 'seeclickfix'),
            'link_create' => get_option('311_link_create'), 
            'link_status' => get_option('311_link_status'),
          ),
          'payment' => array(
            'service' => get_option('payment_service', 'stripe'),
            'stripe_key' => get_option('payment_stripe_key'), 
          ), 
        ]
      ]
    ]);
    // if not rendered on page yet, render in overlay
    if(!$GLOBALS['proud_actions_app_rendered']) {
      the_widget('ActionsBox');
    }
  }
}
//Init
new ActionsApp;

/**
 *  Attach information about a question's topic 
 */
function attach_actions_meta(&$post) {
  // No alter
  if( $post->post_type != 'question' && $post->post_type != 'payment' ) {
    return;
  }
  if( $post->post_type == 'question' ) {
    // Try to get tax
    // Term cache should already be primed by 'update_post_term_cache'.
    $terms = get_object_term_cache( $post->ID, 'faq-topic' );
    // Guess not
    if( empty( $terms ) ) {
        $terms = wp_get_object_terms( $post->ID, 'faq-topic' );
        wp_cache_add( $post->ID, $terms, 'faq-topic' . '_relationships' );
    }
    // We got some hits
    if( !empty( $terms ) && $term_count = count($terms) ) {
      $post->term = $terms[$term_count - 1]->slug;
    }
    $post->action_attr = 'answers';
    $post->action_hash = '/' . $post->term . '/' . $post->post_name;
    $post->action_url = '#/city/answers' . $post->action_hash;
  }
  elseif ( $post->post_type == 'payment' ) {
    $post->action_attr = 'payments';
    $post->action_hash = '/' . $post->post_name;
    $post->action_url = '#/city/payments'. $post->action_hash;
  }

}

