import { isMobile } from "react-device-detect";

export default function ScoreBoard({
	playerStruct,
}: {
	playerStruct: {
		X: number;
		O: number;
		DRAWS: number;
	};
}) {
	return (
		<div
			style={{
				backgroundColor: "black",
				fontSize: isMobile ? 16 : 25,
				position: "fixed",
				top: 70,
				left: 0,
				padding: isMobile ? 15 : 30,
				borderRadius: 10,
				display: "flex",
				flexDirection: isMobile ? "row" : "column",
				alignItems: "center",
				gap: 8,
			}}
		>
			<h2>Score</h2>
			<p style={{ color: "rgb(150, 150, 255)" }}>
				Player 1 (X): {playerStruct.X}
			</p>
			<p style={{ color: "rgb(255, 150, 150)" }}>
				Player 2 (O): {playerStruct.O}
			</p>
			<p style={{ color: "rgb(255, 150, 255 )" }}>
				DRAWS: {playerStruct.DRAWS}
			</p>
		</div>
	);
}
