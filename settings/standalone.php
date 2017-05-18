<?php
class ServiceCenterStandalonePage extends ProudSettingsPage
{

    /**
     * Start up
     */
    public function __construct()
    {
      parent::__construct(
        'service-center-standalone', // Key
        [ // Submenu settings
          'parent_slug' => 'service-center',
          'page_title' => 'Standalone',
          'menu_title' => 'Standalone',
          'capability' => 'edit_proud_options',
        ],
        'service_center_standalone', // Option
        [], // Options
        9 // Weight
      );
    }

    /** 
     * Set form fields
     */
    public function set_fields() {
      $this->fields = Proud\ActionsApp\ActionsApp::get_settings(
        Proud\ActionsApp\ActionsApp::get_values($this->option), 
        [
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
        ]
      );
    }

    /**
     * Print page content
     */
    public function settings_content() {
      ?>
      <h2 class="form-header">Standalone Page Settings <a class="btn btn-default" href="/standalone" target="_blank"><i aria-hidden="true" class="fa fa-fw fa-eye"></i>View standalone website</a></h2>
      <h4 class="form-header">Serve your residents with the tools they need without the window dressing.  Countless analytics serveys have shown that people come to city websites to get answers, report issues, and pay bills. Make it easy for <?php echo get_option('city', 'your') ?> residents to do just that.</h4>
      <?php

      $this->print_form( );
    }
}

if( is_admin() )
    $service_center_standalone_page = new ServiceCenterStandalonePage();