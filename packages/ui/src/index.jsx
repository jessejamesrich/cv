/** @format */

import { get as getCookie } from "cookies";

import React, { Component, createContext, useContext } from "react";

// Theme provider adapter
import { Theme, useTheme, withTheme } from "./components/Theme";

// Dark, Light mode controller
import { getMode, setMode, toggleMode } from "./helpers/Mode";

// Dialogs
import { Dialog } from "./components/Dialog";
import { closeDialog, openDialog } from "./helpers/Dialog";

const UIContext = createContext();

class UIProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: false,
			dialogs: [],
			mode: getCookie("mui_mode") || "dark",
		};
		// Dialog controller
		this.dialog = {
			open: openDialog.bind(this),
			close: closeDialog.bind(this),
		};
		// Theme controller
		this.mode = {
			set: setMode.bind(this),
			get: getMode.bind(this),
			toggle: toggleMode.bind(this),
		};
	}

	componentDidMount() {
		// We're ready to render the app
		this.setState({ ready: true });
	}

	render() {
		const { children } = this.props;
		return (
			<>
				{this.state.ready && (
					<UIContext.Provider value={{ ...this.state, mode: this.mode, dialog: this.dialog }}>
						<Theme mode={this.state.mode}>{children}</Theme>
					</UIContext.Provider>
				)}
			</>
		);
	}
}

export const withUI = (Component) => (props) => {
	return <UIContext.Consumer>{(state) => <Component {...props} ui={state} />}</UIContext.Consumer>;
};

// Custom hook to access the theme and toggle function
export const useUI = () => {
	return useContext(UIContext);
};

export default UIProvider;
export { Dialog, Theme, UIProvider as UI, useTheme, withTheme };
