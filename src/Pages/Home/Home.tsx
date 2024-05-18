import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";

const GameSnippet = ({
	linkPath,
	name,
	description,
	bgColor,
	image,
}: {
	linkPath: string;
	name: string;
	description: string;
	bgColor: string;
	image: ReactNode;
}) => {
	return (
		<div
			style={{
				border: "solid",
				padding: 20,
				borderRadius: 20,
				alignItems: "center",
				gap: 10,
				width: "100%",
				display: "flex",
				flexDirection: "column",
				backgroundColor: bgColor,
			}}
		>
			<div style={{ display: "flex", alignItems: "center" }}>
				<h2 style={{ display: "inline", marginRight: 10 }}>{name}</h2>
				<Link to={linkPath}>
					<button>Play!</button>
				</Link>
				<div style={{ marginLeft: 8 }}>{image}</div>
			</div>
			<p>{description}</p>
		</div>
	);
};

export default function Home() {
	const imageWidth = 30;
	useEffect(() => {
		document.title = "WebGames TS";
	}, []);
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
				gap: 20,
			}}
		>
			<p style={{ fontSize: 30 }}>Games... by Dhananjay </p>
			<p>(More to be added)</p>
			<GameSnippet
				linkPath="/save-the-ship"
				name="Save the Ship"
				description="Click to Change your ship's path to avoid obstacles!"
				bgColor="rgb(0,0,100)"
				image={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
						width={imageWidth}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
						/>
					</svg>
				}
			/>
			<GameSnippet
				linkPath="/pop-game"
				name="Pebble Popping Game"
				description="Accurately pop pebbles asap for satisfaction!"
				bgColor="rgb(100,0,0)"
				image={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
						width={imageWidth}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
						/>
					</svg>
				}
			/>
		</div>
	);
}
