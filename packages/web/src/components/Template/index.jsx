/** @format */
import { useLocales } from "locales";

import { Box, Container } from "@mui/material";

import Footer from "./components/Footer";
import TopBar from "./components/TopBar";

export default function ({ children }) {
	const { t } = useLocales();

	return (
		<Box>
			<TopBar title={t("topbarTitle")} />
			<Container sx={{ marginTop: "60px", marginBottom: "200px" }}>{children}</Container>
			<Footer />
		</Box>
	);
}
