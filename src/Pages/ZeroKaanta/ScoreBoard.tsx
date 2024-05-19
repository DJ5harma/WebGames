import { isMobile } from "react-device-detect";

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
				fontSize: isMobile ? 18 : 25,
				position: "fixed",
				top: 0,
				left: 0,
				padding: isMobile ? 15 : 30,
				borderRadius: 10,
				display: "flex",
				flexDirection: "column",
				gap: 8,
			}}
		>
			<h2>Score</h2>
			<p style={{ color: "rgb(150, 150, 255)" }}>
				Player 1 : X {" -> "} {playerStruct[1].wins}
			</p>
			<p style={{ color: "rgb(255, 150, 150)" }}>
				Player 2 : O {" -> "} {playerStruct[2].wins}
			</p>
			<p style={{ color: "rgb(255, 150, 255 )" }}>
				DRAWS: {playerStruct.DRAWS}
			</p>
		</div>
	);
}
