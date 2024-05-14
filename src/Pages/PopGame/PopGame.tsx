import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./PopGame.css";

import bloopAudio from "./bloop.mp3";
import happyPopAudio from "./happy-pop.mp3";

import RandObject from "./RandObject";

function PopGame() {
	const [timeRemaining, setTimeRemaining] = useState(60);

	useEffect(() => {
		setInterval(() => {
			setTimeRemaining(timeRemaining - 1);
		}, 1000);
	}, [timeRemaining]);
	const [popCount, setPopCount] = useState(0);
	const [clickCount, setClickCount] = useState(0);
	let ctr = 1;
	const [randItems, setRandItems] = useState<{
		[key: number]: React.JSX.Element;
	}>({
		1: <RandObject />,
	});

	const navigate = useNavigate();

	useEffect(() => {
		let intervalTime = 3001;
		setInterval(() => {
			ctr++;
			randItems[ctr] = <RandObject />;
			setRandItems({ ...randItems });
			intervalTime -= 100;
		}, intervalTime);
	}, []);

	const clickAudio = new Audio(bloopAudio);
	const popAudio = new Audio(happyPopAudio);

	if (timeRemaining <= 0) {
		navigate("/pop-game-scoreboard", {
			state: {
				data: {
					clickCount,
					popCount,
					misses: clickCount - popCount,
					accuracy: `${((popCount / clickCount) * 100).toFixed(
						2
					)} % `,
				},
			},
		});
	}

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				backgroundColor: "black",
			}}
			onClick={() => {
				clickAudio.play();
				setClickCount(clickCount + 1);
			}}
		>
			<nav
				style={{
					display: "flex",
					justifyContent: "space-around",
					position: "fixed",
					top: 15,
					width: "100vw",
				}}
			>
				<p>Pops: {popCount}</p>
				<p>Clicks: {clickCount}</p>
				<p>Misses: {clickCount - popCount}</p>
				<p>Acc: {((popCount / clickCount) * 100).toFixed(2)} % </p>
				<p style={{ color: "rgb(255, 50, 50)" }}>
					Time: {timeRemaining}
				</p>
			</nav>
			<div>
				{Object.entries(randItems).map(([key, value]) => {
					return (
						<div
							key={key}
							onClick={() => {
								popAudio.play();
								delete randItems[parseInt(key)];
								setRandItems({ ...randItems });
								setPopCount(popCount + 1);
								setClickCount(clickCount + 1);
							}}
						>
							{value}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PopGame;
