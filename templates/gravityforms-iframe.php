<?php
require_once('../../../../wp-load.php');

do_action('wp_enqueue_scripts');
wp_deregister_script( 'angular' );

//if ( empty( $wp->query_vars['gfiframe'] ) || ( 'gfembed' != $wp->query_vars['gfiframe'] && 'gfembed.php' != $wp->query_vars['gfiframe'] ) ) {
//  return;
//}

$form_id = null;
if ( ! empty( $_GET['id'] ) ) {
  $form_id = absint( $_GET['id'] );
} else {
  // The request needs an 'f' query arg with the form id.
  wp_die( esc_html__( 'Invalid form id.', 'gravity-forms-iframe' ) );
}
global $wp;


$form = GFFormsModel::get_form_meta( $form_id );
//$settings = $this->addon->get_form_settings( $form );

// Disable the toolbar in case the form is embedded on the same domain.
show_admin_bar( false );

require_once( GFCommon::get_base_path() . '/form_display.php' );


?>

<!doctype html>
<html class="no-js" lang="en" ng-app="311AppParent">
  <head>
    <meta charset="utf-8">
    <title>iFrame embed</title>
    <?php wp_print_styles(); ?>
    <?php print $style ?>
    <?php wp_print_scripts(); ?>
  </head>
  <body>

    <?php gravity_form( $form_id, false, false, false, false, true ); ?>
    <?php wp_footer(); ?>
  </body>
</html>