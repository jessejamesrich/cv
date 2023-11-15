/** @format */

import Masonry from "@mui/lab/Masonry";
import { Box, Divider, Paper, useTheme } from "@mui/material";
import axios from "axios";
import { useLocales } from "locales";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// The banner image
import Banner from "./assets/images/banner.png";

// The masonry (this could be imported in a more elegant fashion)
import Image1 from "./assets/images/01.png";
import Image2 from "./assets/images/02.png";
import Image3 from "./assets/images/03.png";
import Image4 from "./assets/images/04.png";
import Image5 from "./assets/images/05.png";
import Image6 from "./assets/images/06.png";
import Image7 from "./assets/images/07.png";
import Image8 from "./assets/images/08.png";
import Image9 from "./assets/images/09.png";
import Image10 from "./assets/images/10.png";

// Images we'll use in the page
const imageArray = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9, Image10];

export default function About() {
	// get the theme for styling the component
	const { palette } = useTheme();

	// Wait for the markdown to load from the endpoint
	const [markdown, setMarkdown] = useState("");

	// Locales or both the inline and the api request
	const { t, locale } = useLocales();

	// Load the markdown from the backend as an example
	useEffect(() => {
		axios
			.post("/api/md", { section: "about", locale: locale })
			.then(({ data }) => {
				const md = data.data;
				setMarkdown(md);
			})
			.catch((error) => {
				console.error(error);
			});
		// Add a dependancy on locale in case it changes
	}, [locale]);

	return (
		<Box>
			<h1>{t("aboutThisSite")}</h1>

			<Divider sx={{ margin: "20px 0" }} />

			<Box component="img" src={Banner} sx={{ width: "100%" }} />

			<Divider sx={{ margin: "20px 0" }} />

			{markdown && (
				<Box sx={{ fontSize: "18px", a: { color: palette.secondary.main, fontWeight: "bold" } }}>
					<ReactMarkdown>{markdown}</ReactMarkdown>
				</Box>
			)}

			<Divider sx={{ margin: "20px 0" }} />

			<Masonry columns={3} spacing={1}>
				{imageArray.map((image, index) => (
					<Paper key={index} elevation={3}>
						<img src={image} alt={`Masonry item ${index}`} style={{ width: "100%", display: "block" }} />
					</Paper>
				))}
			</Masonry>
		</Box>
	);
}
