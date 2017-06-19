import React from 'react';


class EndOfGame extends React.Component {

	constructor(props) {
		super(props);
		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange(event) {
		this.setState({ value: event.target.value });
	}


	handleSubmit(event) {
		this.props.onGameResults({
			user: this.state.value
		});
		event.preventDefault();
	}


	render() {
		return (
			<div className="jumbotron">
				<div className="container">
					<h1 className="display-3">You made it! Game over.</h1>
					<div className="lead">
						<form onSubmit={this.handleSubmit}>
							<label>
								Input your name:&nbsp;
								<input type="text" value={this.state.value} onChange={this.handleChange} />
							</label>
							<input type="submit" value="Submit" />
						</form>
					</div>
				</div>
			</div>
		);
	}
}


export default EndOfGame;
