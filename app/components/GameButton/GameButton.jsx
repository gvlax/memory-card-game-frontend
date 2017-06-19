import React from 'react';


require('./GameButton.css');


function GameButton(props) {
	return <a href="#" className="btn btn-primary game-button" onClick={props.onClick}>{props.label}</a>;
}

export default GameButton;
