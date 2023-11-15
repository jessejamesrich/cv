/** @format */

import { AppBar, Avatar, Box, Toolbar, styled, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { Menu as LocalesMenu, useLocales } from "locales";

import DarkMode from "./components/DarkMode";
import What from "./components/What";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	"&": {
		backgroundColor: theme.palette.mode == "dark" ? "#272727" : "#d4d4d4",
	},
}));

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
						<Avatar src="https://avatars.githubusercontent.com/u/13437954?v=4" variant="rounded" />
					</Link>
				</Box>
				<What isSmallScreen={isSmallScreen} />
				<StyledLink to="/about" color="inherit">
					{t(isSmallScreen ? "who" : "topbarAbout")}
				</StyledLink>
				<StyledLink to="/cv" color="inherit">
					{t("topBarCV")}
				</StyledLink>
				{!isSmallScreen && (
					<LocalesMenu sx={{ paddingRight: "10px", color: palette.mode == "dark" ? "#FFFFFF" : "#121212" }} />
				)}
				<DarkMode />
			</StyledToolbar>
		</AppBar>
	);
};

export default TopBar;
