import React from 'react';
import superagent from 'superagent';

import ScoreRow from '../ScoreRow/ScoreRow';

import { backend } from '../../common/app-constants';


class ScoreTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			scores: []
		};
	}


	renderScoreRows() {
		return this.state.scores.map((score, i) =>
			<ScoreRow key={score._id} score={score} idx={i}/>,
		);
	}


	componentWillMount() {
		console.log('componentWillMount', this.state.scores);
		this.fetchScores()
			.then((data) => {
				this.setState({scores: data});
			}).catch(console.error);
	}


	fetchScores = () => new Promise((resolve, reject) => {
		superagent.get(backend.scoresEndpoint.get).end((err, res) => {
			if (err) {
				return reject(err);
			}
			resolve(res.body);
		});
	});


	render() {
		return (
			<table className="table table-striped table-hover ">
				<thead>
					<tr>
						<th>#</th>
						<th>Turns</th>
						<th>Name</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{this.renderScoreRows()}
				</tbody>
			</table>
		);
	}
}


export default ScoreTable;
