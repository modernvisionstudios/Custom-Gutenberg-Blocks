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
  TextControl,
  ToggleControl
} = wp.components;

const {
  Fragment,
} = wp.element


registerBlockType( 'cgb/team-members-feed-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Team Member Feed Block' ), // Block title.
	icon: 'grid-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Skywalker Blocks' ),
		__( 'Team Member Feed Blocks' ),
    __( 'Team Member'),
		__( 'Skywalker' ),
	],
  description: 'Display a grid of Team Members',

  attributes: {
    alignment: {
      type:'string',
      default:'align-center'
    },
    paddingTop: {
      type:'boolean',
      default:true
    },
    paddingBottom: {
      type:'boolean',
      default:true
    },
    postsPerPage: {
      type:'number',
      default:3
    },
    postTypes: {
      type:'object',
    },
    selectedPostType: {
      type:'string'
    },
    postDirection: {
      type:'string',
      default:'desc'
    },
    numColumns: {
      type:'number',
      default:3
    },
    container: {
      type:'string',
      default:''
    },

  },

	edit:( props ) => {

    // Set current selected number of posts
    const updatePostsPerPage = (e) => {
      props.setAttributes( {
          postsPerPage: parseInt( e.target.value ),
      } )
    }

    // Generate lists of post directions.  Pass to select field.

    const postDir = [
      {label: 'Descending', value:'desc'},
      {label: 'Asending', value:'asc'},
    ]

    // Container Sizes
    const containerSizes = [
      {label: 'None', value:''},
      {label: 'Contain Small', value:'skywalker-container-800'},
      {label: 'Contain Large', value:'skywalker-container-1200'}
    ]

    // Block Alignment
    const blockAlignment = [
      {label: 'Left Align', value:'align-left'},
      {label: 'Center Align', value:'align-center'},
      {label: 'Right Align', value:'align-right'},
    ]

		return (
		  <Fragment>
        <InspectorControls>
        <PanelBody
                title={ __( 'Post Feed Settings' ) }
                initialOpen={ true }
            >
                <SelectControl
                  value={props.attributes.alignment}
                  options={blockAlignment}
                  onChange={alignment => props.setAttributes({ alignment: alignment })}
                />
                <TextControl
                    type="number"
                    className="gbs-block-inspected-inspector-control-field"
                    onChange={postsPerPage => props.setAttributes({ postsPerPage: postsPerPage })}
                    value={ props.attributes.postsPerPage }
                    label="Posts Per Page"
                    min={1}
                    max={25}
                />
                <SelectControl
                  value={props.attributes.postDirection}
                  className="gbs-block-inspected-inspector-control-field"
                  options={postDir}
                  onChange={postDirection => props.setAttributes({ postDirection: postDirection })}
                  label="Post Direction"
                />
                <RangeControl
                     label={"Number Of Columns (" + props.attributes.numColumns  + ")" }
                     value={ props.attributes.numColumns }
                     onChange={numColumns => props.setAttributes({ numColumns: numColumns })}
                     min={ 1 }
                     max={ 4 }
                     step={ 1 }
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
        </InspectorControls>
        <ServerSideRender
          block="cgb/team-members-feed-block"
          attributes={props.attributes}
          className={props.className}
        />
      </Fragment>
		);
	},

	save: () => null ,
} );
