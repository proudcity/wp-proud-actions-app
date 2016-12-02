<?php
class ServiceCenterSettingsPage extends ProudSettingsPage
{

    /**
     * Start up
     */
    public function __construct()
    {
      parent::__construct(
        'service-center-settings', // Key
        [ // Submenu settings
          'parent_slug' => 'service-center',
          'page_title' => 'Settings',
          'menu_title' => 'Settings',
          'capability' => 'edit_proud_options',
        ],
        '', // Option
        [ // Options
          'search_provider' => '',
          'search_google_site' => '',
          'services_local' => '',
          'services_hours' => '', 
          'active_toolbar_buttons' => [ 
            'answers' => 'answers', 
            'payments' => 'payments', 
            'report' => 'report' 
          ],
          '311_service' => '',
          '311_link_create' => '',
          '311_link_status' => ''
        ] 
      );
    }

    /** 
     * Set form fields
     */
    public function set_fields() {
      $geojson_url = 'http://geojson.io/#map=14/'. get_option('lat', '0') .'/'. get_option('lng', '0');
      /*$services_local = array(
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
        $services_local_fields[$key] = [
          '#type' => 'select_media',
          '#title' => __pcHelp("$value GeoJSON file"),
          '#value' => $service_local_value[$key],
        ];
      }*/
      $services_311 = array(
        'seeclickfix' => __pcHelp( 'SeeClickFix' ),
        'link' => __pcHelp( 'Link out to other provider' ),
      );
      if ( is_plugin_active( 'wp-proud-issue/wp-proud-issue.php' ) ) {
        $services_311 = array_merge(
          array(
            'wordpress' => __pcHelp( 'Custom categories' )
          ), 
          $services_311
        );
      }

      $this->fields = [
        'search_provider' => [
          '#type' => 'radios',
          '#title' => __pcHelp('Advanced search provider'),
          '#description' => __pcHelp('The Service Center has built-in autocomplete search.  Users can run an advanced search by hitting the search icon next to the box.  If you are using the Service Center only, select Google. If your website is hosted at proudcity, select Built-in site search.'),
          '#options' => [
            'wordpress' => 'Built-in site search',
            'google' => 'Google',
          ],
        ],
        'search_google_site' => [
          '#type' => 'text',
          '#title' => __pcHelp('Google search site domain'),
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
        'services_local' => [
          '#title' => __( 'Local Services', 'wp-proud-core' ),
          '#type' => 'group',
          '#group_title_field' => 'title',
          '#sub_items_template' => [
            'title' => [
              '#title' => 'Section title',
              '#type' => 'text',
              '#default_value' => '',
              '#to_js_settings' => false
            ],
            'icon' => [
              '#title' => 'Icon',
              '#type' => 'fa-icon',
              '#default_value' => '',
              '#to_js_settings' => false
            ],
            'type' => [
              '#title' => 'File type',
              '#type' => 'radios',
              '#default_value' => 'gis',
              '#options' => array(
                'hours' => 'Hours',
                'gis' => 'GeoJSON GIS file',
                'csv' => 'CSV (Comma Separated Values) file',
              ),
              '#description' => __pcHelp('For each Local Service, you will need to upload a CSV (Comma Separated Values) or <a href="'. $geojson_url .'" target="_blank">GeoJSON GIS</a> file and upload it below. <a href="https://proudcity.com/support/create" target="_blank">Contact ProudCity support</a> for assistance configuring your Local Services.')
            ],
            'hours' => [
              '#title' => 'Hours',
              '#type' => 'radios',
              '#default_value' => 'gis',
              '#options' => array(
                'gis' => 'GeoJSON GIS file',
                'csv' => 'CSV (Comma Separated Values) file',
              ),
              '#description' => __pcHelp('For each Local Service, you will need to upload a CSV (Comma Separated Values) or <a href="'. $geojson_url .'" target="_blank">GeoJSON GIS</a> file and upload it below. <a href="https://proudcity.com/support/create" target="_blank">Contact ProudCity support</a> for assistance configuring your Local Services.'),
              '#states' => [
                'visible' => [
                  'type' => [
                    'operator' => '==',
                    'value' => ['hours'],
                    'glue' => '||'
                  ],
                ],
              ],
            ],
            'file' => [
              '#title' => __( 'File', 'wp-proud-core' ),
              '#type' => 'select_media',
              '#default_value'  => '',
              '#states' => [
                'visible' => [
                  'type' => [
                    'operator' => '==',
                    'value' => ['gis', 'csv'],
                    'glue' => '||'
                  ],
                ],
              ],
            ],
            'alert' => [
              '#title' => 'Status alert notice',
              '#type' => 'text',
              '#default_value' => '',
              '#description' => 'This could include information about service interruptions due to holidays, or other similar temporary service status alert notices.',
              '#to_js_settings' => false
            ],
          ],
        ],
        'services_hours' => [
          '#title' => __( 'Now Services', 'wp-proud-core' ),
          '#type' => 'group',
          '#group_title_field' => 'title',
          '#sub_items_template' => [
            'title' => [
              '#title' => 'Section title',
              '#type' => 'text',
              '#default_value' => '',
              '#to_js_settings' => false
            ],
            'icon' => [
              '#title' => 'Icon',
              '#type' => 'fa-icon',
              '#default_value' => '',
              '#to_js_settings' => false
            ],
            
            'alert' => [
              '#title' => 'Status alert notice',
              '#type' => 'text',
              '#default_value' => '',
              '#description' => 'This could include information about service interruptions due to holidays, or other similar temporary service status alert notices.',
              '#to_js_settings' => false
            ],
          ],
        ],
        // @todo
        /*'service_map_layers' => [
          '#type' => 'checkboxes',
          '#title' => __pcHelp('Service Map Layers'),
          '#name' => 'service_map_layers',
          '#basic_array' => true,
          '#options' => $this->map_layer_options(),
          '#value' => $this->map_layer_select( get_option('service_map_layers', $this->map_layer_built_in() )),
        ],*/
        'active_toolbar_buttons' => [
          '#type' => 'checkboxes',
          '#title' => 'Active navbar buttons',
          '#description' => 'Choose which buttons you would like to display in the top bar.',
          '#options' => [
            'answers' => __pcHelp( 'Answers' ), 
            'payments' => __pcHelp( 'Payments' ), 
            'report' => __pcHelp( 'Report Issue' ),
          ],
        ],
        '311_service' => [
          '#type' => 'radios',
          '#title' => __pcHelp('Issues (311) provider'),
          '#options' => $services_311,
        ],
        '311_link_create' => [
          '#type' => 'text',
          '#title' => __pcHelp('Create issue URL'),
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

    /**
     * Print page content
     */
    public function settings_content() {
      ?>
      <h2 class="form-header">ProudCity Service Center</h2>
      <h4 class="form-header">Your Service Center appears on your website, in Facebook, as a mobile app, or at a kiosk. Manage global settings on this page, and configure the Service Center everywhere it appears using the links on the left.</h4>
      <?php

      $this->print_form( );
    }

    /** 
     * Saves form values
     */
    public function save( &$values ) {
      $values = parent::save( $values );
      // @todo
      //update_option( 'service_map_layers', $this->map_layer_values($values['service_map_layers']) );
    }
}

if( is_admin() )
    $proud_service_center_settings_page = new ServiceCenterSettingsPage();