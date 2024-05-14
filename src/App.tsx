import { Link, Route, Routes, useLocation } from "react-router-dom";
import PopGame from "./Pages/PopGame/PopGame";
import PopGameScoreBoard from "./Pages/PopGame/PopGameScoreBoard";
import Home from "./Pages/Home/Home";
import { useState } from "react";

function App() {
	const [verifyGoingToHome, setVerifyGoingToHome] = useState(false);

	const location = useLocation();
	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<Routes>
				<Route index element={<Home />} />
				<Route path="/pop-game" element={<PopGame />} />
				<Route
					path="/pop-game-scoreboard"
					element={<PopGameScoreBoard />}
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
