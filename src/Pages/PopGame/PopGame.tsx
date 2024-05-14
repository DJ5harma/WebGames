import { useEffect, useState } from "react";

import "./PopGame.css";

import bloopAudio from "./bloop.mp3";
import happyPopAudio from "./happy-pop.mp3";

import RandObject from "./RandObject";
import Nav from "./Nav";

function PopGame() {
	useEffect(() => {
		document.title = "Pebble Popper";
	}, []);

	const [popCount, setPopCount] = useState(0);
	const [clickCount, setClickCount] = useState(0);
	let ctr = 1;
	const [randItems, setRandItems] = useState<{
		[key: number]: React.JSX.Element;
	}>({
		1: <RandObject />,
	});

	useEffect(() => {
		let intervalTime = 2200;
		setInterval(() => {
			ctr++;
			randItems[ctr] = <RandObject />;
			setRandItems({ ...randItems });
			intervalTime -= 100;
		}, intervalTime);
	}, []);

	const clickAudio = new Audio(bloopAudio);
	const popAudio = new Audio(happyPopAudio);

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
			<Nav clickCount={clickCount} popCount={popCount} />
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
