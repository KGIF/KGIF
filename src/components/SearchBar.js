import React from 'react';

let timeout = 0;

class SearchBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {term: ''};
	}

	onInputChange(term, random) {
		if(!random) { random = 1; }
		clearTimeout(timeout);
		timeout = setTimeout(() => { 
			this.setState({term});
			this.props.onTermChange(term, random);
		}, 500);
	}

	random(term) {
		let random = Math.floor(Math.random() * (1000 - 101 + 1)) + 101;
		this.onInputChange(term, random);
	}

	getRandomIntroGif() {
		const randomGifs = [
			'https://media2.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif',
			'https://media1.giphy.com/media/l0O7OwJdwnJVBX0g8/giphy.gif',
			'https://media1.giphy.com/media/3rkUUrLNhXqSI/giphy.gif',
			'https://media.giphy.com/media/NVVT5VulwmNDq/giphy-tumblr.gif',
			'https://media1.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif',
			'https://media2.giphy.com/media/xTiTnwLNe6sSsySBNu/giphy.gif',
			'https://media4.giphy.com/media/bBF08hG8kbLdS/giphy.gif',
		];
		const randomIndex = Math.floor(Math.random()*randomGifs.length);
		const gif = randomGifs[randomIndex];

		return gif;
	}

	render() {
		return (
			<div className="search">
				<h2>Where are al the gifs? Right here!!</h2>
				<img src={this.getRandomIntroGif()} />
				<input onChange={event => this.onInputChange(event.target.value)} placeholder="Search here!"/>
				<a className="button" onClick={event => this.random(this.state.term)}>Random page</a>

			</div>
		);
	}
}

export default SearchBar;
