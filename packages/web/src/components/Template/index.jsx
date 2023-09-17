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
			<Container sx={{ padding: "40px 0px", margin: "0px 20px" }}>{children}</Container>
			<Footer />
		</Box>
	);
}
