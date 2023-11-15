/**
 * Simple entry point
 *
 * @format
 */

// Helps between development and production - logs version to console
import "version";

// Import the locales provider
import Locales from "locales";

import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Setup the ui and theme provider
import { UI } from "ui";

// Load the routes into the router provider
import { routes } from "./components/Pages/.routes";

// Create the root once
const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);

// Render this bad boy
root.render(
	<Locales>
		<UI>
			<RouterProvider router={createBrowserRouter(routes)} />
		</UI>
	</Locales>
);
