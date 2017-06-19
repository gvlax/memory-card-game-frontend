
export const deckIds = {
	DECK_LEFT: 'deck_left',
	DECK_RIGHT: 'deck_right'
};

export const procResults = {
	CARDS_NOT_EQUAL: 1,
	CARDS_EQUAL: 0,
	TURN_NOT_COMPLETE: 3,
	INVALID_SELECTION: 4,
	VALID_SELECTION: 5
};


export const backend = {
	cardsEndpoint: 'http://localhost:3000/api/v1/cards?count=9',
	scoresEndpoint: {
		get: 'http://localhost:3000/api/v1/scores',
		post: 'http://localhost:3000/api/v1/scores'
		/*
		 {
		 	"user": "user1",
		 	"score": 2
		 }
		 */
	},
};
