/** @format */
import { Box, Container } from "@mui/material";
import { useLocales } from "locales";

// Normal template'y stuff
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";

// Get the contact dialog stored in blocks
import ContactDialog from "@Blocks/ContactDialog";

export default function ({ children }) {
	const { t } = useLocales();

	return (
		<Box>
			<TopBar title={t("topbarTitle")} />
			<Container sx={{ marginTop: "60px", marginBottom: "200px" }}>{children}</Container>
			<Footer />
			<ContactDialog title={t("contactJesse")} name="what" confirm={true} />
		</Box>
	);
}
