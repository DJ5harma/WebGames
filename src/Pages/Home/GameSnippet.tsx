import { ReactNode } from "react";
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

export default GameSnippet;
