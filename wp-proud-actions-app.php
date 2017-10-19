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
use Proud\Core;


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

    $this->hook( 'init', 'register_actions_classes', 1 );
    $this->hook( 'init', 'create_service_center_tab' );
    $this->hook( 'rest_api_init', 'service_center_tab_rest_support' );

    $this->hook( 'plugins_loaded', 'proud_actions_init_widgets' );
    $this->hook( 'proud_navbar_overlay_311', 'proud_actions_print_311');
    $this->hook( 'init', 'register_rewrite_rules');
    $this->hook( 'query_vars', 'query_vars');
    $this->hook( 'template_redirect', 'template_redirect');
    // Remove tabs from search results
    add_filter( 'proud_search_exclude', array( $this, 'searchfilter' ) );


    add_filter( 'redirect_canonical', array( $this, 'vir_override_canonical' ), 10, 2 );


  }

  /**
   * Adds tabs to search blacklist
   */
  public function searchfilter($posts) {
    array_push( $posts, 'service_center_tab' );
    return $posts;
  }

  /**
   * Register admin classes
   * Necessary since plugin load order has this above proud admin
   */
  public function register_actions_classes() {
    if( is_admin() ) {
      // Actions meta
      require_once( plugin_dir_path(__FILE__) . 'lib/actions-meta.class.php' );
      // Settings pages
      require_once( plugin_dir_path(__FILE__) . 'settings/service-center.php' );
      require_once( plugin_dir_path(__FILE__) . 'settings/settings.php' );
      require_once( plugin_dir_path(__FILE__) . 'settings/standalone.php' );
      require_once( plugin_dir_path(__FILE__) . 'settings/embed.php' );
      require_once( plugin_dir_path(__FILE__) . 'settings/facebook.php' );
      require_once( plugin_dir_path(__FILE__) . 'settings/kiosk.php' );
      require_once( plugin_dir_path(__FILE__) . 'settings/app.php' );
    }
  }

  public function create_service_center_tab() {
      $labels = array(
          'name'               => _x( 'Custom Tabs', 'post name', 'wp-proud-actions-app' ),
          'singular_name'      => _x( 'Custom Tab', 'post type singular name', 'wp-proud-actions-app' ),
          'menu_name'          => _x( 'Custom Tabs', 'admin menu', 'wp-proud-actions-app' ),
          'name_admin_bar'     => _x( 'Custom Tab', 'add new on admin bar', 'wp-proud-actions-app' ),
          'add_new'            => _x( 'Add New', 'service_center_tab', 'wp-proud-actions-app' ),
          'add_new_item'       => __( 'Add New Custom Tab', 'wp-proud-actions-app' ),
          'new_item'           => __( 'New Custom Tab', 'wp-proud-actions-app' ),
          'edit_item'          => __( 'Edit Custom Tab', 'wp-proud-actions-app' ),
          'view_item'          => __( 'View Custom Tab', 'wp-proud-actions-app' ),
          'all_items'          => __( 'Custom Tabs', 'wp-proud-actions-app' ),
          'search_items'       => __( 'Search service_center_tab', 'wp-proud-actions-app' ),
          'parent_item_colon'  => __( 'Parent service_center_tab:', 'wp-proud-actions-app' ),
          'not_found'          => __( 'No service_center_tabs found.', 'wp-proud-actions-app' ),
          'not_found_in_trash' => __( 'No service_center_tabs found in Trash.', 'wp-proud-actions-app' )
      );

      $args = array(
          'labels'             => $labels,
          'description'        => __( 'Description.', 'wp-proud-actions-app' ),
          'public'             => true,
          'publicly_queryable' => true,
          'show_ui'            => true,
          'show_in_menu'       => 'service-center',
          'query_var'          => true,
          'rewrite'            => array( 'slug' => 'tab' ),
          'capability_type'    => 'post',
          'has_archive'        => false,
          'hierarchical'       => false,
          'menu_position'      => null,
          'show_in_rest'       => true,
          'rest_base'          => 'tabs',
          'rest_controller_class' => 'WP_REST_Posts_Controller',
          'supports'           => array( 'title', 'editor', 'thumbnail',)
      );

      register_post_type( 'service_center_tab', $args );
  }



  public function service_center_tab_rest_support() {
    register_rest_field( 'service_center_tab',
          'meta',
          array(
              'get_callback'    => array( $this, 'service_center_tab_rest_metadata' ),
              'update_callback' => null,
              'schema'          => null,
          )
      );
  }

  /**
   * Alter the REST endpoint.
   * Add metadata to t$forms = RGFormsModel::get_forms( 1, 'title' );he post response
   */
  public function service_center_tab_rest_metadata( $object, $field_name, $request ) {
    require_once( plugin_dir_path(__FILE__) . 'lib/actions-meta.class.php' );
    $Meta = new \Proud\ActionsApp\ActionsMeta;
    return $Meta->get_options( $object['id'] );
  }

  // Init on plugins loaded
  public function proud_actions_init_widgets() {
    require_once plugin_dir_path(__FILE__) . '/lib/proud-actions-widget.class.php';
    require_once plugin_dir_path(__FILE__) . '/lib/proud-action-menu-widget.class.php';
  }

  /**
   * Add custom rewrite rules for the templates pages.
   */
  public function register_rewrite_rules() {
    add_rewrite_rule('^standalone\/?', 'index.php?wp_proud_format=standalone', 'top');
    add_rewrite_rule('^embed\/?', 'index.php?wp_proud_format=embed', 'top');
    add_rewrite_rule('^fbtab\/?', 'index.php?wp_proud_format=fbtab', 'top');
    add_rewrite_rule('^mobile-app\/?', 'index.php?wp_proud_format=app', 'top');
    add_rewrite_rule('^kiosk\/?', 'index.php?wp_proud_format=kiosk', 'top');
    add_rewrite_rule('^preview\/?', 'index.php?wp_proud_format=preview', 'top');
    add_rewrite_rule('^service-center\/?', 'index.php?wp_proud_format=preview', 'top');
    add_rewrite_rule('^form-embed\/?', 'index.php?wp_proud_format=gravityforms_iframe', 'top');

    // Try to overwrite everything
    if (get_option('service_center_distro', false)) {
      add_rewrite_rule('^.', 'index.php?wp_proud_format=standalone', 'top');
      add_rewrite_rule('^', 'index.php?wp_proud_format=standalone', 'top'); // @todo: homepage
    }
  }

  public function vir_override_canonical( $redirect_url, $requested_url ) {
    return false;
  }

  /**
   * Whitelist custom query vars.
   *
   * @param array $vars Allowed query vars.
   * @return array
   */
  public function query_vars( $vars ) {
    $vars[] = 'wp_proud_format';
    return $vars;
  }

  /**
   * Handle requests for form iframes.
   */
  public function template_redirect() {
    global $wp;

    if ( empty( $wp->query_vars['wp_proud_format'] ) ) {
      return;
    }

    switch( $wp->query_vars['wp_proud_format'] ) {
      case 'standalone':
        extract( $this->proud_actions_standalone_311('service_center_standalone', true) );
        require_once( plugin_dir_path(__FILE__) . 'templates/standalone.php' );
        break;
      case 'fbtab':
        extract( $this->proud_actions_standalone_311('service_center_facebook', true) );
        require_once( plugin_dir_path(__FILE__) . 'templates/facebook.php' );
        break;
      case 'kiosk':
        extract( $this->proud_actions_standalone_311('service_center_kiosk', true) );
        require_once( plugin_dir_path(__FILE__) . 'templates/kiosk.php' );
        break;
      case 'embed':
        extract( $this->proud_actions_standalone_311('service_center_embed', true) );
        require_once( plugin_dir_path(__FILE__) . 'templates/facebook.php' );
        break;
      case 'app':
        extract( $this->proud_actions_standalone_311('service_center_app', false) );
        require_once( plugin_dir_path(__FILE__) . 'templates/app.php' );
        break;
      case 'preview':
        $url = '/';
        require_once( plugin_dir_path(__FILE__) . 'templates/preview.php' );
        break;
      case 'gravityforms_iframe':
        require_once( plugin_dir_path(__FILE__) . 'templates/gravityforms-iframe.php' );
        break;
    }

    exit;
  }

  /**
   * Builds out settings for actions_box
   */
  private function proud_actions_standalone_settings( $key, $search ) {
    // Build base settings
    global $proudcore;
    $settings = $this->get_values($key);

    // Add search settings
    $settings['search'] = $search;
    $proudcore->addJsSettings([
      'global' => [
        'rewrite_relative_link' => TRUE,
      ],
      'proud_actions_app' => [
        'instances' => [
          'app' => $settings,
        ]
      ]
    ]);
    return $settings;
  }

  /**
   * Builds up standalone app, exports settings
   */
  private function proud_actions_standalone_311( $key, $search ) {
    global $proudcore;
    $settings = $this->proud_actions_standalone_settings( $key, $search );
    // Attach advanced settings
    $this->proud_actions_print_311(false);
    do_action('wp_enqueue_scripts');

    // Get image background
    $background_meta = !empty( $settings['background'] )
                ? \Proud\Core\build_responsive_image_meta( $settings['background'] )
                : '';

    // Get custom logo
    $logo_meta = !empty( $settings['logo'] )
                ? \Proud\Core\build_responsive_image_meta( $settings['logo'] )
                : '';

    return array(
      'background_meta' => $background_meta,
      'logo_meta' => $logo_meta,
      'path' => self::get_app_path(),
      'google_analytics' => get_option('google_analytics_key'),
      'title' =>  'ProudCity Service Center', //@todo
      'settings' => $proudcore->getJsSettings(),
      'styles' => function_exists('proud_customize_css') ? proud_customize_css() : '',
    );
  }

  // Respond to navbar footer hook
  // Print widget if has not been rendered elsewhere
  public function proud_actions_print_311( $render = true ) {
    global $proudcore;

    // Only build globals on first run
    static $has_run = null;
    if( $has_run === null ) {

      //Search settings
      $search_site = get_option('search_google_site');
      $search_additional = get_option( 'search_additional', array() );

      // My services settings
      $services = get_option('services_local', array());
      foreach ($services as $i => $item) {

        if (isset($item['type']) && $item['type'] == 'hours') {
          $services[$i]['hours'] = nl2br(esc_html($item['hours']));
        }
        else {
          // Get file path
          if ($item['file_location'] == 'upload') {
            $services[$i]['file'] = wp_get_attachment_url($item['file']);
          }
          else {
            $services[$i]['file'] = $item['file_url'];
          }
          unset($services[$i]['file_location']);
          unset($services[$i]['file_url']);

          // Split items string into array
          $p = array();
          preg_match_all("/(.+)\|(.+)/", $item['items'], $p);
          $services[$i]['items'] = array_combine($p[1], $p[2]);
        }
      }

      // See if hours services are open or closed
      foreach ($services as $i => $service) {
        if (isset($service['type']) && $service['type'] == 'hours') {

          if (isset($service['disable_currently']) && $service['disable_currently']) {
            $services[$i]['status'] = null;
          }
          else {
            $alert = '';
            // Set the possible values depending on if this is parking or not
            $values = strpos( strtolower($service['title']), 'parking') ?
              array('Off', 'Active', 'Start soon', 'Stop soon') :
              array('Closed', 'Open', 'Opening soon', 'Closing soon');
            $services[$i]['status'] = Core\isTimeOpen($service['hours'], $alert, get_option('service_center_holidays', ''), true, $values);
            if (!empty($alert)) {
              $services[$i]['alert'] = $alert;
            }
          }

        }
      }

      $service_map_layers = get_option('services_map');
      // Services map layers
      $map_layers = ActionsApp::map_layers(
        is_array($service_map_layers) ? array_keys( $service_map_layers ) : []
      );

      // Add rendered variable to JS
      $proudcore->addJsSettings([
        'proud_actions_app' => [
          'global' => [
            'api_path' => get_option( 'proudcity_api', get_site_url() . '/wp-json/wp/v2/' ),
            'render_in_overlay' => !$GLOBALS['proud_actions_app_rendered'],
            'issue' => array(
              'service' => get_option('311_service', 'seeclickfix'),
              'link_create' => get_option('311_link_create'),
              'link_status' => get_option('311_link_status'),
            ),
            'gravityforms_iframe' => get_site_url() . '/form-embed/?id=',
            //'payment' => array(
            //  'service' => get_option('payment_service', 'stripe'),
            //  'stripe_key' => get_option('payment_stripe_key'),
            //),
            'google_election_id' => get_option( 'google_election_id', '5000' ),// @todo: change to 5000 for 2016 election
            'holidays' => nl2br( esc_html( get_option('service_center_holidays', Core\federalHolidays()) ) ),
            'services' => $services,
            'map_layers' => $map_layers,
            'search_prefix' => get_option('search_provider') == 'google' ? 'https://www.google.com/search?q=' : get_site_url() . '/search-site/?term=',
            'search_suffix' => !empty($search_site) ? ' site: '.$search_site : '',
            'search_additional' => $search_additional,
            'search_granicus_site' => !empty($search_additional['granicus']) ? get_option( 'search_granicus_site', array() ) : null,
            'search_granicus_link_local' => !empty($search_additional['granicus']) ? get_option( 'search_granicus_link_local', '' ) : null,
            'payments_label' => get_option( 'payments_label', 'Payment' ),
          ]
        ]
      ]);
      $has_run = true;
    }

    // No instance is created yet, so attach standalone settings, re-call this, exit
    if(empty( $proudcore::$jsSettings['proud_actions_app']['instances'] ) ) {
      $this->proud_actions_standalone_settings( 'service_center_standalone', false );
      $this->proud_actions_print_311( true );
      return;
    }

    // Re-write the `active_tabs` array to include icon, title information (rather than doing this in the app)
    $updates = array();
    $tabs = [
      'local' => ['title' => 'My Services', 'state' => 'local', 'icon' => 'fa-map-marker'],
      'faq' => ['title' => 'Get Answers', 'state' => 'faq', 'icon' => 'fa-question-circle'],
      'payments' => ['title' => 'Make a Payment', 'state' => 'payments', 'icon' => 'fa-credit-card'],
      'report' => ['title' => 'Report an Issue', 'state' => 'report', 'icon' => 'fa-exclamation-triangle'],
      //'status' => ['title' => 'Check Status', 'state' => 'status', 'icon' => 'fa-wrench'],
      'map' => ['title' => 'Maps', 'state' => 'map', 'icon' => 'fa-map'],
      'vote' => ['title' => 'Vote', 'state' => 'vote', 'icon' => 'fa-check-square-o'],
      'directory' => ['title' => 'Directory', 'state' => 'directory', 'icon' => 'fa-sitemap'],
    ];
    foreach($proudcore::$jsSettings['proud_actions_app']['instances'] as $key => $instance) {
      $updates[$key] = $instance;
      $updates[$key]['active_tabs'] = [];
      // @TODO defaults?
//       if(empty($instance['active_tabs'])) {
//         $instance['active_tabs'] = ['faq' => 'faq', 'payments' => 'payments', 'report' => 'report', 'status' => 'status'];
//       }
      foreach($instance['active_tabs'] as $tab_key => $tab) {
        if ( !empty($tabs[$tab]) ) {
         $item = $tabs[$tab];
        }
        elseif (strpos($tab, 'custom') !== false) {
          $post_id = (int)str_replace('custom:', '', $tab);
          $item =[
            'title' => get_the_title($post_id),
            'state' => 'custom',
            'params' => [ 'slug' => basename( get_permalink($post_id) ) ],
            'icon' => get_post_meta($post_id, 'icon', true),
          ];
        }
        if ($item) {
          $updates[$key]['active_tabs'][$tab_key] = $item;
        }
      }
    }
    $proudcore->addJsSettings(['proud_actions_app' => ['instances' => $updates]]);

    // if not rendered on page yet, render in overlay
    if(!$GLOBALS['proud_actions_app_rendered'] && $render) {
      // Set expanded to false
      $updates['app']['expand_section'] = false;
      // Print widget
      the_widget( 'ActionsBox', $updates['app'] );
    }
  }

  /**
   *  Get the form settings (used for the widget and on the app page configs).
   */
  public static function get_settings( $defaults = array(), $other_fields = array() ) {
    // Get answers topics
    $topics = get_categories( [
      'taxonomy' => 'faq-topic',
      'orderby' => 'name',
      'parent' => 0
    ] );
    $options = [];
    if( !empty( $topics ) && empty( $topics['errors'] ) ) {
      foreach ( $topics as $topic ) {
        $options[$topic->slug] = $topic->name;
      }
    }

    $fields = [
      'active_tabs' => [
        '#title' => 'Active tabs',
        '#type' => 'checkboxes',
        '#draggable' => true,
        '#options' => [
          'vote' => 'Vote',
          'local' => 'My Services',
          'faq' => 'Answers',
          'payments' => 'Payments',
          'report' => 'Report an Issue',
          //'status' => 'Check status',
          'map' => 'Maps',
          //'' => 'Maps',
          //'custom' => 'Custom Tab'
          'directory' => 'Directory',
        ],
        '#default_value' => ['faq' => 'faq', 'payments' => 'payments', 'report' => 'report', 'status' => 'status'],
        //'#description' => 'Click all tabs you would like to appear',
        '#to_js_settings' => true
      ],
      'category_section' => [
        '#type' => 'checkboxes',
        '#title' => 'Answers section',
        '#description' => 'Choose the Answers "Topics" you would like to be displayed.',
        '#default_value' => array_keys( $options ),
        '#options' => $options,
        '#to_js_settings' => true,
        '#states' => [
          'visible' => [
            'active_tabs' => [
              'operator' => '==',
              'value' => ['faq'],
              'glue' => '||'
            ],
          ],
        ],
      ],
      'expand_section' => [
        '#type' => 'checkbox',
        '#title' => 'Advanced',
        '#description' => 'Checking this box will expand all the top faq categories, displaying all options at once.',
        '#return_value' => 'answers',
        '#label_above' => true,
        '#replace_title' => 'Expand Answers dropdowns',
        '#default_value' => false,
        '#to_js_settings' => true,
        '#states' => [
          'visible' => [
            'active_tabs' => [
              'operator' => '==',
              'value' => ['faq'],
              'glue' => '||'
            ],
          ],
        ],
      ],
      /*'custom_title' => [
        '#type' => 'text',
        '#title' => 'Custom tab title',
        '#states' => [
          'visible' => [
            'active_tabs' => [
              'operator' => '==',
              'value' => ['custom'],
              'glue' => '||'
            ],
          ],
        ],
        '#to_js_settings' => true
      ],
      'custom_icon' => [
        '#type' => 'fa-icon',
        '#title' => 'Custom tab icon',
        '#states' => [
          'visible' => [
            'active_tabs' => [
              'operator' => '==',
              'value' => ['custom'],
              'glue' => '||'
            ],
          ],
        ],
        '#to_js_settings' => true
      ],
      'custom_content' => [
        '#type' => 'textarea',
        '#title' => 'Custom tab content',
        '#description' => 'Add any HTML content, including an iFrame embed.',
        '#states' => [
          'visible' => [
            'active_tabs' => [
              'operator' => '==',
              'value' => ['custom'],
              'glue' => '||'
            ],
          ],
        ],
        '#to_js_settings' => true
      ],*/
    ];

    // Build a list of custom tabs
    $query = new \WP_Query( [
      'post_type' => 'service_center_tab',
      'post_status' => 'publish',
      'posts_per_page' => 100,
    ] );
    foreach ($query->posts as $post) {
      $fields['active_tabs']['#options']['custom:' . $post->ID] = __( 'Custom Tab: ', 'wp-proud-actions-app' ) . $post->post_title;
    }

    $fields = array_merge($fields, $other_fields);

    return $fields;
  }

  /**
   *  Get the values stored in an option.
   */
  public static function get_values($key) {
    $values = get_option( $key, false );
    //if (!empty($values['custom_content'])) {
    //  $values['custom_content'] = str_replace('\"', '"', $values['custom_content']);
    //}
    return $values;
    //return $values ? json_decode($values) : array();
  }

  /**
   *  Save the form settings (used for the widget and on the app page configs).
   */
  public static function save_values( $key, $values ) {
    unset($values['_wpnonce']);
    unset($values['_wp_http_referer']);
    return update_option($key, $values);
  }

  /**
   *  Get path to app based on `wp_proud_service_center_path` option.
   */
  public static function get_app_path() {
    $local_path = plugins_url('includes/js', __FILE__);
    $path = get_option( 'wp_proud_service_center_path', false );
    if ($path == 'local') {
      return $local_path . '/service-center/dist/';
    }
    else {
      return $path ? $path : '//service-center.proudcity.com/';
    }
  }

  public static function map_layer_built_in() {
    return [
      [
        'type' => 'transit',
        'slug' => 'transit',
        'icon' => 'fa-train',
        'title' => 'Public Transit',
      ],
      [
        'type' => 'bicycle',
        'slug' => 'bicycle',
        'icon' => 'fa-bicycle',
        'title' => 'Bicycle Routes',
      ],
      [
        'type' => 'traffic',
        'slug' => 'traffic',
        'icon' => 'fa-road',
        'title' => 'Traffic',
      ],
    ];
  }

  public static function map_layers( $filter = null, $meta = true ) {
    $layers = self::map_layer_built_in();

    $topics = get_categories( [
      'taxonomy' => 'location-taxonomy',
      'orderby' => 'name',
    ] );

    if( !empty( $topics ) && empty( $topics['errors'] ) ) {

      foreach ( $topics as $topic ) {
        array_push($layers, [
          'type' => 'wordpress',
          'slug' => $topic->slug,
          'title' => $topic->name,
          'icon' => $meta ? get_term_meta( $topic->term_id, 'icon', true ) : null,
          'color' => $meta ? get_term_meta( $topic->term_id, 'color', true ) : null,
        ]);
      }

    }

    // Apply filter and ordering
    if (!empty($filter)) {
      $out = [];
      foreach ($filter as $filter_item) {
        foreach ($layers as $layer) {
          if ( $filter_item == $layer['slug'] ) {
            array_push($out, $layer);
          }
        }
      }
      $layers = $out;
    }
    return $layers;
  }

}
//Init
new ActionsApp;

/**
 *  Attach information about a question's topic
 */
function attach_actions_meta(&$post) {
  if( $post->post_type === 'question' ) {
    // Try to get tax
    // Term cache should already be primed by 'update_post_term_cache'.
    $terms = get_object_term_cache( $post->ID, 'faq-topic' );

    // Guess not
    if( empty( $terms ) ) {
        $terms = wp_get_object_terms( $post->ID, 'faq-topic' );
        wp_cache_add( $post->ID, $terms, 'faq-topic' . '_relationships' );
    }
    // We got some hits
    if( !empty( $terms ) ) {
      $interim_term = false;
      foreach ( $terms as $key => $term ) {
        if( !$interim_term || $term->parent ) {
          $interim_term = $term;
        }
      }
      $post->term = $interim_term->slug;
    }
    $post->action_attr = 'answers';
    $post->action_hash = '/' . $post->term . '/' . $post->post_name;
  }
  elseif ( $post->post_type === 'payment' ) {
    $post->action_attr = 'payments';
    $post->action_hash = '/' . $post->post_name;
  }
  elseif ( $post->post_type === 'issue' ) {
    $issue_type = get_post_meta( $post->ID,  'issue_category_type', true );
    switch ( $issue_type ) {
      case 'link':
        $post->action_url = get_post_meta( $post->ID,  'url', true );
        return;
      case 'iframe':
        $post->action_attr = 'report';
        $post->action_hash = '/embed/' . $post->post_name;
        break;
      case 'form':
        $post->action_url = $post->guid;
        break;
    }
  }
  return;
}
