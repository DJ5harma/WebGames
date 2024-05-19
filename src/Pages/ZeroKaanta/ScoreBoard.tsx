export default function ScoreBoard({
	scores,
}: {
	scores: {
		X: number;
		O: number;
		DRAWS: number;
	};
}) {
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				backgroundColor: "black",
				display: "flex",
				flexDirection: "column",
				padding: 20,
				alignItems: "center",
				borderRadius: 10,
			}}
		>
			<h2>Scores</h2>
			<p
				style={{
					fontSize: 20,
				}}
			>
				X: {scores.X}
				<br />
				O: {scores.O}
				<br />
			</p>
			<p style={{ fontSize: 20 }}>Draws: {scores.DRAWS}</p>
		</div>
	);
}
