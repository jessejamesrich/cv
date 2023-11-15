/** @format */

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Box, IconButton, Stack, Toolbar, Typography, styled } from "@mui/material";
import { useLocales } from "locales";
import React from "react";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
	"&": {
		backgroundColor: theme.palette.mode == "light" ? "#FEFEFE" : "#121212",
		color: theme.palette.mode == "light" ? "#121212" : "#FEFEFE",
	},
}));

const FooterBar = () => {
	const { t } = useLocales();
	return (
		<Box sx={{ position: "fixed", bottom: "0px", width: "100vw" }}>
			<StyledAppBar position="static">
				<Toolbar sx={{ padding: 0 }}>
					<Stack
						direction="row" // Horizontal layout
						alignItems="center" // Align items vertically
						justifyContent="center" // Align items horizontally
						spacing={2}
						sx={{ flexGrow: 1 }} // Grow to take available space
					>
						<IconButton
							edge="end"
							color="inherit"
							aria-label="GitHub"
							href="mailto:relay-one@jessejamesrichard.com"
							target="_blank"
						>
							<FontAwesomeIcon icon={faEnvelope} />
						</IconButton>
						<IconButton
							edge="end"
							color="inherit"
							aria-label="GitHub"
							href="https://www.linkedin.com/in/jesse-james-richard/"
							target="_blank"
						>
							<FontAwesomeIcon icon={faLinkedin} />
						</IconButton>
						<IconButton
							edge="end"
							color="inherit"
							aria-label="GitHub"
							href="https://github.com/jessejamesrich/cv"
							target="_blank"
						>
							<FontAwesomeIcon icon={faGithub} shake />
						</IconButton>
					</Stack>
				</Toolbar>
				<Typography
					variant="body1"
					color="inherit"
					sx={{ padding: "12px", fontSize: "10px", textAlign: "center" }}
				>
					{new Date().getFullYear()} - jessejamesrichard.com
				</Typography>
			</StyledAppBar>
		</Box>
	);
};

export default FooterBar;
