import { useEffect, useState } from "react";
import "./ZeroKaanta.css";
import { isMobile } from "react-device-detect";
import checkWin from "./checkWin";
import ScoreBoard from "./ScoreBoard";

import bloopAudio from "../../assets/bloop.mp3";
import happyPopAudio from "../../assets/happy-pop.mp3";
import celebrationAudio from "../../assets/celebration.mp3";
import failAudio from "../../assets/fail.mp3";

export default function ZeroKaanta() {
	const clickAudio = new Audio(bloopAudio);
	const popAudio = new Audio(happyPopAudio);
	const winSound = new Audio(celebrationAudio);
	const drawSound = new Audio(failAudio);

	const initialState: " "[] = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

	const [filledArray, setFilledArray] =
		useState<("O" | "X" | " ")[]>(initialState);
	const [gameNumber, setGameNumber] = useState(1);
	const [winnerIsThere, setWinnerIsThere] = useState(false);
	const [drawn, setDrawn] = useState(false);

	const [playerStruct, setPlayerStruct] = useState<{
		1: { wins: number };
		2: { wins: number };
		DRAWS: number;
		turnOf: 1 | 2;
	}>({
		1: {
			wins: 0,
		},
		2: { wins: 0 },
		DRAWS: 0,
		turnOf: 1,
	});

	const [winningBoxes, setWinningBoxes] = useState<number[]>([]);

	const CustomButton = ({ number }: { number: number }) => {
		const [isWinning, setIsWinning] = useState(false);

		useEffect(() => {
			for (let i = 0; i < 3; i++)
				if (winningBoxes[i] === number) {
					setIsWinning(true);
					return;
				}
			setIsWinning(false);
		}, [winningBoxes.length]);

		return (
			<button
				className="clickSpace"
				style={{
					width: isMobile ? "28vw" : "10vw",
					height: isMobile ? "28vw" : "10vw",
					borderRadius: 8,
					backgroundColor: isWinning ? "black" : "white",
					color: isWinning ? "white" : "black",
					border: isWinning ? "none" : "default",
				}}
				onClick={() => {
					if (winnerIsThere || filledArray[number] !== " ") return;
					clickAudio.play();

					filledArray[number] = playerStruct.turnOf === 1 ? "X" : "O";
					setFilledArray([...filledArray]);

					if (checkWin(filledArray, setWinningBoxes)) {
						setWinnerIsThere(true);

						const winner = playerStruct.turnOf;
						if (winner === 1 || winner === 2)
							playerStruct[winner].wins++;
						setPlayerStruct({ ...playerStruct });
						winSound.play();
						return;
					}
					(() => {
						for (let i = 0; i < 9; i++)
							if (filledArray[i] === " ") return; // checking if not drawn
						drawSound.play();
						setDrawn(true);
						playerStruct.DRAWS++;
						setPlayerStruct({
							...playerStruct,
						});
					})();
					setPlayerStruct({
						...playerStruct,
						turnOf: playerStruct.turnOf === 1 ? 2 : 1,
					});
				}}
			>
				<pre
					style={{
						fontFamily: "monospace",
						fontSize: isMobile ? 30 : 50,
					}}
				>
					{filledArray[number]}
				</pre>
			</button>
		);
	};

	// 0 1 2
	// 3 4 5
	// 6 7 8
	return (
		<div
			id="ZeroKaanta"
			style={{
				backgroundColor: (() => {
					if (winnerIsThere) return "rgb(10, 80, 10)";
					if (drawn) return "rgb(80, 10, 80)";
					if (playerStruct.turnOf === 1) return "rgb(10, 10, 80)";
					return "rgb(80, 10, 10)";
				})(),
			}}
		>
			<ScoreBoard playerStruct={playerStruct} />

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

			<div>
				<div>
					<CustomButton number={0} />
					<CustomButton number={1} />
					<CustomButton number={2} />
				</div>
				<div>
					<CustomButton number={3} />
					<CustomButton number={4} />
					<CustomButton number={5} />
				</div>
				<div>
					<CustomButton number={6} />
					<CustomButton number={7} />
					<CustomButton number={8} />
				</div>
			</div>
			{(drawn || winnerIsThere) && (
				<button
					onClick={() => {
						popAudio.play();
						setFilledArray(initialState);
						setGameNumber(gameNumber + 1);
						setWinnerIsThere(false);
						setDrawn(false);
						setPlayerStruct({
							...playerStruct,
							turnOf: playerStruct.turnOf === 1 ? 2 : 1,
						});
						setWinningBoxes([]);
					}}
				>
					Play Again!
				</button>
			)}

			<div
				style={{
					position: "fixed",
					top: 10,
					right: 10,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					gap: 10,
				}}
			>
				<button
					onClick={() => {
						popAudio.play();
						setFilledArray(initialState);
						setGameNumber(1);
						setWinnerIsThere(false);
						setPlayerStruct({
							"1": { wins: 0 },
							"2": { wins: 0 },
							DRAWS: 0,
							turnOf: 1,
						});
						setWinningBoxes([]);
					}}
				>
					Reset everything
				</button>
			</div>
		</div>
	);
}
