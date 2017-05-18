<?php
class ServiceCenterFacebookPage extends ProudSettingsPage
{


    /**
     * Start up
     */
    public function __construct()
    {
      parent::__construct(
        'service-center-facebook', // Key
        [ // Submenu settings
          'parent_slug' => 'service-center',
          'page_title' => 'Facebook Tab',
          'menu_title' => 'Facebook Tab',
          'capability' => 'edit_proud_options',
        ],
        'service_center_facebook', // Option
        [], // Options
        9 // Weight
      );
    }

    /** 
     * Set form fields
     */
    public function set_fields() {
      $url = get_site_url() . '/fbtab';
      $fb_app = get_option( 'proud_service_center_fb_app', false );
      if ($fb_app) {
        $fields = [
          'facebook_add' => [
           '#type' => 'html',
            '#html' => '<div class="field-group" style="margin-top:40px"><label>Add to Facebook</label><div class="checkbox"><a target="_blank" href="https://www.facebook.com/dialog/pagetab?app_id='. $fb_app .'&next='. $url .'" class="btn btn-default"><i aria-hidden="true"class="fa fa-fw fa-facebook-square"></i>Add Tab to Facebook Page</a><div class="help-block">Once you have saved your configuration, click this button to add the Service Center tab to your Facebook page.</div></div></div>',
          ]
        ];
      }
      else {
        $fields = [
          'submit_for_approval' => [
           '#type' => 'html',
            '#html' => '<div class="field-group" style="margin-top:40px"><label>Generate Facebook App</label><div class="checkbox"><a target="_blank" href="https://proudcity.com/support/create" class="btn btn-default"><i aria-hidden="true" class="fa fa-fw fa-plus"></i>Contact ProudCity</a><div class="help-block">Contact ProudCity Support and we will generate your Facebook app within one business day.</div></div></div>',
          ]
        ];
      }
      $this->fields = Proud\ActionsApp\ActionsApp::get_settings(
        Proud\ActionsApp\ActionsApp::get_values($this->option), 
        $fields
      );
    }

    /**
     * Print page content
     */
    public function settings_content() {
      ?>
      <h2 class="form-header">Facebook Tab Settings</h2>
      <h4 class="form-header">Set up a "Service Center" tab on your Facebook page. Select the tabs you would like to appear, save the page, and click on the "Add Facebook Tab" button.</h4>
      <?php
      if ($_GET['msg'] == 'fbtab_success') {
        print '<div class="notice1 notice-success is-dismissible1"><h4>Facebook tab successfully added.</h4></div>';
      }
      
      $this->print_form( );
    }
}

if( is_admin() )
    $service_cetner_facebook_page = new ServiceCenterFacebookPage();