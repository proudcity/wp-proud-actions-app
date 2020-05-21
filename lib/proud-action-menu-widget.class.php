<?php
/**
 * @author ProudCity
 */

use Proud\Core;

class ActionsMenu extends Core\ProudWidget {

  function __construct() {
    parent::__construct(
      'proud_actions_menu', // Base ID
      __( 'Action menu list', 'wp-proud-actions-app' ), // Name
      array( 'description' => __( 'Displays list of action items', 'wp-proud-actions-app' ), ) // Args
    );
  }

  function initialize() {
    $this->settings = [];
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
    ?>
    <ul class="list-unstyled">
      <li><a data-proud-navbar="answers" href="#"><!--<i aria-hidden="true" class="fa fa-question-circle"></i>--> <?php echo __( 'Get Answers', 'wp-proud-actions-app' ); ?></a></li>
      <li><a data-proud-navbar="payments"  href="#"><!--<i aria-hidden="true" class="fa fa-usd"></i>--><?php echo __( ' Make a Payment', 'wp-proud-actions-app' ); ?></a></li>
      <li><a data-proud-navbar="report" href="#"><!--<i aria-hidden="true" class="fa fa-exclamation-triangle"></i>--> <?php echo __( 'Report an Issue', 'wp-proud-actions-app' ); ?></a></li>
      <li><a data-proud-navbar="status" href="#"><!--<i aria-hidden="true" class="fa fa-wrench"></i>--> <?php echo __( 'Check Status', 'wp-proud-actions-app' ); ?></a></li>
    </ul>
    <?php
  }
}

// register Foo_Widget widget
// -----------------------------
function register_actions_menu_widget() {
  register_widget( 'ActionsMenu' );
}
add_action( 'widgets_init', 'register_actions_menu_widget' );