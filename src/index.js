import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import GifList from './components/GifList';
import request from 'superagent';
import './styles/app.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gifs: [],
			searched: false,
			totalCount: 100,
			gifsPerPage: 100,
			favourites: []
		};
	}

	addToFavs(newGif) {

		console.log('haha favs!');
		var favs = this.state.favourites.slice();
		favs.push(newGif);
		this.setState({favourites: favs});
		console.log(this.state.favourites);
	}

	removeFromFavs() {

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

		const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC&limit=100&rating=pg-13&offset=` + offset;
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
			<h1>KGIF</h1>
			<SearchBar onTermChange={this.handleTermChange} />
			</div>
		)

		const searchComplete = (
			<div>
				<div>
					<h2>Favs</h2>
					<GifList gifs={this.state.favourites} onFavAdded={() => {console.log('already faved')}}/>
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

