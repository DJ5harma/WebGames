import { useEffect, useState } from "react";
import "./ZeroKaanta.css";
import { isMobile } from "react-device-detect";

import bloopAudio from "../../assets/bloop.mp3";
import happyPopAudio from "../../assets/happy-pop.mp3";
import celebrationAudio from "../../assets/celebration.mp3";
import ScoreBoard from "./ScoreBoard";
import DisplayText from "./DisplayText";

export default function ZeroKaanta() {
	const clickAudio = new Audio(bloopAudio);
	const popAudio = new Audio(happyPopAudio);
	const winSound = new Audio(celebrationAudio);

	const initialState: " "[] = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

	const [filledArray, setFilledArray] =
		useState<("O" | "X" | " ")[]>(initialState);

	const [turn, setTurn] = useState(0);

	const [winnerIsThere, setWinnerIsThere] = useState(false);

	const [scores, setScores] = useState({
		X: 0,
		O: 0,
		DRAWS: 0,
	});

	function checkWinner(n1: number, n2: number, n3: number) {
		if (filledArray[n1] === " ") return false;
		if (
			filledArray[n1] === filledArray[n2] &&
			filledArray[n2] === filledArray[n3] &&
			filledArray[n3] === filledArray[n1]
		) {
			if (turn % 2) setScores({ ...scores, X: scores.X + 1 });
			else setScores({ ...scores, O: scores.O + 1 });
			winSound.play();
			return true;
		}
		if (turn === 9) setScores({ ...scores, DRAWS: scores.DRAWS + 1 });

		return false;
	}

	const CustomButton = ({ number }: { number: number }) => {
		return (
			<button
				className="clickSpace"
				style={{
					width: isMobile ? "28vw" : "10vw",
					height: isMobile ? "28vw" : "10vw",
					borderRadius: 8,
				}}
				onClick={() => {
					if (
						winnerIsThere ||
						turn === 9 ||
						filledArray[number] !== " "
					)
						return;
					clickAudio.play();
					setTurn(turn + 1);
					setFilledArray((prev) => {
						prev[number] = turn % 2 ? "O" : "X";
						return [...prev];
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

	useEffect(() => {
		if (
			checkWinner(0, 1, 2) ||
			checkWinner(3, 4, 5) ||
			checkWinner(6, 7, 8) ||
			//
			checkWinner(0, 3, 6) ||
			checkWinner(1, 4, 7) ||
			checkWinner(2, 5, 8) ||
			//
			checkWinner(0, 4, 8) ||
			checkWinner(2, 4, 6)
		) {
			setWinnerIsThere(true);
			return;
		}
	}, [turn]);

	return (
		<div
			id="ZeroKaanta"
			style={{
				backgroundColor: `rgb(${(() => {
					if (winnerIsThere) return "10,80,10";
					if (turn === 9) return "30,10,30";
					if (turn % 2) return "80,10,10";
					else return "10,10,80";
				})()})`,
			}}
		>
			<ScoreBoard scores={scores} />

			<DisplayText winnerIsThere={winnerIsThere} turn={turn} />

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
			{turn !== 0 && (
				<button
					onClick={() => {
						setFilledArray(initialState);
						setWinnerIsThere(false);
						setTurn(0);
						popAudio.play();
					}}
				>
					{winnerIsThere || turn === 9 ? "Play Again!" : "Reset"}
				</button>
			)}
		</div>
	);
}
