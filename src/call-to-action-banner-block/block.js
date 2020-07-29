/**
 * BLOCK: skywalker-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
  InspectorControls,
  RichText,
  URLInput,
  MediaUpload,
  MediaUploadCheck,
} = wp.editor;

const { dispatch, select, subscribe } = wp.data;

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


registerBlockType( 'cgb/call-to-action-banner-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Call To Action Block' ), // Block title.
	icon: 'grid-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Skywalker Blocks' ),
		__( 'Call To Action Block' ),
    __( 'Call To Action'),
		__( 'Skywalker' ),
	],
  description: 'Basic Call To Action Banner',

  attributes: {

    formTitle: {
      type:'string',
      default:'Enter A Title'
    },
    container: {
      type:'string',
      default:''
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
  },

	edit:( props ) => {

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

    const containerSizes = [
      {label: 'None', value:''},
      {label: 'Contain Small', value:'skywalker-container-800'},
      {label: 'Contain Large', value:'skywalker-container-1200'}
    ]

		return (
		  <Fragment>
        <InspectorControls>
        <PanelBody
                title={ __( 'Call To Action Settings' ) }
                initialOpen={ true }
            >
            <TextControl
               value={props.attributes.formTitle}
               onChange={formTitle => props.setAttributes({ formTitle: formTitle })}
               label='Form Title'
            />
            <SelectControl
              label='Block Container'
              value={props.attributes.container}
              options={containerSizes}
              onChange={container => props.setAttributes({ container: container })}
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
        </PanelBody>
        </InspectorControls>
        <div className={ props.className }>
           <div className={'call-to-action-block '}>
             <div className={props.attributes.container}>
               <div className="skywalker-row">
                 <div class="skywalker-col">
                   <h3>{ props.attributes.formTitle}</h3>
                 </div>
                 <div className="skywalker-col">
                   { selectedLinkType !== 'none' ? (
                     <a className="skywalker-btn" href={currentLinkType}>{props.attributes.linkTitle}</a>
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

	save: ( props ) =>  {

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

  return (
      <div className={ props.className }>
         <div className={'call-to-action-block '}>
           <div className={props.attributes.container}>
             <div className="skywalker-row">
               <div class="skywalker-col">
                 <h3>{ props.attributes.formTitle}</h3>
               </div>
               <div className="skywalker-col">
                 { selectedLinkType !== 'none' ? (
                   <a className="skywalker-btn" href={currentLinkType}>{props.attributes.linkTitle}</a>
                  ): ''
                 }
               </div>
             </div>
           </div>
         </div>
      </div>
    )
  } ,
} );
