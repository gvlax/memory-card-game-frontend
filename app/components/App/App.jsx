import React from 'react';
import PropTypes from 'prop-types';

import DeckPanel from '../DeckPanel/DeckPanel';
import ScoreTable from '../ScoreTable/ScoreTable';

require('./App.css');

class App extends React.Component {

	static propTypes = {
		myProp: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}


	handleScoreTableUpdate = () => {
		console.log('handleScoreTableUpdate');
	};


	render() {
		return (
			<div>
				<div>
					<DeckPanel handleScoreTableUpdate={this.handleScoreTableUpdate}/>
					<ScoreTable />
				</div>
			</div>
		);
	}
}

export default App;
