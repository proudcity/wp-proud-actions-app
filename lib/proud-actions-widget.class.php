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
    $this->settings = [
      'active_tabs' => [
        '#title' => 'Active tabs',
        '#type' => 'checkboxes',
        '#options' => [
          'vote' => 'Vote',
          'faq' => 'Answers',
          'payments' => 'Payments',
          'report' => 'Report an Issue',
          'status' => 'Check status',
          'custom' => 'Custom Tab'
        ],
        '#default_value' => ['faq' => 'faq', 'payments' => 'payments', 'report' => 'report', 'status' => 'status'],
        '#description' => 'Click all tabs you would like to appear',
        '#to_js_settings' => true
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
      'category_section' => [
        '#type' => 'checkboxes',
        '#title' => 'Answers section',
        '#description' => 'Choose the faq "topics" you would like to be displayed.',
        '#default_value' => array_keys( $options ),
        '#options' => $options,
        '#to_js_settings' => true
      ],
      'expand_section' => [
        '#type' => 'checkbox',
        '#title' => 'Advanced',
        '#description' => 'Checking this box will expand all the top faq categories, displaying all options at once.',
        '#return_value' => 'answers',
        '#label_above' => true,
        '#replace_title' => 'Expand Answers dropdowns',
        '#default_value' => false,
        '#to_js_settings' => true
      ],
    ];
  }

  public function registerLibraries() {
    global $proudcore;
    $proudcore::$libraries->addMaps();
    $proudcore::$libraries->addAngular(true, true, true);
  }

  public function enqueueFrontend() {
    $local_path = plugins_url('../includes/js', __FILE__);
    $path = get_option( 'wp_proud_service_center_path', false );
    $path = $path == 'local' ? $local_path . 'proud-actions-app/dist/' :
      $path ? $path : '//service-center.proudcity.com';
    
    // Running script
    wp_enqueue_script('proud-actions-app', $local_path . '/proud-actions-app.js', array('lodash','angular'), false, true);
    // Angular resources
    wp_enqueue_script('proud-actions-app-libraries', $path . '/js/libraries.min.js', array('angular'), false, true);
    wp_enqueue_script('proud-actions-app-app', $path . '/js/app.min.js', array('proud-actions-app-libraries'), false, true);
    wp_enqueue_script('proud-actions-app-templates', $path . '/views/app.templates.js', array('proud-actions-app-app'), false, true);
    wp_enqueue_script('google-maps-api', '//maps.googleapis.com/maps/api/js?key=' . get_option( 'google_api_key', '' ) . '&libraries=places');
    // @todo: make this work (file isn't getting included with this call, so I just added it to app.min.js)
    //if ($this->settings['active_tabs']['#options']['vote']) {
    //  wp_enqueue_script('proud-actions-app-vote', $path . 'js/vote.min.js', array('proud-actions-app-app'), false, true);
    //}
    
    // Add global settings
    parent::addJsSettings(array(
     //'payment_key' => '', //@todo
     'api_path' => get_option( 'proudcity_api', '/wp-json/wp/v2/' ),
     //'payment_url' => '',
     //'track_url' => '',
     //'seeclickfixUrl' => '',
    ), true);
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