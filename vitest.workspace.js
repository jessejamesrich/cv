/** @format */
import pluginReact from "@vitejs/plugin-react";
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
	"packages/*",
	{
		extends: "./vite.config.js",
		plugins: [
			pluginReact({
				babel: {
					// allows import assertions for json
					plugins: ["@babel/plugin-syntax-import-assertions"],
				},
			}),
		],
		test: {
			globals: true,
			environment: "happy-dom",
			name: "🥳",
			include: ["**/.tests/index.jsx", "**/.tests/index.js"],
			exclude: ["node_modules"],
			threads: false,
		},
	},
]);
