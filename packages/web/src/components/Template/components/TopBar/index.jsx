/** @format */

import { AppBar, Toolbar, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { Menu as LocalesMenu, useLocales } from "locales";

import DarkMode from "./components/DarkMode";

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

const TopBar = ({ title }) => {
	const { t } = useLocales();
	const { palette } = useTheme();

	return (
		<AppBar position="static">
			<StyledToolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					{title}
				</Typography>
				<StyledLink to="/" color="inherit">
					{t("topbarHome")}
				</StyledLink>
				<StyledLink to="/about" color="inherit">
					{t("topbarAbout")}
				</StyledLink>
				<StyledLink to="/cv" color="inherit">
					{t("topBarCV")}
				</StyledLink>
				<LocalesMenu sx={{ paddingRight: "10px", color: palette.mode == "dark" ? "#FFFFFF" : "#121212" }} />
				<DarkMode />
			</StyledToolbar>
		</AppBar>
	);
};

export default TopBar;
