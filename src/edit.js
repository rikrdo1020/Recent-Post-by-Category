/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import Card from "./components/Card";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { use } from "@wordpress/data";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ posts, className, isSelected, setAttributes }) {
	if( !posts ){
		return(
			<p className={className}>Loading...</p>
		)
	}
	if( posts.length === 0){
		return(
			<p className={className}>No posts</p>
		)
	}
	return (
		<div className="card-container" {...useBlockProps()}>
			{posts.map((e) => {
				return (
					<Card
						title={e.title.rendered}
						excerpt={e.excerpt.rendered}
						image={e.featured_media}
						data={e}
					></Card>
				);
			})}
		</div>
	);
}
