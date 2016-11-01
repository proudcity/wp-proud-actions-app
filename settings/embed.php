<?php
class ServiceCenterEmbedPage
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
      $this->key = 'service-center-embed';
      $this->option = 'service_center_embed';
      $url = get_site_url() . '/embed';
      $this->fields = [
        'embed_code' => [
          '#type' => 'html',
          '#title' => 'Embed Code',
          '#html' => '<div><label class="option-box-label">Embed Code</label></div><textarea cols="60" rows="4">'. esc_attr('<iframe src="'. $url .'" style="width:100%;height:1000px;border:0;overflow-x:hidden;overflow-y:scroll;"></iframe>') .'</textarea><div class="help-block">Copy and paste this HTML code on to your existing website.</div>',
        ]
      ];
    }

    // create custom plugin settings menu
    

    public function create_menu() {

      add_submenu_page( 
          'service-center',
          'Embed Code',
          'Embed Code',
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
      echo '<h2>Embed Code <a class="btn btn-default" href="/embed" target="_blank"><i class="fa fa-fw fa-eye"></i>Preview your embeded app</a></h2>';
      echo '<h4>Start Proudly Serving your residents without rebuilding your entire website. Embed the Service Center on your homepage. Select the tabs you would like to appear, save the page, and copy and paste the embed code on your existing website. <a href="https://proudcity.com/support/create" target="_blank">Need help?</a></h4>';
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
    $service_cetner_facebook_page = new ServiceCenterEmbedPage();