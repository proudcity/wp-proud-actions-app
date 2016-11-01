<?php
class ServiceCenterStandalonePage
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
      $this->key = 'service-center-standalone';
      $this->option = 'service_center_standalone';
      $this->fields = [
        'background' => [
          '#title' => __( 'Background image', 'wp-proud-core' ),
          '#type' => 'select_media',
          '#default_value'  => '',
        ],
        'logo' => [
          '#title' => __( 'Logo', 'wp-proud-core' ),
          '#type' => 'select_media',
          '#default_value'  => '',
        ],
      ];
    }

    // create custom plugin settings menu
    

    public function create_menu() {

      add_submenu_page( 
          'service-center',
          'Standalone',
          'Standalone',
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
      echo '<h2>Standalone Page Settings <a class="btn btn-default" href="/standalone" target="_blank"><i class="fa fa-fw fa-eye"></i>View standalone website</a></h2>';
      echo '<h4>Serve your residents with the tools they need without the window dressing.  Countless analytics serveys have shown that people come to city websites to get answers, report issues, and pay bills. Make it easy for '. get_option('city', 'your') .' residents to do just that.</h4>';
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
    $service_center_standalone_page = new ServiceCenterStandalonePage();