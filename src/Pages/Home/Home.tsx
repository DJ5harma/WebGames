import { Link } from "react-router-dom";

const GameSnippet = ({
	linkPath,
	name,
	description,
}: {
	linkPath: string;
	name: string;
	description: string;
}) => {
	return (
		<div
			style={{
				border: "solid",
				padding: 20,
				borderRadius: 20,
				alignItems: "center",
				gap: 10,
			}}
		>
			<div>
				<h2 style={{ display: "inline", marginRight: 10 }}>{name}</h2>
				<Link to={linkPath}>
					<button>Play!</button>
				</Link>
			</div>
			<p>{description}</p>
		</div>
	);
};

export default function Home() {
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
			<h1>Games...</h1>
			<GameSnippet
				linkPath="/pop-game"
				name="Pebble Popping Game"
				description="Accurately click and pop pebbles asap!"
			/>
		</div>
	);
}
