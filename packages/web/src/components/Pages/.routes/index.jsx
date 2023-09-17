/** @format */
import Template from "../../Template";

import About from "../components/About";
import CV from "../components/CV";
import Home from "../components/Home";

const routes = [
	{
		path: "/",
		element: (
			<Template>
				<Home />
			</Template>
		),
	},
	{
		path: "/cv",
		element: (
			<Template>
				<CV />
			</Template>
		),
	},
	{
		path: "/about",
		element: (
			<Template>
				<About />
			</Template>
		),
	},
];

export { routes };
