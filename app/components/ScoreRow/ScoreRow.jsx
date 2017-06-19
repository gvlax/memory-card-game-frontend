import React from 'react';


function ScoreRow(props) {
	return (
		<tr>
			<td>{props.idx}</td>
			<td>{props.score.score}</td>
			<td>{props.score.user}</td>
			<td>{props.score.createdAt}</td>
		</tr>
	);
}

export default ScoreRow;

