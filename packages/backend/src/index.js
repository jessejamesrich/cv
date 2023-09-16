/** @format */

import express from "express";
import * as functions from "firebase-functions";

const app = express();

// Define a route that returns the JSON response
app.get("/", (req, res) => {
	res.json({
		response: "ok",
		message: "This is a test of an API endpoint!",
	});
});

// Define your Firebase Function
export const api = functions.https.onRequest(app);
