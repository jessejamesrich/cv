/** @format */
import { set as setCookie } from "cookies";

export function getMode(mode = null) {
	return mode === null ? this.state.mode : this.state.mode == mode;
}

export function setMode(mode) {
	if (!["light", "dark"].include(mode)) return;
	this.setState({ mode: mode }, () => setCookie("mui_mode", this.state.mode));
}

export function toggleMode() {
	this.setState({ mode: this.state.mode === "light" ? "dark" : "light" }, () =>
		setCookie("mui_mode", this.state.mode)
	);
}
