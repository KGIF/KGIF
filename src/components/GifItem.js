import React from 'react';
import ReactDOM from 'react-dom';

class GifItem extends React.Component {
	constructor() {
		super();
		this.state = {
			loaded: false,
			showGif: false,
			// gifUrl: ''
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
		console.log('show gif');
		var self = this;
		this.setState({showGif: true});
		// this.setState({showGif: true, gifUrl: self.props.gif.images.downsized_still.url});
	}

	hideGif() {
		console.log('hide gif');
		this.setState({showGif: false});
		// this.setState({showGif: true, gifUrl: self.props.gif.images.downsized.url});
	}

	render() {
		let loading = '';
		let gifUrl = '';
		// let gifUrl = this.props.gif.images.downsized_still.url;
		// console.log(this.props.gif.images);

		if(!this.state.loaded) {
			loading = <div className="placeholder"></div>
		}

		if(!this.state.showGif) {
			gifUrl = this.props.gif.images.downsized_still.url;
		} else {
			gifUrl = this.props.gif.images.downsized.url;
		}

		// if(!this.state.showGif) {
		// 	gifUrl = this.props.gif.images.downsized.url;
		// }

		return (
			<li className="gif-item">
				{ loading }
				<img src={gifUrl} 
				onMouseOver={this.showGif.bind(this)}
				onMouseOut={this.hideGif.bind(this)}
				onLoad={this.handleImageLoaded.bind(this)}
				onError={this.handleImageErrored.bind(this)}/>
				<p>{this.state.loaded}</p>
			</li>
		);
	}
	
};

export default GifItem;