export default function ScoreBoard({
	playerStruct,
}: {
	playerStruct: {
		1: { wins: number };
		2: { wins: number };
		DRAWS: number;
		turnOf: 1 | 2;
	};
}) {
	return (
		<div
			style={{
				backgroundColor: "black",
				fontSize: 25,
				position: "fixed",
				top: 0,
				left: 0,
				padding: 30,
				borderRadius: 10,
			}}
		>
			<h2>Score</h2>
			Player 1 : X {" -> "} {playerStruct[1].wins}
			<br />
			Player 2 : O {" -> "} {playerStruct[2].wins}
			<br />
			DRAWS: {playerStruct.DRAWS}
		</div>
	);
}
