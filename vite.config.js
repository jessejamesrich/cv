/** @format */

import react from "@vitejs/plugin-react";
import fs from "fs";
import path, { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
	const mode = process.env.NODE_ENV === "development" ? "development" : "production";
	const root =
		mode === "development"
			? "http://0.0.0.0:5000/jessejamesrichard-ba480/us-central1"
			: "http://0.0.0.0:5000/jessejamesrichard-ba480/us-central1";

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
				key: fs.readFileSync(path.resolve(__dirname, ".certs/key.pem")),
				cert: fs.readFileSync(path.resolve(__dirname, ".certs/cert.pem")),
			},
		},
		preview: {
			port: 8055,
			https: {
				key: fs.readFileSync(path.resolve(__dirname, ".certs/key.pem")),
				cert: fs.readFileSync(path.resolve(__dirname, ".certs/cert.pem")),
			},
		},
		server: {
			port: 8055,
			strictPort: true,
			https: {
				key: fs.readFileSync(path.resolve(__dirname, ".certs/key.pem")),
				cert: fs.readFileSync(path.resolve(__dirname, ".certs/cert.pem")),
			},
			proxy: {
				"/api": {
					target: root + "/api/",
					changeOrigin: true,
				},
			},
		},
		build: {
			minify: true,
			sourcemap: true,
			ssrManifest: true,
			rollupOptions: {
				input: "index.html",
				onwarn(warning, warn) {
					if (
						warning.code === "MODULE_LEVEL_DIRECTIVE" ||
						warning.code === "EVAL" ||
						warning.code === "UNUSED_EXTERNAL_IMPORT" ||
						warning.code === "PLUGIN_WARNING" ||
						warning.code === "CYCLIC_CROSS_CHUNK_REEXPORT" ||
						warning.code === "EMPTY_IMPORT_META"
					)
						return;
					warn(warning);
				},
				output: {
					manualChunks: (id) => {
						if (id.includes("fontawesome")) {
							return "fontawesome";
						}
						if (id.includes("i18next")) {
							return "i18next";
						}
						if (id.includes("mui")) {
							return "mui";
						}
						if (id.includes("remix-run")) {
							return "remix-run";
						}
					},
				},
			},
		},
	};
});
