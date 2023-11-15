/** @format */
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useUI } from "ui";

export default function () {
	const { mode } = useUI();

	return (
		<Button
			onClick={mode.toggle}
			color="success"
			variant="contained"
			size="small"
			aria-label="dark-mode"
			sx={{ minHeight: "30px", maxWidth: "0px" }}
		>
			<FontAwesomeIcon icon={faMoon} sx={{ marginRight: "10px" }} />
		</Button>
	);
}
