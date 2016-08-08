import React from 'react';
import GifItem from './GifItem';

const GifList = (props) => {
	console.log('props:', props);

	const gifItems = props.gifs.map((image) => {
		if(props.onFavRemove) {
		return <GifItem key={image.id} gif={image} favourite={props.favourite} onFavRemove={props.onFavRemove.bind(this)} onFavAdded={props.onFavAdded.bind(this)}/>

		} else {
		return <GifItem key={image.id} gif={image} favourite={props.favourite}  onFavAdded={props.onFavAdded.bind(this)}/>

		}
	});

	return (
		<ul className="gif-list">{gifItems}</ul>
	)
};

export default GifList;