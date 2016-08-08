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
		console.log('random is kicking off');
		console.log(term);
		let random = Math.floor(Math.random() * (1000 - 101 + 1)) + 101;
		console.log(random);
		this.onInputChange(term, random);
	}

	render() {
		return (
			<div className="search">
				<h2>Search for gifs son!</h2>
				<img src='http://media1.giphy.com/media/xTiTnwLNe6sSsySBNu/giphy.gif' />
				<input onChange={event => this.onInputChange(event.target.value)} placeholder="Search here!"/>
				<a className="button" onClick={event => this.random(this.state.term)}>Random page</a>

			</div>
		);
	}
}

export default SearchBar;