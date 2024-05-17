import { Link, useLocation } from "react-router-dom";

export default function PopGameScoreBoard() {
	const location = useLocation();

	const { data } = location.state;
	const { polesObserved } = data;

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: 20,
			}}
		>
			<h2>!End!</h2>
			<h3>Poles observed: {polesObserved}</h3>
			{/* <h2>____Your Score____</h2>
			<p>Click Count: {clickCount}</p>
			<p>Pop Count: {popCount}</p>
			<p>Accuracy: {accuracy}</p>
			<p>Misses: {misses}</p> */}

			<Link to="/save-the-ship">
				<button>Play Again!</button>
			</Link>
		</div>
	);
}
