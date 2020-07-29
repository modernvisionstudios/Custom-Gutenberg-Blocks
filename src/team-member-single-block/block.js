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


registerBlockType( 'cgb/team-member-single-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Team Member Single Block' ), // Block title.
	icon: 'grid-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Skywalker Blocks' ),
		__( 'Team Member Single' ),
    __( 'RTeam Member Single Block'),
		__( 'Skywalker' ),
	],
  description: 'Add a list with Icons and a Title',

  attributes: {
    sectionTitle: {
      type:'string',
      default: 'Team Member'
    },
    sectionSubtitle: {
      type:'string',
      default:'Position'
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
    listTitle: {
      type: 'string',
      default: 'Enter List Title'
    },
    alignment: {
      type:'string',
      default:'align-center'
    },
    container: {
      type:'string',
      default:''
    },
    backgroundColor: {
      type:'string',
      default:'theme-default'
    },
    backgroundImage: {
      type: 'string',
      default: 'http://placehold.it/600'
    },
	},

	edit:( props ) => {

    const handleAddLocation = () => {
         const iconLists = [ ...props.attributes.iconLists ];
         iconLists.push( {
             listItem:'',
         });
         props.setAttributes( { iconLists } );
     };


     const handleRemoveItem = ( index ) => {
         const iconLists = [ ...props.attributes.iconLists ];
         iconLists.splice( index, 1 );
         props.setAttributes( { iconLists } );
     };

     const handleListItemChange = ( iconList, index ) => {
         const iconLists = [ ...props.attributes.iconLists ];
         iconLists[ index ].listItem = iconList;
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
       {label: 'Default', value:'theme-default'},
       {label: 'Primary', value:'theme-primary'},
       {label: 'Secondary', value:'theme-secondary'}
     ]

     const inlineBackground = {
        backgroundImage:`url(${props.attributes.backgroundImage})`,
     }

     // Background Image Controls
     const ALLOWED_MEDIA_TYPES = ['image'];

     const selectImage = (value) => {
        console.log(value);
        props.setAttributes({
            backgroundImage: value.sizes.full.url,
        })
     }

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
                             placeholder="Title"
                             value={ props.attributes.iconLists[ index ].listItem }
                             onChange={ ( listItem ) => handleListItemChange( listItem, index ) }
                         />
                         <Button
                             className="icon-remove-item"
                             label="Remove List Item"
                             onClick={ () => handleRemoveItem( index ) }
                         >
                           { __( 'X REMOVE LIST ITEM' ) }
                         </Button>
                        </div>
                      </div>
                   </Fragment>;
         } );

         listDisplay = props.attributes.iconLists.map( ( iconList, index ) => {
             return (
                 <li className={"skywalker-li-item"} key={ index }>
                   {iconList.listItem}
                </li>
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
               <TextControl
                   className="grf__location-address"
                   placeholder="Enter An Icon Title"
                   value={ props.attributes.sectionSubtitle }
                   onChange={sectionSubtitle => props.setAttributes({ sectionSubtitle: sectionSubtitle })}
                   label='Section Subtitle'
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
               <SelectControl
                 label='Block Theme'
                 value={props.attributes.backgroundColor}
                 options={bgColors}
                 onChange={backgroundColor => props.setAttributes({ backgroundColor: backgroundColor })}
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
               <MediaUploadCheck>
                   <MediaUpload
                     onSelect={selectImage}
                     allowedTypes={ ALLOWED_MEDIA_TYPES }
                     render={ ( { open } ) => {
                       return (
                            <button onClick={open}>
                                <img
                                    src={props.attributes.backgroundImage}
                                    />
                            </button>
                        );
                     } }
                   />
               </MediaUploadCheck>
             </PanelBody>
             <PanelBody title={ __( 'Icon List Items' ) }>
                 <TextControl
                     className="grf__location-address"
                     placeholder="Enter An Icon Title"
                     value={ props.attributes.listTitle }
                     onChange={listTitle => props.setAttributes({ listTitle: listTitle })}
                     label='List Title'
                 />
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
             <h2>
               <span class="skywalker-single-post-title">{ props.attributes.sectionTitle }</span>
               <span class="skywalker-single-post-subtitle">
                {props.attributes.sectionSubtitle}
               </span>
             </h2>
             <div className={props.attributes.container}>
               <div className="skywalker-row">
                <div className="skywalker-col">
                   <div className="team-block-image" style={inlineBackground} ></div>
                </div>
                <div className="skywalker-col">
                  <ul className="skywalker-team-list-info">
                   <li className="skywalker-li-title">{props.attributes.listTitle}</li>
                   { listDisplay }
                  </ul>
                </div>
               </div>
             </div>
         </div>,
     ];
},
save: (props) => {

     let listFields,
         listDisplay;

     const inlineBackground = {
        backgroundImage:`url(${props.attributes.backgroundImage})`,
     }

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
         <li className={"skywalker-li-item"} key={ index }>
           {iconList.listItem}
        </li>
       )
     } );

     return (
       <div key="2" className={ props.className + ' ' + props.attributes.alignment + ' ' + props.attributes.backgroundColor + '  ' + pdTop + '  ' + pdBottom }>
       <h2>
         <span class="skywalker-single-post-title">{ props.attributes.sectionTitle }</span>
         <span class="skywalker-single-post-subtitle">
          {props.attributes.sectionSubtitle}
         </span>
       </h2>
       <div className={props.attributes.container}>
         <div className="skywalker-row">
          <div className="skywalker-col">
             <div className="team-block-image" style={inlineBackground} ></div>
          </div>
          <div className="skywalker-col">
            <ul className="skywalker-team-list-info">
             <li className="skywalker-li-title">{props.attributes.listTitle}</li>
             { listDisplay }
            </ul>
          </div>
         </div>
       </div>
       </div>
     )
} ,
});
