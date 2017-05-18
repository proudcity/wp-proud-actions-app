<?php

class ServiceCenterAppPage extends ProudSettingsPage
{

    /**
     * Start up
     */
    public function __construct()
    {
      parent::__construct(
        'service-center-app', // Key
        [ // Submenu settings
          'parent_slug' => 'service-center',
          'page_title' => 'Mobile App',
          'menu_title' => 'Mobile App',
          'capability' => 'edit_proud_options',
        ],
        'service_center_app', // Option
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
          'logo' => [
            '#title' => __( 'Logo', 'wp-proud-core' ),
            '#type' => 'select_media',
            '#default_value'  => '',
            '#description' => 'You can customize colors and fonts in the Customize section.',
          ],
          'submit_for_approval' => [
           '#type' => 'html',
            '#html' => '<div class="field-group" style="margin-top:40px"><label>Submit to App Stores</label><div class="checkbox"><a target="_blank" href="https://proudcity.com/support/create" class="btn btn-default"><i aria-hidden="true" class="fa fa-fw fa-plus"></i>Submit App for Approval</a><div class="help-block">Create a new ProudCity support ticket and we will generate your mobile app and submit it to the Apple Appstore and Google Play Store for approval.</div></div></div>',
          ],
        ]
      );
    }

    /**
     * Print page content
     */
    public function settings_content() {
      ?>
      <h2 class="form-header">Mobile Application Settings <a class="btn btn-default" href="#preview-wrapper"><i aria-hidden="true" class="fa fa-fw fa-eye"></i>Preview your mobile app</a></h2>'
      <h4 class="form-header">Add <?php echo get_option('city', 'your city') ?> to the Apple App Store and Google Play.  The ProudCity mobile app pulls from the same database your website uses, so you enter all of your content in one place. Add push notifications for an easy way to keep in touch with your residents.</h4>
      <?php

      $this->print_form( );

      ?>
      <h3 id="preview-wrapper">Preview your mobile application <!--<button class="btn btn-default" onclick="document.getElementById(\'preview\').contentDocument.location.reload(true);return false;"><i aria-hidden="true" class="fa fa-fw fa-refresh"></i>Refresh preview</button>--><small>Click Save to refresh</small></h3><iframe src="/preview" style="width:100%;height:1200px;border:0;" id="preview" scrolling="no"></iframe>
      <?php

    }
}

if( is_admin() )
    $service_center_app_page = new ServiceCenterAppPage();