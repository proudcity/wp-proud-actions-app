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
          'search_provider' => 'wordpress',
          'search_google_site' => '',
          'search_additional' => '',
          'search_granicus_site' => '',
          'search_granicus_link_local' => '',
          'services_local' => '',
          'services_map' => '',
          'active_toolbar_buttons' => [ 
            'answers' => 'answers', 
            'payments' => 'payments', 
            'report' => 'report' 
          ],
          '311_service' => '',
          '311_link_create' => '',
          '311_link_status' => ''
        ],
        9 // Weight
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
        'search_additional' => [
          '#type' => 'checkboxes',
          '#title' => __pcHelp('Search addons'),
          '#options' => [
            'granicus' => 'Granicus',
            //'municode' => 'MuniCode',
          ],
        ],
        'search_granicus_site' => [
          '#type' => 'text',
          '#title' => __pcHelp('Granicus Site'),
          '#description' => __pcHelp('Enter your granicus portal site. Example: cityofproudcity.granicus.com'),
          '#states' => [
            'visible' => [
              'search_additional' => [
                'operator' => '==',
                'value' => ['granicus'],
                'glue' => '||'
              ],
            ],
          ],
        ],
        'search_granicus_link_local' => [
          '#type' => 'text',
          '#title' => __pcHelp('Granicus Local Page'),
          '#description' => __pcHelp('A local granicus page you would like to appear in granicus search'),
          '#states' => [
            'visible' => [
              'search_additional' => [
                'operator' => '==',
                'value' => ['granicus'],
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
              '#title' => 'Type of service',
              '#type' => 'radios',
              //'#default_value' => 'gis',
              '#options' => array(
                'hours' => 'Hours',
                'gis' => 'GeoJSON GIS file',
                'csv' => 'CSV (Comma Separated Values) file',
              ),
              '#description' => __pcHelp('For each Local Service, you will need to upload a CSV (Comma Separated Values) or <a href="'. $geojson_url .'" target="_blank">GeoJSON GIS</a> file and upload it below. <a href="https://proudcity.com/support/create" target="_blank">Contact ProudCity support</a> for assistance configuring your Local Services.')
            ],
            'hours' => [
              '#title' => 'Hours',
              '#type' => 'textarea',
              '#description' => __pcHelp('Enter one day (or range of days separated by a dash) per line.  Note that times must include the minutes (8:00am is good; 8am is bad). Examples:<br/>Monday: 8:00am - 6:00pm<br/>Tuesday - Friday: 8:00AM-5:00PM<br/>Saturday-Sunday: Closed'),
              '#default_value' => '',
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
            'disable_currently' => [
              '#type' => 'checkbox',
              '#title' => __pcHelp('Hide current info'),
              '#return_value' => '1',
              '#label_above' => true,
              '#replace_title' => __pcHelp( 'Do not show the "Currently: Open/Closed" information' ),
            ],
            'address' => [
              '#title' => 'Address',
              '#type' => 'text',
              '#default_value' => '',
              '#description' => __pcHelp('Just the street address.'),
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
            'phone' => [
              '#title' => 'Phone number',
              '#type' => 'text',
              '#default_value' => '',
              '#states' => [
                'visible' => [
                  'type' => [
                    'operator' => '==',
                    'value' => ['hours', 'gis', 'csv'],
                    'glue' => '||'
                  ],
                ],
              ],
            ],
            'questions' => [
              '#title' => 'Contact form',
              '#type' => 'gravityform',
              '#default_value' => '',
              '#states' => [
                'visible' => [
                  'type' => [
                    'operator' => '==',
                    'value' => ['hours', 'gis', 'csv'],
                    'glue' => '||'
                  ],
                ],
              ],
            ],
            'file_location' => [
              '#title' => __( 'File location', 'wp-proud-core' ),
              '#type' => 'radios',
              '#default_value'  => 'upload',
              //'#description' => 'Select a CSV or GeoJSON (.json or .geojson) file.',
              '#options' => [
                'upload' => 'Upload',
                'url' => 'Enter URL to remote file',
              ],
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
            'file' => [
              '#title' => __( 'File', 'wp-proud-core' ),
              '#type' => 'select_media',
              '#default_value'  => '',
              '#description' => 'Select a CSV or GeoJSON (.json or .geojson) file.',
              '#states' => [
                'visible' => [
                  'type' => [
                    'operator' => '==',
                    'value' => ['gis', 'csv'],
                    'glue' => '||'
                  ],
                  'file_location' => [
                    'operator' => '==',
                    'value' => ['upload'],
                    'glue' => '||'
                  ],
                ],
              ],
            ],
            'file_url' => [
              '#title' => 'URL to remote file',
              '#type' => 'text',
              '#default_value' => '',
              '#description' => 'Enter the full url to the CSV or GeoJSON (.json or .geojson) file (including https:// or http://).',
              '#states' => [
                'visible' => [
                  'type' => [
                    'operator' => '==',
                    'value' => ['gis', 'csv'],
                    'glue' => '||'
                  ],
                  'file_location' => [
                    'operator' => '==',
                    'value' => ['url'],
                    'glue' => '||'
                  ],
                ],
              ],
            ],
            'pattern' => [
              '#title' => 'Address pattern',
              '#type' => 'text',
              '#default_value' => '',
              '#description' => 'Enter a field or combination of fields to use to match the street address. Wrap the column headers from the first row in curly brackets. Examples:<br/>{STREET_NUM} {STREET}<br/>{street addresss}',
              '#states' => [
                'visible' => [
                  'type' => [
                    'operator' => '==',
                    'value' => ['csv'],
                    'glue' => '||'
                  ],
                ],
              ],
            ],
            'items' => [
              '#title' => 'Field mapping',
              '#type' => 'textarea',
              '#default_value' => '',
              '#description' => 'Enter one per line as key|label. For CSV files, the key is the column header from the first line. For GeoJSON files, the key is the attribute key in the Feature Properties. The label is the text you want to display in the front end. Example:<br/>GARBAGE|Trash pick-up</br>RECYCLING|Recycling pick up',
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
              '#title' => 'Alert message',
              '#type' => 'textarea',
              '#default_value' => '',
              '#description' => 'This could include information about service interruptions due to holidays, or other similar temporary service status alert notices.',
            ],
            'disclaimer' => [
              '#title' => 'Disclaimer',
              '#type' => 'textarea',
              '#default_value' => '',
              '#description' => 'Appears as a button in the right sidebar.',
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
          ],
        ],
        'services_map' => [
          '#title' => __( 'Service Map Layers', 'wp-proud-core' ),
          '#type' => 'checkboxes',
          '#draggable' => true,
          '#options' => $this->map_layer_options(),
        ],
        /*'services_map' => [
          '#title' => __( 'Service Map Layers', 'wp-proud-core' ),
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
              '#title' => 'Type of map',
              '#type' => 'radios',
              '#default_value' => 'layer',
              '#options' => array(
                'layer' => 'Select map layer',
                'traffic' => 'Traffic',
                'bicycle' => 'Bicycle routes',
                'transit' => 'Public transit',
              ),
              //'#description' => __pcHelp('')
            ],
            'layer' => [
              '#title' => 'Map layer',
              '#type' => 'select',
              '#options' => $layers,
              '#states' => [
                'visible' => [
                  'type' => [
                    'operator' => '==',
                    'value' => ['layer'],
                    'glue' => '||'
                  ],
                ],
              ],
            ],
          ],
        ],*/
        'services_elected_text' => [
          '#type' => 'textarea',
          '#title' => 'Elected official text',
          '#description' => 'Useful for creating a link to a list of city council members, etc.'
        ],
        'weather_alert' => [
          '#type' => 'textarea',
          '#title' => 'Weather alert',
          '#description' => 'May include links and more to weather information.'
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

    private function map_layer_options( $filter = null ) {
      $options = [];

      foreach ( Proud\ActionsApp\ActionsApp::map_layers( $filter, false ) as $key => $item ) {
        $options[$item['slug']] = $item['title'];
      }
      return $options;
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
    }
}

if( is_admin() )
    $proud_service_center_settings_page = new ServiceCenterSettingsPage();