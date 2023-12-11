/** @format */
import { Box, Button, Divider, useTheme } from "@mui/material";
import axios from "axios";
import { useLocales } from "locales";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useUI } from "ui";

// Get the contact card
import ContactCard from "@Blocks/ContactCard";

// Get the carousel of skills
import Skills from "@Blocks/Skills";

export default function CV() {
	const { palette } = useTheme();
	const [markdown, setMarkdown] = useState("");
	const { locale } = useLocales();
	const { dialog } = useUI();
	const { t } = useLocales();

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

			<Box sx={{ margin: "10px 0" }}>
				<Skills />
			</Box>

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

			<Box
				sx={{
					marginTop: 5,
					display: "flex",
					justifyContent: "space-around",
				}}
			>
				<Button onClick={() => dialog.open("what")} variant="contained" size="large" color="success">
					{t("hireShort")}
				</Button>
			</Box>
		</>
	);
}
