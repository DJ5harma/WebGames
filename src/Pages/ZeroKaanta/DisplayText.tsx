export default function DisplayText({
	winnerIsThere,
	turn,
}: {
	winnerIsThere: boolean;
	turn: number;
}) {
	return (
		<h2
			style={{
				backgroundColor: "black",
				padding: "10px 20px",
				borderRadius: 20,
				userSelect: "none",
			}}
		>
			{(() => {
				if (winnerIsThere) return `Winner is ${turn % 2 ? "X" : "O"}`;
				else if (turn === 9) return "DRAW!";
				else return `Turn of ${turn % 2 ? "O" : "X"}`;
			})()}
		</h2>
	);
}
