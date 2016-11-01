<?php
require_once('../../../../wp-load.php');

do_action('wp_enqueue_scripts');
wp_deregister_script( 'angular' );

?>

<!doctype html>
<html class="no-js" lang="en" ng-app="311AppParent">
  <head>
    <meta charset="utf-8">
    <title>iFrame embed</title>
    <?php wp_print_styles(); ?>
    <?php wp_print_scripts(); ?>
  </head>
  <body>

    <?php gravity_form( $_GET['id'], false, false, false, false, true ); ?>

  </body>
</html>