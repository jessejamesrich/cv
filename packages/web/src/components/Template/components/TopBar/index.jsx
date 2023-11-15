/** @format */

import { AppBar, Avatar, Box, Hidden, Toolbar, styled, useMediaQuery, useTheme } from "@mui/material";
import { Menu as LocalesMenu, useLocales } from "locales";
import React from "react";
import { Link } from "react-router-dom";
import JessesAvatar from "./assets/images/avatar.png";
import Contact from "./components/Contact";
import DarkMode from "./components/DarkMode";

// Style the toolbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	"&": {
		backgroundColor: theme.palette.mode == "dark" ? "#272727" : "#FAFAFA",
	},
}));

// Stle the links
const StyledLink = styled(Link)(({ theme }) => ({
	"&": {
		color: theme.palette.mode == "dark" ? "#FEFEFE" : "#121212",
		margin: "0px 20px",
		textDecoration: "none",
	},
}));

const TopBar = () => {
	const { t } = useLocales();
	const { palette } = useTheme();
	const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

	return (
		<AppBar position="static">
			<StyledToolbar>
				<Box sx={{ flexGrow: 1 }}>
					<Link to="/">
						<Avatar src={JessesAvatar} variant="rounded" />
					</Link>
				</Box>
				<StyledLink to="/cv" color="inherit" sx={{ fontWeight: "bold" }}>
					{t("topBarCV")}
				</StyledLink>
				<Hidden smDown>
					<StyledLink to="/about" color="inherit">
						{t("topbarAbout")}
					</StyledLink>
				</Hidden>
				<Contact isSmallScreen={isSmallScreen} />
				{!isSmallScreen && (
					<LocalesMenu sx={{ paddingRight: "10px", color: palette.mode == "dark" ? "#FFFFFF" : "#121212" }} />
				)}
				<DarkMode />
			</StyledToolbar>
		</AppBar>
	);
};

export default TopBar;
