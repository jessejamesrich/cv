/** @format */

import express from "express";
import * as functions from "firebase-functions";

import md from "./components/md/index.js";
import test from "./components/test/index.js";

const app = express();

// Define a custom middleware to capture req.originalUrl
app.use((req, res, next) => {
	// Capture the originalUrl and store it in a variable
	const originalUrl = req.originalUrl;

	// Log or process the originalUrl as needed
	console.log("Original URL:", originalUrl);

	// Pass control to the next middleware in the chain
	next();
});

try {
	// Some simple routes
	app.get("/api/test", test);
	app.get("/api/md", md);
} catch (error) {
	console.log(error);
}

// Define your Firebase Function
export const api = functions.https.onRequest(app);
