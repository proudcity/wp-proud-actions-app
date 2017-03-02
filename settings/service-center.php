<?php
class ServiceCenterPage
{
    /**
     * Holds the values to be used in the fields callbacks
     */
    private $options;

    /**
     * Start up
     */
    public function __construct()
    {
      add_action( 'admin_menu', array($this, 'create_menu'), 1 );
      $this->key = 'service-center';
    }

    // create custom plugin settings menu
    

    public function create_menu() {

      /*add_submenu_page( 
          'proudsettings',
          'Service Center',
          'Service Center',
          'edit_proud_options',
          $this->key,
          array($this, 'settings_page')
      );*/
      add_menu_page(
        'Service Center', 
        'Service Center', 
        'edit_proud_options', 
        $this->key, array($this, 'page'), 
        plugins_url('/images/icon.png', __FILE__) 
      );

    }

    public function page() {
      echo '<h2>ProudCity Service Center</h2>';
      //echo '<h4>Your Service Center appears on your website, in Facebook, as a mobile app, or at a kiosk. Manage global settings on this page, and configure the Service Center everywhere it appears using the links on the left.</h4>';
      echo '<iframe src="/service-center" style="border:none;width:100%;height:900px" scrolling="no"></iframe>';

    }

}

if( is_admin() )
    $proud_service_center_page = new ServiceCenterPage();