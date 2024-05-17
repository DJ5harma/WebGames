import { useEffect, useRef, useState } from "react";
import "./SaveTheShip.css";
import Ship from "./Ship";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

import popAudio from "../../assets/happy-pop.mp3";

export default function SaveTheShip() {
	const [poleHeights, setPoleHeights] = useState([
		{ topPoleHeight: 40, index: 0 },
	]);

	const [shipTopPosition, setShipTopPosition] = useState(1);
	const [shipDirection, setShipDirection] = useState<"up" | "down">("down");

	const shipRef = useRef<HTMLDivElement>(null);
	const poleRefs = useRef<(HTMLDivElement | null)[]>([]);

	const spaceBW = 40;

	const navigate = useNavigate();

	const touchedAudio = new Audio(popAudio);

	function checkCollision() {
		if (!shipRef.current) return;
		const shipRect = shipRef.current.getBoundingClientRect();

		for (const poleRef of poleRefs.current) {
			if (poleRef) {
				const poleRect = poleRef.getBoundingClientRect();

				if (
					shipRect.left < poleRect.left + poleRect.width &&
					shipRect.left + shipRect.width > poleRect.left &&
					shipRect.top < poleRect.top + poleRect.height &&
					shipRect.top + shipRect.height > poleRect.top
				) {
					touchedAudio.play();
					navigate("/save-the-ship-scoreboard", {
						state: {
							data: {
								polesObserved:
									poleHeights[poleHeights.length - 1].index,
							},
						},
					});
				}
			}
		}
	}

	useEffect(() => {
		const intervalTime = isMobile ? 1500 : 900;

		const polesInterval = setInterval(() => {
			setPoleHeights((prev) => [
				...prev,
				{
					topPoleHeight: Math.random() * 60,
					index: prev[prev.length - 1].index + 1,
				},
			]);

			console.log(poleRefs);
		}, intervalTime);

		const removePolesInterval = setTimeout(() => {
			const intervalId = setInterval(() => {
				setPoleHeights((prev) => [...prev.slice(1)]);
			}, intervalTime);
			return () => clearInterval(intervalId);
		}, 8000);

		return () => {
			clearInterval(polesInterval);
			clearTimeout(removePolesInterval);
		};
	}, []);

	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				overflow: "hidden",
			}}
			onClick={() => {
				setShipDirection((prev) => (prev === "up" ? "down" : "up"));
			}}
		>
			{poleHeights.map(({ topPoleHeight, index }) => {
				// Clearing the poleRefs array before adding new references
				poleRefs.current = [];
				return (
					<div
						key={index}
						className="TwoPolesAndSpacing"
						style={{
							width: isMobile ? 30 : 100,
						}}
					>
						<div
							style={{
								backgroundColor: "white",
								height: `${topPoleHeight}vh`,
							}}
							ref={(ref) => poleRefs.current.push(ref)}
						></div>
						<p
							style={{
								height: `${spaceBW}vh`,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								fontSize: 25,
							}}
						>
							{index}
						</p>
						<div
							style={{
								backgroundColor: "white",
								height: `${100 - topPoleHeight - spaceBW}vh`,
							}}
							ref={(ref) => poleRefs.current.push(ref)}
						></div>
					</div>
				);
			})}
			<Ship
				ref={shipRef}
				shipTopPosition={shipTopPosition}
				shipDirection={shipDirection}
				checkCollision={checkCollision}
				setShipDirection={setShipDirection}
				setShipTopPosition={setShipTopPosition}
			/>
		</div>
	);
}
