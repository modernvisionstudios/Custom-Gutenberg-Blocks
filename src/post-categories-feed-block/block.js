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
  ToggleControl
} = wp.components;

const {
  Fragment,
} = wp.element


registerBlockType( 'cgb/post-categories-feed-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Post Category Feed Block' ), // Block title.
	icon: 'grid-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Skywalker Blocks' ),
		__( 'Post Category Blocks' ),
    __( 'Post Category'),
		__( 'Skywalker' ),
	],
  description: 'Display a grid of posts by category',

  attributes: {
    postsPerPage: {
      type:'number',
      default:3
    },
    paddingTop: {
      type:'boolean',
      default:true
    },
    paddingBottom: {
      type:'boolean',
      default:true
    },
    categories: {
      type:'object'
    },
    selectedCategory: {
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

    // Grab All Registered Post Types

    if(!props.attributes.categories){
      wp.apiFetch({
        path: '/wp/v2/categories'
      }).then(categories => {

        props.setAttributes({
          categories: categories
        })

      });
    }

    // Grab key names
    console.log(props.attributes);

    let newCategories = []

    // Get Posts Types
    const category = props.attributes.categories;

    for (let key in category){
       if(category.hasOwnProperty(key)){
         //console.log(`${key} : ${category[key].name}`)
         newCategories.push({label:`${category[key].name}`, value:`${category[key].slug}`})
       }
    }

    if(!props.attributes.categories){
      return 'Loading Posts...'; // Show loading message if no attribute
    }

    if(props.attributes.categories && props.attributes.categories.length === 0){
      return 'No Posts Found...'; // Show error if no postTypes for selected Post Type
    }

    // Set current selected number of posts
    const updatePostsPerPage = (e) => {
      props.setAttributes( {
          postsPerPage: parseInt( e.target.value ),
      } )
    }

    //console.log(props.attributes);

    //Generate lists of post directions.  Pass to select field.

    const postDir = [
      {label: 'Descending', value:'desc'},
      {label: 'Asending', value:'asc'},
    ]

    const containerSizes = [
      {label: 'None', value:''},
      {label: 'Contain Small', value:'skywalker-container-800'},
      {label: 'Contain Large', value:'skywalker-container-1200'}
    ]

		return (
		  <Fragment>
        <InspectorControls>
        <PanelBody
                title={ __( 'Post Feed Settings' ) }
                initialOpen={ true }
            >
                <label className="blocks-base-control__label">
                    { __( 'Posts Per Page') }
                </label>
                <input
                    type="number"
                    className="gbs-block-inspected-inspector-control-field"
                    onChange={ updatePostsPerPage }
                    value={ props.attributes.postsPerPage }
                />
                <SelectControl
                  value={props.attributes.selectedCategory}
                  className="gbs-block-inspected-inspector-control-field"
                  options={newCategories}
                  onChange={selectedCategory => props.setAttributes({ selectedCategory: selectedCategory })}
                  label="Category Select"
                />
                <label className="blocks-base-control__label">
                    { __( 'Post Direction') }
                </label>
                <SelectControl
                  value={props.attributes.postDirection}
                  className="gbs-block-inspected-inspector-control-field"
                  options={postDir}
                  onChange={postDirection => props.setAttributes({ postDirection: postDirection })}
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
          block="cgb/post-categories-feed-block"
          attributes={props.attributes}
          className={props.className}
        />
      </Fragment>
		);
	},

	save: () => null ,
} );
