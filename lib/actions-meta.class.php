<?php 
/**
 * @author ProudCity
 */
namespace Proud\ActionsApp;

// Attach actions metabox
class ActionsMeta extends \ProudMetaBox {

  public $options = [  // Meta options, key => default   
    'type' => '',
    'link' => '',
    'form' => '',
    'icon' => ''
  ];

  public function __construct() {
    parent::__construct( 
      'service_center_tab', // key
      'Tab information', // title
      'service_center_tab', // screen
      'normal',  // position
      'high' // priority
    );
  }

  /**
   * Called on form creation
   * @param $displaying : false if just building form, true if about to display
   * Use displaying:true to do any difficult loading that should only occur when
   * the form actually will display
   */
  public function set_fields( $displaying ) {
    
    // Already set, no loading necessary
    if( $displaying ) {
      return;
    }

    $this->fields = [];

    $this->fields['type'] = [
      '#type' => 'radios',
      '#title' => __('Type'),
      //'#description' => __('The type of search to fallback on when users don\'t find what they\'re looking for in the autosuggest search and make a full site search.', 'proud-settings'),
      '#name' => 'type',
      '#options' => array(
        'content' => __( 'Content' ),
        'gravityform' => __( 'Form' ),
        'link' => __( 'External link' ),
      ),
      '#default_value' => 'content',
    ];

    $this->fields['link'] = [
      '#type' => 'text',
      '#title' => __('URL'),
      '#description' => __('Enter the full url that should load when this tab is clicked.'),
      '#name' => 'link',
      '#states' => [
        'visible' => [
          'type' => [
            'operator' => '==',
            'value' => ['link'],
            'glue' => '||'
          ],
        ],
      ],
    ];
  
    $this->fields['form'] = [
      '#type' => 'gravityform',
      '#title' => __('Form'),
      '#description' => __('Select a form. <a href="admin.php?page=gf_edit_forms" target="_blank">Create a new form</a>.'),
      '#name' => 'form',
      '#states' => [
        'visible' => [
          'type' => [
            'operator' => '==',
            'value' => ['gravityform'],
            'glue' => '||'
          ],
        ],
      ],
    ];

    $this->fields['icon'] = [
      '#type' => 'fa-icon',
      '#title' => __('Icon'),
      '#description' => __('Selete the icon to use in the Actions app'),
      '#name' => 'icon',
    ];

    return $this->fields;
  }
}

if( is_admin() )
  new ActionsMeta;