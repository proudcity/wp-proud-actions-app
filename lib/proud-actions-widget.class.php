<?php
/**
 * @author James Laffert
 */

class ActionsBox extends WP_Widget {

  // proud libraries
  public static $libaries;

  function __construct() {
    parent::__construct(
      'proud_actions_app', // Base ID
      __( '311 Actions Box', 'wp-proud-actions-app' ), // Name
      array( 'description' => __( 'An interactive 311 interface', 'wp-proud-actions-app' ), ) // Args
    );

    // Init proud library on plugins loaded
    add_action( 'init', [$this,'registerLibraries'] );
    // Enqueue local frontend
    add_action('wp_enqueue_scripts', array($this,'enqueueFrontend'));
  }

  public function registerLibraries() {
    global $proudcore;
    $proudcore::$libraries->addAngular(true, true, true);
  }

  public function enqueueFrontend() {
    $path = plugins_url('../includes/js/',__FILE__);
    // Running script
    wp_enqueue_script('proud-actions-app', $path . 'proud-actions-app.js', array('angular'), false, true);
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
  public function widget( $args, $instance ) {

    // Compile html into a url encoded string
    $lazy_html = rawurlencode(
      '<div class="parent" ui-view></div>'
    );

    $app_id = 'proud-actions-app';


    ?>
    <div id="<?php print $app_id; ?>" class="col-sm-12">
      <div ng-init="appId = <?php print $app_id; ?>" class="container spacing" in-view="faqCompile = faqCompile || '<?php print $lazy_html; ?>'" lazy-compile="faqCompile" lazy-decode="true"></div>
    </div>
    <?php
  }

  /**
   * Back-end widget form.
   *
   * @see WP_Widget::form()
   *
   * @param array $instance Previously saved values from database.
   */
  public function form( $instance ) {
    $title = ! empty( $instance['title'] ) ? $instance['title'] : __( 'New title', 'wp-proud-actions-app' );
    ?>
    <p>
    <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
    <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
    </p>
    <?php 
  }

  /**
   * Sanitize widget form values as they are saved.
   *
   * @see WP_Widget::update()
   *
   * @param array $new_instance Values just sent to be saved.
   * @param array $old_instance Previously saved values from database.
   *
   * @return array Updated safe values to be saved.
   */
  public function update( $new_instance, $old_instance ) {
    $instance = array();
    $instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';

    return $instance;
  }
}

// register Foo_Widget widget
function register_actions_feed_widget() {
  register_widget( 'ActionsBox' );

}
add_action( 'widgets_init', 'register_actions_feed_widget' );