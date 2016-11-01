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
      add_action( 'admin_menu', array($this, 'create_menu') );
      $this->key = 'service-center';
      $this->fields = null;
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
        $this->key, array($this, 'settings_page'), 
        plugins_url('/images/icon.png', __FILE__) 
      );

      $this->options = [
        'local_services',
        '311_service',
        '311_link_create',
        '311_link_status',
      ];
    }

    private function build_fields(  ) {
      $geojson_url = 'http://geojson.io/#map=14/'. get_option('lat', '0') .'/'. get_option('lng', '0');
      $services_local = array(
        'garbage' => 'Garbage',
        'recycling' => 'Recycling',
        'police' => 'Police Department',
        'fire' => 'Fire Department',
        'school' => 'School',
      );
      $services_local_fields = [
        'local_services' => [
          '#type' => 'checkboxes',
          '#title' => __pcHelp('Active Local Services'),
          '#description' => __pcHelp('For each Local Service, you will need to upload or <a href="'. $geojson_url .'" target="_blank">create a GeoJSON GIS file</a> and upload it below. <a href="https://proudcity.com/support/create" target="_blank">Contact ProudCity support</a> for assistance configuring your Local Services.'),
          '#name' => '311_service',
          '#options' => $services_local,
          '#value' => get_option('local_services', [])
        ]
      ];
      foreach ($services_local as $key => $value) {
        // @todo: make this work
        /*$services_local_fields[$key] = [
          '#type' => 'select_media',
          '#title' => __pcHelp("$value GeoJSON file"),
          '#value' => $service_local_value[$key],
        ];*/
      }
      $services_311 = array(
        'seeclickfix' => __pcHelp( 'SeeClickFix' ),
        'link' => __pcHelp( 'Link out to other provider' ),
      );
      if ( is_plugin_active('wp-proud-issue/wp-proud-issue.php') ) {
        $services_311 = array_merge(array('wordpress' => __pcHelp( 'Custom categories')), $services_311);
      }
      $this->fields = $services_local_fields + [
        '311_service' => [
          '#type' => 'radios',
          '#title' => __pcHelp('Issues (311) provider'),
          '#name' => '311_service',
          '#options' => $services_311,
          '#value' => get_option('311_service', 'seeclickfix')
        ],
        '311_link_create' => [
          '#type' => 'text',
          '#title' => __pcHelp('Create issue URL'),
          '#value' => get_option('311_link_create'),
          '#name' => '311_link_create',
          '#states' => [
            'visible' => [
              '311_service' => [
                'operator' => '==',
                'value' => ['link'],
                'glue' => '||'
              ],
            ],
          ],
        ],
        '311_link_status' => [
          '#type' => 'text',
          '#title' => __pcHelp('Lookup issue URL'),
          '#value' => get_option('311_link_status'),
          '#name' => '311_link_status',
          '#states' => [
            'visible' => [
              '311_service' => [
                'operator' => '==',
                'value' => ['link'],
                'glue' => '||'
              ],
            ],
          ],
        ],

      ];
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
      echo '<h2>ProudCity Service Center</h2>';
      echo '<h4>Your Service Center appears on your website, in Facebook, as a mobile app, or at a kiosk. Manage global settings on this page, and configure the Service Center everywhere it appears using the links on the left.</h4>';
      $form->printForm ([
        'button_text' => __pcHelp('Save'),
        'method' => 'post',
        'action' => '',
        'name' => $this->key,
        'id' => $this->key,
      ]);

    }

    public function save($values) {
      $this->build_fields( );
      foreach ($this->options as $key) {
        // If checkbox, and no value, set to 0
        if($this->fields[$key]['#type'] === 'checkbox' && !isset( $values[$key] ) ) {
          $values[$key] = 0;
        }
        if (isset($values[$key])) {
          // @todo: we should have this go through something like wp_kses_data() for embed code
          $value = esc_attr( $values[$key] );
          update_option( $key, $value );
        }
      }
    }
}

if( is_admin() )
    $proud_service_center_page = new ServiceCenterPage();