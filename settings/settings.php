<?php
class ServiceCenterSettingsPage
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
      $this->key = 'service-center-settings';
      $this->fields = null;
    }

    // create custom plugin settings menu
    

    public function create_menu() {

      add_submenu_page( 
          'service-center',
          'Settings',
          'Settings',
          'edit_proud_options',
          $this->key,
          array($this, 'settings_page')
      );
    }

    private function build_fields(  ) {
      $geojson_url = 'http://geojson.io/#map=14/'. get_option('lat', '0') .'/'. get_option('lng', '0');
      $services_local = array(
        'garbage' => 'Garbage',
        'recycling' => 'Recycling',
        'police' => 'Police Department',
        'fire' => 'Fire Department',
        'school' => 'School',
        'example' => 'Example Services'
      );
      $services_local_fields = [
        'local_services' => [
          '#type' => 'checkboxes',
          '#title' => __pcHelp('Active Local Services'),
          '#description' => __pcHelp('For each Local Service, you will need to upload or <a href="'. $geojson_url .'" target="_blank">create a GeoJSON GIS file</a> and upload it below. <a href="https://proudcity.com/support/create" target="_blank">Contact ProudCity support</a> for assistance configuring your Local Services.'),
          '#name' => 'local_services',
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

      $this->fields = [
        'search_provider' => [
          '#type' => 'radios',
          '#title' => __pcHelp('Advanced search provider'),
          '#description' => __pcHelp('The Service Center has built-in autocomplete search.  Users can run an advanced search by hitting the search icon next to the box.  If you are using the Service Center only, select Google. If your website is hosted at proudcity, select Built-in site search.'),
          '#name' => 'search_provider',
          '#options' => [
            'wordpress' => 'Built-in site search',
            'google' => 'Google',
          ],
          '#value' => get_option('search_provider', 'google'),
        ],
        'search_google_site' => [
          '#type' => 'text',
          '#title' => __pcHelp('Google search site domain'),
          '#value' => get_option('search_google_site'),
          '#name' => 'search_google_site',
          '#description' => __pcHelp('Enter the domain of your site, "example.com".  This will limit the Google search to only your websites by appending "site: example.com" to the search term.'),
          '#states' => [
            'visible' => [
              'search_provider' => [
                'operator' => '==',
                'value' => ['google'],
                'glue' => '||'
              ],
            ],
          ],
        ],
      ] + $services_local_fields + [
        // @todo
        /*'service_map_layers' => [
          '#type' => 'checkboxes',
          '#title' => __pcHelp('Service Map Layers'),
          '#name' => 'service_map_layers',
          '#basic_array' => true,
          '#options' => $this->map_layer_options(),
          '#value' => $this->map_layer_select( get_option('service_map_layers', $this->map_layer_built_in() )),
        ],*/
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

    private function map_layer_built_in() {
      return [
        [
          'type' => 'transit',
          'icon' => 'fa-train',
          'title' => 'Public Transit',
        ],
        [
          'type' => 'bicycle',
          'icon' => 'fa-bicycle',
          'title' => 'Bicycle Routes',
        ],
        [
          'type' => 'traffic',
          'icon' => 'fa-car',
          'title' => 'Traffic',
        ],
      ];
    }

    private function map_layer_options() {
      $options = [];
      return $this->map_layer_select($this->map_layer_built_in(), true);
    }

    private function map_layer_select($value, $labels = false) {
      $out = [];
      foreach ($value as $item) {
        if ($labels) {
          $out[json_encode($item)] = $item['title'];
        }
        else {
          array_push($out, json_encode($item));
        }
      }
      return $out;
    }

    private function map_layer_values($value) {
      $out = [];
      $value = gettype($value) == 'string' ? [$value] : $value;
      foreach ($value as $item) {
        print($item);
        array_push($out, json_decode($item));
      }
      return $out;
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
      // @todo
      //update_option( 'service_map_layers', $this->map_layer_values($values['service_map_layers']) );
    }
}

if( is_admin() )
    $proud_service_center_settings_page = new ServiceCenterSettingsPage();