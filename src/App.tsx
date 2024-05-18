import { Link, Route, Routes, useLocation } from "react-router-dom";
import PopGame from "./Pages/PopGame/PopGame";
import PopGameScoreBoard from "./Pages/PopGame/PopGameScoreBoard";
import Home from "./Pages/Home/Home";
import { useState } from "react";
import SaveTheShipScoreBoard from "./Pages/SaveTheShip/SaveTheShipScoreBoard";
import SaveTheShip from "./Pages/SaveTheShip/SaveTheShip";

function App() {
	const [verifyGoingToHome, setVerifyGoingToHome] = useState(false);

	const location = useLocation();
	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/pebble-popper" element={<PopGame />} />
				<Route
					path="/pebble-popper-scoreboard"
					element={<PopGameScoreBoard />}
				/>
				<Route path="/save-the-ship" element={<SaveTheShip />} />
				<Route
					path="/save-the-ship-scoreboard"
					element={<SaveTheShipScoreBoard />}
				/>
			</Routes>

			{!verifyGoingToHome && location.pathname !== "/" && (
				<button
					style={{ position: "fixed", bottom: 0, left: 0 }}
					onClick={() => {
						setVerifyGoingToHome(true);
					}}
				>
					Go Home
				</button>
			)}
			{verifyGoingToHome && (
				<Link to="/" style={{ position: "fixed", bottom: 0, left: 0 }}>
					<button
						onClick={() => {
							setVerifyGoingToHome(false);
						}}
					>
						Tap to confirm
					</button>
				</Link>
			)}
		</div>
	);
}

export default App;
