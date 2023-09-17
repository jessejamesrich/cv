/** @format */
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { fetchAndActivate, getRemoteConfig } from "firebase/remote-config";
import conf from "./.config/index.json";

// Initialize Firebase
const app = initializeApp(conf);
const analytics = getAnalytics(app);
const config = getRemoteConfig(app);

// Throttle the refresh to once every hour
config.settings.minimumFetchIntervalMillis = 3600000;

// Activate the remove config
fetchAndActivate(config)
	.then((response) => {
		// ...
		console.log("Fetched values", response);
	})
	.catch((err) => {
		// ...
	});

// Return
export { analytics, app, config };
