/** @format */
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getRemoteConfig } from "firebase/remote-config";
import conf from "./.config/index.json";

// Initialize Firebase
const app = initializeApp(conf);
const analytics = getAnalytics(app);
const config = getRemoteConfig(app);

// Return
export { analytics, app, config };
