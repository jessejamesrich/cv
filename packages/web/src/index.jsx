/**
 * Simple entry point
 *
 * @format
 */
import "version";

import Locales from "locales";

import ReactDOM from "react-dom/client";
import Home from "./components/Home";

// Create the root once
const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);

// Render this bad boy
root.render(
	<Locales>
		<Home />
	</Locales>
);
