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
  RadioControl,
  SelectControl,
  TextControl,
  TextareaControl,
  FormFileUpload,
  ExternalLink,
  RangeControl,
  ToggleControl
} = wp.components;

const {
  Fragment,
} = wp.element


registerBlockType( 'cgb/category-link-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Two Column Link Block' ), // Block title.
	icon: 'editor-justify', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Skywalker Blocks' ),
		__( 'Category Link Block' ),
		__( 'Category Link' ),
	],
  attributes: {
    alignment: {
      type:'string',
      default:'align-center'
    },
    container: {
      type:'string',
      default:''
    },
    paddingTop: {
      type:'boolean',
      default:true
    },
    paddingBottom: {
      type:'boolean',
      default:true
    },
    title: {
      type:'string',
      default:'Enter A Title'
    },
    text: {
      type:'string',
      default:'Enter Some Text'
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
    linkType2: {
      type:'string',
      default:'none'
    },
    linkTitle2: {
      type:'string',
    },
    linkUrl2: {
      type:'string',
    },
    fileUrl2: {
      type: 'string',
      default: 'No File Selected!'
    },
    urlText2: {
       type:'string'
    },
    externalLink2: {
       type:'string'
    },
    backgroundImage: {
      type: 'string',
      default: 'http://placehold.it/300'
    },
    backgroundImage2: {
      type: 'string',
      default: 'http://placehold.it/300'
    },
    backgroundImage3: {
      type: 'string',
      default: 'http://placehold.it/300'
    },
    backgroundTextColor: {
      type: 'string',
      default: '000000'
    },
    backgroundTextColor2: {
      type: 'string',
      default: '000000'
    },
    backgroundTextColor3: {
      type: 'string',
      default: '000000'
    },
    backgroundType: {
      type:'string',
      default:'color'
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
    },
    backgroundType2: {
      type:'string',
      default:'color'
    },
    backgroundPositionX2: {
      type:'string'
    },
    backgroundPositionY2: {
      type:'string'
    },
    backgroundOverlay2: {
      type:'number',
      default:0.0
    },
    backgroundColor2: {
      type:'string',
      default:'theme-default'
    },
    backgroundType3: {
      type:'string',
      default:'color'
    },
    backgroundPositionX3: {
      type:'string'
    },
    backgroundPositionY3: {
      type:'string'
    },
    backgroundOverlay3: {
      type:'number',
      default:0.0
    },
    backgroundColor3: {
      type:'string',
      default:'theme-default'
    },
  },

	edit: ( props ) => {

    // Check Link type
   const selectedLinkType = props.attributes.linkType;
   const selectedLinkType2 = props.attributes.linkType2;

   // Switch Link According To Link Type

   let currentLinkType = '';
   let currentLinkType2 = '';

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

   // Set Regex Test Pattern

   const urlPattern = new RegExp('^(http|https)://');
   let checkedUrl = urlPattern.test(props.attributes.externalLink);
   let validUrl = '';


   if(checkedUrl == !true && selectedLinkType == 'external'){
     validUrl = 'http:// or https:// Required';

     dispatch( 'core/editor' ).lockPostSaving(); // Lock save post button if condition NOT met.

   } else {

     dispatch( 'core/editor' ).unlockPostSaving(); // Unlock save post button if condition IS met.

   }
   // Select File Link
   const selectFile = (value) => {
      console.log(value);
      props.setAttributes({
          fileUrl: value.title,
      })
   }

   // Link Two

   if(selectedLinkType2 == 'external'){
     currentLinkType2 = props.attributes.externalLink2;
   }

   if(selectedLinkType2 == 'internal'){
     currentLinkType2 = props.attributes.linkUrl2;
   }

   if(selectedLinkType2 == 'file'){
     currentLinkType2 = props.attributes.fileUrl2;
   }

   if(selectedLinkType2 == 'none') {
     currentLinkType2 = '#';
   }

   // Set Regex Test Pattern 2

   const urlPattern2 = new RegExp('^(http|https)://');
   let checkedUrl2 = urlPattern2.test(props.attributes.externalLink2);
   let validUrl2 = '';


   if(checkedUrl2 == !true && selectedLinkType2 == 'external'){
     validUrl2 = 'http:// or https:// Required';

     dispatch( 'core/editor' ).lockPostSaving();

   } else {

     dispatch( 'core/editor' ).unlockPostSaving();
   }
   // Select File Link 2
   const selectFile2 = (value) => {
      console.log(value);
      props.setAttributes({
          fileUrl2: value.title,
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

   // Column One Background Controls


   const selectImage2 = (value) => {
      console.log(value);
      props.setAttributes({
          backgroundImage2: value.sizes.full.url,
      })
   }


   let inlineBackground2 = {background:'none'};
   let colorBackground2 = '';

   let backgroundType2 = props.attributes.backgroundType2;

   if(backgroundType2 == 'color'){
       colorBackground2 = props.attributes.backgroundColor2;
   }

   if(backgroundType2 == 'image'){

     inlineBackground2 = {
       color:`#${props.attributes.backgroundTextColor2}`,
       backgroundPosition: `${props.attributes.backgroundPositionX2} ${props.attributes.backgroundPositionY2}`,
       backgroundImage: `linear-gradient(rgba(0,0,0,${props.attributes.backgroundOverlay2}),
       rgba(0,0,0,${props.attributes.backgroundOverlay2})),url(${props.attributes.backgroundImage2})`
     }

   }

   // Column Two Background Controls


   const selectImage3 = (value) => {
      console.log(value);
      props.setAttributes({
          backgroundImage3: value.sizes.full.url,
      })
   }


   let inlineBackground3 = {background:'none'};
   let colorBackground3 = '';

   let backgroundType3 = props.attributes.backgroundType3;

   if(backgroundType3 == 'color'){
       colorBackground2 = props.attributes.backgroundColor3;
   }

   if(backgroundType3 == 'image'){

     inlineBackground3 = {
       color:`#${props.attributes.backgroundTextColor3}`,
       backgroundPosition: `${props.attributes.backgroundPositionX3} ${props.attributes.backgroundPositionY3}`,
       backgroundImage: `linear-gradient(rgba(0,0,0,${props.attributes.backgroundOverlay3}),
       rgba(0,0,0,${props.attributes.backgroundOverlay3})),url(${props.attributes.backgroundImage3})`
     }

   }

   // Background Colors
   const bgColors = [
     {label: 'Default', value:'theme-default'},
     {label: 'Primary', value:'theme-primary'},
     {label: 'Secondary', value:'theme-secondary'}
   ]

   // Background Position X
   const bgPositionValuesX = [
     {label: 'Left', value:'left'},
     {label: 'Center', value:'center'},
     {label: 'Right', value:'right'},
   ]

   //Background Position Y
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

   // Container Sizes

   const containerSizes = [
     {label: 'None', value:''},
     {label: 'Contain Small', value:'skywalker-container-800'},
     {label: 'Contain Large', value:'skywalker-container-1200'}
   ]

   // Padding toggle

   let pdTop = '';
   let pdBottom = '';

   if(props.attributes.paddingTop == true ){
      pdTop = 'skywalker-padding-top';
   }

   if(props.attributes.paddingBottom == true ){
      pdBottom = 'skywalker-padding-bottom';
   }


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
        <PanelBody title={ __('Container Options')}>
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
        <PanelBody title={ __('Title') } initialOpen={ true }>
            <TextControl
               value={props.attributes.title}
               onChange={title => props.setAttributes({ title: title })}
            />
        </PanelBody>
        <PanelBody title={ __('Text') } initialOpen={ false }>
            <TextareaControl
              value={props.attributes.text}
              onChange={text => props.setAttributes({ text: text })}
            />
        </PanelBody>
        <PanelBody title={ __('Column Link 1') } initialOpen={ false }>
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
                <label>External</label>
                <TextControl
                   placeholder={validUrl}
                   value={props.attributes.externalLink}
                   onChange={
                     externalLink => props.setAttributes({ externalLink: externalLink })
                   }
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
                <label>Internal</label>
                <URLInput
                  value={ props.attributes.linkUrl }
                  onChange={ ( linkUrl, post ) => props.setAttributes( { linkUrl, urlText: (post && post.title) || 'Click here' } ) }
                />
              </div>
              ): ''
            }
            { selectedLinkType == 'file' ? (
              <div>
                <label>File</label>
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
            <RadioControl
                label="Column 1 Background Type"
                selected={ props.attributes.backgroundType2 }
                options={ [
                    { label: 'Color', value: 'color' },
                    { label: 'Image', value: 'image' },
                ] }
                onChange={backgroundType2 => props.setAttributes({ backgroundType2: backgroundType2 })}
            />
            { backgroundType2 == 'color' ? (
              <div>
                <label>Background PositionX</label>
                  <SelectControl
                    value={props.attributes.backgroundColor2}
                    options={bgColors}
                    onChange={backgroundColor2 => props.setAttributes({ backgroundColor2: backgroundColor2 })}
                />
              </div>
              ): ''
            }
            { backgroundType2 == 'image' ? (
                <div>
                <MediaUploadCheck>
                    <MediaUpload
                      onSelect={selectImage2}
                      allowedTypes={ ALLOWED_MEDIA_TYPES }
                      render={ ( { open } ) => {
                        return (
                             <button onClick={open}>
                                 <img
                                     src={props.attributes.backgroundImage2}
                                     />
                             </button>
                         );
                      } }
                    />
                </MediaUploadCheck>
                <label>Background PositionX</label>
                <SelectControl
                  value={props.attributes.backgroundPositionX2}
                  options={bgPositionValuesX}
                  onChange={backgroundPositionX2 => props.setAttributes({ backgroundPositionX2: backgroundPositionX2 })}
                />
                <label>Background PositionY</label>
                <SelectControl
                  value={props.attributes.backgroundPositionY2}
                  options={bgPositionValuesY}
                  onChange={backgroundPositionY2 => props.setAttributes({ backgroundPositionY2: backgroundPositionY2 })}
                />
                <label>Background Text Color</label>
                <SelectControl
                  value={props.attributes.backgroundTextColor2}
                  options={backgroundTextList}
                  onChange={backgroundTextColor2 => props.setAttributes({ backgroundTextColor2: backgroundTextColor2})}
                />
              <label>Background Overlay</label>
              <RangeControl
                   label="Opacity"
                   value={ props.attributes.backgroundOverlay2 }
                   onChange={backgroundOverlay2 => props.setAttributes({ backgroundOverlay2: backgroundOverlay2 })}
                   min={ 0.0 }
                   max={ 1.0 }
                   step={ 0.1 }
               />
            </div>
              ): ''
            }
        </PanelBody>
        <PanelBody title={ __('Column Link 2') } initialOpen={ false }>
          <div>
            <SelectControl
              value={props.attributes.linkType2}
              options={ [
                 { label: 'None', value: 'none' },
                 { label: 'Internal', value: 'internal' },
                 { label: 'External', value: 'external' },
                 { label: 'File', value: 'file' },
              ] }
              onChange={linkType2 => props.setAttributes({ linkType2: linkType2 })}
              label="Link Type"
            />
          </div>
            { selectedLinkType2 == 'external' ? (
              <div>
                <label>External</label>
                <TextControl
                   placeholder={validUrl2}
                   value={props.attributes.externalLink2}
                   onChange={
                     externalLink2 => props.setAttributes({ externalLink2: externalLink2 })
                   }
                />
                { checkedUrl2 == !true && selectedLinkType2 == 'external' ? (
                    <div className={'pd-block-errors'}>
                      URL INVALID (http:// or https://) Required
                    </div>
                  ): ''
                }

              </div>
              ): ''
            }
            { selectedLinkType2 == 'internal' ? (
              <div>
                <label>Internal</label>
                <URLInput
                  value={ props.attributes.linkUrl2 }
                  onChange={ ( linkUrl2, post ) => props.setAttributes( { linkUrl2, urlText2: (post && post.title) || 'Click here' } ) }
                />
              </div>
              ): ''
            }
            { selectedLinkType2 == 'file' ? (
              <div>
                <label>File</label>
                <MediaUploadCheck>
                    <MediaUpload
                      onSelect={selectFile2}
                      render={ ( { open } ) => {
                        return (
                             <button
                                onClick={open}
                             >
                             Upload File
                             </button>
                         );
                      } }
                    />
                </MediaUploadCheck>
                {props.attributes.fileUrl2}
              </div>
              ): ''
            }
            { selectedLinkType2 !== 'none' ? (
              <div>
                <TextControl
                   value={props.attributes.linkTitle2}
                   onChange={linkTitle2 => props.setAttributes({ linkTitle2: linkTitle2 })}
                   label="Link Title"
                />
              </div>
              ): ''
            }
            <RadioControl
                label="Column 2 Background Type"
                selected={ props.attributes.backgroundType3 }
                options={ [
                    { label: 'Color', value: 'color' },
                    { label: 'Image', value: 'image' },
                ] }
                onChange={backgroundType3 => props.setAttributes({ backgroundType3: backgroundType3 })}
            />
            { backgroundType3 == 'color' ? (
              <div>
                <label>Background PositionX</label>
                  <SelectControl
                    value={props.attributes.backgroundColor3}
                    options={bgColors}
                    onChange={backgroundColor3 => props.setAttributes({ backgroundColor3: backgroundColor3 })}
                />
              </div>
              ): ''
            }
            { backgroundType3 == 'image' ? (
                <div>
                <MediaUploadCheck>
                    <MediaUpload
                      onSelect={selectImage3}
                      allowedTypes={ ALLOWED_MEDIA_TYPES }
                      render={ ( { open } ) => {
                        return (
                             <button onClick={open}>
                                 <img
                                     src={props.attributes.backgroundImage3}
                                     />
                             </button>
                         );
                      } }
                    />
                </MediaUploadCheck>
                <label>Background PositionX</label>
                <SelectControl
                  value={props.attributes.backgroundPositionX3}
                  options={bgPositionValuesX}
                  onChange={backgroundPositionX3 => props.setAttributes({ backgroundPositionX3: backgroundPositionX3 })}
                />
                <label>Background PositionY</label>
                <SelectControl
                  value={props.attributes.backgroundPositionY}
                  options={bgPositionValuesY}
                  onChange={backgroundPositionY3 => props.setAttributes({ backgroundPositionY3: backgroundPositionY3 })}
                />
                <label>Background Text Color</label>
                <SelectControl
                  value={props.attributes.backgroundTextColor3}
                  options={backgroundTextList}
                  onChange={backgroundTextColor3 => props.setAttributes({ backgroundTextColor3: backgroundTextColor3})}
                />
              <label>Background Overlay</label>
              <RangeControl
                   label="Opacity"
                   value={ props.attributes.backgroundOverlay3 }
                   onChange={backgroundOverlay3 => props.setAttributes({ backgroundOverlay3: backgroundOverlay3 })}
                   min={ 0.0 }
                   max={ 1.0 }
                   step={ 0.1 }
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
           <div className={'category-link-block ' + props.attributes.alignment + ' ' + colorBackground + '  ' + pdTop + '  ' + pdBottom} style={inlineBackground}>
             <div className={'skywalker-container'}>
               <h2>{props.attributes.title}</h2>
               <div className="skywalker-row">
                 <div className="skywalker-col" style={inlineBackground2}>
                   { selectedLinkType !== 'none' ? (
                     <a className="category-block-link" href={currentLinkType}>{props.attributes.linkTitle}</a>
                    ): ''
                   }
                 </div>
                 <div className="skywalker-col" style={inlineBackground3}>
                   { selectedLinkType2 !== 'none' ? (
                     <a className="category-block-link" href={currentLinkType2}>{props.attributes.linkTitle2}</a>
                    ): ''
                   }
                 </div>
               </div>
             </div>
           </div>
  			</div>
      </Fragment>
		);
	},

	save: ( props ) => {

    // Check Link type
   const selectedLinkType = props.attributes.linkType;
   const selectedLinkType2 = props.attributes.linkType2;

   // Switch Link According To Link Type

   let currentLinkType = '';
   let currentLinkType2 = '';

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


  // Link Two

  if(selectedLinkType2 == 'external'){
    currentLinkType2 = props.attributes.externalLink2;
  }

  if(selectedLinkType2 == 'internal'){
    currentLinkType2 = props.attributes.linkUrl2;
  }

  if(selectedLinkType2 == 'file'){
    currentLinkType2 = props.attributes.fileUrl2;
  }

  if(selectedLinkType2 == 'none') {
    currentLinkType2 = '#';
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

   // Column One Background Controls


   let inlineBackground2 = {background:'none'};
   let colorBackground2 = '';

   let backgroundType2 = props.attributes.backgroundType2;

   if(backgroundType2 == 'color'){
       colorBackground2 = props.attributes.backgroundColor2;
   }

   if(backgroundType2 == 'image'){

     inlineBackground2 = {
       color:`#${props.attributes.backgroundTextColor2}`,
       backgroundPosition: `${props.attributes.backgroundPositionX2} ${props.attributes.backgroundPositionY2}`,
       backgroundImage: `linear-gradient(rgba(0,0,0,${props.attributes.backgroundOverlay2}),
       rgba(0,0,0,${props.attributes.backgroundOverlay2})),url(${props.attributes.backgroundImage2})`
     }

   }

   // Column Two Background Controls

   let inlineBackground3 = {background:'none'};
   let colorBackground3 = '';

   let backgroundType3 = props.attributes.backgroundType3;

   if(backgroundType3 == 'color'){
       colorBackground3 = props.attributes.backgroundColor3;
   }

   if(backgroundType3 == 'image'){

     inlineBackground3 = {
       color:`#${props.attributes.backgroundTextColor3}`,
       backgroundPosition: `${props.attributes.backgroundPositionX3} ${props.attributes.backgroundPositionY3}`,
       backgroundImage: `linear-gradient(rgba(0,0,0,${props.attributes.backgroundOverlay3}),
       rgba(0,0,0,${props.attributes.backgroundOverlay3})),url(${props.attributes.backgroundImage3})`
     }

   }

   const containerSizes = [
     {label: 'None', value:''},
     {label: 'Contain Small', value:'skywalker-container-800'},
     {label: 'Contain Large', value:'skywalker-container-1200'}
   ]

   // Padding toggle

   let pdTop = '';
   let pdBottom = '';

   if(props.attributes.paddingTop == true ){
      pdTop = 'skywalker-padding-top';
   }

   if(props.attributes.paddingBottom == true ){
      pdBottom = 'skywalker-padding-bottom';
   }

		return (
      <div className={ props.className }>
         <div className={'category-link-block ' + props.attributes.alignment + ' ' + colorBackground + '  ' + pdTop + '  ' + pdBottom} style={inlineBackground}>
           <div className={'skywalker-container'}>
             <h2>{props.attributes.title}</h2>
             <div className="skywalker-row">
               <div className="skywalker-col" style={inlineBackground2}>
                 { selectedLinkType !== 'none' ? (
                   <a className="category-block-link" href={currentLinkType}>{props.attributes.linkTitle}</a>
                  ): ''
                 }
               </div>
               <div className="skywalker-col" style={inlineBackground3}>
                 { selectedLinkType2 !== 'none' ? (
                   <a className="category-block-link" href={currentLinkType2}>{props.attributes.linkTitle2}</a>
                  ): ''
                 }
               </div>
             </div>
           </div>
         </div>
      </div>
		);
	},
} );
