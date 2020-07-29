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
  Button,
	IconButton,
	PanelBody,
	TextControl,
} = wp.components;

const {
  Fragment,
} = wp.element


registerBlockType( 'cgb/repeater-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Repeater Block' ), // Block title.
	icon: 'grid-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Skywalker Blocks' ),
		__( 'Repeater Block' ),
    __( 'Repeater'),
		__( 'Skywalker' ),
	],
  description: 'Add a list of elements',

  attributes: {
		locations: {
			type: 'array',
			default: [],
		},
	},

	edit:( props ) => {

    const handleAddLocation = () => {
         const locations = [ ...props.attributes.locations ];
         locations.push( {
             address: '',
         } );
         props.setAttributes( { locations } );
     };

     const handleRemoveLocation = ( index ) => {
         const locations = [ ...props.attributes.locations ];
         locations.splice( index, 1 );
         props.setAttributes( { locations } );
     };

     const handleLocationChange = ( address, index ) => {
         const locations = [ ...props.attributes.locations ];
         locations[ index ].address = address;
         props.setAttributes( { locations } );
     };

     let locationFields,
         locationDisplay;

     if ( props.attributes.locations.length ) {
         locationFields = props.attributes.locations.map( ( location, index ) => {
             return <Fragment key={ index }>
                 <TextControl
                     className="grf__location-address"
                     placeholder="350 Fifth Avenue New York NY"
                     value={ props.attributes.locations[ index ].address }
                     onChange={ ( address ) => handleLocationChange( address, index ) }
                 />
                 <IconButton
                     className="grf__remove-location-address"
                     icon="no-alt"
                     label="Delete location"
                     onClick={ () => handleRemoveLocation( index ) }
                 />
             </Fragment>;
         } );

         locationDisplay = props.attributes.locations.map( ( location, index ) => {
             return <p key={ index }>{ location.address }</p>;
         } );
     }

     return [
         <InspectorControls key="1">
             <PanelBody title={ __( 'Locations' ) }>
                 { locationFields }
                 <Button
                     isDefault
                     onClick={ handleAddLocation.bind( this ) }
                 >
                     { __( 'Add Location' ) }
                 </Button>
             </PanelBody>
         </InspectorControls>,
         <div key="2" className={ props.className }>
             <h2>Locations</h2>
             { locationDisplay }
         </div>,
     ];
},
save: (props) => {

     let locationFields,
         locationDisplay;

     locationDisplay = props.attributes.locations.map( ( location, index ) => {
         return <p key={ index }>{ location.address }</p>;
     } );

     return (
       <div key="2" className={ props.className }>
           <h2>Locations</h2>
           { locationDisplay }
       </div>
     )
} ,
});
