export default function DisplayText({
	gameNumber,
	playerStruct,
	winnerIsThere,
	drawn,
}: {
	gameNumber: number;
	winnerIsThere: boolean;
	playerStruct: {
		DRAWS: number;
		turnOf: 1 | 2;
		1: { wins: number };
		2: { wins: number };
	};
	drawn: boolean;
}) {
	return (
		<h2
			style={{
				backgroundColor: "black",
				padding: "10px 20px",
				borderRadius: 20,
				userSelect: "none",
				textAlign: "center",
			}}
		>
			<p style={{ color: "rgb(140, 255, 140)" }}>Game {gameNumber}</p>
			<p>
				{(() => {
					if (winnerIsThere)
						return `Winner is ${
							playerStruct.turnOf === 1 ? "X" : "O"
						}`;
					else if (drawn) return "DRAW!";
					else
						return `Turn of ${
							playerStruct.turnOf === 1 ? "X" : "O"
						}`;
				})()}
			</p>
		</h2>
	);
}
