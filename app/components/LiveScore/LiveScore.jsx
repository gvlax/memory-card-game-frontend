import React from 'react';


class LiveScore extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			counter: 0
		};
	}

	render() {
		return (
			<h3>Turns {this.props.counter}</h3>
		);
	}
}

export default LiveScore;

