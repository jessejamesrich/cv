/** @format */
import { Box, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function CV() {
	const { palette } = useTheme();
	const [markdown, setMarkdown] = useState("");

	useEffect(() => {
		axios.get("/api/md").then(({ data }) => {
			const md = data.data;
			setMarkdown(md);
		});
	}, []);

	console.log(palette, "~18");

	return (
		<>
			{markdown && (
				<Box
					component="blockquote"
					sx={
						palette.mode == "dark"
							? { backgroundColor: "#121212", a: { color: "#FFF" } }
							: { backgroundColor: "#DDDDDD", a: { color: palette.error.main } }
					}
				>
					<ReactMarkdown>{markdown}</ReactMarkdown>
				</Box>
			)}
		</>
	);
}
