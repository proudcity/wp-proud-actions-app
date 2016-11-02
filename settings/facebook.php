<?php
class ServiceCenterFacebookPage
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
      add_action( 'admin_menu', array($this, 'create_menu') );
      $this->key = 'service-center-facebook';
      $this->option = 'service_center_facebook';

      $url = get_site_url() . '/fbtab';
      $fb_app = get_option('wp-service-center-fb-app', '165686929462');
      $this->fields = [
        'facebook_add' => [
         '#type' => 'html',
          '#html' => '<div class="field-group" style="margin-top:40px"><label>Add to Facebook</label><div class="checkbox"><a target="_blank" href="https://www.facebook.com/dialog/pagetab?app_id='. $fb_app .'&next='. $url .'" class="btn btn-default"><i class="fa fa-fw fa-facebook-square"></i>Add Tab to Facebook Page</a><div class="help-block">Once you have saved your configuration, click this button to add the Service Center tab to your Facebook page.</div></div></div>',
        ]
      ];
    }

    // create custom plugin settings menu
    

    public function create_menu() {

      add_submenu_page( 
          'service-center',
          'Facebook Tab',
          'Facebook Tab',
          'edit_proud_options',
          $this->key,
          array($this, 'settings_page')
      );

      $this->options = [
        'active_tabs',
        'custom_title',
        'custom_icon',
      ];
    }

    private function build_fields() {
      $this->fields = Proud\ActionsApp\ActionsApp::get_settings(Proud\ActionsApp\ActionsApp::get_values($this->option), $this->fields);
    }

    public function settings_page() {
      $this->build_fields();

      // Do we have post?
      if(isset($_POST['_wpnonce'])) {
        if( wp_verify_nonce( $_POST['_wpnonce'], $this->key ) ) {
          $this->save($_POST);
          $this->build_fields();
        }
      }

      $form = new \Proud\Core\FormHelper( $this->key, $this->fields );
      echo '<h2>Facebook Tab Settings</h2>';
      echo '<h4>Set up a "Service Center" tab on your Facebook page. Select the tabs you would like to appear, save the page, and click on the "Add Facebook Tab" button.</h4>';
      $form->printForm ([
        'button_text' => __pcHelp('Save'),
        'method' => 'post',
        'action' => '',
        'name' => $this->key,
        'id' => $this->key,
      ]);

    }

    public function save($values) {
      Proud\ActionsApp\ActionsApp::save_values($this->option, $values);
    }
}

if( is_admin() )
    $service_cetner_facebook_page = new ServiceCenterFacebookPage();