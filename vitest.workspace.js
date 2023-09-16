/** @format */
import pluginReact from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { defineWorkspace } from "vitest/config";
import aliases from "./.aliases/index.json";

const alias = {};

alias["~"] = path.resolve(__dirname, "./");

Object.keys(aliases).forEach((entry) => {
	alias[entry] = resolve(__dirname, aliases[entry]);
});

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
		resolve: {
			alias: alias,
		},
		test: {
			globals: true,
			environment: "happy-dom",
			name: "🥳",
			// Manually named during testing. * works as well.
			include: ["**/.tests/*.*.{js,jsx}"], // performing,maintenance,app,user,web,workspace,features
			exclude: ["node_modules"],
			threads: false,
		},
	},
]);
