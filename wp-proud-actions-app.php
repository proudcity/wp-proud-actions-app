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
      require_once( plugin_dir_path(__FILE__) . 'settings/app.php' );
    }
  }

  public function create_service_center_tab() {
      $labels = array(
          'name'               => _x( 'Custom Tabs', 'post name', 'wp-service_center_tab' ),
          'singular_name'      => _x( 'Custom Tab', 'post type singular name', 'wp-service_center_tab' ),
          'menu_name'          => _x( 'Custom Tabs', 'admin menu', 'wp-service_center_tab' ),
          'name_admin_bar'     => _x( 'Custom Tab', 'add new on admin bar', 'wp-service_center_tab' ),
          'add_new'            => _x( 'Add New', 'service_center_tab', 'wp-service_center_tab' ),
          'add_new_item'       => __( 'Add New Custom Tab', 'wp-service_center_tab' ),
          'new_item'           => __( 'New Custom Tab', 'wp-service_center_tab' ),
          'edit_item'          => __( 'Edit Custom Tab', 'wp-service_center_tab' ),
          'view_item'          => __( 'View Custom Tab', 'wp-service_center_tab' ),
          'all_items'          => __( 'All Custom Tabs', 'wp-service_center_tab' ),
          'search_items'       => __( 'Search service_center_tab', 'wp-service_center_tab' ),
          'parent_item_colon'  => __( 'Parent service_center_tab:', 'wp-service_center_tab' ),
          'not_found'          => __( 'No service_center_tabs found.', 'wp-service_center_tab' ),
          'not_found_in_trash' => __( 'No service_center_tabs found in Trash.', 'wp-service_center_tab' )
      );

      $args = array(
          'labels'             => $labels,
          'description'        => __( 'Description.', 'wp-service_center_tab' ),
          'public'             => true,
          'publicly_queryable' => true,
          'show_ui'            => true,
          'show_in_menu'       => false,//'admin.php?page=service-center',
          'query_var'          => true,
          'rewrite'            => array( 'slug' => 'custom_tabs' ),
          'capability_type'    => 'post',
          'has_archive'        => false,
          'hierarchical'       => false,
          'menu_position'      => null,
          'show_in_rest'       => true,
          'rest_base'          => 'custom-tabs',
          'rest_controller_class' => 'WP_REST_Posts_Controller',
          'supports'           => array( 'title', 'editor', 'thumbnail',)
      );

      register_post_type( 'service_center_tab', $args );
  }



  public function service_center_tab_rest_support() {
    register_api_field( 'service_center_tab',
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
    $Meta = new ActionsMeta;    
    $Meta->get_options( $object['id'] );
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
    add_rewrite_rule('^standalone/?', 'index.php?wp_proud_format=standalone', 'top');
    add_rewrite_rule('^embed/?', 'index.php?wp_proud_format=embed', 'top');
    add_rewrite_rule('^fbtab/?', 'index.php?wp_proud_format=fbtab', 'top');
    add_rewrite_rule('^app/?', 'index.php?wp_proud_format=app', 'top');
    add_rewrite_rule('^preview/?', 'index.php?wp_proud_format=preview', 'top');
    add_rewrite_rule('^service-center/?', 'index.php?wp_proud_format=preview', 'top');
    add_rewrite_rule('^form-embed/?', 'index.php?wp_proud_format=gravityforms_iframe', 'top');

    // Try to overwrite everything
    //add_rewrite_rule('^.', 'index.php?wp_proud_format=standalone', 'top');
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

  private function proud_actions_standalone_311($key, $search) {
    global $proudcore;
    $this->proud_actions_print_311(false);

    do_action('wp_enqueue_scripts');

    $settings = $this->get_values($key);

    // Add search settings
    $settings['search'] = $search;
    $settings['search_prefix'] = get_option('search_provider') == 'google' ? 'https://www.google.com/search?q=' : get_site_url() . '/search-site/?term=';
    $site = get_option('search_google_site');
    $settings['search_suffix'] = !empty($site) ? ' site: '.$site : '';

    // Add map settings
    // @todo: temp:
    $settings['map_layers'] = [
      [
        'type' => 'transit',
        'icon' => 'fa-train',
        'title' => 'Public Transit',
      ],
      [
        'type' => 'bicycle',
        'icon' => 'fa-bicycle',
        'title' => 'Bicycle Routes',
      ],
      [
        'type' => 'traffic',
        'icon' => 'fa-car',
        'title' => 'Traffic',
      ],
    ];

    // @todo: temp
    $settings['services'] = [
      [
        'type' => 'elected',
        'icon' => 'fa-user',
        'title' => 'Elected Officials',
      ],
      [
        'type' => 'gis',
        'title' => 'Neighborhood',
        'file' => 'http://localhost:8080/wp-content/uploads/2016/11/neighborhoods.geojson',
        'items' => [
          'NAME' => 'Neighborhood',
          'URL' => 'Url',
        ],
      ],
      [
        'type' => 'gis',
        'icon' => 'fa-trash',
        'title' => 'Marin Sanitary Service',
        'questions' => 1,
        'pattern' => '{SERV ADDR#} {SERV STREET} {SERV STRT-SUFX}',
        'file' => 'http://localhost:8080/wp-content/uploads/2016/11/garbage.csv',
        'items' => [
          'DAY' => 'Garbage',
          'recycling' => 'Recycling',
          'green' => 'Geen Bin',
        ],
      ],
      [
        'type' => 'hours',
        'icon' => 'fa-university',
        'title' => 'City Hall',
        'address' => '1400 5th Ave',
        'hours' => 'Monday - Friday: 8:30am - 5:00pm<br/>Saturday - Sunday: Closed',
        'items' => [
          'NAME' => 'Neighborhood',
          'URL' => 'Url',
        ],
      ],
      [
        'type' => 'hours',
        'icon' => 'fa-car',
        'title' => 'Parking Meters',
        'hours' => 'Monday - Saturday: 8:00am - 6:00pm<br/>Sunday: Off',
        'label' => ['Inactive', 'Active'],
      ],
    ];

    // See if hours services are open of closed
    foreach ($settings['services'] as $i => $service) {
      if ($service['type'] == 'hours') {
        $alert = '';
        $settings['services'][$i]['open'] = Core\isTimeOpen($service['hours'], get_option('service_center_holidays', ''), $alert);
        if (!empty($alert)) {
          $settings['services'][$i]['alert'] = $alert;
        }
      }
    }
    //print_r($settings);

/*json_decode('{"services" : [
    
    {
        "type": "csv",
        "title": "Marin Sanitary Service",
        "file": "http://localhost:8080/wp-content/uploads/2016/11/garbage.csv",
        "icon": "fa-trash",
        //"alert": "Special holiday hours are in effect from 11/23 - 11/27.",
        "questions": 1,
        "pattern": "{SERV ADDR#} {SERV STREET} {SERV STRT-SUFX}",
        "items": {
            "DAY": "Garbage",
            "recycling": "Recycling",
            "green": "Geen Bin",
        }
    },
    {
        "type": "hours",
        "title": "City Hall",
        "address": "1400 5th Ave",
        "icon": "fa-university",
        "open": "true",
        "hours": "Monday - Friday: 8:30am - 5:00pm<br/>Saturday - Sunday: Closed",
        "alert": "Special holiday hours are in effect from 11/23 - 11/27."
    },
    {
        "type": "hours",
        "title": "Parking Meters",
        "icon": "fa-car",
        "open": "true",
        "hours": "Monday - Saturday: 8:00am - 6:00pm<br/>Sunday: Off"
    }
]}'*/

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
      'path' => $this::get_app_path(),
      'google_analytics' => get_option('google_analytics_key'), 
      'title' =>  'ProudCity Service Center', //@todo
      'settings' => $proudcore->getJsSettings(),
      'styles' => function_exists('proud_customize_css') ? proud_customize_css() : '',
    );
  }
  
  // Respond to navbar footer hook
  // Print widget if has not been rendered elsewhere
  public function proud_actions_print_311($render = true) {
    global $proudcore;
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
          'gravityforms_iframe' => get_site_url() . 'form-embed/?id=',
          //'payment' => array(
          //  'service' => get_option('payment_service', 'stripe'),
          //  'stripe_key' => get_option('payment_stripe_key'), 
          //),
          'google_election_id' => get_option( 'google_election_id', '5000' ),// @todo: change to 5000 for 2016 election
          'holidays' => esc_html( Core\federalHolidays() . "\r" . get_option('service_center_holidays', '') ),
        ]
      ]
    ]);
    // if not rendered on page yet, render in overlay
    if(!$GLOBALS['proud_actions_app_rendered'] && $render) {
      the_widget('ActionsBox');
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
          'local' => 'Local Services',
          'faq' => 'Answers',
          'payments' => 'Payments',
          'report' => 'Report an Issue',
          'status' => 'Check status',
          'custom' => 'Custom Tab'
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
      'custom_title' => [
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
      ],
    ];

    $fields = array_merge($fields, $other_fields);

    return $fields;
  }

  /**
   *  Get the values stored in an option.
   */
  public static function get_values($key) {
    $values = get_option( $key, false );
    if (!empty($values['custom_content'])) {
      $values['custom_content'] = str_replace('\"', '"', $values['custom_content']);
    }
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

