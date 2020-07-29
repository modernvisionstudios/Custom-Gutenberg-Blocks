/**
 * BLOCK: skywalker-blocks
*/

//  Import CSS.
import './editor.scss';
import './style.scss';
import Swiper from 'swiper';

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
  SelectControl,
  RangeControl,
  ToggleControl
} = wp.components;

const {
  Fragment,
} = wp.element


registerBlockType( 'cgb/logo-slider-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Logo Slider Block' ), // Block title.
	icon: 'grid-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Skywalker Blocks' ),
		__( 'Logo Slider Block' ),
    __( 'Slider Block'),
		__( 'Skywalker' ),
	],
  description: 'Add logos to populate the slider',

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
             imgUrl: ''
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

     let mySwiper = new Swiper('.swiper-container', {
       init: true,
       loop: true,
       pagination: {
         el: '.swiper-pagination',
         clickable: true,
       },
       breakpoints: {

         1024: {
           slidesPerView: 6,
           spaceBetween: 20,
         },
         768: {
           slidesPerView: 2,
           spaceBetween: 40,
         },
         500: {
           slidesPerView: 1,
           spaceBetween: 50,
         },
       }
     });

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
                           { __( 'X REMOVE LOGO SLIDE' ) }
                         </Button>
                        </div>
                      </div>
                   </Fragment>;
         } );

         listDisplay = props.attributes.iconLists.map( ( iconList, index ) => {
             return (
                 <div className="swiper-slide" key={ index }>
                    <img src={iconList.imgUrl}/>
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
                     { __( '[+] Add Logo Slide' ) }
                 </Button>
             </PanelBody>
         </InspectorControls>,
         <div key="2" className={ props.className + ' ' + props.attributes.alignment + ' ' + props.attributes.backgroundColor + '  ' + pdTop + '  ' + pdBottom }>
             <h2>{ props.attributes.sectionTitle }</h2>
             <div className={props.attributes.container}>
               <div className="swiper-container">
                 <div className="swiper-wrapper">
                   { listDisplay }
                 </div>
               </div>
               <div class="swiper-button-prev"></div>
               <div class="swiper-button-next"></div>
            </div>
         </div>,
     ];
},
save: (props) => {

     let listFields,
         listDisplay;

     listDisplay = props.attributes.iconLists.map( ( iconList, index ) => {
       return (
         <div className="swiper-slide" key={ index }>
            <img src={iconList.imgUrl}/>
         </div>
       )
     } );

     // Padding Toggle

     let pdTop = '';
     let pdBottom = '';

     if(props.attributes.paddingTop == true ){
        pdTop = 'skywalker-padding-top';
     }

     if(props.attributes.paddingBottom == true ){
        pdBottom = 'skywalker-padding-bottom';
     }

     let mySwiper = new Swiper('.swiper-container', {
       slidesPerView: 6,
       spaceBetween: 10,
       // init: false,
       pagination: {
         el: '.swiper-pagination',
         clickable: true,
       },
       breakpoints: {
         1024: {
           slidesPerView: 4,
           spaceBetween: 20,
         },
         768: {
           slidesPerView: 2,
           spaceBetween: 40,
         },
         500: {
           slidesPerView: 1,
           spaceBetween: 50,
         },
       }
     });


     return (
       <div key="2" className={ props.className + ' ' + props.attributes.alignment + ' ' + props.attributes.backgroundColor + '  ' + pdTop + '  ' + pdBottom }>

         <h2>{ props.attributes.sectionTitle }</h2>
         <div className={props.attributes.container}>
           <div className="swiper-container">
             <div className="swiper-wrapper">
               { listDisplay }
             </div>
           </div>
           <div class="swiper-button-prev"></div>
           <div class="swiper-button-next"></div>
         </div>
       </div>
     )
} ,
});
