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
  RichText,
  MediaUpload,
  MediaUploadCheck,
} = wp.blockEditor;

const {
  Button,
	IconButton,
	PanelBody,
	TextControl,
  TextareaControl,
  SelectControl,
  RangeControl,
  ToggleControl
} = wp.components;

const {
  Fragment,
} = wp.element


registerBlockType( 'cgb/icon-repeater-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Icon Repeater Block' ), // Block title.
	icon: 'grid-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Skywalker Blocks' ),
		__( 'Icon Repeater Block' ),
    __( 'Repeater Block'),
		__( 'Skywalker' ),
	],
  description: 'Add a list with Icons and a Title',

  attributes: {
    sectionTitle: {
      type:'string',
      default: 'Section Title'
    },
    paddingTop: {
      type:'boolean',
      default:true
    },
    paddingBottom: {
      type:'boolean',
      default:true
    },
		iconLists: {
			type: 'array',
			default: [],
		},
    alignment: {
      type:'string',
      default:'align-center'
    },
    container: {
      type:'string',
      default:''
    },
    numColumns: {
      type:'number',
      default:3
    },
    backgroundColor: {
      type:'string',
      default:'theme-default'
    }
	},

	edit:( props ) => {

    const handleAddLocation = () => {
         const iconLists = [ ...props.attributes.iconLists ];
         iconLists.push( {
             title: '',
             imgUrl: '',
             text: ''
         });
         props.setAttributes( { iconLists } );
     };

     const ALLOWED_MEDIA_TYPES = ['image'];

     const handleSelectImage = ( iconList, index ) => {
       const iconLists = [ ...props.attributes.iconLists ];
       iconLists[ index ].imgUrl = iconList.sizes.full.url;
       props.setAttributes( { iconLists } );
     }

     const handleRemoveLocation = ( index ) => {
         const iconLists = [ ...props.attributes.iconLists ];
         iconLists.splice( index, 1 );
         props.setAttributes( { iconLists } );
     };

     const handleLocationChange = ( iconList, index ) => {
         const iconLists = [ ...props.attributes.iconLists ];
         iconLists[ index ].title = iconList;
         props.setAttributes( { iconLists } );
     };

     const handleTextChange = ( iconList, index ) => {
         const iconLists = [ ...props.attributes.iconLists ];
         iconLists[ index ].text = iconList;
         props.setAttributes( { iconLists } );
     };

     // Subtitle Alignment

     const blockAlignment = [
       {label: 'Left Align', value:'align-left'},
       {label: 'Center Align', value:'align-center'},
       {label: 'Right Align', value:'align-right'},
     ]

     const containerSizes = [
       {label: 'None', value:''},
       {label: 'Contain Small', value:'skywalker-container-800'},
       {label: 'Contain Large', value:'skywalker-container-1200'}
     ]

     const bgColors = [
       {label: 'Default', value:'icon-theme-default'},
       {label: 'Primary', value:'icon-theme-primary'},
       {label: 'Secondary', value:'icon-theme-secondary'}
     ]

     // Padding Toggle

     let pdTop = '';
     let pdBottom = '';

     if(props.attributes.paddingTop == true ){
        pdTop = 'skywalker-padding-top';
     }

     if(props.attributes.paddingBottom == true ){
        pdBottom = 'skywalker-padding-bottom';
     }

     let listFields,
         listDisplay;

     if ( props.attributes.iconLists.length ) {
         listFields = props.attributes.iconLists.map( ( title, index ) => {
             return <Fragment key={ index }>
                      <div className="skywalker-panel-row">
                       <div className="skywalker-panel-left">
                         <label className="icon-item-number">{index}</label>
                       </div>
                       <div className="skywalker-panel-right">
                         <TextControl
                             className="icon-list-text-field"
                             placeholder="Enter An Icon Title"
                             value={ props.attributes.iconLists[ index ].title }
                             onChange={ ( title ) => handleLocationChange( title, index ) }
                         />
                         <TextareaControl
                             className="icon-list-text-field"
                             placeholder="Enter An Icon Text"
                             value={ props.attributes.iconLists[ index ].text }
                             onChange={ ( text ) => handleTextChange( text, index ) }
                         />
                         <div className="icon-btn-group">
                         <div className="icon-list-preview">
                         { props.attributes.iconLists[index].imgUrl ? (
                            <img src={props.attributes.iconLists[index].imgUrl}/>
                           ): ''
                         }
                         </div>
                           <MediaUploadCheck>
                               <MediaUpload
                                 className="icon-list-img-upload-btn"
                                 onSelect={( imgUrl ) => handleSelectImage( imgUrl, index )}
                                 allowedTypes={ ALLOWED_MEDIA_TYPES }
                                 label="Upload Icon Image"
                                 render={ ( { open } ) => {
                                   return (
                                        <button
                                           onClick={open}
                                        >
                                        Upload Icon
                                        </button>
                                    );
                                 } }
                               />
                           </MediaUploadCheck>
                         </div>
                         <Button
                             className="icon-remove-item"
                             label="Remove List Item"
                             onClick={ () => handleRemoveLocation( index ) }
                         >
                           { __( 'X REMOVE LIST ITEM' ) }
                         </Button>
                        </div>
                      </div>
                   </Fragment>;
         } );

         listDisplay = props.attributes.iconLists.map( ( iconList, index ) => {
             return (
                 <div className={"skywalker-icon-col " + "skywalker-col-" + props.attributes.numColumns } key={ index }>
                   <div className="skywalker-icon-col-left">
                     <img src={iconList.imgUrl}/>
                   </div>
                   <div className="skywalker-icon-col-right">
                      <h3>{iconList.title}</h3>
                      <p>{iconList.text}</p>
                   </div>
                </div>
             )
         } );
     }

     return [
         <InspectorControls key="1">
            <PanelBody title={ __( 'Icon List Options' ) }>
               <TextControl
                   className="grf__location-address"
                   placeholder="Enter An Icon Title"
                   value={ props.attributes.sectionTitle }
                   onChange={sectionTitle => props.setAttributes({ sectionTitle: sectionTitle })}
                   label='Section Title'
               />
               <SelectControl
                 label='Title Alignment'
                 value={props.attributes.alignment}
                 options={blockAlignment}
                 onChange={alignment => props.setAttributes({ alignment: alignment })}
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
               <SelectControl
                 label='Block Theme'
                 value={props.attributes.backgroundColor}
                 options={bgColors}
                 onChange={backgroundColor => props.setAttributes({ backgroundColor: backgroundColor })}
               />
               <RangeControl
                    label={"Number Of Columns (" + props.attributes.numColumns  + ")" }
                    value={ props.attributes.numColumns }
                    onChange={numColumns => props.setAttributes({ numColumns: numColumns })}
                    min={ 1 }
                    max={ 4 }
                    step={ 1 }
                />
             </PanelBody>
             <PanelBody title={ __( 'Icon List Items' ) }>
                 { listFields }
                 <Button
                     isDefault
                     onClick={ handleAddLocation.bind( this ) }
                     className="icon-add-list-btn"
                 >
                     { __( '[+] Add List Item' ) }
                 </Button>
             </PanelBody>
         </InspectorControls>,
         <div key="2" className={ props.className + ' ' + props.attributes.alignment + ' ' + props.attributes.backgroundColor + '  ' + pdTop + '  ' + pdBottom }>
             <h2>{ props.attributes.sectionTitle }</h2>
             <div className={props.attributes.container}>
               <div className="skywalker-icon-row">
                { listDisplay }
               </div>
             </div>
         </div>,
     ];
},
save: (props) => {

     let listFields,
         listDisplay;

     // Padding Toggle

     let pdTop = '';
     let pdBottom = '';

     if(props.attributes.paddingTop == true ){
        pdTop = 'skywalker-padding-top';
     }

     if(props.attributes.paddingBottom == true ){
        pdBottom = 'skywalker-padding-bottom';
     }

     listDisplay = props.attributes.iconLists.map( ( iconList, index ) => {
       return (
         <div className={"skywalker-icon-col " + "skywalker-col-" + props.attributes.numColumns } key={ index }>
           <div className="skywalker-icon-col-left">
             <img src={iconList.imgUrl}/>
           </div>
           <div className="skywalker-icon-col-right">
              <h3>{ iconList.title }</h3>
              <p>{iconList.text}</p>
           </div>
        </div>
       )
     } );

     return (
       <div key="2" className={ props.className + ' ' + props.attributes.alignment + ' ' + props.attributes.backgroundColor + '  ' + pdTop + '  ' + pdBottom }>
           <h2>{ props.attributes.sectionTitle }</h2>
           <div className={props.attributes.container}>
             <div className="skywalker-icon-row">
              { listDisplay }
             </div>
           </div>
       </div>
     )
} ,
});
