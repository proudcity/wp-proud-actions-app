<?php

class ServiceCenterKioskPage extends ProudSettingsPage {

    /**
     * Start up
     */
    public function __construct() {
        parent::__construct(
            'service-center-kiosk', // Key
            [ // Submenu settings
                'parent_slug' => 'service-center',
                'page_title'  => 'Kiosk',
                'menu_title'  => 'Kiosk',
                'capability'  => 'edit_proud_options',
            ],
            'service_center_kiosk', // Option
            [
            ], // Options
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
                'logo'       => [
                    '#title'         => __('Logo', 'wp-proud-core'),
                    '#type'          => 'select_media',
                    '#default_value' => '',
                    '#description'   => 'You can customize colors and fonts in the Customize section.',
                ],
                'background'       => [
                  '#title'         => __('Homepage background image', 'wp-proud-core'),
                  '#type'          => 'select_media',
                  '#default_value' => '',
                ],
                'icon'       => [
                  '#title'         => __('Icon image for the mobile version', 'wp-proud-core'),
                  '#type'          => 'select_media',
                  '#default_value' => '',
                ],
                'directions_start'       => [
                  '#title'         => __('Start Location', 'wp-proud-core'),
                  '#type'          => 'text',
                  '#description' => __('Describe the location for the start place for directions (ex: "{cityname} City Hall")', 'wp-proud-core'),
                ],
                'text_url_gravityform'       => [
                  '#title'         => __('Send to Phone form', 'wp-proud-core'),
                  '#type'          => 'gravityform',
                  '#description' => 'Form to use for Send to Phone functionality typically allowing you to send a text or email to your phone.',
                ],
                'feedback_gravityform'       => [
                  '#title'         => __('Feedback form', 'wp-proud-core'),
                  '#type'          => 'gravityform',
                  '#description' => 'Form to use for Feedback button.',
                ],
                'google_analytics_key' => [
                    '#type' => 'text',
                    '#title' => __pcHelp('Google Analytics Tracking ID'),
                    '#description' => __pcHelp(
                        'Optionally choose a separate tracking ID for kiosk tracking. Copy the Tracking ID code that appears under Admin > Tracking info.'
                    ),
                ],

                'submit_for_approval' => [
                    '#type' => 'html',
                    '#html' => '<div class="field-group" style="margin-top:40px"><label>Request Kiosk App</label><div class="checkbox"><a target="_blank" href="https://proudcity.com/support/create" class="btn btn-default"><i aria-hidden="true" class="fa fa-fw fa-plus"></i>Get started</a><div class="help-block">
              Create a new ProudCity support ticket and we will help you procure, setup, and install your own kiosk for City Hall.
            </div></div></div>',
                ],
            ]
        );
    }

    /**
     * Print page content
     */
    public function settings_content() {
        ?>
      <h2 class="form-header">Kiosk Settings <a class="btn btn-default"
                                                href="#preview-wrapper"><i
            aria-hidden="true" class="fa fa-fw fa-eye"></i>Preview your mobile
          app</a></h2>'
      <h4 class="form-header">Add <?php echo get_option('city', 'your city') ?>
        to the Apple App Store and Google Play. The ProudCity mobile app pulls
        from the same database your website uses, so you enter all of your
        content in one place. Add push notifications for an easy way to keep in
        touch with your residents.</h4>
        <?php

        $this->print_form();

        ?>
        <?php

    }
}

if (is_admin()) {
    $service_center_kiosk_page = new ServiceCenterKioskPage();
}