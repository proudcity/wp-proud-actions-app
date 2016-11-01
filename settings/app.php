<?php
class ServiceCenterAppPage
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
      $this->key = 'service-center-app';
      $this->option = 'service_center_app';
      $this->fields = [
        'submit_for_approval' => [
         '#type' => 'html',
          '#html' => '<a target="_blank" href="https://proudcity.com/support/create" class="btn btn-default"><i class="fa fa-fw fa-plus"></i>Submit App for Approval</a><div class="help-block">Create a new ProudCity support ticket and we will generate your mobile app and submit it to the Apple Appstore and Google Play Store for approval.</div>',
        ]
      ];
    }

    // create custom plugin settings menu
    

    public function create_menu() {

      add_submenu_page( 
          'service-center',
          'Mobile App',
          'Mobile App',
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
      $url = get_site_url() . '/fbtab';
      $fb_app = get_option('wp-service-center-fb-app', '165686929462');
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
      echo '<h2>Mobile Application Settings <a class="btn btn-default" href="#preview-wrapper"><i class="fa fa-fw fa-eye"></i>Preview your mobile app</a></h2>';
      echo '<h4>Add '. get_option('city', 'your city') .' to the Apple App Store and Google Play.  The ProudCity mobile app pulls from the same database your website uses, so you enter all of your content in one place. Add push notifications for an easy way to keep in touch with your residents.</h4>';
      $form->printForm ([
        'button_text' => __pcHelp('Save'),
        'method' => 'post',
        'action' => '',
        'name' => $this->key,
        'id' => $this->key,
      ]);
      echo '<h3 id="preview-wrapper">Preview your mobile application <button class="btn btn-default" onclick="document.getElementById(\'preview\').contentDocument.location.reload(true);return false;"><i class="fa fa-fw fa-refresh"></i>Refresh preview</button></h3><iframe src="/preview" style="width:100%;height:1200px;border:0;" id="preview" scrolling="no"></iframe>';

    }

    public function save($values) {
      Proud\ActionsApp\ActionsApp::save_values($this->option, $values);
    }
}

if( is_admin() )
    $service_center_app_page = new ServiceCenterAppPage();