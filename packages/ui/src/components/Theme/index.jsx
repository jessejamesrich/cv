/** @format */

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { createContext, useContext } from "react";

import styles from "./.config";

// Create a context for the theme
const ThemeContext = createContext();

// CustomThemeProvider component
const Theme = ({ children, mode }) => {
	// Merge the style with the selected mode
	const theme = createTheme({
		...styles,
		palette: { ...styles.palette, mode: mode },
	});

	return (
		<ThemeContext.Provider value={{ theme }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

// Define a withTheme HOC
export const withTheme = (WrappedComponent) => {
	// Return a functional component that wraps the provided component
	return function (props) {
		const theme = useContext(ThemeContext); // Access the custom theme using useContext
		return <WrappedComponent {...props} theme={theme} />;
	};
};

// Custom hook to access the theme and toggle function
export const useTheme = () => {
	return useContext(ThemeContext);
};

export default Theme;
export { Theme };
