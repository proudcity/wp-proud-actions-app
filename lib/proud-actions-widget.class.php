<?php
/**
 * @author ProudCity
 */

use Proud\Core;

class ActionsBox extends Core\ProudWidget {

  function __construct() {
    parent::__construct(
      'proud_actions_app', // Base ID
      __( '311 Actions Box', 'wp-proud-actions-app' ), // Name
      array( 'description' => __( 'An interactive 311 interface', 'wp-proud-actions-app' ), ) // Args
    );
  }

  function initialize() {
    $this->settings = [
      'active_tabs' => [
        '#title' => 'Active tabs',
        '#type' => 'checkboxes',
        '#options' => [
          'faq' => 'Answers',
          'payments' => 'Payments',
          'report' => 'Report an Issue',
          'status' => 'Check status',
        ],
        '#default_value' => ['faq', 'payments', 'report', 'status'],
        '#description' => 'Click all tabs you would like to appear',
        '#to_js_settings' => true
      ],
      'expand_section' => [
        '#type' => 'checkbox',
        '#title' => 'Expand FAQ dropdowns?',
        '#description' => 'Checking this box will expand all the top faq categories, displaying all options at once.',
        '#return_value' => 'answers',
        '#label_above' => true,
        '#replace_title' => 'Yes',
        '#default_value' => false,
        '#to_js_settings' => true
      ],
      'category_section' => [
        '#type' => 'radios',
        '#title' => 'FAQ section',
        '#description' => 'Choose the faq "section" type you would like to be displayed.',
        '#default_value' => 'all',
        '#options' => [
          'all' => 'Show all', 
          'residents' => 'Residents',
          'business' => 'Business',
          'visitors' => 'Visitors'
        ],
        '#to_js_settings' => true
      ]
    ];
    parent::initialize();
  }

  public function registerLibraries() {
    global $proudcore;
    $proudcore::$libraries->addMaps();
    $proudcore::$libraries->addAngular(true, true, true);
  }

  public function enqueueFrontend() {
    $path = plugins_url('../includes/js/',__FILE__);
    // Running script
    wp_enqueue_script('proud-actions-app', $path . 'proud-actions-app.js', array('lodash','angular'), false, true);
    // Angular resources
    $path .= 'proud-actions-app/dist/';
    wp_enqueue_script('proud-actions-app-libraries', $path . 'js/libraries.min.js', array('angular'), false, true);
    wp_enqueue_script('proud-actions-app-app', $path . 'js/app.min.js', array('proud-actions-app-libraries'), false, true);
    wp_enqueue_script('proud-actions-app-templates', $path . 'views/app.templates.js', array('proud-actions-app-app'), false, true);
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