<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function theme_blocks_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'theme_blocks-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'theme_blocks-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-api-fetch' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'theme_blocks-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);


	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'theme_blocks-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'cgb/block-theme-blocks', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'theme_blocks-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'theme_blocks-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'theme_blocks-cgb-block-editor-css',

		)
	);

	register_block_type(
		'cgb/block-post-feed-block', array(

			'attributes'  => array(
				'postsPerPage' => array(
					'type'    => 'number',
					'default' => 3,
				),
				'postTypes' => array(
					'type' => 'object'
				),
				'selectedPostType' => array(
					'type' => 'string'
				),
				'paddingTop' => array(
					'type' => 'boolean',
					'default' => true
				),
				'paddingBottom' => array(
					'type' => 'boolean',
					'default' => true
				),
				'postDirection' => array(
					'type' => 'string'
				),
				'numColumns' => array(
					'type' => 'number',
					'default' => 3
				),
				'container' => array(
					'type' => 'string',
					'default' => ''
				),
				'sectionTitle' => array(
					'type' => 'string',
					'default' => 'Section Title'
				),
				'alignment' => array(
					'type' => 'string',
					'default' => 'align-center'
				),

			),
			'render_callback' => 'render_posts_block',
		)
	);


// Render Block Content
function render_posts_block( $args ) {

	global $post;

	$post_args = array(
	  'numberposts' => $args['postsPerPage'],
	  'post_type' => $args['selectedPostType'],
		'order' => $args['postDirection'],
	);

	$myposts = get_posts( $post_args );

	$paddingTop = '';
	$paddingBottom = '';

	if($args['paddingTop'] === true) {
		$paddingTop = 'theme-padding-top';
	}

	if($args['paddingBottom'] === true) {
		$paddingBottom = 'theme-padding-bottom';
	}

	ob_start();

	echo '<section class="theme-post-feed '. ' ' . $paddingTop .' '. $paddingBottom . '">';
  echo '<div class="'. $args['container'] .'">';
	echo '<h2 class="'. $args['alignment'] .'">'. $args['sectionTitle'] .'</h2>';
  echo '<div class="theme-row">';

	foreach( $myposts as $post ) :
    echo '<div class="theme-col theme-col-'. $args['numColumns'] .'">';
		  echo '<a href="'. get_the_permalink($post->ID) .'" class="full-post-link"></a>';
		  echo '<div class="theme-post-img" style="background:url('. get_the_post_thumbnail_url($post->ID) .');">';
			echo '</div>';
			echo '<h3>'. get_the_title() .'</h3>';
			echo '<p>'. get_the_date('m . d . y'). '</p>';
			//echo '<a href="' . get_the_permalink() .'">Read More</a>';
		  echo '</div>';

	endforeach;


	echo '</div>';
  echo '<a href="'. site_url() .'/blog" class="theme-btn">View All</a>';
  echo '</div>';
	echo '</section>';

	return ob_get_clean();

}

// Team Member Block

register_block_type(
	'cgb/team-members-feed-block', array(

		'attributes'  => array(
			'alignment' => array(
				 'type' => 'string',
				 'default' => 'align-center'
			),
			'postsPerPage' => array(
				'type'    => 'number',
				'default' => 3,
			),
			'paddingTop' => array(
				'type' => 'boolean',
				'default' => true
			),
			'paddingBottom' => array(
				'type' => 'boolean',
				'default' => true
			),
			'postTypes' => array(
				'type' => 'object'
			),
			'selectedPostType' => array(
				'type' => 'string'
			),
			'postDirection' => array(
				'type' => 'string'
			),
			'numColumns' => array(
				'type' => 'number',
				'default' => 3
			),
			'container' => array(
				'type' => 'string',
				'default' => ''
			),
		),
		'render_callback' => 'team_member_block',
	)
);

function team_member_block( $args ) {

	global $post;

	$post_args = array(
	  'numberposts' => $args['postsPerPage'],
	  'post_type' => 'our_team',
		'order' => $args['postDirection']
	);

	$myposts = get_posts( $post_args );

	$paddingTop = '';
	$paddingBottom = '';

	if($args['paddingTop'] === true) {
		$paddingTop = 'theme-padding-top';
	}

	if($args['paddingBottom'] === true) {
		$paddingBottom = 'theme-padding-bottom';
	}

	ob_start();

	echo '<section class="theme-team-members-feed-block '. ' ' . $paddingTop .' '. $paddingBottom . '">';
  echo '<div class="'. $args['container'] .' '. $args['alignment'] .'">';
	echo '<h2>Meet The Team</h2>';
  echo '<div class="theme-row">';

	foreach( $myposts as $post ) :
      echo '<div class="theme-col theme-col-'. $args['numColumns'] .'">';
		  echo '<a href="'. get_the_permalink($post->ID) .'" class="full-post-link"></a>';
		  echo '<div class="theme-post-img" style="background:url('. get_the_post_thumbnail_url($post->ID) .');">';
			echo '</div>';
			echo '<div class="theme-team-member">';
			echo '<h3>'. get_the_title() .'</h3>';
			echo '<p>'. get_the_excerpt() .'</p>';
			echo '</div>';
		  echo '</div>';

	endforeach;


	echo '</div>';
  echo '</div>';
	echo '</section>';

	return ob_get_clean();

}

// Gravity Forms Block

register_block_type(
	'cgb/email-signup-block', array(

		'attributes'  => array(
			'emailType' => array(
				'type'    => 'string',
			),
			'formNum' => array(
				'type'    => 'number',
				'default' => 1,
			),
			'formTitle' => array(
				'type'    => 'string',
				'default' => 'Enter a form title',
			),
			'linkBtnLabel' => array(
				'type'    => 'string',
				'default' => 'Subscribe',
			),
			'container' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'render_callback' => 'email_signup_block',
	)
);

function email_signup_block( $args ) {

	ob_start();

	echo '<div class="theme-email-block">';
	echo '<div class="'. $args['container'] .'">';
  echo '<div class="theme-row">';
  echo '<div class="theme-col">';
	echo '<h3>'. $args['formTitle'] .'</h3>';
	echo '</div>';
	echo '<div class="theme-col">';

	echo '<style type="text/css">';
	echo '#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }';
	echo '</style>';
  echo '<div id="mc_embed_signup">';
	echo '<form action="https://firsttuesdaystrategies.us4.list-manage.com/subscribe/post?u=6925d106e85967d04a85085a2&amp;id=753f946787" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>';
  echo '<div id="mc_embed_signup_scroll">';
	echo '<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>';
  echo '<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_6925d106e85967d04a85085a2_753f946787" tabindex="-1" value=""></div>';
  echo '<div class="clear"><input type="submit" value="'. $args['linkBtnLabel'] .'" name="subscribe" id="mc-embedded-subscribe" class="button"></div>';
	echo '</div>';
	echo '</form>';
	echo '</div>';

	echo '</div>';
	echo '</div>';
	echo '</div>';
	echo '</div>';


	return ob_get_clean();

}

// Post Categories Block

register_block_type(
	'cgb/post-categories-feed-block', array(

		'attributes'  => array(
			'postsPerPage' => array(
				'type'    => 'number',
				'default' => 3,
			),
			'paddingTop' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'paddingBottom' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'categories' => array(
				'type' => 'object'
			),
			'selectedCategory' => array(
				'type' => 'string'
			),
			'postDirection' => array(
				'type' => 'string',
				'default' => 'desc'
			),
			'numColumns' => array(
				'type' => 'number',
				'default' => 3
			),
			'container' => array(
				'type' => 'string',
				'default' => ''
			),
		),
		'render_callback' => 'render_categories_block',
	)
);

function render_categories_block( $args ) {

	global $post;

	$category_args = array(
	  'numberposts' => $args['postsPerPage'],
		'post_type' => 'case_studies',
		'category_name' => $args['selectedCategory'],
		'order' => $args['postDirection']
	);

	$mycategories = get_posts( $category_args );

	$paddingTop = '';
	$paddingBottom = '';

	if($args['paddingTop'] === true) {
		$paddingTop = 'theme-padding-top';
	}

	if($args['paddingBottom'] === true) {
		$paddingBottom = 'theme-padding-bottom';
	}

	ob_start();

	echo '<section class="theme-category-feed '. ' ' . $paddingTop .' '. $paddingBottom . '">';
  echo '<div class="'. $args['container'] .'">';
	echo '<h2>'. ucwords(str_replace('-', ' ', $args['selectedCategory'])) .'</h2>';
  echo '<div class="theme-row">';

	foreach( $mycategories as $post ) :
    echo '<div class="theme-col theme-col-'. $args['numColumns'] .'">';
		  echo '<a href="'. get_the_permalink($post->ID) .'" class="full-post-link"></a>';
		  echo '<div class="theme-post-img" style="background:url('. get_the_post_thumbnail_url($post->ID) .');">';
			echo '</div>';
			echo '<div class="theme-post-excerpt">';
			echo '<div class="theme-post-col">';
			echo '<h3>'. get_the_title() .'</h3>';
			echo '<p>'. get_the_date('m . d . y'). '</p>';
			echo '</div>';
			echo '<div class="theme-post-col">';
			echo '</div>';
			echo '</div>';
		  echo '</div>';

	endforeach;


	echo '</div>';
  echo '</div>';
	echo '</section>';

	return ob_get_clean();

}

// Init Gravity Forms API

register_block_type(
	'cgb/contact-form-block', array(

		'attributes'  => array(

			'formSelect' => array(
				'type' => 'object'
			),
			'paddingTop' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'paddingBottom' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'selectedForm' => array(
				'type' => 'number',
				'default' => 1
			),
			'postDirection' => array(
				'type' => 'string',
				'default' => 'desc'
			),
			'container' => array(
				'type' => 'string',
				'default' => ''
			),
			'contactInfo' => array(
				'type' => 'array',
				'default' => []
			),
		),
		'render_callback' => 'contact_form_block',
	)
);

function contact_form_block( $args ) {

 $contactInfo = $args['contactInfo'];

 $paddingTop = '';
 $paddingBottom = '';

 if($args['paddingTop'] === true) {
	 $paddingTop = 'theme-padding-top';
 }

 if($args['paddingBottom'] === true) {
	 $paddingBottom = 'theme-padding-bottom';
 }

	ob_start();

	//print_r($contactInfo);

	echo '<section class="contact-form-block '. ' ' . $paddingTop .' '. $paddingBottom . '">';
  echo '<div class="'. $args['container'] .'">';
  echo '<div class="theme-row">';


  echo '<div class="theme-col">';


  echo do_shortcode('[gravityform id="'. $args['selectedForm'] .'" title="false" description="false" ajax="true" tabindex="49"]');

	echo '</div>';
	echo '<div class="theme-col">';
  echo '<p class="theme-form-title">Columbia Address</p>';

	foreach($contactInfo as $key => $item) {

		//print_r($item);

		echo '<div class="address-section">';
		echo '<p>Email: info@firsttuesdaystrategies.com</p>';
		echo '<p>Phone: 803-931-0580</p>';
		echo '<p>Address: 1301 Gervais Street<br/>19th Floor<br/>Columbia, S.C. 29201</p>';
		echo '</div>';

		echo '<p class="theme-form-title">DC Address</p>';

		echo '<div class="address-section">';
		echo '<p>Phone: 202-599-6347</p>';
		echo '<p>Address: 1701 Pennsylvania Ave.<br/> N.W. #200<br/>Washington, D.C. 20006</p>';
		echo '</div>';

	}

  echo '</div>';
	echo '</div>';
  echo '</div>';
	echo '</section>';

	return ob_get_clean();

}



}

// Hook: Block assets.
add_action( 'init', 'theme_blocks_cgb_block_assets' );

function theme_front_end(){
	if(!is_admin()){
		wp_enqueue_script('jquery');
		wp_enqueue_style( 'swiper-css', plugin_dir_url(__FILE__) . '/frontend/swiper.min.css', false, 'all');
		wp_enqueue_script( 'swiper-js', plugin_dir_url(__FILE__) . '/frontend/swiper.min.js', array(), true );
		wp_enqueue_script( 'interactions', plugin_dir_url(__FILE__) . '/frontend/interactions.js', array(), true );

	}
}

// Swiper Slider Backend

function theme_slider_script(){
	 echo '<script>
	 let mySwiper = new Swiper(".swiper-container", {
		 loop:true,

		 pagination: {
			 el: ".swiper-pagination",
			 clickable: true,
		 },
		 navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
		 breakpoints: {
			 1024: {
				 slidesPerView: 6,
				 spaceBetween: 20,
			 },
			 768: {
				 slidesPerView: 4,
				 spaceBetween: 40,
			 },
			 500: {
				 slidesPerView: 3,
				 spaceBetween: 50,
			 },
			 480: {
				 slidesPerView: 2,
				 spaceBetween: 50,
			 },
		 }
	 });
	</script>';
}

// Create New Block Categories

function my_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'page-layout-blocks',
				'title' => __( 'Custom Layout Blocks', 'page-layout-blocks' ),
			),
		)
	);
}

function posts_blocks_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'post-layout-blocks',
				'title' => __( 'Post Layout Blocks', 'post-layout-blocks' ),
			),
		)
	);
}

add_filter( 'block_categories', 'my_block_category', 10, 2);
add_filter( 'block_categories', 'posts_blocks_category', 10, 2);

add_action('wp_footer', 'theme_slider_script');
add_action('wp_enqueue_scripts', 'theme_front_end');
