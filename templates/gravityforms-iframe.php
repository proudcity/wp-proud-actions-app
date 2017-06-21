<?php
include_once( ABSPATH . 'wp-load.php' );
include_once( ABSPATH . 'wp-content/plugins/gravityforms/includes/api.php' );

global $proudcore;
$proudcore::$libraries->addBundleToLoad( 'iframe-resizer-child' );
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

// We use this to not show the proudbar, among other things.
global $is_iframe;
$is_iframe = true;
?>

<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8">
    <title>iFrame embed</title>
    <?php wp_print_styles(); ?>
    <?php if(!empty($style)) { print $style; } ?>
    <style>
        body {
          background: none;
          padding-right: 2px;
          overflow-x: hidden;
        }

      .ginput_cardinfo_right {
        position: relative;
      }
    </style>
    <?php wp_print_scripts(); ?>
  </head>
  <body class="gravityforms-iframe">

    <?php gravity_form( $form_id, true, false, false, $_GET, true ); ?>
    <div data-iframe-height="true" class="iframe-target"></div>
    <?php wp_footer(); ?>
  </body>
</html>