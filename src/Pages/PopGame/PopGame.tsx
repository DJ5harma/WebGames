import { ReactNode, useEffect, useState } from "react";

import "./PopGame.css";

import RandObject from "./RandObject";
import Nav from "./Nav";
import { bloopAudio, popAudio } from "../../assets/audios";

function PopGame() {
	useEffect(() => {
		document.title = "Pebble Popper";
	}, []);

	const [popCount, setPopCount] = useState(0);
	const [clickCount, setClickCount] = useState(0);
	let ctr = 1;
	const [randItems, setRandItems] = useState<{
		[key: number]: ReactNode;
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

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
			}}
			onClick={() => {
				bloopAudio.play();
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
