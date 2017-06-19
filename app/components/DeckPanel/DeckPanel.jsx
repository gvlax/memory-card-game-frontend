import React from 'react';
import {shuffle} from 'lodash';
import superagent from 'superagent';

import GameButton from '../GameButton/GameButton';
import DecksOfCards from '../DecksOfCards/DecksOfCards';
import LiveScore from '../LiveScore/LiveScore';


import {deckIds, backend} from '../../common/app-constants';


class DeckPanel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {score: 0};
		this.cards = {
			[deckIds.DECK_LEFT]: [],
			[deckIds.DECK_RIGHT]: [],
		};
	}


	startGame = () => {
		console.log('startGame ...');
		this.fetchCards()
			.then((data) => {
				this.cards = {
					[deckIds.DECK_LEFT]: data,
					[deckIds.DECK_RIGHT]: shuffle(_.cloneDeep(data)),
				};
				this.addDeckIdInfoToCards(deckIds.DECK_LEFT);
				this.addDeckIdInfoToCards(deckIds.DECK_RIGHT);
				this.setState({score: 0});
			}).catch(console.error);
	};


	//
	// store in a card information on which deck it belongs to
	//
	addDeckIdInfoToCards(deckId) {
		_.forEach(this.cards[deckId], (card) => {
			card.belongsTo = deckId;
			card.matched = false;
			card.clicked = false;
		});
	}


	increaseTurnsIfCompleteTurn = () => {
		this.setState({
			score: this.state.score + 1,
		});
	};


	handleGameResults(gamerInfo) {
		gamerInfo.score = this.state.score;
		this.postScore(gamerInfo).then(() => {
			console.log('scores posted.', gamerInfo);
			this.setState({});
			this.props.handleScoreTableUpdate();
		}).catch(console.error);
	}


	postScore = (gamerScore) =>
		new Promise((resolve, reject) => {
			superagent.post(backend.scoresEndpoint.post)
				.send(gamerScore)
				.set('Content-Type', 'application/json')
				.end((err, res) => {
					if (err) {
						return reject(err);
					}
				});
			resolve();
		});


	fetchCards = () => new Promise((resolve, reject) => {
		superagent.get(backend.cardsEndpoint).end((err, res) => {
			if (err) {
				return reject(err);
			}
			console.info('/n/n/n ', res.body.cards);
			resolve(res.body.cards);
		});
	});


	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-8">
							<GameButton label="Play" onClick={this.startGame}/>
							<GameButton label="Reset high score"/>
						</div>
						<div className="col-4">
							<LiveScore counter={this.state.score}/>
						</div>
					</div>
				</div>
				<DecksOfCards
					cards={this.cards}
					handleScoreCounter={this.increaseTurnsIfCompleteTurn}
					handleGetResults={this.handleGameResults.bind(this)}
				/>
			</div>
		);
	}
}

export default DeckPanel;
