import React from 'react';

import {procResults} from '../../common/app-constants';

require('./Card.css');


class Card extends React.Component {

	constructor(props) {
		super(props);
		this.card = this.props.card;
		this.reverseCardImage = './../static/images/card_reverse.png';
		this.matchedCardImage = './../static/images/grey.png';
	}

	handleClick = () => {
		this.onBeingSelectedActions[this.props.handleSelection(this.card)]();
	};


	onBeingSelectedActions = {
		[procResults.INVALID_SELECTION]: this.handleInvalidSelection.bind(this),
		[procResults.VALID_SELECTION]: this.handleValidSelection.bind(this),
	};


	handleValidSelection() {
		this.setState({});
	}


	handleInvalidSelection() {
		// do nothing
	}


	render() {
		if (!this.card.clicked && !this.card.matched) {
			return (
				<div className="card-placeholder" onClick={this.handleClick}>
					<img className="card-image" src={this.reverseCardImage}/>
				</div>
			)
		}
		if (this.card.clicked && !this.card.matched) {
			return (
				<div className="card-placeholder" onClick={this.handleClick}>
					<img className="card-image" src={this.card.images.png}/>
				</div>
			)
		}
		if (this.card.matched) {
			return (
				<div className="card-placeholder">
					<img className="card-image" src={this.matchedCardImage}/>
				</div>
			)
		}
	}
}

export default Card;

