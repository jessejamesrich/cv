/**
 * Simple entry point
 *
 * @format
 */

import "version";

import Locales from "locales";

import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { UI } from "ui";

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
