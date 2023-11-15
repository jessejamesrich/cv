/** @format */

import express from "express";
import * as functions from "firebase-functions";

// All my api endpoint here
import md from "./components/md/index.js";
import test from "./components/test/index.js";

const app = express();

// Define a custom middleware to capture req.originalUrl
app.use((req, res, next) => {
	// Capture the originalUrl and store it in a variable
	// Middleware would go here if we needed any

	// Pass control to the next middleware in the chain
	next();
});

try {
	// Some simple test endpoint
	app.get("/api/test", test);

	// Get all the MD files from the backend as an example
	app.post("/api/md", md);
} catch (error) {
	console.log(error);
}

// Define your Firebase Function
export const api = functions.https.onRequest(app);
