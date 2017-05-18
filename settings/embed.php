<?php
class ServiceCenterEmbedPage extends ProudSettingsPage
{

    /**
     * Start up
     */
    public function __construct()
    {
      parent::__construct(
        'service-center-embed', // Key
        [ // Submenu settings
          'parent_slug' => 'service-center',
          'page_title' => 'Embed Code',
          'menu_title' => 'Embed Code',
          'capability' => 'edit_proud_options',
        ],
        'service_center_embed', // Option
        [], // Options
        9 // Weight
      );
    }

    /** 
     * Set form fields
     */
    public function set_fields() {
      $url = get_site_url() . '/embed';
      $this->fields = Proud\ActionsApp\ActionsApp::get_settings(
        Proud\ActionsApp\ActionsApp::get_values($this->option), 
        [
          'embed_code' => [
            '#type' => 'html',
            '#title' => 'Embed Code',
            '#html' => '<div><label class="option-box-label">Embed Code</label></div><textarea cols="60" rows="4">'. esc_attr('<iframe src="'. $url .'" style="width:100%;height:1000px;border:0;overflow-x:hidden;overflow-y:scroll;"></iframe>') .'</textarea><div class="help-block">Copy and paste this HTML code on to your existing website.</div>',
          ]
        ]
      );
    }
    
    /**
     * Print page content
     */
    public function settings_content() {
      ?>
      <h2 class="form-header">Embed Code <a class="btn btn-default" href="/embed" target="_blank"><i aria-hidden="true" class="fa fa-fw fa-eye"></i>Preview your embeded app</a></h2>
      <h4 class="form-header">Start Proudly Serving your residents without rebuilding your entire website. Embed the Service Center on your homepage. Select the tabs you would like to appear, save the page, and copy and paste the embed code on your existing website. <a href="https://proudcity.com/support/create" target="_blank">Need help?</a></h4>
      <?php 

      $this->print_form( );

    }

}

if( is_admin() )
    $service_cetner_facebook_page = new ServiceCenterEmbedPage();