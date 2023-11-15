/** @format */
import { useState } from "react";

import { Box, Button } from "@mui/material";
import { useLocales } from "locales";
import Typewriter from "react-ts-typewriter";

export default function About() {
	const { t } = useLocales();
	const words = `I designed and developed the project showed in the following video. My work included everything from the branding, the design, the ux, and the engineering of the entire codebase, both the front and backend.`;

	const [show, setShow] = useState(false);

	return (
		<Box sx={{ marginTop: "120px", "> span": { fontSize: "24px" } }}>
			<Typewriter text={words} speed={10} onFinished={() => setTimeout(() => setShow(true), 500)} />
			{show && (
				<Button color="error" variant="contained">
					{t("lemmeSee")}
				</Button>
			)}
		</Box>
	);
}
