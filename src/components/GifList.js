import React from 'react';
import GifItem from './GifItem';

const GifList = (props) => {
	console.log('props:', props);

	const gifItems = props.gifs.map((image) => {
		return <GifItem key={image.id} gif={image} onFavAdded={props.onFavAdded.bind(this)}/>
	});

	return (
		<ul className="gif-list">{gifItems}</ul>
	)
};

export default GifList;