<?php
/**
 * Plugin Name: Skywalker Gutenberg Blocks
 * Plugin URI: https://pushdigital.com
 * Description: Custom Gutenberg Compatible Layout Blocks
 * Author: Dante Stanton
 * Author URI: https://pushdigital.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
