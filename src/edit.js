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
import { 
	useBlockProps,
	InspectorControls
} from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	Panel,
	SelectControl,
	TextControl
} from "@wordpress/components";
import { useState } from '@wordpress/element';
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
export default function Edit({ posts, className, categorias, attributes, setAttributes }) {
	const { category, numberPosts } = attributes;

	const onChangeCategory = ( newCategory ) => {
		setAttributes({category: newCategory})
	}
	const onChangeNumberPosts = (newNumberPosts) => {
		setAttributes({numberPosts: newNumberPosts})
	}

	console.log(posts)
	
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
		<>
			<InspectorControls>
				<Panel>
					<PanelBody title="My Block Settings" initialOpen={ true }>
						<PanelRow>
							<SelectControl
								label="Category"
								value={ category }
								options={
									categorias.map( ctg => (
										{
											label: ctg.slug,
											value: ctg.id
										}
									))
								
								}
								onChange={ onChangeCategory }
								__nextHasNoMarginBottom
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label="Number of posts"
								value={ numberPosts }
								onChange={ onChangeNumberPosts }
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			
			<div className="card-container" {...useBlockProps()}>
				{posts?.filter( post => post.categories.includes(parseInt(category))).slice(0, numberPosts).map((e) => {
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
		</>
		
	);
}
