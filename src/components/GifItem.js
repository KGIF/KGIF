import React from 'react';
import ReactDOM from 'react-dom';

class GifItem extends React.Component {
	constructor() {
		super();
		this.state = {
			loaded: false,
			showGif: false,
			faved: false
		}
	}

	handleImageLoaded() {
		console.log('image loaded');
		this.setState({loaded: true});
	}

	handleImageErrored() {
		console.log('image error');
	}

	showGif() {
		this.setState({showGif: true});
	}

	hideGif() {
		this.setState({showGif: false});
	}

	addFav(e) {
		e.preventDefault();
		this.props.onFavAdded(this.props.gif);
		this.setState({faved: true});
	}

	removeFav(e) {
		e.preventDefault();
		this.props.onFavRemove(this.props.gif);
	}

	render() {
		let loading = '';
		let gifUrl = '';
		const gifSize = parseInt(this.props.gif.images.downsized.size);

		if(!this.state.loaded) {
			loading = <div className="placeholder"></div>
		}

		if(!this.state.showGif) {
			gifUrl = this.props.gif.images.downsized_still.url;
		} else {
			gifUrl = this.props.gif.images.downsized.url;
		}

		if(gifSize >= 2000000) {
			return;
		}

		let favButton = (<span></span>);
		if(!this.state.faved && !this.props.favourite) {
			favButton = (<a href="#" onClick={this.addFav.bind(this)}>Favourite </a>);
		}

		if(this.props.favourite) {
			favButton = (<a href="#" onClick={this.removeFav.bind(this)}>Remove</a>);
		}


		return (
			<li className="gif-item">
				{ loading }
				<img src={gifUrl} 
				onMouseOver={this.showGif.bind(this)}
				onMouseOut={this.hideGif.bind(this)}
				onLoad={this.handleImageLoaded.bind(this)}
				onError={this.handleImageErrored.bind(this)}/>
				<p>{this.state.loaded}</p>
				{favButton}
				
			</li>
		);
	}
	
};

export default GifItem;