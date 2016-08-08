import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import GifList from './components/GifList';
import request from 'superagent';
import './styles/app.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		const lsData = localStorage.getItem('state');
		let newState;
		if(lsData) {
			 newState = JSON.parse(localStorage.getItem('state'));
		} else {
				newState = {
				gifs: [],
				searched: false,
				totalCount: 100,
				gifsPerPage: 100,
				favourites: []
			};
		}

		newState.gifs = [];
		this.state = newState;

	}

	componentDidUpdate (prevProps, prevState) {
	    localStorage.state = JSON.stringify(this.state);
	}

	addToFavs(newGif) {
		console.log('haha favs!');
		var favs = this.state.favourites.slice();
		favs.push(newGif);
		this.setState({favourites: favs});
		console.log(this.state.favourites);
	}

	removeFav(gif) {
		console.log(gif);
		console.log('removed faved!!');
		console.log(this.state);

		var favs = this.state.favourites.filter((existingGifs) => existingGifs.id !== gif.id);

		this.setState({favourites: favs});
	}

	handleTermChange = (term, offset) => {
		if(!offset) { offset = 1; }
		if(!term || term === '') { 
			this.setState({searched: false});
			return; 
		}

		if(offset >= this.state.totalCount - this.state.gifsPerPage) {
			offset = this.state.gifsPerPage - 100 - 1;
		}

		const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC&limit=50&rating=pg-13&offset=` + offset;
		console.log(url);
		var self = this;

		request.get(url, function (err, res) {
			console.log(res);
			self.setState({ gifs: res.body.data, totalCount: res.body.pagination.total_count, searched: true  });
		});
	}

	render() {

		const main = (
			<div>
			<h1>KGIFs</h1>
			<SearchBar onTermChange={this.handleTermChange} />
			</div>
		)

		const searchComplete = (
			<div>
				<div>
					<h2>Favs</h2>
					<GifList gifs={this.state.favourites} favourite={true} onFavRemove={this.removeFav.bind(this)} onFavAdded={() => {console.log('already faved')}}/>
				</div>
				<h2>Results</h2>
				<GifList gifs={this.state.gifs} onFavAdded={this.addToFavs.bind(this)}/>
			</div>
		)

		if(this.state.searched || this.state.favourites.length > 0) {
			return (
				<div>
					{main}
					{searchComplete}
				</div>
			)
		} else {
			return (
				<div>
					{main}
				</div>
			)
		}
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

