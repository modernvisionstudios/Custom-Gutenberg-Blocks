/**
 * BLOCK: skywalker-blocks
*/

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
  InspectorControls,
  RichText
} = wp.editor;

const {
  ServerSideRender,
  PanelBody,
  SelectControl,
  RangeControl,
  Button,
	IconButton,
	TextControl,
  TextareaControl,
  ToggleControl,
} = wp.components;

const {
  Fragment,
} = wp.element


registerBlockType( 'cgb/contact-form-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Contact Form Block' ), // Block title.
	icon: 'grid-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Skywalker Blocks' ),
		__( 'Contact Form Blocks' ),
    __( 'Contact Form'),
		__( 'Skywalker' ),
	],
  description: 'Display a gravityforms contact form',

  attributes: {
    formSelect: {
      type:'object',
    },
    paddingTop: {
      type:'boolean',
      default:true
    },
    paddingBottom: {
      type:'boolean',
      default:true
    },
    selectedForm: {
      type:'number',
      default:1
    },
    container: {
      type:'string',
      default:''
    },
    contactInfo: {
      type:'array',
      default: []
    },
  },

	edit:( props ) => {
    // Grab array of Gravity Forms
    if(!props.attributes.formSelect){
      wp.apiFetch({
        path: '/gf/v2/forms'
      }).then(formSelect => {

        props.setAttributes({
          formSelect: formSelect
        })

      });
    }

    // Grab key names
    let newPosts = []

    const posts = props.attributes.formSelect;

    for (let key in posts){
       if(posts.hasOwnProperty(key)){
         newPosts.push({label:`${posts[key].title}`, value:`${posts[key].id}`})
       }
    }

    console.log(newPosts);


    if(!props.attributes.formSelect){
      return 'Loading Posts...'; // Show loading message if no attribute
    }

    if(props.attributes.formSelect && props.attributes.formSelect.length === 0){
      return 'No Forms Found...  Please Create One!'; // Show error if no postTypes for selected Post Type
    }

    const containerSizes = [
      {label: 'None', value:''},
      {label: 'Contain Small', value:'skywalker-container-800'},
      {label: 'Contain Large', value:'skywalker-container-1200'}
    ]

    // Address Repeater

    // Add An Address

    const handleAddAddress = () => {
         const contactInfo = [ ...props.attributes.contactInfo ];
         contactInfo.push({
             email: '',
             phone: '',
             address: '',
         });
         props.setAttributes( { contactInfo } );
     };

     // Remove An Address

     const handleRemoveAddress = ( index ) => {
         const contactInfo = [ ...props.attributes.contactInfo ];
         contactInfo.splice( index, 1 );
         props.setAttributes( { contactInfo } );
     };

     // Handle Changes

     const handleAddressChange = ( contactInfo, index ) => {
         const contactItem = [ ...props.attributes.contactInfo ];
         contactItem[ index ].address = contactInfo;
         props.setAttributes( { contactItem } );
     };

     const handlePhoneChange = ( contactInfo, index ) => {
         const contactItem = [ ...props.attributes.contactInfo ];
         contactItem[ index ].phone = contactInfo;
         props.setAttributes( { contactItem } );
     };

     const handleEmailChange = ( contactInfo, index ) => {
         const contactItem = [ ...props.attributes.contactInfo ];
         contactItem[ index ].email = contactInfo;
         props.setAttributes( { contactItem } );
     };

     console.log(props.attributes);

     let addressFields,
         addressList;

     if ( props.attributes.contactInfo.length ) {
         addressFields = props.attributes.contactInfo.map( ( contact, index ) => {
             return <Fragment key={ index }>
                      <div className="skywalker-panel-row">
                       <div className="skywalker-panel-left">
                         <label className="icon-item-number">{index}</label>
                       </div>
                       <div className="skywalker-panel-right">
                         <TextControl
                             className="icon-list-text-field"
                             placeholder="E-Mail Address"
                             value={ props.attributes.contactInfo[ index ].email }
                             onChange={ ( email ) => handleEmailChange( email, index ) }
                         />
                         <TextControl
                             className="icon-list-text-field"
                             placeholder="Phone Number"
                             value={ props.attributes.contactInfo[ index ].phone }
                             onChange={ ( phone ) => handlePhoneChange( phone, index ) }
                         />
                         <TextareaControl
                             className="icon-list-text-field"
                             placeholder="Address"
                             value={ props.attributes.contactInfo[ index ].address }
                             onChange={ ( address ) => handleAddressChange( address, index ) }
                         />
                         <Button
                             className="icon-remove-item"
                             label="Remove List Item"
                             onClick={ () => handleRemoveAddress( index ) }
                         >
                           { __( 'X REMOVE LIST ITEM' ) }
                         </Button>
                        </div>
                      </div>
                   </Fragment>;
         } );
     }


		return [

        <InspectorControls key="1">
        <PanelBody
                title={ __( 'Contact Form Settings' ) }
                initialOpen={ true }
            >

                <SelectControl
                  value={props.attributes.selectedForm}
                  className="gbs-block-inspected-inspector-control-field"
                  options={newPosts}
                  onChange={selectedForm => props.setAttributes({ selectedForm: selectedForm })}
                  label="Form Select"
                />
                 <SelectControl
                   label='Block Container'
                   value={props.attributes.container}
                   options={containerSizes}
                   onChange={container => props.setAttributes({ container: container })}
                 />
                 <ToggleControl
                     label="Padding Top"
                     help={ props.attributes.paddingTop ? 'Has fixed background.' : 'No fixed background.' }
                     checked={ props.attributes.paddingTop }
                     onChange={paddingTop => props.setAttributes({ paddingTop: paddingTop })}
                 />
                 <ToggleControl
                     label="Padding Bottom"
                     help={ props.attributes.paddingBottom ? 'Has fixed background.' : 'No fixed background.' }
                     checked={ props.attributes.paddingBottom }
                     onChange={paddingBottom => props.setAttributes({ paddingBottom: paddingBottom })}
                 />
            </PanelBody>
            <PanelBody title={ __( 'Address List' ) }>
                { addressFields }
                <Button
                    isDefault
                    onClick={ handleAddAddress.bind( this ) }
                    className="icon-add-list-btn"
                >
                    { __( '[+] Add List Item' ) }
                </Button>
            </PanelBody>
        </InspectorControls>,
        <ServerSideRender
          block="cgb/contact-form-block"
          attributes={props.attributes}
          className={props.className}
        />
		];
	},

	save: () => null ,
} );
