/** @format */
import { Box, Divider, useTheme } from "@mui/material";
import axios from "axios";
import { useLocales } from "locales";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ContactCard from "../../../ContactCard";

export default function CV() {
	const { palette } = useTheme();
	const [markdown, setMarkdown] = useState("");
	const { locale } = useLocales();

	// Load the markdown from the backend as an example
	useEffect(() => {
		// Send the ajax request
		axios.post("/api/md", { section: "cv", locale: locale }).then(({ data }) => {
			// Extract the markdown from the response
			const md = data.data;

			// set the markdown to show in the page
			setMarkdown(md);
		});
		// Add a dependancy on locale in case it changes
	}, [locale]);

	return (
		<>
			<ContactCard size="large" />

			<Divider />

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
