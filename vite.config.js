/** @format */

import react from "@vitejs/plugin-react";
import fs from "fs";
import path, { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
	const mode = process.env.NODE_ENV === "development" ? "development" : "production";
	const root =
		mode === "development"
			? "http://0.0.0.0:5000/jessejamesrichard/us-central1"
			: "http://0.0.0.0:5000/jessejamesrichard/us-central1";

	console.log("----------------------------------");
	console.log("Running in", process.env.NODE_ENV, "mode.");
	console.log("Proxying", root);
	console.log(resolve(__dirname, "./"));
	console.log("----------------------------------");

	return {
		mode: mode,
		base: "/",
		clearScreen: true,
		plugins: [react()],
		serve: {
			port: 8055,
			https: {
				key: fs.readFileSync(path.resolve(__dirname, ".cert/key.pem")),
				cert: fs.readFileSync(path.resolve(__dirname, ".cert/cert.pem")),
			},
		},
		preview: {
			port: 8055,
			https: true,
		},
		server: {
			port: 8055,
			strictPort: true,
			// hmr: { overlay: false, protocol: "wss" },
			https: {
				key: fs.readFileSync(path.resolve(__dirname, ".cert/key.pem")),
				cert: fs.readFileSync(path.resolve(__dirname, ".cert/cert.pem")),
			},
			proxy: {
				"/api": {
					target: root + "/functions/",
					changeOrigin: true,
				},
			},
		},
	};
});
