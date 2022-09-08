import React from 'react'
import { useSelect } from '@wordpress/data';
import './Card.scss'

export default function Card(props) {
    const imageObj = useSelect(select =>
	    select('core').getMedia(props.image)
	, [])
  return (
    <div className='card-body'>
        <div className='card-thumbnail'>
            <img src={imageObj?.source_url}/>
        </div>
        <div className='card-content'>
            <div></div>
            <div><h3 className='card-title'>{props.title}</h3></div>
            <div className='card-description' dangerouslySetInnerHTML={{ __html: props.excerpt }}></div>
            <div><a href={props.data.link}>Read More</a></div>
        </div>
    </div>
  )
}
