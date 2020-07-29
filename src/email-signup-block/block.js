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
  TextControl
} = wp.components;

const {
  Fragment,
} = wp.element


registerBlockType( 'cgb/email-signup-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'E-Mail Signup Block' ), // Block title.
	icon: 'grid-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Skywalker Blocks' ),
		__( 'E-Mail Signup Block' ),
    __( 'E-Mail Signup'),
		__( 'Skywalker' ),
	],
  description: 'Dynamic Mailchimp Signup Block',

  attributes: {
    emailType: {
      type:'string'
    },
    formTitle: {
      type:'string',
      default:'Enter A Title'
    },
    linkBtnLabel: {
      type:'string',
      default:'Subscribe'
    },
    container: {
      type:'string',
      default:''
    },
  },

	edit:( props ) => {

    const containerSizes = [
      {label: 'None', value:''},
      {label: 'Contain Small', value:'skywalker-container-800'},
      {label: 'Contain Large', value:'skywalker-container-1200'}
    ]

		return (
		  <Fragment>
        <InspectorControls>
        <PanelBody
                title={ __( 'E-Mail Block Attributes' ) }
                initialOpen={ true }
            >
            <TextControl
               value={props.attributes.formTitle}
               onChange={formTitle => props.setAttributes({ formTitle: formTitle })}
               label='Block Title'
            />
            <TextControl
               value={props.attributes.linkBtnLabel}
               onChange={linkBtnLabel => props.setAttributes({ linkBtnLabel: linkBtnLabel })}
               label='Submit Button Text'
            />

            <SelectControl
              value={props.attributes.formNum}
              className="gbs-block-inspected-inspector-control-field"
              options={[{label:'Form 1', value:1}]}
              onChange={formNum => props.setAttributes({ formNum: formNum })}
              label='Select A Form'
            />

            <SelectControl
              label='Block Container'
              value={props.attributes.container}
              options={containerSizes}
              onChange={container => props.setAttributes({ container: container })}
            />

            </PanelBody>
        </InspectorControls>
        <ServerSideRender
          block="cgb/email-signup-block"
          attributes={props.attributes}
          className={props.className}
        />
      </Fragment>
		);
	},

	save: () => null ,
} );
