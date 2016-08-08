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
			gifsPerPage: 100
		};
	}

	handleTermChange = (term, offset) => {
		if(!offset) { offset = 1; }
		if(!term) { return; }

		if(offset >= this.state.totalCount - this.state.gifsPerPage) {
			offset = this.state.gifsPerPage - 100 - 1;
		}

		const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC&limit=100&rating=pg-13&offset=` + offset;
		console.log(url);
		var self = this;

		request.get(url, function (err, res) {
			console.log(res);
			self.setState({ gifs: res.body.data, totalCount: res.body.pagination.total_count  });
		});
	}

	render() {
		return (
			<div>
				<h1>KGIF</h1>
				<SearchBar onTermChange={this.handleTermChange} />
				<GifList gifs={this.state.gifs} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

