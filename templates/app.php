<?php

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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
  <body>
  
   <div class="container logo-bar">
        <a class="pull-right btn-search" href="#/city/search" title="Search">
            <i aria-hidden="true" class="fa fa-search fa-inverse"></i>
        </a>
        <a href="app.html#/city/local">
            <?php if( $logo_meta ): ?>
                <?php \Proud\Core\print_responsive_image( $logo_meta, ['logo'] ) ?>
            <?php else: ?>
                <?php echo get_navbar_logo(); ?>
            <?php endif; ?>
        </a>
    </div>

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
    <style>
        .action-box>div {
            border: none;
        }
        .logo-bar {
            padding: 3px;
            background: <?php echo get_theme_mod( 'color_topnav', '#000000' ); ?>;
            position: fixed;
            width: 100%;
            z-index: 1000;
        }
        .logo {
            height: 50px;
            width: auto;
        }
        .logo-bar .btn-search {
            margin-top: 2px;
            font-size: 24px;
            line-height: 40px;
            padding: 0 10px;
        }
        .nav-contain {
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 1000;
            background-color: white;
            padding: 2px 0;
        }
        .parent {
            padding-top: 55px;
            padding-bottom: 50px;
        }
    </style>
  </body>
</html>