import React from 'react';
import _ from 'lodash';

import Card from '../Card/Card';
import NoCardsLoaded from './NoCardsLoaded';
import EndOfGame from '../EndOfGame/EndOfGame';

import { procResults, deckIds } from '../../common/app-constants';


require('./DecksOfCards.css');


class DecksOfCards extends React.Component {

	constructor(props) {
		super(props);
		this.cardSelection = [];
		this.amountOfPairsToMatch = 9;
	}


	areCardsEqual = () => this.cardSelection[0].code === this.cardSelection[1].code;


	processCollectCardsFromDecks = (card) => {
		this.cleanPreviousTurn();
		card.clicked = true;
		this.cardSelection.push(card);
		if (!this.isTurnComplete()) {
			return procResults.TURN_NOT_COMPLETE;
		}
		this.increaseTurnsIfCompleteTurn();
		if (this.areCardsEqual()) {
			this.setPropertyOfSelectedCards('matched', true);
			this.amountOfPairsToMatch -= 1;
			return procResults.CARDS_EQUAL;
		}
		return procResults.CARDS_NOT_EQUAL;
	};


	validateClick = (card) => {
		if (this.checkIfAnyCardAlreadyClickedOnDeck(card) === procResults.INVALID_SELECTION) {
			return procResults.INVALID_SELECTION;
		}
		this.processCollectCardsFromDecks(card);
		return procResults.VALID_SELECTION;
	};


	cleanPreviousTurn = () => {
		if (this.cardSelection.length < 2) {
			return;
		}
		this.cardSelection.length = 0;
		_.forEach(this.props.cards[deckIds.DECK_RIGHT], (card) => {
			card.clicked = false;
		});
		_.forEach(this.props.cards[deckIds.DECK_LEFT], (card) => {
			card.clicked = false;
		});
		this.setState({});
	};


	checkIfAnyCardAlreadyClickedOnDeck = (card) => {
		const notBelongsTo = card.belongsTo === deckIds.DECK_LEFT ? deckIds.DECK_RIGHT : deckIds.DECK_LEFT;
		if (_.find(this.props.cards[card.belongsTo], { clicked: true })
			&& !_.find(this.props.cards[notBelongsTo], { clicked: true })) {
			return procResults.INVALID_SELECTION;
		}
		return procResults.VALID_SELECTION;
	};


	isTurnComplete = () => this.cardSelection.length === 2;


	increaseTurnsIfCompleteTurn = () => this.props.handleScoreCounter();


	setPropertyOfSelectedCards = (prop, val) => _.forEach(this.cardSelection, (card) => {
		card[prop] = val;
	});


	renderCards = deckId => this.props.cards[deckId].map(card =>
		<Card key={`${card.code}-${deckId}`} card={card} handleSelection={this.validateClick} />,
	);


	render() {
		if (this.isEndOfGame()) {
			return <EndOfGame onGameResults={this.props.handleGetResults} />;
		}
		if (this.areCardsLoaded()) {
			return (
				<div className="container">
					<div className="row">
						<div className="col-5">
							<div id="card-container">
								{this.renderCards(deckIds.DECK_LEFT)}
							</div>
						</div>
						<div className="col-5">
							<div id="card-container">
								{this.renderCards(deckIds.DECK_RIGHT)}
							</div>
						</div>
					</div>
				</div>
			);
		}
		return <NoCardsLoaded />;
	}


	isEndOfGame = () => this.amountOfPairsToMatch === 0;


	areCardsLoaded = () => this.props.cards[deckIds.DECK_LEFT].length && this.props.cards[deckIds.DECK_RIGHT].length;

}


export default DecksOfCards;

