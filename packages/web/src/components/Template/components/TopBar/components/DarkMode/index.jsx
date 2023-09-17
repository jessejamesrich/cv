/** @format */
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button } from "@mui/material";
import { useLocales } from "locales";
import { Dialog, useUI } from "ui";

export default function () {
	const { t } = useLocales();
	const { dialog, mode } = useUI();

	const toggleAndClose = () => {
		dialog.close().then(() => mode.toggle());
	};

	const localizeModes = (l) => {
		const m = mode.get("dark") ? "light" : "dark";
		return t(m + l);
	};

	return (
		<>
			<Box>
				<Button
					onClick={() => dialog.open("test")}
					color="success"
					variant="contained"
					size="small"
					aria-label="dark-mode"
					sx={{ minHeight: "30px", maxWidth: "0px" }}
				>
					<FontAwesomeIcon icon={faMoon} sx={{ marginRight: "10px" }} />
				</Button>
			</Box>
			<Dialog title={localizeModes("ModeTitle")} name="test" cancel={true} confirm={toggleAndClose}>
				{localizeModes("ModeMessage")}
			</Dialog>
		</>
	);
}
