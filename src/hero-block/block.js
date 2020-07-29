/**
 * BLOCK: skywalker-blocks
*/

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { dispatch, select, subscribe } = wp.data;

const {
  InspectorControls,
  RichText,
  URLInput,
  MediaUpload,
  MediaUploadCheck,
} = wp.editor;

const {
  ServerSideRender,
  PanelBody,
  PanelRow,
  SelectControl,
  TextControl,
  TextareaControl,
  FormFileUpload,
  ExternalLink,
  RangeControl,
  RadioControl
} = wp.components;

const {
  Fragment,
} = wp.element


registerBlockType( 'cgb/block-hero-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Hero Block' ), // Block title.
	icon: 'feedback', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Skywalker Blocks' ),
		__( 'Hero Block' ),
		__( 'Skywalker' ),
	],
  attributes: {
    alignment: {
      type:'string',
      default:'align-center'
    },
    title: {
      type:'string',
      default:'Enter A Title'
    },
    subtitle: {
      type:'string',
      default:'Enter A Subtitle'
    },
    linkType: {
      type:'string',
      default:'none'
    },
    linkTitle: {
      type:'string',
    },
    linkUrl: {
      type:'string',
    },
    fileUrl: {
      type: 'string',
      default: 'No File Selected!'
    },
    urlText: {
       type:'string'
    },
    externalLink: {
       type:'string'
    },
    backgroundType: {
      type:'string',
      default:'color'
    },
    backgroundImage: {
      type: 'string',
      default: 'http://placehold.it/300'
    },
    backgroundTextColor: {
      type: 'string',
      default: '000000'
    },
    backgroundPositionX: {
      type:'string'
    },
    backgroundPositionY: {
      type:'string'
    },
    backgroundOverlay: {
      type:'number',
      default:0.0
    },
    backgroundColor: {
      type:'string',
      default:'theme-default'
    }

  },
  edit: ( props ) => {

    // Check Link type
   const selectedLinkType = props.attributes.linkType;

   // Switch Link According To Link Type

   let currentLinkType = '';

   if(selectedLinkType == 'external'){
     currentLinkType = props.attributes.externalLink;
   }

   if(selectedLinkType == 'internal'){
     currentLinkType = props.attributes.linkUrl;
   }

   if(selectedLinkType == 'file'){
     currentLinkType = props.attributes.fileUrl;
   }

   if(selectedLinkType == 'none') {
     currentLinkType = '#';
   }

   // Set Regex Test

   const urlPattern = new RegExp('^(http|https)://');
   let checkedUrl = urlPattern.test(props.attributes.externalLink);
   let validUrl = '';


   if(checkedUrl == !true && selectedLinkType == 'external'){
     validUrl = 'http:// or https:// Required';

     dispatch( 'core/editor' ).lockPostSaving();

   } else {

     dispatch( 'core/editor' ).unlockPostSaving();
   }
   // Select File Link
   const selectFile = (value) => {
      console.log(value);
      props.setAttributes({
          fileUrl: value.title,
      })
   }
   // Background Image Controls
   const ALLOWED_MEDIA_TYPES = ['image'];

   const selectImage = (value) => {
      console.log(value);
      props.setAttributes({
          backgroundImage: value.sizes.full.url,
      })
   }


   let inlineBackground = {background:'none'};
   let colorBackground = '';

   let backgroundType = props.attributes.backgroundType;

   if(backgroundType == 'color'){
       colorBackground = props.attributes.backgroundColor;
   }

   if(backgroundType == 'image'){

     inlineBackground = {
       color:`#${props.attributes.backgroundTextColor}`,
       backgroundPosition: `${props.attributes.backgroundPositionX} ${props.attributes.backgroundPositionY}`,
       backgroundImage: `linear-gradient(rgba(0,0,0,${props.attributes.backgroundOverlay}),
       rgba(0,0,0,${props.attributes.backgroundOverlay})),url(${props.attributes.backgroundImage})`
     }

   }

   // Background Colors
   const bgColors = [
     {label: 'Default', value:'theme-default'},
     {label: 'Primary', value:'theme-primary'},
     {label: 'Secondary', value:'theme-secondary'}
   ]

   const bgPositionValuesX = [
     {label: 'Left', value:'left'},
     {label: 'Center', value:'center'},
     {label: 'Right', value:'right'},
   ]

   const bgPositionValuesY = [
     {label: 'Top', value:'top'},
     {label: 'Center', value:'center'},
     {label: 'Bottom', value:'bottom'},
   ]

   // Block Alignment

   const blockAlignment = [
     {label: 'Left Align', value:'align-left'},
     {label: 'Center Align', value:'align-center'},
     {label: 'Right Align', value:'align-right'},
   ]

   // Background Text Colors

   const backgroundTextList = [
     {label: 'Light', value:'ffffff'},
     {label: 'Dark', value:'000000'},
   ]

   // Container Alignment

   const containerSizes = [
     {label: 'None', value:''},
     {label: 'Contain Small', value:'skywalker-container-800'},
     {label: 'Contain Large', value:'skywalker-container-1200'}
   ]

		return (
      <Fragment>
      <InspectorControls>
      <PanelBody title={ __('Alignment') } initialOpen={ false }>
          <PanelRow>
            <SelectControl
              value={props.attributes.alignment}
              options={blockAlignment}
              onChange={alignment => props.setAttributes({ alignment: alignment })}
            />
          </PanelRow>
        </PanelBody>
        <PanelBody title={ __('Subtitle') } initialOpen={ false }>
            <TextControl
              value={props.attributes.subtitle}
              onChange={subtitle => props.setAttributes({ subtitle: subtitle })}
            />
        </PanelBody>
        <PanelBody title={ __('Title') } initialOpen={ true }>
            <TextControl
               value={props.attributes.title}
               onChange={title => props.setAttributes({ title: title })}
            />
        </PanelBody>
        <PanelBody title={ __('Link Options') } initialOpen={ false }>
          <div>
            <SelectControl
              value={props.attributes.linkType}
              options={ [
                 { label: 'None', value: 'none' },
                 { label: 'Internal', value: 'internal' },
                 { label: 'External', value: 'external' },
                 { label: 'File', value: 'file' },
              ] }
              onChange={linkType => props.setAttributes({ linkType: linkType })}
              label="Link Type"
            />
          </div>
            { selectedLinkType == 'external' ? (
              <div>
                <TextControl
                   placeholder={validUrl}
                   value={props.attributes.externalLink}
                   onChange={
                     externalLink => props.setAttributes({ externalLink: externalLink })
                   }
                   label="External"
                />
                { checkedUrl == !true && selectedLinkType == 'external' ? (
                    <div className={'pd-block-errors'}>
                      URL INVALID (http:// or https://) Required
                    </div>
                  ): ''
                }

              </div>
              ): ''
            }
            { selectedLinkType == 'internal' ? (
              <div>

                <URLInput
                  value={ props.attributes.linkUrl }
                  onChange={ ( linkUrl, post ) => props.setAttributes( { linkUrl, urlText: (post && post.title) || 'Click here' } ) }
                  label="internal"
                />
              </div>
              ): ''
            }
            { selectedLinkType == 'file' ? (
              <div>
                <MediaUploadCheck>
                    <MediaUpload
                      onSelect={selectFile}
                      render={ ( { open } ) => {
                        return (
                             <button
                                onClick={open}
                             >
                             Upload File
                             </button>
                         );
                      } }
                      label="File Link"
                    />
                </MediaUploadCheck>
                {props.attributes.fileUrl}
              </div>
              ): ''
            }
            { selectedLinkType !== 'none' ? (
              <div>
                <TextControl
                   value={props.attributes.linkTitle}
                   onChange={linkTitle => props.setAttributes({ linkTitle: linkTitle })}
                   label="Link Title"
                />
              </div>
              ): ''
            }
        </PanelBody>
        <PanelBody title={ __('Background Options') } initialOpen={ false }>
        <RadioControl
            label="Background Type"
            selected={ props.attributes.backgroundType }
            options={ [
                { label: 'Color', value: 'color' },
                { label: 'Image', value: 'image' },
            ] }
            onChange={backgroundType => props.setAttributes({ backgroundType: backgroundType })}
        />
        { backgroundType == 'color' ? (
          <div>
            <label>Background PositionX</label>
              <SelectControl
                value={props.attributes.backgroundColor}
                options={bgColors}
                onChange={backgroundColor => props.setAttributes({ backgroundColor: backgroundColor })}
            />
          </div>
          ): ''
        }
        { backgroundType == 'image' ? (
            <div>
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
            <label>Background PositionX</label>
            <SelectControl
              value={props.attributes.backgroundPositionX}
              options={bgPositionValuesX}
              onChange={backgroundPositionX => props.setAttributes({ backgroundPositionX: backgroundPositionX })}
            />
            <label>Background PositionY</label>
            <SelectControl
              value={props.attributes.backgroundPositionY}
              options={bgPositionValuesY}
              onChange={backgroundPositionY => props.setAttributes({ backgroundPositionY: backgroundPositionY })}
            />
            <label>Background Text Color</label>
            <SelectControl
              value={props.attributes.backgroundTextColor}
              options={backgroundTextList}
              onChange={backgroundTextColor => props.setAttributes({ backgroundTextColor: backgroundTextColor})}
            />



          <label>Background Overlay</label>
          <RangeControl
               label="Opacity"
               value={ props.attributes.backgroundOverlay }
               onChange={backgroundOverlay => props.setAttributes({ backgroundOverlay: backgroundOverlay })}
               min={ 0.0 }
               max={ 1.0 }
               step={ 0.1 }
           />
        </div>
          ): ''
        }
        </PanelBody>

      </InspectorControls>
			<div className={ props.className }>
         <div className={'skywalker-hero ' + props.attributes.alignment + ' ' + colorBackground} style={inlineBackground}>
           <div className="skywalker-hero-container">
             <h2>
               <span className={'skywalker-hero-subtitle'}>{props.attributes.subtitle}</span>
               <span className={'skywalker-hero-title'}>{props.attributes.title}</span>
             </h2>
             { selectedLinkType !== 'none' ? (
               <a className="skywalker-btn" href={currentLinkType}>{props.attributes.linkTitle}</a>
              ): ''
             }
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.12 42">
             <defs><style></style></defs>
               <g id="Layer_2" data-name="Layer 2">
                 <g id="Layer_1-2" data-name="Layer 1">
                   <path id="Path_33" data-name="Path 33" class="cls-1" d="M30.19,0H12.93V13L5.27,10.76C2.84,10.27,1.62,10.52.53,12c-.85,1.09-.73,2.8.73,4.5L21.56,42l20.3-25.53c1.46-1.7,1.58-3.4.73-4.5-1.09-1.46-2.19-1.7-4.74-1.22l-7.66,2.19Z"/>
                 </g>
               </g>
             </svg>
           </div>
         </div>
			</div>
      </Fragment>
		);
	},

	save: ( props ) => {
    // Check Link type
   const selectedLinkType = props.attributes.linkType;

   // Switch Link According To Link Type

   let currentLinkType = '';

   if(selectedLinkType == 'external'){
     currentLinkType = props.attributes.externalLink;
   }

   if(selectedLinkType == 'internal'){
     currentLinkType = props.attributes.linkUrl;
   }

   if(selectedLinkType == 'file'){
     currentLinkType = props.attributes.fileUrl;
   }

   if(selectedLinkType == 'none') {
     currentLinkType = '#';
   }

   // Set Regex Test

   const urlPattern = new RegExp('^(http|https)://');
   let checkedUrl = urlPattern.test(props.attributes.externalLink);
   let validUrl = '';


   if(checkedUrl == !true && selectedLinkType == 'external'){
     validUrl = 'http:// or https:// Required';

     dispatch( 'core/editor' ).lockPostSaving();

   } else {

     dispatch( 'core/editor' ).unlockPostSaving();
   }
   // Select File Link
   const selectFile = (value) => {
      console.log(value);
      props.setAttributes({
          fileUrl: value.title,
      })
   }
   // Background Image Controls
   const ALLOWED_MEDIA_TYPES = ['image'];

   const selectImage = (value) => {
      console.log(value);
      props.setAttributes({
          backgroundImage: value.sizes.full.url,
      })
   }


   let inlineBackground = {background:'none'};
   let colorBackground = '';

   let backgroundType = props.attributes.backgroundType;

   if(backgroundType == 'color'){
       colorBackground = props.attributes.backgroundColor;
   }

   if(backgroundType == 'image'){

     inlineBackground = {
       color:`#${props.attributes.backgroundTextColor}`,
       backgroundPosition: `${props.attributes.backgroundPositionX} ${props.attributes.backgroundPositionY}`,
       backgroundImage: `linear-gradient(rgba(0,0,0,${props.attributes.backgroundOverlay}),
       rgba(0,0,0,${props.attributes.backgroundOverlay})),url(${props.attributes.backgroundImage})`
     }

   }


		return (
  		<div className={ props.className }>
        <div className={'skywalker-hero ' + props.attributes.alignment + ' ' + colorBackground} style={inlineBackground}>
          <div className="skywalker-hero-container">
            <h2>
              <span className={'skywalker-hero-subtitle'}>{props.attributes.subtitle}</span>
              <span className={'skywalker-hero-title'}>{props.attributes.title}</span>
            </h2>
            { selectedLinkType !== 'none' ? (
              <a className="skywalker-btn" href={currentLinkType}>{props.attributes.linkTitle}</a>
             ): ''
            }
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.12 42">
            <defs><style></style></defs>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path id="Path_33" data-name="Path 33" class="cls-1" d="M30.19,0H12.93V13L5.27,10.76C2.84,10.27,1.62,10.52.53,12c-.85,1.09-.73,2.8.73,4.5L21.56,42l20.3-25.53c1.46-1.7,1.58-3.4.73-4.5-1.09-1.46-2.19-1.7-4.74-1.22l-7.66,2.19Z"/>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
		);
	},
} );
