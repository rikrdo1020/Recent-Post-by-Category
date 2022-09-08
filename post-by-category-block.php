<?php
/**
 * Plugin Name:       Post By Category Block
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       post-by-category-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function post_by_category_render_callback( $block_attributes, $content ) {
	
	$args = array(
		'post_type'=> 'post',
		'orderby'    => 'ID',
		'post_status' => 'publish',
		'order'    => 'DESC',
		'posts_per_page' => 4
		);
    $recent_posts = get_posts( $args );
	foreach ( $recent_posts as $post ) {
		$posts[] += $post->ID;
	 }
	
    if ( count( $recent_posts ) === 0 ) {
        return 'No posts';
    }
	
    for( $i = 0; $i < count($recent_posts); $i++ ) {
		$categories = get_the_category($posts[$i]);
		foreach($categories as $category){
			$category_html .= '<li>'.$category->name.'</li>';
		}
		$post_list .= "
		<div class='card-body'>
			<div class='card-thumbnail'>
				".get_the_post_thumbnail( $posts[$i], 'medium' )."
			</div>
			<div class='card-content'>
				<div class='card-categories'>
				<ul>
				<li>".
				$categories[0]->name
				."</li></ul>
				</div>
				<div><h3 class='card-title'>".get_the_title($posts[$i])."</h3></div>
				<div class='card-description'>".get_the_excerpt($posts[$i])."</div>
				<div class='read-more-link'>
					<a href='".get_permalink( $posts[$i])."'> 
						<span>&gt;&gt;</span>
						Read More
					</a>
				</div>
			</div>
		</div>
		";
		$category_html = "";
	}
	

    return "<div class='card-container'>" . $post_list . "</div>";
	
}
function create_block_post_by_category_block_block_init() {

	register_block_type( __DIR__ . '/build', array(
		'render_callback' => 'post_by_category_render_callback'
	));
}
add_action( 'init', 'create_block_post_by_category_block_block_init' );
