<?php
$settings['proud_actions_app']['instances']['app']['menu_style'] = 'left';
$settings['global']['external_link_prefix'] = home_url() . '/kiosk#/city/iframe?url=';

$logo = wp_get_attachment_image_url($settings['proud_actions_app']['instances']['app']['logo']);
$logo = str_replace('-150x150', '', $logo);
$logo = 'https://storage.googleapis.com/proudcity/sanrafaelca/uploads/2016/08/CityOfSRLogo_onWhite.png';
$settings['proud_actions_app']['instances']['app']['logo'] = $logo;

$bg = wp_get_attachment_image_url($settings['proud_actions_app']['instances']['app']['background']);
$bg = str_replace('-150x150', '', $bg);

//$bg = 'https://storage.googleapis.com/proudcity/sanrafaelca/uploads/2016/02/Boats.jpg';
//$bg = null;
?>
<!doctype html>
<html class="no-js" lang="en" ng-app="311AppParent">
<head>
  <meta charset="utf-8">
  <base href="<?php echo $path ?>" />
  <meta property="og:image" content="http://FILLME!/images/shareimg.jpg" />
  <meta property="og:url" content="https://service-center.proudcity.com" />
  <meta property="og:title" content="ProudCity Service Center" />
  <meta property="og:description" content="Get answers, learn about local services, pay bills, report issues." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="description" ng-attr-content="{{metaDescription()}}" />
  <meta name="keywords" ng-attr-content="{{metaKeywords()}}" />
    <?php wp_favicon_request(); ?>
  <title ng-bind="pageTitle();">ProudCity Service Center</title>
    <?php wp_print_styles(); ?>
  <script type="text/javascript">
    var Proud = {};
    Proud.settings = <?php echo json_encode($settings) ?>
  </script>
  <script type="text/javascript">
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', '<?php echo $google_analytics ?>', 'auto');
  </script>
</head>
<body class="service-center-kiosk service-center-app service-center-navbar-left unclicked">

<!--
<?php if( $logo_meta ): ?>
  <?php \Proud\Core\print_responsive_image( $logo_meta, ['logo'] ) ?>
<?php else: ?>
  <?php echo get_navbar_logo(); ?>
<?php endif; ?>
-->

<div ng-init="$root.appId = 'app'" class=""><div class="parent" ui-view></div></div>

<script src="<?php echo $path ?>js/bootstrap.js"></script>
<script src="<?php echo $path ?>js/angular.js"></script>
<script src="<?php echo $path ?>js/angular-core.js"></script>
<script src="<?php echo $path ?>js/angular-router-animate.js"></script>
<script src="<?php echo $path ?>js/angular-lazy.js"></script>
<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?libraries=places&key=<?php print $settings['global']['google_key'] ?>"></script>
<script src="<?php echo $path ?>js/libraries.min.js"></script>
<script src="<?php echo $path ?>js/app.min.js"></script>
<script src="<?php echo $path ?>views/app.templates.js"></script>

<?php print $styles ?>
<style type="text/css">
  /*.action-box>div {
    border: none;
  }
  .logo-bar {
    padding: 3px;
    background: <?php echo get_theme_mod( 'color_topnav', '#000000' ); ?>;
    position: fixed;
    width: 100%;
    z-index: 1000;
  }
  .logo-bar .logo {
    margin: 0;
  }
  .logo img {
    height: 50px;
    width: auto;
  }
  .logo-bar .btn-search {
    margin-top: 2px;
    font-size: 24px;
    line-height: 40px;
    padding: 0 10px;
  }
  .parent {
    height: 100%;
  }*/

  <?php if($bg): ?>
    body.unclicked {
      background: url(<?php echo $bg ?>);
      background-size: cover;
    }
    body.unclicked .action-box {
      background-color: transparent !important;
    }
    body.unclicked .action-box dl h4 span {
      color: black !important;
    }
    body.unclicked .service-center-navbar-vertical .col-nav {
      background: rgba(255, 255, 255, 0.4);
    }
  <?php endif; ?>

</style>

<script language="JavaScript">
  jQuery('body').bind('click', function() {
    jQuery(this).removeClass('unclicked');
  });
</script>

</body>
</html>